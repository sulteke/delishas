import type { Collection } from "./types";

/**
 * Holiday / occasion collections. Each curates existing products so the
 * catalogue stays the single source of truth for prices.
 */
export const COLLECTIONS: Collection[] = [
  {
    slug: "birthday",
    title: { kz: "Туған күн", ru: "День рождения" },
    subtitle: { kz: "Жарқын тілектер", ru: "Яркие поздравления" },
    description: {
      kz: "Туған күнді есте қаларлық ететін тәтті сый. Мерекелік қорап пен букеттер — қуанышты еселейді.",
      ru: "Сладкий подарок, который сделает день рождения незабываемым. Праздничные коробки и букеты, что умножают радость.",
    },
    image: "/products/box_rect.jpg",
    products: ["box", "box-heart", "royal-box", "basket-of-macarons"],
    accent: "gold",
  },
  {
    slug: "wedding",
    title: { kz: "Үйлену тойы", ru: "Свадьба" },
    subtitle: { kz: "Ақ түстің талғамы", ru: "Изящество в белом" },
    description: {
      kz: "Ерекше күнге ерекше десерт. Ақ шоколадтағы құлпынай мен үлкен жинақтар салтанатты дастарханды әшекейлейді.",
      ru: "Особый десерт для особенного дня. Клубника в белом шоколаде и большие наборы украсят праздничный стол.",
    },
    image: "/products/basket.jpg",
    products: ["box-heart", "grande", "bouquet", "royal-box"],
    accent: "gold",
  },
  {
    slug: "kyz-uzatu",
    title: { kz: "Қыз ұзату", ru: "Қыз ұзату" },
    subtitle: { kz: "Ұлттық салтанат", ru: "Торжество традиций" },
    description: {
      kz: "Қыз ұзату дәстүріне сай сәнді әрі мол жинақтар. Қонақтарды таңғалдыратын премиум ұсыныс.",
      ru: "Изысканные и щедрые наборы в духе традиции «қыз ұзату». Премиальное решение, которое впечатлит гостей.",
    },
    image: "/products/ana.jpg",
    products: ["grande", "royal-box", "ana", "bouquet"],
    accent: "rose",
  },
  {
    slug: "march-8",
    title: { kz: "8 Наурыз", ru: "8 Марта" },
    subtitle: { kz: "Әйелдерге арнау", ru: "Для любимых женщин" },
    description: {
      kz: "Көктемнің әсем мерекесіне гүлден асатын сый — шоколадтағы құлпынай букеті мен нәзік жинақтар.",
      ru: "К весеннему празднику — подарок ярче цветов: букет из клубники в шоколаде и нежные наборы.",
    },
    image: "/products/bouquet.jpg",
    products: ["bouquet", "box", "ana", "basket"],
    accent: "rose",
  },
  {
    slug: "feb-14",
    title: { kz: "14 Ақпан", ru: "14 Февраля" },
    subtitle: { kz: "Ғашықтар күні", ru: "День влюблённых" },
    description: {
      kz: "Махаббатыңызды тәтті түрде жеткізіңіз. Жүрек пішінді қораптар мен романтикалық букеттер.",
      ru: "Признайтесь в любви сладко. Коробки в форме сердца и романтичные букеты.",
    },
    image: "/products/heart_life.jpg",
    products: ["box-heart", "bouquet", "box", "royal-box"],
    accent: "rose",
  },
  {
    slug: "new-year",
    title: { kz: "Жаңа жыл", ru: "Новый год" },
    subtitle: { kz: "Мерекелік сиқыр", ru: "Праздничное волшебство" },
    description: {
      kz: "Жаңа жылдық көңіл-күйді сыйлаңыз. Мол әрі салтанатты жинақтар бүкіл отбасына жетеді.",
      ru: "Подарите новогоднее настроение. Щедрые и торжественные наборы хватит на всю семью.",
    },
    image: "/products/box_duo.jpg",
    products: ["grande", "box", "royal-box", "basket-of-macarons"],
    accent: "cocoa",
  },
  {
    slug: "corporate",
    title: { kz: "Корпоративтік сыйлықтар", ru: "Корпоративные подарки" },
    subtitle: { kz: "Серіктестерге назар", ru: "Внимание к партнёрам" },
    description: {
      kz: "Клиенттер мен әріптестерге брендіңізге лайық премиум сый. Көлемді тапсырысқа жеке шарттар.",
      ru: "Премиальные подарки клиентам и партнёрам под стать вашему бренду. Индивидуальные условия для больших заказов.",
    },
    image: "/products/royal.jpg",
    products: ["box", "grande", "basket-of-macarons", "royal-box"],
    accent: "cocoa",
  },
];

export const COLLECTION_MAP: Record<string, Collection> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c])
);

export function getCollection(slug: string): Collection | undefined {
  return COLLECTION_MAP[slug];
}
