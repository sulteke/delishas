"use client";

import { useEffect, useRef, useState } from "react";
import { useCity } from "@/lib/city/context";
import { useI18n } from "@/lib/i18n/context";
import { IconPin, IconChevronDown, IconCheck } from "@/components/ui/Icons";

export function CityPicker({ variant = "light" }: { variant?: "light" | "bare" }) {
  const { city, cities, setCityId, cityId } = useCity();
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.contact.chooseCity}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
          variant === "light"
            ? "border border-sand-line bg-linen/60 text-cocoa hover:border-gold"
            : "text-cocoa hover:text-gold-deep"
        }`}
      >
        <IconPin className="h-4 w-4 text-gold-deep" />
        <span>{city.name[locale]}</span>
        <IconChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-sand-line bg-linen shadow-xl shadow-cocoa/10"
        >
          {cities.map((c) => (
            <li key={c.id} role="option" aria-selected={c.id === cityId}>
              <button
                type="button"
                onClick={() => {
                  setCityId(c.id);
                  setOpen(false);
                }}
                className="flex w-full items-start gap-2 px-4 py-3 text-left transition-colors hover:bg-cream"
              >
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-cocoa">
                    {c.name[locale]}
                  </span>
                  <span className="block text-xs text-ink-soft">
                    {c.address[locale]}
                  </span>
                </span>
                {c.id === cityId && (
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
