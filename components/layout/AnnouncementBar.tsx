"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { IconSparkle } from "@/components/ui/Icons";

export function AnnouncementBar() {
  const { t } = useI18n();
  const messages = t.announcement;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4200);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="bg-espresso text-cream/85">
      <div className="container-lux flex h-9 items-center justify-center gap-2 overflow-hidden text-center text-[0.72rem] font-medium tracking-wide sm:text-xs">
        <IconSparkle className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
        <span key={index} className="animate-[fadeInScale_0.5s_ease] truncate">
          {messages[index]}
        </span>
      </div>
    </div>
  );
}
