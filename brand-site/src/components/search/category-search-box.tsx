"use client";

import { Search } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/utils";

interface CategorySearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CategorySearchBox({
  value,
  onChange,
  placeholder = "Search for a service category…",
  className,
}: CategorySearchBoxProps) {
  const inputId = useId();

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search categories
      </label>
      <Search
        className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={inputId}
        type="search"
        role="searchbox"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-14 w-full rounded-2xl border border-input bg-card pl-14 pr-5 text-base shadow-premium",
          "placeholder:text-muted-foreground",
          "transition-all duration-200",
          "hover:border-accent/40 hover:shadow-premium-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  );
}
