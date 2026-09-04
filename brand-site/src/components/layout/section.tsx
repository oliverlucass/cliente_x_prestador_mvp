import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted" | "contrast";

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-muted/40",
  contrast: "gradient-hero text-white",
};

export function Section({
  id,
  title,
  description,
  children,
  variant = "default",
  className,
  containerClassName,
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("py-16 md:py-24", variantStyles[variant], className)}
    >
      <div className={cn("container px-4", containerClassName)}>
        {(title || description) && (
          <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            {title && (
              <h2
                id={headingId}
                className={cn(
                  "text-balance text-h2",
                  variant === "contrast" ? "text-white" : "text-foreground"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-3 text-balance text-body",
                  variant === "contrast"
                    ? "text-white/80"
                    : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
