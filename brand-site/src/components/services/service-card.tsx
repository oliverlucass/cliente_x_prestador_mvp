"use client";

import Image from "next/image";
import { BadgeCheck, Heart, MapPin, Star, Zap } from "lucide-react";

import type { Service } from "@/types/service";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
  className?: string;
}

export function ServiceCard({ service, saved, onSave, onOpen, className }: ServiceCardProps) {
  return (
    <article className={cn("group min-w-0", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <button type="button" onClick={onOpen} className="absolute inset-0 z-10" aria-label={`Abrir ${service.title}`} />
        <Image src={service.imageUrl} alt={service.imageAlt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {service.availableToday ? (
            <span className="flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
              <Zap className="h-3.5 w-3.5 fill-lime-400 text-lime-500" /> Hoje
            </span>
          ) : <span />}
          <button type="button" onClick={(event) => { event.stopPropagation(); onSave(); }} className="relative z-20 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-sm transition hover:scale-105" aria-label={saved ? "Remover dos favoritos" : "Adicionar aos favoritos"} aria-pressed={saved}>
            <Heart className={cn("h-[18px] w-[18px]", saved && "fill-[#ff6b5e] text-[#ff6b5e]")} />
          </button>
        </div>
      </div>

      <button type="button" onClick={onOpen} className="w-full pt-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted-foreground">{service.category} · {service.distance.toFixed(1).replace(".", ",")} km</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#327054]"><BadgeCheck className="h-3.5 w-3.5" /> {service.verified ? "Prestador verificado" : "Novo prestador"} · {service.completedJobs} serviços</p>
            <h3 className="mt-1 truncate text-[17px] font-semibold leading-5 text-foreground">{service.title}</h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold"><Star className="h-4 w-4 fill-foreground" /> {service.rating.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="mt-2 flex items-end justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" /><span className="truncate">{service.neighborhood}</span></span>
          <span className="shrink-0 text-right"><strong className="block text-sm">{service.priceLabel}</strong><span className="text-xs text-muted-foreground">{service.priceDetail}</span></span>
        </div>
      </button>
    </article>
  );
}
