"use client";

import { useEffect, useState } from "react";
import { useCity } from "@/lib/city/context";
import { useI18n } from "@/lib/i18n/context";
import { buildEnquiryUrl } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/ui/Icons";

export function FloatingWhatsApp() {
  const { city } = useCity();
  const { t, locale } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const greeting =
    locale === "kz"
      ? "Сәлеметсіз бе! DELISHAS туралы сұрағым бар 🍓"
      : "Здравствуйте! У меня вопрос по DELISHAS 🍓";

  return (
    <a
      href={buildEnquiryUrl(city.whatsapp, greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp · ${city.name[locale]}`}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-105 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
      <IconWhatsApp className="relative h-7 w-7" />
      <span className="sr-only">{t.contact.whatsapp}</span>
    </a>
  );
}
