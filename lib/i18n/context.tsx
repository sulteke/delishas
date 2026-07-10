"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dict, type Dict } from "./dictionaries";
import type { Locale, Localized } from "../types";

const STORAGE_KEY = "delishas.locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** current-locale dictionary */
  t: Dict;
  /** resolve a Localized<T> value for the active locale */
  tr: <T>(v: Localized<T>) => T;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function htmlLang(l: Locale) {
  return l === "kz" ? "kk" : "ru";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default is Kazakh on both server + first client render (no hydration drift)
  const [locale, setLocaleState] = useState<Locale>("kz");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "kz" || saved === "ru") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      toggle: () => setLocale(locale === "kz" ? "ru" : "kz"),
      t: dict[locale],
      tr: <T,>(v: Localized<T>) => v[locale],
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
