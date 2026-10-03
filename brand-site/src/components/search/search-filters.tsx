"use client";

import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  Clock,
  MapPin,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { DistanceFilter } from "@/components/search/distance-filter";
import { cn } from "@/lib/utils";

export type DateFilter = "any" | "today" | "weekend";
export type SortMode = "distance" | "price-asc" | "price-desc" | "rating";

type SearchFiltersProps = {
  radius: number;
  onRadiusChange: (value: number) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (value: DateFilter) => void;
  sortMode: SortMode;
  onSortModeChange: (value: SortMode) => void;
  className?: string;
};

const dateFilters: { label: string; value: DateFilter; icon: LucideIcon; iconClassName?: string }[] = [
  { label: "Qualquer dia", value: "any", icon: Clock },
  { label: "Hoje", value: "today", icon: Zap, iconClassName: "fill-current" },
  { label: "Neste fim de semana", value: "weekend", icon: Calendar },
];

const sortFilters: { label: string; value: SortMode; icon: LucideIcon }[] = [
  { label: "Mais perto", value: "distance", icon: MapPin },
  { label: "Menor preço", value: "price-asc", icon: ArrowUp },
  { label: "Maior preço", value: "price-desc", icon: ArrowDown },
  { label: "Melhor avaliados", value: "rating", icon: Star },
];

function FilterRow({
  id,
  icon: Icon,
  label,
  children,
}: {
  id: string;
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
      <div id={id} className="flex shrink-0 items-center gap-2 text-sm font-medium text-foreground sm:w-32">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        {label}
      </div>
      <div role="group" aria-labelledby={id} className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  icon: Icon,
  iconClassName,
  selected,
  onSelect,
}: {
  label: string;
  icon: LucideIcon;
  iconClassName?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "border-[#103f35] bg-[#103f35] text-white hover:bg-[#0c322a]"
          : "border-border bg-white text-foreground hover:bg-muted",
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", iconClassName)} aria-hidden="true" />
      {label}
    </button>
  );
}

export function SearchFilters({
  radius,
  onRadiusChange,
  dateFilter,
  onDateFilterChange,
  sortMode,
  onSortModeChange,
  className,
}: SearchFiltersProps) {
  return (
    <section
      id="search-filters"
      aria-label="Filtros da busca"
      className={cn("rounded-2xl border border-border bg-white px-4 py-4 sm:px-5", className)}
    >
      <div className="flex flex-col gap-3">
        <FilterRow id="filter-distance-label" icon={MapPin} label="Distância">
          <DistanceFilter value={radius} onChange={onRadiusChange} />
        </FilterRow>
        <FilterRow id="filter-date-label" icon={Calendar} label="Data">
          {dateFilters.map((item) => (
            <FilterChip
              key={item.value}
              label={item.label}
              icon={item.icon}
              iconClassName={item.iconClassName}
              selected={dateFilter === item.value}
              onSelect={() => onDateFilterChange(item.value)}
            />
          ))}
        </FilterRow>
        <FilterRow id="filter-sort-label" icon={ArrowUpDown} label="Ordem">
          {sortFilters.map((item) => (
            <FilterChip
              key={item.value}
              label={item.label}
              icon={item.icon}
              selected={sortMode === item.value}
              onSelect={() => onSortModeChange(item.value)}
            />
          ))}
        </FilterRow>
      </div>
    </section>
  );
}
