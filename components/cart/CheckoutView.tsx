"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { useCity } from "@/lib/city/context";
import { PAYMENTS_ENABLED } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import type { CheckoutDetails } from "@/lib/types";
import { CartLineRow } from "./CartLineRow";
import {
  IconBag,
  IconWhatsApp,
  IconPin,
  IconCheck,
  IconChevronRight,
} from "@/components/ui/Icons";

const fieldClass =
  "w-full rounded-xl border border-sand-line bg-linen px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-taupe/70 focus:border-gold focus:ring-2 focus:ring-gold/20";

export function CheckoutView() {
  const { t, locale } = useI18n();
  const { lines, subtotal, count, clear, hydrated } = useCart();
  const { cityId, setCityId, cities } = useCity();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!date) e.date = t.checkout.required;
    if (!time) e.time = t.checkout.required;
    if (!address.trim()) e.address = t.checkout.required;
    if (!name.trim()) e.name = t.checkout.required;
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) e.phone = t.checkout.required;
    else if (digits.length < 10) e.phone = t.checkout.invalidPhone;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const details: CheckoutDetails = {
      cityId,
      date,
      time,
      address: address.trim(),
      recipientName: name.trim(),
      phone: phone.trim(),
      comment: comment.trim(),
    };
    const url = buildWhatsappUrl(lines, details, locale);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (hydrated && count === 0) {
    return (
      <div className="container-lux flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-champagne text-gold-deep">
          <IconBag className="h-9 w-9" />
        </span>
        <div>
          <h1 className="heading-serif text-3xl text-cocoa">{t.cart.empty}</h1>
          <p className="mt-2 text-ink-soft">{t.cart.emptyHint}</p>
        </div>
        <Link href="/catalog" className="btn btn-primary text-base">
          {t.cart.goCatalog}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-lux py-8 sm:py-12">
      {/* header + steps */}
      <div className="mb-8">
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-taupe" aria-label="breadcrumb">
          <Link href="/catalog" className="hover:text-gold-deep">
            {t.nav.catalog}
          </Link>
          <IconChevronRight className="h-3.5 w-3.5" />
          <span className="text-cocoa">{t.checkout.title}</span>
        </nav>
        <h1 className="heading-serif text-3xl text-cocoa sm:text-4xl">
          {t.checkout.title}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">{t.checkout.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
        {/* LEFT: items + delivery */}
        <div className="space-y-8">
          {/* items */}
          <section className="rounded-2xl border border-sand-line bg-cream-50/50 p-5 sm:p-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="heading-serif text-xl text-cocoa">
                {t.checkout.step1}
                <span className="ml-2 text-sm font-normal text-taupe">
                  {count} {count === 1 ? t.cart.item : t.cart.items}
                </span>
              </h2>
              <button
                type="button"
                onClick={clear}
                className="text-xs font-medium text-taupe underline-offset-2 hover:text-berry hover:underline"
              >
                {t.cart.clear}
              </button>
            </div>
            <div className="divide-y divide-sand-line/70">
              {lines.map((line) => (
                <CartLineRow key={line.key} line={line} />
              ))}
            </div>
          </section>

          {/* city */}
          <section className="rounded-2xl border border-sand-line bg-cream-50/50 p-5 sm:p-6">
            <h2 className="heading-serif text-xl text-cocoa">{t.checkout.cityLabel}</h2>
            <p className="mt-1 text-xs text-taupe">{t.checkout.cityHint}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cities.map((c) => {
                const active = c.id === cityId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCityId(c.id)}
                    aria-pressed={active}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-gold bg-gold/8 ring-1 ring-gold/30"
                        : "border-sand-line bg-linen hover:border-gold/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        active ? "bg-gold text-white" : "bg-champagne text-gold-deep"
                      }`}
                    >
                      <IconPin className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-cocoa">
                        {c.name[locale]}
                      </span>
                      <span className="block text-xs text-ink-soft">
                        {c.address[locale]}
                      </span>
                    </span>
                    {active && <IconCheck className="h-5 w-5 shrink-0 text-gold" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* delivery form */}
          <section className="rounded-2xl border border-sand-line bg-cream-50/50 p-5 sm:p-6">
            <h2 className="heading-serif text-xl text-cocoa">{t.checkout.step2}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div data-error={!!errors.date}>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  {t.checkout.dateLabel}
                </label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={fieldClass}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <p className="mt-1 text-xs text-berry">{errors.date}</p>}
              </div>
              <div data-error={!!errors.time}>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  {t.checkout.timeLabel}
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={fieldClass}
                  aria-invalid={!!errors.time}
                />
                {errors.time && <p className="mt-1 text-xs text-berry">{errors.time}</p>}
              </div>
              <div className="sm:col-span-2" data-error={!!errors.address}>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  {t.checkout.addressLabel}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.checkout.addressPh}
                  className={fieldClass}
                  aria-invalid={!!errors.address}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-berry">{errors.address}</p>
                )}
              </div>
              <div data-error={!!errors.name}>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  {t.checkout.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.checkout.namePh}
                  autoComplete="name"
                  className={fieldClass}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-berry">{errors.name}</p>}
              </div>
              <div data-error={!!errors.phone}>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  {t.checkout.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.checkout.phonePh}
                  autoComplete="tel"
                  inputMode="tel"
                  className={fieldClass}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1 text-xs text-berry">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  {t.checkout.commentLabel}{" "}
                  <span className="text-xs font-normal text-taupe">
                    ({t.checkout.optional})
                  </span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.checkout.commentPh}
                  rows={3}
                  className={`${fieldClass} resize-none`}
                />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-sand-line bg-linen p-5 sm:p-6">
            <h2 className="heading-serif text-xl text-cocoa">{t.checkout.summary}</h2>

            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-ink">
                    {line.name[locale]}
                    <span className="block text-xs text-taupe">
                      {line.variantLabel[locale]} × {line.qty}
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold text-cocoa">
                    {formatPrice(line.price * line.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-sand-line pt-4 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>{t.cart.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>{t.cart.delivery}</span>
                <span className="text-xs">{t.cart.deliveryCalc}</span>
              </div>
              <div className="flex items-center justify-between border-t border-sand-line pt-3">
                <span className="font-semibold text-cocoa">{t.cart.total}</span>
                <span className="heading-serif text-2xl font-semibold text-cocoa">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-gold mt-5 w-full text-base">
              <IconWhatsApp className="h-5 w-5" />
              {t.checkout.orderWhatsapp}
            </button>

            {PAYMENTS_ENABLED ? (
              <button type="button" className="btn btn-outline mt-2 w-full text-base">
                {t.checkout.payOnline}
              </button>
            ) : (
              <p className="mt-3 text-center text-xs text-taupe">
                {t.checkout.paySoon}
              </p>
            )}

            <p className="mt-3 flex items-start gap-1.5 text-center text-[0.7rem] leading-relaxed text-taupe">
              <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
              <span>{t.checkout.successNote}</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
