"use client";

import { cn } from "@/lib/utils";

interface SearchSuggestionPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SearchSuggestionPill({
  label,
  isActive = false,
  onClick,
  className,
}: SearchSuggestionPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "border-accent bg-accent/10 text-accent shadow-sm"
          : "border-border bg-card text-foreground hover:border-accent/40 hover:bg-accent/5 hover:text-accent active:scale-[0.98]",
        className
      )}
    >
      {label}
    </button>
  );
}
