import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

type BrandMarkProps = {
  className?: string;
  accentClassName?: string;
};

export function BrandMark({ className, accentClassName }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={cn("h-11 w-11", className)} aria-hidden="true">
      <circle
        cx="22"
        cy="25"
        r="10.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="6.25"
      />
      <path
        d="m16.7 10.7 5.3-4.25 5.3 4.25"
        className={cn("text-[#8caf24]", accentClassName)}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.8"
      />
    </svg>
  );
}

export function BrandLogo({ className, markClassName, wordmarkClassName }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Fechô">
      <BrandMark className={cn("shrink-0", markClassName)} />
      <span className={cn("brand-wordmark flex items-baseline text-[25px] text-foreground", wordmarkClassName)} aria-hidden="true">
        fech<span className="brand-terminal-o">ô</span>
      </span>
    </span>
  );
}
