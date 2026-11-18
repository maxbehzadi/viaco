import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { PRODUCT_CONCEPT_ASSETS } from "../src/config/assets.ts";
import { SITE_CONFIG } from "../src/config/site.ts";
import { sanitizeAnalyticsPayload } from "../src/lib/analytics.ts";
import {
  checkAndRecordDuplicate,
  checkRateLimit,
  createSubmissionFingerprint,
  formatRedactedLogEntry,
  resetDemoRequestGuards,
  validateAndSanitizeDemoRequest,
} from "../src/lib/demo-request.ts";

const ROOT = path.resolve(import.meta.dirname, "..");

function readJson(relPath: string): Record<string, unknown> {
  const fullPath = path.join(ROOT, relPath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as Record<
    string,
    unknown
  >;
}

function shapeSignature(value: unknown): unknown {
  if (Array.isArray(value)) {
    return [value.length, value.length > 0 ? shapeSignature(value[0]) : null];
  }
  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(obj)
        .sort()
        .map((key) => [key, shapeSignature(obj[key])])
    );
  }
  return typeof value;
}

describe("VIACO i18n & Content Integrity", () => {
  it("maintains full structural parity between German and English dictionaries", () => {
    const de = readJson("src/i18n/locales/de.json");
    const en = readJson("src/i18n/locales/en.json");

    assert.deepEqual(shapeSignature(de), shapeSignature(en));

    const requiredSections = [
      "meta",
      "a11y",
      "header",
      "hero",
      "problem",
      "solution",
      "howItWorks",
      "whoWeHelp",
      "trustDeployment",
      "about",
      "contact",
      "footer",
      "legal",
    ];
    for (const section of requiredSections) {
      assert.ok(section in de, `Missing ${section} in de.json`);
      assert.ok(section in en, `Missing ${section} in en.json`);
    }
  });

  it("contains zero historical Revia terms or internal developer placeholder strings", () => {
    const filesToScan = [
      "src/i18n/locales/de.json",
      "src/i18n/locales/en.json",
      "src/config/site.ts",
      "src/config/assets.ts",
    ];
    const forbiddenTerms = [
      "revia",
      "src/config/assets.ts",
      "Screenshot-Platzhalter",
      "konzept.viaco.internal",
      "concept.viaco.internal",
    ];

    for (const relPath of filesToScan) {
      const content = fs.readFileSync(path.join(ROOT, relPath), "utf8");
      for (const term of forbiddenTerms) {
        assert.equal(
          content.toLowerCase().includes(term.toLowerCase()),
          false,
          `Found forbidden term "${term}" in ${relPath}`
        );
      }
    }
  });

  it("configures office@viaco.at as the public contact email", () => {
    assert.equal(SITE_CONFIG.legal.contactEmail, "office@viaco.at");
  });

  it("uses the approved hero headlines and avoids em/en dashes and decorative badges across source files", () => {
    const de = readJson("src/i18n/locales/de.json") as {
      hero: { headline: string };
    };
    const en = readJson("src/i18n/locales/en.json") as {
      hero: { headline: string };
    };
    assert.equal(de.hero.headline, "Wissen, das bleibt. Menschen, die wachsen.");
    assert.equal(en.hero.headline, "Knowledge that stays. People who grow.");

    const walk = (dir: string): string[] => {
      const results: string[] = [];
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...walk(full));
        } else if (/\.(ts|tsx|json)$/.test(entry.name)) {
          results.push(full);
        }
      }
      return results;
    };

    for (const file of walk(path.join(ROOT, "src"))) {
      const content = fs.readFileSync(file, "utf8");
      const rel = path.relative(ROOT, file);
      assert.equal(
        content.includes("\u2014") || content.includes("\u2013"),
        false,
        `Found stylistic em or en dash in ${rel}`
      );
      if (rel.startsWith("src/components/sections/")) {
        assert.equal(
          content.includes("Badge"),
          false,
          `Found decorative Badge reference in ${rel}`
        );
      }
    }
  });
});

describe("VIACO Asset Integrity & Non-Duplication", () => {
  it("verifies all three product concept screenshots exist with exact case-sensitive filenames", () => {
    const assets = Object.values(PRODUCT_CONCEPT_ASSETS);
    assert.equal(assets.length, 3);

    for (const asset of assets) {
      const rel = asset.src.replace(/^\//, "");
      const dir = path.dirname(path.join(ROOT, "public", rel));
      const base = path.basename(rel);
      const actualEntries = fs.readdirSync(dir);
      assert.ok(
        actualEntries.includes(base),
        `Exact case-sensitive asset "${base}" not found in ${dir}`
      );
      assert.ok(asset.width > 1000);
      assert.ok(asset.height > 500);
      assert.ok(asset.caption.de.toLowerCase().includes("konzeptansicht"));
      assert.ok(asset.caption.en.toLowerCase().includes("concept view"));
    }
  });

  it("wires heroJourney, moduleCapture, and moduleManagement in their respective sections", () => {
    const heroCode = fs.readFileSync(
      path.join(ROOT, "src/components/sections/HeroSection.tsx"),
      "utf8"
    );
    const modulesCode = fs.readFileSync(
      path.join(ROOT, "src/components/sections/SolutionModulesSection.tsx"),
      "utf8"
    );

    assert.ok(heroCode.includes("PRODUCT_CONCEPT_ASSETS.heroJourney"));
    assert.ok(modulesCode.includes("PRODUCT_CONCEPT_ASSETS.heroJourney"));
    assert.ok(modulesCode.includes("PRODUCT_CONCEPT_ASSETS.moduleCapture"));
    assert.ok(modulesCode.includes("PRODUCT_CONCEPT_ASSETS.moduleManagement"));
  });
});

describe("Demo Request Validation, Guards & PII Redaction", () => {
  it("accepts minimal required fields when optional challenge and companySize are omitted", () => {
    const result = validateAndSanitizeDemoRequest({
      name: "Anna Musterfrau",
      email: "Anna.Musterfrau@Beispiel.at ",
      company: "Beispiel Industrie GmbH",
      privacyAccepted: true,
      locale: "de",
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.data.name, "Anna Musterfrau");
      assert.equal(result.data.email, "anna.musterfrau@beispiel.at");
      assert.equal(result.data.company, "Beispiel Industrie GmbH");
      assert.equal(result.data.challenge, undefined);
      assert.equal(result.data.companySize, undefined);
      assert.equal(result.data.locale, "de");
    }
  });

  it("rejects invalid emails, missing consent, invalid optional enums, and honeypot spam", () => {
    const invalid = validateAndSanitizeDemoRequest({
      name: "A",
      email: "not-an-email",
      company: "",
      companySize: "invalid-tier",
      challenge: "unknown-challenge",
      privacyAccepted: false,
    });
    assert.equal(invalid.ok, false);
    if (!invalid.ok) {
      assert.equal(invalid.status, "validation_error");
      assert.ok(invalid.fieldErrors?.name);
      assert.ok(invalid.fieldErrors?.email);
      assert.ok(invalid.fieldErrors?.company);
      assert.ok(invalid.fieldErrors?.companySize);
      assert.ok(invalid.fieldErrors?.challenge);
      assert.ok(invalid.fieldErrors?.privacyAccepted);
    }

    const spam = validateAndSanitizeDemoRequest({
      name: "Bot User",
      email: "bot@example.com",
      company: "Spam Corp",
      privacyAccepted: true,
      website: "https://spam.example",
    });
    assert.equal(spam.ok, false);
    if (!spam.ok) {
      assert.equal(spam.status, "spam_rejected");
    }
  });

  it("enforces per-client rate limiting and short-window duplicate protection", () => {
    resetDemoRequestGuards();
    const baseTime = 1_700_000_000_000;

    for (let i = 0; i < 5; i += 1) {
      const check = checkRateLimit("client-hash-1", baseTime + i * 1000);
      assert.equal(check.allowed, true);
    }

    const blocked = checkRateLimit("client-hash-1", baseTime + 6000);
    assert.equal(blocked.allowed, false);
    assert.ok((blocked.retryAfterSeconds ?? 0) > 0);

    const fp = createSubmissionFingerprint({
      email: "max@example.at",
      company: "Example GmbH",
      challenge: "onboarding",
      message: "Hello",
    });
    assert.equal(checkAndRecordDuplicate(fp, baseTime), false);
    assert.equal(checkAndRecordDuplicate(fp, baseTime + 30_000), true);
    assert.equal(checkAndRecordDuplicate(fp, baseTime + 150_000), false);
  });

  it("redacts all PII from structured logs and analytics payloads", () => {
    const logRecord = formatRedactedLogEntry({
      requestId: "req-123",
      httpStatus: 200,
      durationMs: 14.8,
      causeCategory: "submitted",
      locale: "de",
      hasChallenge: true,
      hasCompanySize: false,
      hasMessage: true,
    });
    const logJson = JSON.stringify(logRecord);
    assert.equal(logJson.includes("email"), false);
    assert.equal(logJson.includes("company"), false);
    assert.equal(logJson.includes("message"), false);
    assert.equal(logRecord.durationMs, 15);

    const dirtyProps = {
      locale: "de",
      section: "kontakt",
      deliveryStatus: "submitted",
      hasChallenge: true,
      name: "Sensitive Name",
      email: "secret@example.at",
      company: "Secret GmbH",
      message: "Confidential inquiry",
    } as Record<string, unknown>;

    const sanitized = sanitizeAnalyticsPayload(dirtyProps);
    assert.deepEqual(sanitized, {
      locale: "de",
      section: "kontakt",
      deliveryStatus: "submitted",
      hasChallenge: true,
    });
    assert.equal("name" in sanitized, false);
    assert.equal("email" in sanitized, false);
    assert.equal("company" in sanitized, false);
    assert.equal("message" in sanitized, false);
  });
});
