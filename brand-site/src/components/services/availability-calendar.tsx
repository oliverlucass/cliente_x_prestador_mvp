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

export function AvailabilityCalendar(_props: AvailabilityCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
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

    const days = [
      ...Array.from({ length: firstWeekDay }, () => null),
      ...Array.from(
        { length: daysInMonth },
        (_, index) =>
          new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1),
      ),
    ];

    return [
      ...days,
      ...Array.from({ length: 42 - days.length }, () => null),
    ];
  }, [visibleMonth]);

  const monthLabel = visibleMonth
    .toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    })
    .replace(/\s+de\s+/i, " - ");

  const canGoToPreviousMonth =
    visibleMonth.getFullYear() > today.getFullYear() ||
    (visibleMonth.getFullYear() === today.getFullYear() &&
      visibleMonth.getMonth() > today.getMonth());

  function changeMonth(offset: number) {
    setVisibleMonth(
      (current) => {
        const nextMonth = new Date(
          current.getFullYear(),
          current.getMonth() + offset,
          1,
        );
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        return nextMonth < currentMonth ? current : nextMonth;
      },
    );
  }

  return (
    <div className="mt-3 rounded-lg border bg-white p-3 sm:p-4">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={!canGoToPreviousMonth}
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-35"
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

      <div className="mt-2 grid grid-cols-7 grid-rows-[repeat(7,2.25rem)] text-center">
        {weekDays.map((day) => (
          <span key={day} className="py-1 text-[11px] font-medium text-muted-foreground">
            {day}
          </span>
        ))}
        {calendarDays.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} aria-hidden="true" />;

          const isAvailable =
            date >= today && date.getDay() !== 0 && date.getDay() !== 6;
          const isToday = date.getTime() === today.getTime();

          return (
            <span
              key={toIsoDate(date)}
              className={cn(
                "mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-semibold",
                isAvailable && "text-foreground",
                !isAvailable && "text-muted-foreground/45",
                isToday && "bg-foreground text-background",
              )}
              aria-label={`${date.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
              })}${isAvailable ? ", disponível" : ", indisponível"}`}
              aria-current={isToday ? "date" : undefined}
            >
              {date.getDate()}
            </span>
          );
        })}
      </div>
    </div>
  );
}
