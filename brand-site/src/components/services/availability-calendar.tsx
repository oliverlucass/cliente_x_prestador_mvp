"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"] as const;

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getProviderAvailableDates(service: Pick<Service, "availableToday" | "availableWeekend">, daysAhead = 60) {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  for (let offset = 0; offset < daysAhead; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const weekday = date.getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const isWeekday = !isWeekend;

    if ((service.availableToday && isWeekday) || (service.availableWeekend && isWeekend)) {
      dates.push(toIsoDate(date));
    }
  }

  return dates;
}

type AvailabilityCalendarProps = {
  availableDates: Set<string> | string[];
  className?: string;
};

export function AvailabilityCalendar({ availableDates, className }: AvailabilityCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));

  const availableSet = useMemo(
    () => (availableDates instanceof Set ? availableDates : new Set(availableDates)),
    [availableDates],
  );

  const monthLabel = visibleMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leading = Array.from({ length: firstWeekday }, () => null as number | null);
    const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    return [...leading, ...monthDays];
  }, [visibleMonth]);

  return (
    <div className={cn("w-full max-w-sm select-none", className)} aria-label="Calendário de disponibilidade do prestador">
      <div className="flex items-center justify-between gap-2 px-1">
        <button
          type="button"
          onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-medium text-foreground">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center text-xs text-muted-foreground">
        {WEEKDAY_LABELS.map((label, index) => (
          <span key={`${label}-${index}`} className="py-1 font-medium">
            {label}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 text-center text-sm">
        {cells.map((day, index) => {
          if (day === null) {
            return <span key={`empty-${index}`} className="py-2" aria-hidden="true" />;
          }

          const iso = toIsoDate(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day));
          const available = availableSet.has(iso);

          return (
            <span
              key={iso}
              className={cn(
                "py-2 tabular-nums",
                available ? "font-medium text-foreground" : "text-muted-foreground/55",
              )}
              aria-label={`${day} de ${monthLabel}${available ? ", disponível" : ", indisponível"}`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
