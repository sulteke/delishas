import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/CheckoutView";

export const metadata: Metadata = {
  title: "Корзина и оформление заказа",
  description:
    "Оформите заказ DELISHAS: выберите город, дату и время доставки. Заказ отправится менеджеру через WhatsApp.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CheckoutView />;
}
