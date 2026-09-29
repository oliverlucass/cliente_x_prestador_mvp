"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Banknote, CalendarDays, Check, CircleUserRound, Clock3, Compass,
  Hammer, House, MapPin, User, Wrench, X,
} from "lucide-react";

import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { HistoryButton } from "@/components/requests/history-button";
import { createHistoryEvent, HistoryTimeline, type HistoryEvent } from "@/components/requests/history-timeline";
import { cn } from "@/lib/utils";

type ServiceStatus = "Nova" | "Confirmado" | "Em andamento" | "Concluído" | "Recusado";
type ProvidedService = {
  id: number;
  service: string;
  customer: string;
  initials: string;
  status: ServiceStatus;
  date: string;
  time: string;
  location: string;
  price: string;
  negotiations: number;
  photo: string;
  description: string;
  duration: string;
  history: HistoryEvent[];
};

const initialServices: ProvidedService[] = [
  {
    id: 1,
    service: "Instalação de 3 luminárias",
    customer: "Mariana Alves",
    initials: "MA",
    status: "Nova",
    date: "Quarta, 30 de setembro",
    time: "18:30 sugerido",
    location: "Vila Mariana, São Paulo",
    price: "R$ 150",
    negotiations: 1,
    photo: "/images/eletrica.jpg",
    description: "As luminárias já estão compradas. Instalação na sala e em dois quartos.",
    duration: "02:00",
    history: [{ date: "29 set", time: "11:20", title: "Pedido recebido", detail: "Mariana solicitou a instalação e sugeriu 18:30." }],
  },
  {
    id: 2,
    service: "Troca de chuveiro",
    customer: "Felipe Rocha",
    initials: "FR",
    status: "Em andamento",
    date: "Terça, 29 de setembro",
    time: "09:00",
    location: "Paraíso, São Paulo",
    price: "R$ 95",
    negotiations: 3,
    photo: "/images/eletrica.jpg",
    description: "Troca de chuveiro com o ponto elétrico já preparado pelo cliente.",
    duration: "01:00",
    history: [
      { date: "28 set", time: "16:10", title: "Detalhes recebidos", detail: "Felipe enviou as informações do chuveiro." },
      { date: "28 set", time: "18:40", title: "Horário confirmado", detail: "Atendimento combinado para terça-feira às 09:00." },
      { date: "29 set", time: "09:00", title: "Serviço iniciado", detail: "Troca do chuveiro em andamento." },
    ],
  },
  {
    id: 3,
    service: "Revisão elétrica do apartamento",
    customer: "Renata Nogueira",
    initials: "RN",
    status: "Concluído",
    date: "Segunda, 21 de setembro",
    time: "14:00",
    location: "Aclimação, São Paulo",
    price: "R$ 180",
    negotiations: 2,
    photo: "/images/eletrica.jpg",
    description: "Revisão das tomadas após queda de energia e teste do quadro elétrico.",
    duration: "01:45",
    history: [
      { date: "20 set", time: "14:10", title: "Pedido recebido", detail: "Renata descreveu a falha nas tomadas." },
      { date: "21 set", time: "15:45", title: "Serviço concluído", detail: "Revisão elétrica finalizada." },
    ],
  },
];

const statusStyles: Record<ServiceStatus, { badge: string; border: string }> = {
  Nova: { badge: "bg-[#ffe2da] text-[#9f3825]", border: "border-l-[#9f3825]" },
  Confirmado: { badge: "bg-[#dcecf7] text-[#285a78]", border: "border-l-[#285a78]" },
  "Em andamento": { badge: "bg-[#eef1ec] text-[#58665f]", border: "border-l-[#b7c0bb]" },
  "Concluído": { badge: "bg-[#dcf0e7] text-[#1f644d]", border: "border-l-[#1f644d]" },
  Recusado: { badge: "bg-[#ffe2da] text-[#9f3825]", border: "border-l-[#9f3825]" },
};

export function ProviderServices() {
  const [services, setServices] = useState(initialServices);

  const updateStatus = (id: number, status: ServiceStatus, title: string, detail: string) => {
    const event = createHistoryEvent(title, detail);
    setServices((current) => current.map((service) => service.id === id
      ? { ...service, status, time: status === "Confirmado" ? "18:30" : service.time, history: [...service.history, event] }
      : service));
  };

  const featured = services[0];

  return <div className="min-h-screen bg-[#f6f7f3] pb-20 md:pb-0">
    <MarketplaceHeader />

    <div className="mx-auto max-w-[1240px] px-4 py-7 sm:px-6 md:py-10 lg:px-8">
      <div><p className="text-[10px] font-black uppercase text-[#527637]">Seus serviços</p><h1 className="mt-1 text-[30px] font-black leading-tight sm:text-[38px]">Serviços prestados</h1><p className="mt-2 text-sm text-muted-foreground">Acompanhe os pedidos dos seus clientes até a conclusão de cada serviço.</p></div>

      {featured.status === "Nova" ? <section className="mt-7 grid overflow-hidden rounded-lg border bg-white md:grid-cols-[1fr_auto]">
        <div className="flex gap-4 p-5 sm:p-6"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffe2da] text-[#9f3825]"><Clock3 className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase text-[#9f3825]">Nova solicitação</p><h2 className="mt-1 text-lg font-black">Mariana quer instalar 3 luminárias</h2><p className="mt-1 text-sm text-muted-foreground">30 de setembro · 18:30 sugerido · R$ 150</p></div></div>
        <div className="flex items-center gap-2 border-t p-4 md:border-l md:border-t-0"><button type="button" onClick={() => updateStatus(1, "Recusado", "Solicitação recusada", "Carlos recusou o pedido de Mariana.")} className="h-10 rounded-md px-4 text-sm font-bold text-muted-foreground hover:bg-muted">Recusar</button><button type="button" onClick={() => updateStatus(1, "Confirmado", "Pedido aceito", "Carlos aceitou a instalação das luminárias.")} className="h-10 rounded-md bg-foreground px-5 text-sm font-bold text-white">Aceitar pedido</button></div>
      </section> : <section className={cn("mt-7 flex items-center gap-4 rounded-lg p-5", featured.status === "Recusado" ? "bg-[#ffe2da] text-[#9f3825]" : "bg-[#dcf0e7] text-[#1f644d]")}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white">{featured.status === "Recusado" ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}</span><div><h2 className="font-black">{featured.status === "Recusado" ? "Solicitação recusada" : "Pedido aceito"}</h2><p className="mt-0.5 text-sm">{featured.status === "Recusado" ? "O pedido de Mariana foi encerrado." : "O serviço de Mariana foi confirmado e entrou na sua lista."}</p></div></section>}

      <div className="mb-8 mt-8 border-b" />

      <div className="grid gap-4">{services.map((service) => <ProvidedServiceCard key={service.id} service={service} onComplete={() => updateStatus(service.id, "Concluído", "Serviço concluído", "Carlos marcou o atendimento como concluído.")} />)}</div>
    </div>

    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-white/95 px-1 pt-2 backdrop-blur md:hidden" aria-label="Navegação principal">
      <Link href="/" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><House className="h-5 w-5" />Início</Link>
      <Link href="/#servicos" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><Compass className="h-5 w-5" />Explorar</Link>
      <Link href="/solicitacoes" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><Wrench className="h-5 w-5" />Contratados</Link>
      <span className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-bold text-foreground"><span className="grid h-6 w-10 place-items-center rounded-full bg-[#dff4a0]"><Hammer className="h-5 w-5" /></span>Prestados</span>
      <Link href="/prestador" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground"><CircleUserRound className="h-5 w-5" />Perfil</Link>
    </nav>
  </div>;
}

function ProvidedServiceCard({ service, onComplete }: { service: ProvidedService; onComplete: () => void }) {
  const [historyOpen, setHistoryOpen] = useState(false);

  return <article className={cn("overflow-hidden rounded-lg border border-l-[3px] bg-white", statusStyles[service.status].border)}>
    <div className="grid items-center gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
      <div className="flex min-w-0 items-center gap-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e8efea] text-xs font-black text-[#356b52]" aria-hidden="true">{service.initials}</span><div className="min-w-0"><h2 className="truncate font-black">{service.service}</h2><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">Cliente: </span><strong className="text-foreground/75">{service.customer}</strong></p><p className="mt-1 flex items-center gap-1 text-xs"><CalendarDays className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /><span><span className="sr-only">Quando </span><span className="font-bold">{service.date}</span><span className="text-muted-foreground"> - {service.time}</span></span></p><p className="mt-1 flex items-center gap-1 text-xs"><MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /><span className="sr-only">Onde </span><span className="font-bold">{service.location}</span></p></div></div>
      <div className="flex min-w-0 items-stretch gap-3 border-t py-3 md:border-l md:border-t-0 md:px-5 md:py-0"><span className="relative w-20 shrink-0 self-stretch overflow-hidden rounded-md border bg-muted"><Image src={service.photo} alt="" fill sizes="80px" className="object-cover" /></span><div className="flex min-w-0 flex-col justify-center"><p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">Duração prevista </span><strong className="text-foreground/75">{service.duration}</strong></p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Banknote className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">Valor </span><strong className="text-foreground/75">{service.price}</strong></p></div></div>
    </div>
    <div className="flex min-h-[41px] flex-wrap items-center gap-2 border-t bg-[#f7faf7] px-4 py-3 text-xs sm:px-5"><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black uppercase", statusStyles[service.status].badge)}>{service.status}</span><span className="text-muted-foreground" aria-hidden="true">·</span><p className="font-semibold">{service.negotiations} {service.negotiations === 1 ? "Negociação" : "Negociações"}</p>{service.status === "Em andamento" && <button type="button" onClick={onComplete} className="ml-auto rounded-md px-2 py-1.5 font-bold text-[#1f644d] hover:bg-[#dcf0e7]">Concluir serviço</button>}<HistoryButton open={historyOpen} onClick={() => setHistoryOpen((open) => !open)} className={service.status !== "Em andamento" ? "ml-auto" : undefined} /></div>
    {historyOpen && <HistoryTimeline events={service.history} tone={service.status === "Concluído" ? "success" : service.status === "Recusado" ? "danger" : "default"} />}
  </article>;
}
