"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Banknote, CalendarDays, CircleUserRound,
  Clock3, Compass, Heart, House, MapPin, User, Wrench,
} from "lucide-react";

import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { HistoryButton } from "@/components/requests/history-button";
import { HistoryTimeline } from "@/components/requests/history-timeline";
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
    photo: "/images/limpeza.jpg",
    description: "Apartamento com dois quartos, sala e cozinha. Incluir banheiros e área de serviço. O piso da sala precisa de atenção extra e os armários da cozinha estão com gordura acumulada.",
    duration: "02:20",
    history: [
      { date: "17 set", time: "10:35", title: "Pedido enviado", detail: "Você enviou a solicitação de limpeza para Ana." },
      { date: "18 set", time: "14:10", title: "Horário sugerido", detail: "Ana sugeriu sábado às 09:00." },
      { date: "19 set", time: "08:20", title: "Pedido cancelado", detail: "A solicitação de limpeza foi cancelada." },
    ],
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
    photo: "/images/eletrica.jpg",
    description: "Troca de tomadas e revisão do quadro de luz da sala. Também preciso verificar o disjuntor que desarma quando o ar-condicionado liga junto com o chuveiro.",
    duration: "00:30",
    history: [
      { date: "27 set", time: "11:40", title: "Pedido enviado", detail: "Você descreveu os reparos necessários." },
      { date: "28 set", time: "09:15", title: "Valor combinado", detail: "Carlos enviou o valor de R$ 150." },
      { date: "29 set", time: "09:00", title: "Serviço iniciado", detail: "Os reparos elétricos estão em andamento." },
    ],
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
    photo: "/images/montagem.jpg",
    description: "Guarda-roupa de três portas e uma estante pequena. As peças estão todas na sala e o manual de montagem está separado em um envelope.",
    duration: "01:45",
    history: [
      { date: "19 set", time: "10:20", title: "Pedido enviado", detail: "Você solicitou a montagem dos móveis." },
      { date: "20 set", time: "16:30", title: "Horário confirmado", detail: "Rafael confirmou a visita." },
      { date: "21 set", time: "15:45", title: "Serviço concluído", detail: "Montagem dos móveis finalizada." },
    ],
  },
];

const statusStyles: Record<RequestStatus, { badge: string; border: string }> = {
  Cancelada: { badge: "bg-[#ffe2da] text-[#9f3825]", border: "border-l-[#9f3825]" },
  "Em andamento": { badge: "bg-[#eef1ec] text-[#58665f]", border: "border-l-[#b7c0bb]" },
  "Concluída": { badge: "bg-[#dcf0e7] text-[#1f644d]", border: "border-l-[#1f644d]" },
};

const requestsInProgress = customerRequests.filter((request) => request.status === "Em andamento");
const otherRequests = customerRequests.filter((request) => request.status !== "Em andamento");

export function CustomerRequests() {
  return <div className="min-h-screen bg-[#f6f7f3] pb-20 md:pb-0">
    <MarketplaceHeader />

    <div className="mx-auto max-w-[1240px] px-4 py-7 sm:px-6 md:py-10 lg:px-8">
      <div><p className="text-[10px] font-black uppercase text-[#527637]">Seus serviços</p><h1 className="mt-1 text-[30px] font-black leading-tight sm:text-[38px]">Minhas solicitações</h1><p className="mt-2 text-sm text-muted-foreground">Acompanhe cada conversa até o serviço ficar concluído.</p></div>

      <div className="mt-7 grid gap-4">{requestsInProgress.map((request) => <RequestCard key={request.id} request={request} />)}</div>
      {requestsInProgress.length > 0 && otherRequests.length > 0 && <div className="my-8 border-b" />}
      <div className="grid gap-4">{otherRequests.map((request) => <RequestCard key={request.id} request={request} />)}</div>
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

function RequestCard({ request }: { request: (typeof customerRequests)[number] }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const status = request.status;
  return <article className={cn("overflow-hidden rounded-lg border border-l-[3px] bg-white", statusStyles[status].border)}>
    <div className="grid items-center gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
      <div className="flex min-w-0 items-center gap-3"><span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted"><Image src={request.providerImage} alt={request.provider} fill sizes="48px" className="object-cover" /></span><div className="min-w-0"><h2 className="truncate font-black">{request.service}</h2><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">com </span><strong className="text-foreground/75">{request.provider}</strong></p><p className="mt-1 flex items-center gap-1 text-xs"><CalendarDays className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /><span><span className="sr-only">Quando </span><span className="font-bold">{request.date}</span><span className="text-muted-foreground"> - {request.time}</span></span></p><p className="mt-1 flex items-center gap-1 text-xs"><MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /><span className="sr-only">Onde </span><span className="font-bold">{request.location}</span></p></div></div>
      <div className="flex min-w-0 items-stretch gap-3 border-t py-3 md:border-l md:border-t-0 md:px-5 md:py-0"><span className="relative w-20 shrink-0 self-stretch overflow-hidden rounded-md border bg-muted"><Image src={request.photo} alt="" fill sizes="80px" className="object-cover" /></span><div className="flex min-w-0 flex-col justify-center"><p className="line-clamp-2 text-sm text-muted-foreground">{request.description}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">Duração </span><strong className="text-foreground/75">{request.duration}</strong></p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Banknote className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">Preço </span><strong className="text-foreground/75">{request.price}</strong></p></div></div>
    </div>
    <div className="flex min-h-[41px] flex-wrap items-center gap-2 border-t bg-[#f7faf7] px-4 py-3 text-xs sm:px-5"><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black uppercase", statusStyles[status].badge)}>{status}</span><span className="text-muted-foreground" aria-hidden="true">·</span><p className="font-semibold">{request.negotiations} {request.negotiations === 1 ? "Negociação" : "Negociações"}</p><HistoryButton open={historyOpen} onClick={() => setHistoryOpen((open) => !open)} className="ml-auto" /></div>
    {historyOpen && <HistoryTimeline events={request.history} tone={status === "Cancelada" ? "danger" : status === "Concluída" ? "success" : "default"} />}
  </article>;
}
