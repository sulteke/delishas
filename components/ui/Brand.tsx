import Link from "next/link";

/** Decorative oval crest evoking the DELISHAS emblem (uses currentColor). */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 56"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="44" cy="28" rx="30" ry="18" strokeWidth="1.1" />
      <ellipse cx="44" cy="28" rx="26" ry="14.5" strokeWidth="0.6" opacity="0.6" />
      {/* strawberry motif */}
      <path
        d="M44 23c3.2 0 5.6 2.1 5.6 4.9 0 3.1-3.4 6.1-5.6 7.6-2.2-1.5-5.6-4.5-5.6-7.6 0-2.8 2.4-4.9 5.6-4.9Z"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M44 20.5v2.6M41.6 21.4l1.2 1.9M46.4 21.4l-1.2 1.9" strokeWidth="1" />
      <circle cx="42" cy="28" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="46" cy="28" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="44" cy="30.5" r="0.5" fill="currentColor" stroke="none" />
      {/* flanking ticks */}
      <path d="M12 28h4M72 28h4" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** show the small "PREMIUM DESSERTS" line */
  withTagline?: boolean;
  /** show the crest above the wordmark */
  withEmblem?: boolean;
  href?: string | null;
  wordClass?: string;
}

export function Logo({
  className = "",
  withTagline = true,
  withEmblem = false,
  href = "/",
  wordClass = "text-xl",
}: LogoProps) {
  const inner = (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      {withEmblem && <Emblem className="mb-1.5 h-7 w-auto text-gold" />}
      <span className={`logo-word ${wordClass}`}>DELISHAS</span>
      {withTagline && (
        <span
          className="mt-1 text-[0.55rem] font-medium tracking-[0.42em] text-gold-deep"
          style={{ paddingLeft: "0.42em" }}
        >
          PREMIUM DESSERTS
        </span>
      )}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="DELISHAS — на главную" className="inline-flex">
      {inner}
    </Link>
  );
}
