"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { SITE } from "@/lib/config";
import { Logo } from "@/components/ui/Brand";
import { LangSwitcher } from "./LangSwitcher";
import { CityPicker } from "./CityPicker";
import {
  IconMenu,
  IconClose,
  IconWhatsApp,
  IconInstagram,
  IconChevronRight,
} from "@/components/ui/Icons";

interface NavLink {
  href: string;
  label: string;
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.common.menu}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-gold/12"
      >
        <IconMenu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-espresso/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[86%] max-w-sm flex-col overflow-y-auto overscroll-contain bg-cream shadow-2xl transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t.common.menu}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-line bg-cream px-5 py-4">
          <Logo wordClass="text-lg" withTagline={false} href="/" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.common.close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cocoa hover:bg-gold/12"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-5 py-4" aria-label="Мобильді мәзір">
          <ul className="flex flex-col">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-sand-line/60 py-4 heading-serif text-2xl text-cocoa"
              >
                {t.nav.home}
                <IconChevronRight className="h-5 w-5 text-gold" />
              </Link>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-sand-line/60 py-4 heading-serif text-2xl text-cocoa"
                >
                  {l.label}
                  <IconChevronRight className="h-5 w-5 text-gold" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <LangSwitcher />
            <CityPicker variant="light" />
          </div>
        </nav>

        <div className="mt-auto border-t border-sand-line p-5">
          <a
            href={`https://wa.me/${SITE.primaryWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold w-full"
          >
            <IconWhatsApp className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-3 w-full"
          >
            <IconInstagram className="h-5 w-5" />
            {SITE.instagramHandle}
          </a>
        </div>
      </div>
    </>
  );
}
