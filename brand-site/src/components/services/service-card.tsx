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

function formatPriceAmount(price: number) {
  return `R$ ${price.toLocaleString("pt-BR")}`;
}

function formatDistance(kilometers: number) {
  return `${kilometers.toFixed(1).replace(".", ",")} km`;
}

export function ServiceCard({ service, onOpen, className }: ServiceCardProps) {
  const price = formatPriceAmount(service.price);
  const rating = service.rating.toFixed(2).replace(".", ",");
  const distance = formatDistance(service.distance);

  return (
    <article className={cn("group min-w-0", className)}>
      <button
        type="button"
        onClick={onOpen}
        className="w-full rounded-lg text-left transition-opacity active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <Image
            src={service.imageUrl}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute bottom-3 left-3 h-10 w-10 overflow-hidden rounded-full bg-muted shadow-sm">
            <Image src={service.providerImageUrl} alt="" fill sizes="40px" className="object-cover" />
          </span>
          {service.availableToday && (
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
              <Zap className="h-3.5 w-3.5 fill-lime-400 text-lime-500" aria-hidden="true" />
              Hoje
            </span>
          )}
        </div>

        <div className="pt-3">
          <p className="text-sm font-medium text-muted-foreground">{service.profession}</p>
          <h3 className="mt-1 text-[17px] font-semibold leading-5 text-foreground">{service.title}</h3>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-semibold text-foreground">{price}</span>
            <span className="text-sm text-muted-foreground">a partir</span>
          </p>
          <p className="mt-2 flex min-w-0 flex-nowrap items-center gap-2 text-sm">
            <span className="flex shrink-0 items-center gap-1 font-semibold text-foreground">
              <Star className="h-4 w-4 fill-foreground" aria-hidden="true" />
              <span className="sr-only">Avaliação </span>
              {rating}
            </span>
            <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">Bairro </span>
              <span className="truncate">{service.neighborhood}</span>
            </span>
            <span className="shrink-0 text-muted-foreground">
              <span className="sr-only">Distância </span>
              {distance}
            </span>
          </p>
        </div>
      </button>
    </article>
  );
}
