"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { SITE, CITIES } from "@/lib/config";
import { Logo } from "@/components/ui/Brand";
import {
  IconWhatsApp,
  IconInstagram,
  IconPhone,
  IconPin,
  IconClock,
} from "@/components/ui/Icons";

export function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  const menu = [
    { href: "/catalog", label: t.nav.catalog },
    { href: "/collections", label: t.nav.collections },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
    { href: "/cart", label: t.nav.cart },
  ];

  return (
    <footer className="relative mt-24 bg-espresso text-cream/80">
      <div className="pointer-events-none absolute inset-0 noise-grain opacity-40" />
      <div className="container-lux relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.6fr]">
          {/* Brand */}
          <div>
            <div className="text-cream-50">
              <Logo withEmblem wordClass="text-2xl" className="items-start" href="/" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
              {t.footer.about}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://wa.me/${SITE.primaryWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold-soft"
              >
                <IconWhatsApp className="h-5 w-5" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold-soft"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
              <a
                href={`tel:${SITE.primaryWhatsapp}`}
                aria-label={t.contact.call}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold-soft"
              >
                <IconPhone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <nav aria-label={t.footer.menu}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {t.footer.menu}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {menu.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="text-cream/70 transition-colors hover:text-gold-soft"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts / cities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {t.footer.contactsTitle}
            </h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {CITIES.map((c) => (
                <div key={c.id}>
                  <p className="heading-serif text-lg text-cream-50">
                    {c.name[locale]}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-cream/65">
                    <li className="flex items-start gap-2">
                      <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                      <span>{c.address[locale]}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                      <a
                        href={`https://wa.me/${c.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-gold-soft"
                      >
                        {c.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                      <span>{c.hours[locale]}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {SITE.name}. {t.footer.rights}.
          </p>
          <p className="flex items-center gap-2">
            <span className="logo-word tracking-[0.2em] text-gold-soft">DELISHAS</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.madeNote}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
