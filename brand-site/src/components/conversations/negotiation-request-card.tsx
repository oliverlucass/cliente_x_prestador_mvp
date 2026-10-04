"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type RequestPhoto = {
  id: string;
  src: string;
  alt: string;
};

export type NegotiationRequest = {
  title: string;
  description: string;
  photos: RequestPhoto[];
  neighborhood: string;
  city: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  placeType: string;
  observation: string;
  preferredDate: string;
  period: string;
  deadline: string;
  materials: string;
  offer: number;
};

function formatOffer(offer: number) {
  if (!Number.isFinite(offer) || offer <= 0) return "A combinar";
  return offer.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function NegotiationRequestCard({
  name,
  avatarSrc,
  time,
  request,
  open,
  onToggle,
  leading,
}: {
  name: string;
  avatarSrc: string;
  time: string;
  request: NegotiationRequest;
  open: boolean;
  onToggle: () => void;
  leading?: ReactNode;
}) {
  return (
    <header className={cn("flex shrink-0 flex-col overflow-hidden rounded-lg border bg-[#f7faf7]", open && "min-h-0 flex-1")}>
      <div className="flex shrink-0 items-center gap-3 p-3">
        {leading}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="conversation-request-details"
          className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-left hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:opacity-70"
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image src={avatarSrc} alt="" fill sizes="44px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline justify-between gap-2">
              <span className="truncate font-black">{name}</span>
              <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">{time}</span>
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">{request.title}</span>
            <span className="sr-only">{open ? "Fechar detalhes" : "Ver detalhes"}</span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-muted-foreground transition motion-reduce:transition-none", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>

      {open && (
        <div id="conversation-request-details" className="min-h-0 flex-1 overflow-y-auto border-t">
          <NegotiationRequestDetails counterpartName={name} request={request} />
        </div>
      )}
    </header>
  );
}

function NegotiationRequestDetails({
  counterpartName,
  request,
}: {
  counterpartName: string;
  request: NegotiationRequest;
}) {
  const firstName = counterpartName.split(" ")[0];

  return (
    <div className="flex flex-col px-4">
      <RequestSection number="01" title="Pedido">
        <p className="text-lg font-black leading-snug">{request.title}</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{request.description}</p>
        {request.photos.length > 0 ? (
          <ul className="mt-3 flex gap-2 overflow-x-auto" aria-label="Fotos do problema">
            {request.photos.map((photo) => (
              <li key={photo.id} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={photo.src} alt={photo.alt} fill sizes="80px" className="object-cover" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nenhuma foto enviada.</p>
        )}
      </RequestSection>

      <RequestSection number="02" title="Local">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <RequestField label="Bairro" value={request.neighborhood} />
          <RequestField label="Cidade" value={request.city} />
          <RequestField className="sm:col-span-2" label="CEP" value={request.cep} />
          <RequestField className="sm:col-span-2" label="Rua e número" value={`${request.street}, ${request.number}`} />
          <RequestField label="Complemento" value={request.complement} />
          <RequestField label="Tipo de local" value={request.placeType} />
          <RequestField className="sm:col-span-2" label="Observação" value={request.observation} />
        </dl>
      </RequestSection>

      <RequestSection number="03" title="Quando precisa">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <RequestField className="sm:col-span-2" label="Data preferida" value={request.preferredDate} />
          <RequestField label="Período" value={request.period} />
          <RequestField label="Prazo" value={request.deadline} />
        </dl>
      </RequestSection>

      <RequestSection number="04" title="Observações">
        <dl className="text-sm">
          <RequestField label="Materiais e equipamentos" value={request.materials} />
        </dl>
      </RequestSection>

      <RequestSection number="05" title="Por quanto">
        <dl>
          <dt className="text-xs text-muted-foreground">Valor que pretende pagar</dt>
          <dd className="mt-1 text-lg font-black">{formatOffer(request.offer)}</dd>
        </dl>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          O valor final depende da conversa com {firstName}.
        </p>
      </RequestSection>
    </div>
  );
}

function RequestSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="border-b py-4 last:border-b-0">
      <h2 className="flex items-center gap-3 text-sm font-black">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#dff4a0] text-xs font-black text-foreground">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function RequestField({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words font-semibold">{value}</dd>
    </div>
  );
}
