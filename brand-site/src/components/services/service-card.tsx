"use client";

import Image from "next/image";
import { MapPin, Star, Zap } from "lucide-react";

import type { Service } from "@/types/service";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  onOpen: () => void;
  className?: string;
}

function formatCardPrice(service: Service) {
  const unit = /diária|imóvel/i.test(service.priceDetail) ? "d" : "h";
  return {
    label: `R$ ${service.price}/${unit}`,
    accessible: unit === "d" ? `R$ ${service.price} por diária` : `R$ ${service.price} por hora`,
  };
}

export function ServiceCard({ service, onOpen, className }: ServiceCardProps) {
  const price = formatCardPrice(service);

  return (
    <article className={cn("group min-w-0", className)}>
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <Image src={service.imageUrl} alt={service.imageAlt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
          <div className="absolute left-3 top-3 h-12 w-12 overflow-hidden rounded-full bg-muted shadow-sm">
            <Image src={service.providerImageUrl} alt={service.provider} fill sizes="48px" className="object-cover" />
          </div>
          {service.availableToday && (
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
              <Zap className="h-3.5 w-3.5 fill-lime-400 text-lime-500" /> Hoje
            </span>
          )}
        </div>

        <div className="pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[17px] font-semibold leading-5 text-foreground">{service.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">{service.description}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-foreground" />
              {service.rating.toFixed(2).replace(".", ",")}
              <span className="font-medium text-muted-foreground">
                ({service.reviewCount > 100 ? "100+" : service.reviewCount})
              </span>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" /><span className="truncate">{service.neighborhood}</span></span>
            <strong className="shrink-0 text-xl" aria-label={price.accessible}>{price.label}</strong>
          </div>
        </div>
      </button>
    </article>
  );
}
