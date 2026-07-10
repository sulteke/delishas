import type { CartLine, CheckoutDetails } from "./types";
import { PAYMENTS_ENABLED } from "./config";
import { cartSubtotal } from "./whatsapp";

/**
 * ─────────────────────────────────────────────────────────────
 *  ONLINE PAYMENT — architecture-ready, currently DISABLED.
 * ─────────────────────────────────────────────────────────────
 *  The checkout flow completes via WhatsApp today. This module
 *  defines a provider-agnostic contract so Kaspi (or any card
 *  gateway) can be plugged in without touching the UI:
 *
 *    1. Implement `PaymentProvider.createCheckout` for the gateway.
 *    2. Register it in `PROVIDERS` and set `PAYMENTS_ENABLED = true`.
 *    3. The checkout page will surface the "Pay online" button and
 *       redirect the customer to `result.redirectUrl`.
 */

export interface PaymentInput {
  lines: CartLine[];
  details: CheckoutDetails;
  amount: number; // in tenge
  currency: "KZT";
  orderId: string;
}

export interface PaymentResult {
  ok: boolean;
  redirectUrl?: string;
  providerRef?: string;
  error?: string;
}

export interface PaymentProvider {
  id: string;
  label: string;
  createCheckout(input: PaymentInput): Promise<PaymentResult>;
}

/** Placeholder Kaspi provider — wire real API + webhook later. */
export const kaspiProvider: PaymentProvider = {
  id: "kaspi",
  label: "Kaspi",
  async createCheckout() {
    // TODO: call Kaspi API, create an invoice and return its pay URL.
    return { ok: false, error: "PAYMENTS_DISABLED" };
  },
};

export const PROVIDERS: Record<string, PaymentProvider> = {
  kaspi: kaspiProvider,
};

export function buildOrderId(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DLS-${stamp}-${rand}`;
}

export async function initPayment(
  lines: CartLine[],
  details: CheckoutDetails,
  providerId = "kaspi"
): Promise<PaymentResult> {
  if (!PAYMENTS_ENABLED) return { ok: false, error: "PAYMENTS_DISABLED" };
  const provider = PROVIDERS[providerId];
  if (!provider) return { ok: false, error: "UNKNOWN_PROVIDER" };
  return provider.createCheckout({
    lines,
    details,
    amount: cartSubtotal(lines),
    currency: "KZT",
    orderId: buildOrderId(),
  });
}
