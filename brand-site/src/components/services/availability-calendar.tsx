"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  value: string;
  onChange: (date: string) => void;
}

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromIsoDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

export function AvailabilityCalendar({ value, onChange }: AvailabilityCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const selected = fromIsoDate(value);
    return new Date(selected.getFullYear(), selected.getMonth(), 1);
  });

  const today = useMemo(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }, []);

  const calendarDays = useMemo(() => {
    const firstWeekDay = (visibleMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0,
    ).getDate();

    return [
      ...Array.from({ length: firstWeekDay }, () => null),
      ...Array.from(
        { length: daysInMonth },
        (_, index) =>
          new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1),
      ),
    ];
  }, [visibleMonth]);

  const monthLabel = visibleMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  function changeMonth(offset: number) {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  }

  return (
    <div className="mt-3 rounded-lg border bg-white p-3 sm:p-4">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="min-w-36 text-center text-sm font-bold capitalize">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 text-center">
        {weekDays.map((day) => (
          <span key={day} className="py-1 text-[11px] font-medium text-muted-foreground">
            {day}
          </span>
        ))}
        {calendarDays.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} aria-hidden="true" />;

          const isoDate = toIsoDate(date);
          const isAvailable =
            date >= today && date.getDay() !== 0 && date.getDay() !== 6;
          const isSelected = value === isoDate;

          return (
            <button
              key={isoDate}
              type="button"
              disabled={!isAvailable}
              onClick={() => onChange(isoDate)}
              className={cn(
                "mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
                isAvailable && "text-foreground hover:bg-muted",
                !isAvailable && "cursor-not-allowed text-muted-foreground/45",
                isSelected && "bg-foreground text-background hover:bg-foreground",
              )}
              aria-label={`${date.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
              })}${isAvailable ? ", disponível" : ", indisponível"}`}
              aria-pressed={isSelected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
