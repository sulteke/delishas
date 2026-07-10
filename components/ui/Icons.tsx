import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const IconWhatsApp = (props: IconProps) => (
  <svg {...base({ strokeWidth: 0, fill: "currentColor", ...props })}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.47-3.64 8.11-8.11 8.11a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-3-.19-.31a8.03 8.03 0 0 1-1.26-4.31c0-4.47 3.64-8.11 8.11-8.11Zm-2.37 4.34c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.76-1.8-.18-.4-.37-.4-.54-.41h-.46Z" />
  </svg>
);

export const IconInstagram = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPhone = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 4.5C4 3.7 4.7 3 5.5 3h2c.6 0 1.1.4 1.3 1l1 3.2c.1.5 0 1-.4 1.3L8.5 10c1 2 2.5 3.5 4.5 4.5l1.5-1.9c.3-.4.8-.5 1.3-.4l3.2 1c.6.2 1 .7 1 1.3v2c0 .8-.7 1.5-1.5 1.5C10.3 19 5 13.7 5 6" />
  </svg>
);

export const IconClock = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconPin = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconBag = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const IconPlus = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconTrash = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m2 0-.7 12.1a1.5 1.5 0 0 1-1.5 1.4H9.2a1.5 1.5 0 0 1-1.5-1.4L7 7" />
  </svg>
);

export const IconCheck = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const IconChevronDown = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconChevronRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const IconArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowUpRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const IconClose = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconMenu = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconStar = (props: IconProps) => (
  <svg {...base({ fill: "currentColor", strokeWidth: 0, ...props })}>
    <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 16.9 6.1 20l1.3-6.3L2.7 9.4l6.3-.7L12 2.5Z" />
  </svg>
);

export const IconSparkle = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3c.5 3.6 1.9 5 5.5 5.5C13.9 9 12.5 10.4 12 14c-.5-3.6-1.9-5-5.5-5.5C10.1 8 11.5 6.6 12 3Z" />
    <path d="M18.5 13.5c.3 1.7.9 2.3 2.5 2.6-1.6.3-2.2.9-2.5 2.6-.3-1.7-.9-2.3-2.5-2.6 1.6-.3 2.2-.9 2.5-2.6Z" />
  </svg>
);

export const IconHeart = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 20s-7-4.5-9.2-9C1.4 8 3 5 6 5c2 0 3.2 1.2 4 2.5C10.8 6.2 12 5 14 5c3 0 4.6 3 3.2 6-2.2 4.5-9.2 9-9.2 9Z" />
  </svg>
);

export const IconGift = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 11h16v9H4z" />
    <path d="M4 7h16v4H4zM12 7v13" />
    <path d="M12 7S10.5 3.5 8.5 4 8 7 12 7Zm0 0s1.5-3.5 3.5-3 .5 3-3.5 3Z" />
  </svg>
);

export const IconTruck = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 6h10v9H3zM13 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

export const IconLeaf = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20 4C9 4 4 9 4 18c7-1 12-4 14-9" />
    <path d="M4 20c2-6 6-9 12-11" />
  </svg>
);

export const IconHand = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15c0 3-2 5-5 5h-1.5a4 4 0 0 1-3-1.4L5 15.5c-.8-.9.4-2.3 1.4-1.6L8 15" />
  </svg>
);

export const IconGlobe = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
);

export const IconChat = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);
