"use client";

import { useI18n } from "@/lib/i18n/context";
import { CITIES, SITE } from "@/lib/config";
import { buildEnquiryUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconWhatsApp,
  IconInstagram,
  IconPhone,
  IconPin,
  IconClock,
} from "@/components/ui/Icons";

export function Contact() {
  const { t, locale } = useI18n();
  const greeting =
    locale === "kz"
      ? "Сәлеметсіз бе! DELISHAS-тан тапсырыс бергім келеді 🍓"
      : "Здравствуйте! Хочу оформить заказ в DELISHAS 🍓";

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-lux">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CITIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-sand-line bg-linen">
                <div className="flex flex-wrap items-center justify-between gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-champagne text-gold-deep">
                      <IconPin className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="heading-serif text-xl text-cocoa">
                        {c.name[locale]}
                      </h3>
                      <p className="text-sm text-ink-soft">{c.address[locale]}</p>
                    </div>
                  </div>
                  <a
                    href={buildEnquiryUrl(c.whatsapp, greeting)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold text-sm"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    {t.contact.write}
                  </a>
                </div>

                <div className="grid gap-3 px-6 pb-6 sm:grid-cols-2">
                  <a
                    href={`tel:${c.whatsapp}`}
                    className="flex items-center gap-2.5 rounded-xl border border-sand-line bg-cream/50 px-4 py-3 text-sm transition-colors hover:border-gold"
                  >
                    <IconPhone className="h-4 w-4 text-gold-deep" />
                    <span className="text-cocoa">{c.phone}</span>
                  </a>
                  <div className="flex items-center gap-2.5 rounded-xl border border-sand-line bg-cream/50 px-4 py-3 text-sm">
                    <IconClock className="h-4 w-4 text-gold-deep" />
                    <span className="text-cocoa">{c.hours[locale]}</span>
                  </div>
                </div>

                <div className="relative mt-auto h-52 w-full border-t border-sand-line">
                  <iframe
                    src={c.mapEmbed}
                    title={`${c.name[locale]} — ${SITE.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full grayscale-[0.15]"
                  />
                  <a
                    href={c.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-cream-50/95 px-3 py-1.5 text-xs font-semibold text-cocoa shadow-md backdrop-blur transition-colors hover:text-gold-deep"
                  >
                    <IconPin className="h-3.5 w-3.5 text-gold-deep" />
                    {locale === "kz" ? "Картадан ашу" : "Открыть на карте"}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* quick contacts */}
        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full text-base sm:w-auto"
          >
            <IconInstagram className="h-5 w-5" />
            {SITE.instagramHandle}
          </a>
          <a
            href={buildEnquiryUrl(SITE.primaryWhatsapp, greeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-base sm:w-auto"
          >
            <IconWhatsApp className="h-5 w-5" />
            {SITE.primaryPhoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
