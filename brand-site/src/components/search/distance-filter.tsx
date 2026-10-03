"use client";

import { cn } from "@/lib/utils";

type DistanceFilterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function DistanceFilter({
  value,
  onChange,
  min = 5,
  max = 100,
  className,
}: DistanceFilterProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <label htmlFor="distance-filter" className="w-[6.25rem] shrink-0 text-sm font-medium tabular-nums text-foreground">
        Até {value} km
      </label>
      <input
        id="distance-filter"
        type="range"
        min={min}
        max={max}
        step={5}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`Até ${value} quilômetros`}
        className="distance-slider h-1 w-full max-w-[280px] cursor-pointer appearance-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{
          background: `linear-gradient(to right, #103f35 ${progress}%, hsl(var(--border)) ${progress}%)`,
        }}
      />
    </div>
  );
}
