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
import { CITIES, DEFAULT_CITY_ID, getCity } from "../config";
import type { City } from "../types";

const STORAGE_KEY = "delishas.city";

interface CityContextValue {
  cityId: string;
  city: City;
  cities: City[];
  setCityId: (id: string) => void;
}

const CityContext = createContext<CityContextValue | null>(null);

export function CityProvider({ children }: { children: ReactNode }) {
  const [cityId, setCityIdState] = useState<string>(DEFAULT_CITY_ID);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CITIES.some((c) => c.id === saved)) setCityIdState(saved);
  }, []);

  const setCityId = useCallback((id: string) => {
    setCityIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<CityContextValue>(
    () => ({ cityId, city: getCity(cityId), cities: CITIES, setCityId }),
    [cityId, setCityId]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity must be used within <CityProvider>");
  return ctx;
}
