"use client";

import { useI18n } from "@/lib/i18n/context";

export function LangSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-sand-line bg-linen/60 p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Тіл / Язык"
    >
      <button
        type="button"
        onClick={() => setLocale("kz")}
        aria-pressed={locale === "kz"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "kz" ? "bg-cocoa text-cream-50" : "text-ink-soft hover:text-cocoa"
        }`}
      >
        {t.common.langKZ}
      </button>
      <button
        type="button"
        onClick={() => setLocale("ru")}
        aria-pressed={locale === "ru"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "ru" ? "bg-cocoa text-cream-50" : "text-ink-soft hover:text-cocoa"
        }`}
      >
        {t.common.langRU}
      </button>
    </div>
  );
}
