"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Emblem } from "@/components/ui/Brand";
import { IconArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container-lux flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Emblem className="h-12 w-16 text-gold" />
      <p className="heading-serif mt-6 text-7xl text-cocoa">404</p>
      <h1 className="heading-serif mt-2 text-2xl text-cocoa">{t.notFound.title}</h1>
      <p className="mt-2 max-w-sm text-ink-soft">{t.notFound.text}</p>
      <Link href="/" className="btn btn-primary mt-8 text-base">
        {t.notFound.home}
        <IconArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
