"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell, CalendarCheck, CalendarDays, Check, ChevronRight, CircleUserRound,
  Clock3, Compass, Heart, House, MapPin, MessageCircle, Wrench,
} from "lucide-react";

import { AccountMenu } from "@/components/account/account-menu";
import { BrandLogo } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

type RequestStatus = "Aguardando" | "Sua vez" | "Confirmada";
type RequestFilter = "Todas" | RequestStatus;

const customerRequests = [
  {
    id: 1,
    service: "Limpeza completa da sua casa",
    provider: "Ana Paula",
    providerImage: "/images/ana.jpg",
    status: "Sua vez" as RequestStatus,
    date: "Sábado, 19 de setembro",
    time: "09:00",
    location: "Saúde, São Paulo",
    price: "R$ 180",
    update: "Ana sugeriu um novo horário",
    detail: "Ela pode atender no sábado às 09:00.",
  },
  {
    id: 2,
    service: "Instalações e reparos elétricos",
    provider: "Carlos Mendes",
    providerImage: "/images/carlos.jpg",
    status: "Aguardando" as RequestStatus,
    date: "Hoje",
    time: "A combinar",
    location: "Vila Mariana, São Paulo",
    price: "R$ 150",
    update: "Solicitação enviada há 12 min",
    detail: "Carlos costuma responder em poucos minutos.",
  },
  {
    id: 3,
    service: "Montagem de móveis e pequenos reparos",
    provider: "Rafael Nunes",
    providerImage: "/images/rafael.jpg",
    status: "Confirmada" as RequestStatus,
    date: "Segunda, 21 de setembro",
    time: "14:00",
    location: "Aclimação, São Paulo",
    price: "R$ 120",
    update: "Serviço confirmado",
    detail: "Você receberá um lembrete antes do horário.",
  },
];

const statusStyles: Record<RequestStatus, string> = {
  Aguardando: "bg-[#eef1ec] text-[#58665f]",
  "Sua vez": "bg-[#ffe2da] text-[#9f3825]",
  Confirmada: "bg-[#dcf0e7] text-[#1f644d]",
};

export function CustomerRequests() {
  const [filter, setFilter] = useState<RequestFilter>("Todas");
  const [accepted, setAccepted] = useState(false);
  const visibleRequests = useMemo(() => filter === "Todas" ? customerRequests : customerRequests.filter((request) => request.status === filter), [filter]);
  const filters: RequestFilter[] = ["Todas", "Aguardando", "Sua vez", "Confirmada"];

  return <div className="min-h-screen bg-[#f6f7f3] pb-20 md:pb-0">
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Fechô, página inicial"><BrandLogo /></Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex"><Link href="/#servicos" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Explorar</Link><span className="rounded-md bg-muted px-3 py-2 text-sm font-bold">Solicitações</span></nav>
        <button type="button" className="relative ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:ml-1" aria-label="Notificações"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ff795f] ring-2 ring-white" /></button>
        <AccountMenu />
      </div>
    </header>

    <div className="mx-auto max-w-[1240px] px-4 py-7 sm:px-6 md:py-10 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase text-[#527637]">Seus serviços</p><h1 className="mt-1 text-[30px] font-black leading-tight sm:text-[38px]">Minhas solicitações</h1><p className="mt-2 text-sm text-muted-foreground">Acompanhe cada conversa até o serviço ficar concluído.</p></div><Link href="/#servicos" className="flex h-10 w-fit items-center gap-2 rounded-md border bg-white px-4 text-sm font-bold hover:bg-muted"><Compass className="h-4 w-4" /> Encontrar outro serviço</Link></div>

      {!accepted ? <section className="mt-7 grid overflow-hidden rounded-lg border bg-white md:grid-cols-[1fr_auto]">
        <div className="flex gap-4 p-5 sm:p-6"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffe2da] text-[#9f3825]"><Clock3 className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase text-[#9f3825]">Uma resposta nova</p><h2 className="mt-1 text-lg font-black">Ana sugeriu sábado às 09:00</h2><p className="mt-1 text-sm text-muted-foreground">Limpeza completa da sua casa · R$ 180</p></div></div>
        <div className="flex items-center gap-2 border-t p-4 md:border-l md:border-t-0"><button type="button" className="h-10 rounded-md px-4 text-sm font-bold text-muted-foreground hover:bg-muted">Outro horário</button><button type="button" onClick={() => setAccepted(true)} className="h-10 rounded-md bg-foreground px-5 text-sm font-bold text-white">Confirmar</button></div>
      </section> : <section className="mt-7 flex items-center gap-4 rounded-lg bg-[#dcf0e7] p-5 text-[#1f644d]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white"><Check className="h-5 w-5" /></span><div><h2 className="font-black">Horário confirmado</h2><p className="mt-0.5 text-sm">O serviço com Ana já entrou na agenda.</p></div></section>}

      <div className="scrollbar-hide mt-8 flex gap-2 overflow-x-auto border-b pb-4">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={cn("h-9 shrink-0 rounded-full border bg-white px-4 text-xs font-bold", filter === item && "border-foreground bg-foreground text-white")}>{item}</button>)}</div>

      <div className="mt-5 grid gap-4">{visibleRequests.map((request) => <RequestCard key={request.id} request={request} accepted={accepted && request.id === 1} />)}</div>
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
  const status = accepted ? "Confirmada" : request.status;
  return <article className={cn("overflow-hidden rounded-lg border bg-white", status === "Sua vez" && "border-l-[3px] border-l-[#ff795f]")}>
    <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,1.3fr)_minmax(250px,0.7fr)_auto] md:items-center">
      <div className="flex min-w-0 gap-3"><span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted"><Image src={request.providerImage} alt={request.provider} fill sizes="48px" className="object-cover" /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="truncate font-black">{request.service}</h2><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black uppercase", statusStyles[status])}>{status}</span></div><p className="mt-1 text-xs text-muted-foreground">com <strong className="text-foreground/75">{request.provider}</strong></p><p className="mt-2 text-sm font-semibold">{accepted ? "Horário confirmado" : request.update}</p><p className="mt-0.5 text-xs text-muted-foreground">{accepted ? "O serviço já está na agenda dos dois." : request.detail}</p></div></div>
      <dl className="grid grid-cols-2 gap-3 border-y py-3 text-xs md:border-x md:border-y-0 md:px-5 md:py-1"><div><dt className="flex items-center gap-1 text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />Quando</dt><dd className="mt-1 font-bold">{request.date}<span className="block font-normal text-muted-foreground">{request.time}</span></dd></div><div><dt className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />Onde</dt><dd className="mt-1 font-bold">{request.location}</dd></div></dl>
      <div className="flex items-center justify-between gap-3 md:block md:min-w-32 md:text-right"><strong className="text-lg font-black">{request.price}</strong><div className="flex gap-2 md:mt-3 md:justify-end"><button type="button" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-muted" aria-label={`Conversar com ${request.provider}`}><MessageCircle className="h-4 w-4" /></button><button type="button" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-muted" aria-label="Ver detalhes"><ChevronRight className="h-4 w-4" /></button></div></div>
    </div>
    {status === "Confirmada" && <div className="flex items-center gap-2 border-t bg-[#f7faf7] px-4 py-3 text-xs font-semibold text-[#356b52] sm:px-5"><CalendarCheck className="h-4 w-4" /> Serviço na agenda · lembrete ativado</div>}
  </article>;
}
