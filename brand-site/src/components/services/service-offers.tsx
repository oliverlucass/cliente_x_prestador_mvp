"use client";

import { useRef, useState } from "react";

import { offersForService, summarizeOffers, type OfferStatus, type ServiceOffer } from "@/data/mock/offers";
import { cn } from "@/lib/utils";

const previewCount = 4;

const chipClass: Record<OfferStatus, string> = {
  Fechada: "border-[#327054]/30 bg-[#edf7ef] text-[#327054]",
  "Em negociação": "border-border bg-white text-foreground",
  "Não fechada": "border-border bg-[#f7f9f4] text-muted-foreground",
};

function formatReais(value: number) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

function proposalLabel(count: number) {
  return count === 1 ? "proposta" : "propostas";
}

function OfferRow({ offer }: { offer: ServiceOffer }) {
  const firstName = offer.firstName.split(" ")[0] ?? offer.firstName;
  const notClosed = offer.status === "Não fechada";

  return (
    <li className="flex items-center gap-2.5 border-t px-3 py-2.5 first:border-t-0">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eef3e9] text-xs font-bold text-foreground"
        aria-hidden="true"
      >
        {firstName.charAt(0).toLocaleUpperCase("pt-BR")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold">{firstName}</p>
        <p className="mt-px truncate text-xs">{offer.title}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {offer.neighborhood} · {offer.recency}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className={cn("text-sm font-bold", notClosed && "text-muted-foreground")}>{formatReais(offer.amount)}</p>
        <span className={cn("mt-1 inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px]", chipClass[offer.status])}>
          {offer.status}
        </span>
      </div>
    </li>
  );
}

export function ServiceOffers({ serviceId }: { serviceId: string }) {
  const offers = offersForService(serviceId);
  const summary = summarizeOffers(offers);
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const visibleOffers = expanded ? offers : offers.slice(0, previewCount);
  const canExpand = offers.length > previewCount;

  function showAll() {
    setExpanded(true);
    listRef.current?.focus();
  }

  return (
    <section className="border-y py-7" aria-labelledby="offers-title">
      <h3 id="offers-title" className="text-lg font-bold">Propostas para este serviço</h3>

      {summary ? (
        <>
          <p className="mt-3 text-3xl font-bold leading-none">{formatReais(summary.average)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            média de {summary.count} {proposalLabel(summary.count)}
          </p>
          <p className="mt-1.5 text-xs">
            <span className="text-muted-foreground">mín.</span>{" "}
            <span className="font-bold">{formatReais(summary.min)}</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-muted-foreground">máx.</span>{" "}
            <span className="font-bold">{formatReais(summary.max)}</span>
          </p>

          <ul
            ref={listRef}
            tabIndex={-1}
            aria-label="Propostas recebidas"
            className="mt-4 overflow-hidden rounded-lg border bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {visibleOffers.map((offer) => <OfferRow key={offer.id} offer={offer} />)}
          </ul>

          {canExpand && !expanded ? (
            <button
              type="button"
              onClick={showAll}
              aria-expanded={false}
              className="mt-3 block rounded-sm text-xs font-semibold text-foreground underline underline-offset-2 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-70"
            >
              Ver todas as propostas
            </button>
          ) : null}
          <p className="sr-only" aria-live="polite">
            {expanded ? `Mostrando todas as ${summary.count} propostas.` : ""}
          </p>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Ainda não há propostas para este serviço.</p>
      )}
    </section>
  );
}
