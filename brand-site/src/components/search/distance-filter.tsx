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
    <div className={cn("w-full max-w-[240px]", className)}>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <label htmlFor="distance-filter" className="text-sm font-semibold">
          Distância
        </label>
        <span className="text-xs font-semibold tabular-nums" aria-live="polite">
          Até {value} km
        </span>
      </div>
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
        className="distance-slider h-1.5 w-full cursor-pointer appearance-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{
          background: `linear-gradient(to right, hsl(var(--foreground)) ${progress}%, hsl(var(--muted)) ${progress}%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{min} km</span>
        <span>{max} km</span>
      </div>
    </div>
  );
}
