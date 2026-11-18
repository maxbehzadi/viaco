"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import type { ProductConceptAsset } from "@/config/assets";
import type { Locale } from "@/i18n/config";

interface ConceptImageFrameProps {
  asset: ProductConceptAsset;
  locale: Locale;
  expandLabel: string;
  closeLabel: string;
  dialogTitle: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Displays a VIACO product concept screenshot inside a clean, uniform frame
 * keeping full UI legibility without cropping and providing a modal lightbox.
 */
export function ConceptImageFrame({
  asset,
  locale,
  expandLabel,
  closeLabel,
  dialogTitle,
  priority = false,
  sizes = "(max-width: 1023px) 100vw, 58vw",
}: ConceptImageFrameProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-xl border border-[#DFDBD2] bg-white shadow-md shadow-[#20342F]/6">
        <Image
          src={asset.src}
          alt={asset.alt[locale]}
          width={asset.width}
          height={asset.height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full object-contain"
        />
      </div>

      <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A5A54]">
        <p className="leading-relaxed">
          <span className="font-medium text-[#182622]">
            {asset.caption[locale]}
          </span>
          <span aria-hidden="true"> · </span>
          <span>{asset.sampleNotice[locale]}</span>
        </p>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg border border-[#DFDBD2] bg-white px-2.5 py-1 text-xs font-medium text-[#20342F] transition-colors hover:border-[#2D5A27] hover:text-[#2D5A27]"
        >
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{expandLabel}</span>
        </button>
      </figcaption>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          handleClose();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            handleClose();
          }
        }}
        className="m-auto max-h-[92vh] w-[min(96vw,1200px)] max-w-none rounded-xl border border-[#DFDBD2] bg-[#FDFBF7] p-0 text-[#182622] shadow-2xl backdrop:bg-[#172723]/80 backdrop:backdrop-blur-xs"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#DFDBD2] bg-[#F5F3EE] px-4 py-3 sm:px-6">
          <div>
            <p
              id={titleId}
              className="text-sm font-semibold text-[#182622] sm:text-base"
            >
              {asset.caption[locale]}
            </p>
            <p className="text-xs text-[#4A5A54]">{asset.sampleNotice[locale]}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={`${closeLabel} (${dialogTitle})`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#DFDBD2] bg-white text-[#182622] transition-colors hover:border-[#2D5A27] hover:text-[#2D5A27]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-4.75rem)] overflow-auto bg-white p-3 sm:p-5">
          {open && (
            <Image
              src={asset.src}
              alt={asset.alt[locale]}
              width={asset.width}
              height={asset.height}
              sizes="96vw"
              className="mx-auto h-auto w-full rounded-lg border border-[#DFDBD2] object-contain"
            />
          )}
        </div>
      </dialog>
    </figure>
  );
}
