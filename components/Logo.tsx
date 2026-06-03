import Image from "next/image";

type LogoProps = {
  /** Size of the mark in px (square). Default 32. */
  size?: number;
  /** Show the "Promptora" wordmark next to the mark. */
  wordmark?: boolean;
  /** Tailwind classes applied to the outer wrapper. */
  className?: string;
  /** Override wordmark size/weight via Tailwind utility classes. */
  wordmarkClassName?: string;
};

/**
 * Promptora brand mark — uses the user's signature white silhouette
 * (silhouette-only PNG with transparent background at public/logo.png).
 * On the site's dark theme it reads cleanly as a white mark.
 */
export function Mark({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Promptora"
      width={size}
      height={size}
      priority
      unoptimized
      className="object-contain"
      style={{ width: size, height: size }}
    />
  );
}

export default function Logo({
  size = 32,
  wordmark = true,
  className = "",
  wordmarkClassName = "text-[--text] font-medium tracking-tight",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} />
      {wordmark && <span className={wordmarkClassName}>Promptora</span>}
    </span>
  );
}
