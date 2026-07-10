/** Deterministic thousands formatting (SSR-safe), e.g. 12990 -> "12 990" */
export function formatMoney(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** e.g. 12990 -> "12 990 ₸" */
export function formatPrice(n: number, currency = "₸"): string {
  return `${formatMoney(n)} ${currency}`;
}
