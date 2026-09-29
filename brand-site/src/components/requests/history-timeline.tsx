import { cn } from "@/lib/utils";

export type HistoryEvent = {
  date: string;
  time: string;
  title: string;
  detail: string;
};

export function createHistoryEvent(title: string, detail: string): HistoryEvent {
  const now = new Date();
  return {
    date: now.toLocaleDateString("pt-BR", { day: "numeric", month: "short" }),
    time: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    title,
    detail,
  };
}

export function HistoryTimeline({ events, tone = "default" }: { events: HistoryEvent[]; tone?: "default" | "success" | "danger" }) {
  return <section className="border-t bg-[#fcfdfa] px-4 py-5 sm:px-5" aria-label="Histórico do serviço">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-xs font-black text-foreground">Histórico do serviço</h3>
      <span className="text-[11px] font-medium text-muted-foreground">{events.length} {events.length === 1 ? "etapa" : "etapas"}</span>
    </div>
    <ol className="ml-2 mt-5" aria-label="Linha do tempo">
      {events.map((event, index) => <li key={`${index}-${event.title}`} className="relative border-l border-[#cbd9cd] pb-5 pl-5 last:border-transparent last:pb-0">
        <span className={cn("absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-[#a4b9a7] ring-4 ring-[#fcfdfa]", index === events.length - 1 && (tone === "success" ? "bg-[#27805f]" : tone === "danger" ? "bg-[#b8503c]" : "bg-[#517b45]"))} aria-hidden="true" />
        <p className="text-[10px] font-bold uppercase text-[#66806d]">{event.date} · {event.time}</p>
        <p className="mt-1 text-sm font-bold text-foreground">{event.title}</p>
        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{event.detail}</p>
      </li>)}
    </ol>
  </section>;
}
