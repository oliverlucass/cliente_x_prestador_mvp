import Image from "next/image";
import { CalendarDays, CheckCircle2, Clock3, MapPin, UsersRound } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Opportunity } from "@/types/opportunity";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onOpen: () => void;
}
export function OpportunityCard({ opportunity, onOpen }: OpportunityCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-white transition duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_16px_40px_rgba(10,35,29,0.09)]">
      <button type="button" onClick={onOpen} className="relative aspect-[16/9] w-full overflow-hidden text-left">
        <Image src={opportunity.imageUrl} alt={opportunity.imageAlt} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-foreground shadow-sm">{opportunity.category}</span>
          {opportunity.urgent && <span className="rounded-full bg-[#c9f24a] px-3 py-1.5 text-[11px] font-black text-foreground shadow-sm">Precisa hoje</span>}
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-foreground/90 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">Publicado {opportunity.publishedAt}</span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <button type="button" onClick={onOpen} className="text-left">
          <h3 className="text-lg font-black leading-snug text-foreground group-hover:underline">{opportunity.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{opportunity.description}</p>
        </button>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#527637]" /> {opportunity.distance.toFixed(1).replace(".", ",")} km</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[#527637]" /> {opportunity.dateLabel}</span>
          <span className="col-span-2 flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#527637]" /> {opportunity.timeLabel}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t pt-4">
          <Image src={opportunity.clientImageUrl} alt={opportunity.clientName} width={34} height={34} className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-xs font-bold">{opportunity.clientName} {opportunity.verified && <CheckCircle2 className="h-3.5 w-3.5 fill-[#dff3e7] text-[#356b52]" />}</p>
            <p className="text-[11px] text-muted-foreground">Cliente {opportunity.clientRating.toFixed(1).replace(".", ",")} · {opportunity.completedHires} contratações</p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Orçamento</span>
            <p className="text-lg font-black text-foreground">{opportunity.budgetLabel}</p>
          </div>
          <button type="button" onClick={onOpen} className={cn("h-10 rounded-md bg-foreground px-4 text-xs font-bold text-white transition hover:bg-[#1b4d3e]")}>Ver oportunidade</button>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground"><UsersRound className="h-3.5 w-3.5" /> {opportunity.interests} profissionais demonstraram interesse</p>
      </div>
    </article>
  );
}
