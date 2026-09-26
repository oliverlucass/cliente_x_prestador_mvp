"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays, Check, ChevronRight, CircleUserRound,
  Clock3, Compass, Heart, History, House, MapPin, MessageCircle, User, Wrench,
} from "lucide-react";

import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { ReviewPhotoStack } from "@/components/services/review-photo-stack";
import { cn } from "@/lib/utils";

type RequestStatus = "Cancelada" | "Em andamento" | "Concluída";

const customerRequests = [
  {
    id: 1,
    service: "Limpeza completa da sua casa",
    provider: "Ana Paula",
    providerImage: "/images/ana.jpg",
    status: "Cancelada" as RequestStatus,
    date: "Sábado, 19 de setembro",
    time: "09:00",
    location: "Saúde, São Paulo",
    price: "R$ 180",
    negotiations: 6,
    photos: ["/images/limpeza.jpg", "/images/montagem.jpg"] as [string, string],
  },
  {
    id: 2,
    service: "Instalações e reparos elétricos",
    provider: "Carlos Mendes",
    providerImage: "/images/carlos.jpg",
    status: "Em andamento" as RequestStatus,
    date: "Hoje",
    time: "A combinar",
    location: "Vila Mariana, São Paulo",
    price: "R$ 150",
    negotiations: 3,
    photos: ["/images/eletrica.jpg", "/images/hidraulica.jpg"] as [string, string],
  },
  {
    id: 3,
    service: "Montagem de móveis e pequenos reparos",
    provider: "Rafael Nunes",
    providerImage: "/images/rafael.jpg",
    status: "Concluída" as RequestStatus,
    date: "Segunda, 21 de setembro",
    time: "14:00",
    location: "Aclimação, São Paulo",
    price: "R$ 120",
    negotiations: 2,
    photos: ["/images/montagem.jpg", "/images/pintura.jpg"] as [string, string],
  },
];

const statusStyles: Record<RequestStatus, { badge: string; border: string }> = {
  Cancelada: { badge: "bg-[#ffe2da] text-[#9f3825]", border: "border-l-[#9f3825]" },
  "Em andamento": { badge: "bg-[#eef1ec] text-[#58665f]", border: "border-l-[#b7c0bb]" },
  "Concluída": { badge: "bg-[#dcf0e7] text-[#1f644d]", border: "border-l-[#1f644d]" },
};

export function CustomerRequests() {
  const [accepted, setAccepted] = useState(false);

  return <div className="min-h-screen bg-[#f6f7f3] pb-20 md:pb-0">
    <MarketplaceHeader />

    <div className="mx-auto max-w-[1240px] px-4 py-7 sm:px-6 md:py-10 lg:px-8">
      <div><p className="text-[10px] font-black uppercase text-[#527637]">Seus serviços</p><h1 className="mt-1 text-[30px] font-black leading-tight sm:text-[38px]">Minhas solicitações</h1><p className="mt-2 text-sm text-muted-foreground">Acompanhe cada conversa até o serviço ficar concluído.</p></div>

      {!accepted ? <section className="mt-7 grid overflow-hidden rounded-lg border bg-white md:grid-cols-[1fr_auto]">
        <div className="flex gap-4 p-5 sm:p-6"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffe2da] text-[#9f3825]"><Clock3 className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase text-[#9f3825]">Uma resposta nova</p><h2 className="mt-1 text-lg font-black">Ana sugeriu sábado às 09:00</h2><p className="mt-1 text-sm text-muted-foreground">Limpeza completa da sua casa · R$ 180</p></div></div>
        <div className="flex items-center gap-2 border-t p-4 md:border-l md:border-t-0"><button type="button" className="h-10 rounded-md px-4 text-sm font-bold text-muted-foreground hover:bg-muted">Outro horário</button><button type="button" onClick={() => setAccepted(true)} className="h-10 rounded-md bg-foreground px-5 text-sm font-bold text-white">Confirmar</button></div>
      </section> : <section className="mt-7 flex items-center gap-4 rounded-lg bg-[#dcf0e7] p-5 text-[#1f644d]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white"><Check className="h-5 w-5" /></span><div><h2 className="font-black">Horário confirmado</h2><p className="mt-0.5 text-sm">O serviço com Ana já entrou na agenda.</p></div></section>}

      <div className="mt-8 mb-8 border-b" />

      <div className="grid gap-4">{customerRequests.map((request) => <RequestCard key={request.id} request={request} accepted={accepted && request.id === 1} />)}</div>
    </div>

    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-white/95 px-1 pt-2 backdrop-blur md:hidden" aria-label="Navegação principal">
      <Link href="/" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><House className="h-5 w-5" />Início</Link>
      <Link href="/#servicos" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><Compass className="h-5 w-5" />Explorar</Link>
      <span className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-bold text-foreground"><span className="grid h-6 w-10 place-items-center rounded-full bg-[#dff4a0]"><Wrench className="h-5 w-5" /></span>Solicitações</span>
      <button type="button" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><Heart className="h-5 w-5" />Salvos</button>
      <button type="button" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><CircleUserRound className="h-5 w-5" />Perfil</button>
    </nav>
  </div>;
}

function RequestCard({ request, accepted }: { request: (typeof customerRequests)[number]; accepted: boolean }) {
  const status = accepted ? "Concluída" : request.status;
  return <article className={cn("overflow-hidden rounded-lg border border-l-[3px] bg-white", statusStyles[status].border)}>
    <div className="grid items-stretch gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 gap-3"><span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted"><Image src={request.providerImage} alt={request.provider} fill sizes="48px" className="object-cover" /></span><div className="min-w-0"><h2 className="truncate font-black">{request.service}</h2><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">com </span><strong className="text-foreground/75">{request.provider}</strong></p><p className="mt-1 flex items-center gap-1 text-xs"><CalendarDays className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /><span><span className="sr-only">Quando </span><span className="font-bold">{request.date}</span><span className="text-muted-foreground"> - {request.time}</span></span></p><p className="mt-1 flex items-center gap-1 text-xs"><MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /><span className="sr-only">Onde </span><span className="font-bold">{request.location}</span></p></div></div>
      <div className="flex min-w-0 items-center border-y py-3 md:border-x md:border-y-0 md:px-5 md:py-1" aria-label="Fotos enviadas na triagem"><ReviewPhotoStack photos={request.photos} size={48} /></div>
      <div className="flex min-w-0 items-center justify-between gap-3 md:flex-col md:justify-center md:text-center"><strong className="text-lg font-black">{request.price}</strong><div className="flex gap-2 md:mt-3 md:justify-center"><button type="button" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-muted" aria-label={`Conversar com ${request.provider}`}><MessageCircle className="h-4 w-4" /></button><button type="button" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-muted" aria-label="Ver detalhes"><ChevronRight className="h-4 w-4" /></button></div></div>
    </div>
    <div className="flex min-h-[41px] items-center gap-2 border-t bg-[#f7faf7] px-4 py-3 text-xs sm:px-5"><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black uppercase", statusStyles[status].badge)}>{status}</span><span className="text-muted-foreground" aria-hidden="true">·</span><p className="font-semibold">{request.negotiations} {request.negotiations === 1 ? "Negociação" : "Negociações"}</p><button type="button" className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full border bg-white hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Histórico de negociações"><History className="h-4 w-4" /></button></div>
  </article>;
}
