"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "../types";

const STORAGE_KEY = "delishas.cart.v1";

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = state.find((l) => l.key === action.line.key);
      if (existing) {
        return state.map((l) =>
          l.key === action.line.key ? { ...l, qty: l.qty + action.line.qty } : l
        );
      }
      return [...state, action.line];
    }
    case "setQty":
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: Math.max(0, action.qty) } : l))
        .filter((l) => l.qty > 0);
    case "remove":
      return state.filter((l) => l.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (product: Product, variantId: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load persisted cart once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: parsed });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback(
    (product: Product, variantId: string, qty = 1) => {
      const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
      const line: CartLine = {
        key: `${product.slug}:${variant.id}`,
        productSlug: product.slug,
        variantId: variant.id,
        name: product.name,
        variantLabel: variant.label,
        price: variant.price,
        image: product.image,
        qty,
      };
      dispatch({ type: "add", line });
    },
    []
  );

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      hydrated,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, hydrated, isOpen, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
