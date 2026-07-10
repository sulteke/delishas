"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { Logo } from "@/components/ui/Brand";
import { LangSwitcher } from "./LangSwitcher";
import { CityPicker } from "./CityPicker";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/catalog", label: t.nav.catalog },
    { href: "/collections", label: t.nav.collections },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-cream border-b border-sand-line/70 shadow-[0_10px_30px_-24px_rgba(61,42,30,0.5)]"
          : "bg-cream/40 border-b border-transparent"
      }`}
    >
      <div className="container-lux flex h-16 items-center gap-3 md:h-20">
        {/* Mobile menu */}
        <div className="flex flex-1 items-center lg:hidden">
          <MobileMenu links={links} />
        </div>

        {/* Logo */}
        <div className="flex items-center lg:flex-1">
          <Logo wordClass="text-lg md:text-xl" withTagline />
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Негізгі мәзір">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:text-gold-deep ${
                isActive(l.href)
                  ? "text-gold-deep after:w-full"
                  : "text-cocoa after:w-0 hover:after:w-full"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
          <div className="hidden md:block">
            <CityPicker />
          </div>
          <LangSwitcher className="hidden sm:inline-flex" />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
