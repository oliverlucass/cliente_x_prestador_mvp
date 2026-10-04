"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CircleUserRound, Compass, Heart, House, Wrench } from "lucide-react";

import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { HistoryButton } from "@/components/requests/history-button";
import { HistoryTimeline, type HistoryEvent } from "@/components/requests/history-timeline";
import { cn } from "@/lib/utils";

type RequestStatus = "Cancelada" | "Em andamento" | "Concluída";

type CustomerRequest = {
  id: number;
  service: string;
  provider: string;
  providerImage: string;
  status: RequestStatus;
  date: string;
  period: string;
  deadline: string;
  neighborhood: string;
  city: string;
  placeType: string;
  price: string;
  negotiations: number;
  photo: string;
  description: string;
  materials: string;
  observation: string;
  history: HistoryEvent[];
};

const customerRequests: CustomerRequest[] = [
  {
    id: 1,
    service: "Limpeza completa da sua casa",
    provider: "Ana Paula",
    providerImage: "/images/ana.jpg",
    status: "Cancelada",
    date: "Sábado, 19 de setembro",
    period: "Manhã",
    deadline: "Nos próximos dias",
    neighborhood: "Saúde",
    city: "São Paulo",
    placeType: "Residência",
    price: "R$ 180",
    negotiations: 6,
    photo: "/images/limpeza.jpg",
    description: "Apartamento com dois quartos, sala e cozinha. Incluir banheiros e área de serviço. O piso da sala precisa de atenção extra e os armários da cozinha estão com gordura acumulada.",
    materials: "Preciso que o prestador leve",
    observation: "Interfone 42",
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
    status: "Em andamento",
    date: "Hoje",
    period: "Manhã",
    deadline: "Flexível",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    placeType: "Residência",
    price: "R$ 150",
    negotiations: 3,
    photo: "/images/eletrica.jpg",
    description: "Troca de tomadas e revisão do quadro de luz da sala. Também preciso verificar o disjuntor que desarma.",
    materials: "A combinar",
    observation: "Portão azul, interfone 12",
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
    status: "Concluída",
    date: "Segunda, 21 de setembro",
    period: "Tarde",
    deadline: "Flexível",
    neighborhood: "Aclimação",
    city: "São Paulo",
    placeType: "Residência",
    price: "R$ 120",
    negotiations: 2,
    photo: "/images/montagem.jpg",
    description: "Guarda-roupa de três portas e uma estante pequena. As peças estão todas na sala e o manual de montagem está separado em um envelope.",
    materials: "Já tenho o necessário",
    observation: "Peças na sala, manual no envelope",
    history: [
      { date: "19 set", time: "10:20", title: "Pedido enviado", detail: "Você solicitou a montagem dos móveis." },
      { date: "20 set", time: "16:30", title: "Horário confirmado", detail: "Rafael confirmou a visita." },
      { date: "21 set", time: "15:45", title: "Serviço concluído", detail: "Montagem dos móveis finalizada." },
    ],
  },
];

const statusStyles: Record<RequestStatus, string> = {
  Cancelada: "bg-[#ffe2da] text-[#9f3825]",
  "Em andamento": "bg-[#eef1ec] text-[#58665f]",
  "Concluída": "bg-[#dcf0e7] text-[#1f644d]",
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

function RequestCard({ request }: { request: CustomerRequest }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const status = request.status;
  const notes = [request.materials, request.observation].filter((part) => part.trim()).join(" · ");

  return (
    <article className="overflow-hidden rounded-lg border bg-white">
      <div className="px-4 py-5 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image src={request.providerImage} alt="" fill sizes="40px" className="object-cover" />
          </span>
          <p className="min-w-0 truncate text-sm font-bold text-foreground sm:text-base">{request.provider}</p>
        </div>
        <h2 className="mt-4 text-xl font-black leading-tight text-foreground sm:text-2xl">{request.service}</h2>
        <p className="mt-2 flex flex-wrap gap-x-8 gap-y-1 text-sm text-muted-foreground">
          <span>
            <span className="sr-only">Data </span>
            {request.date}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">Período </span>
            {request.period}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">Prazo </span>
            {request.deadline}
          </span>
          <span>
            <span className="sr-only">Bairro e cidade </span>
            {request.neighborhood}, {request.city}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">Tipo de local </span>
            {request.placeType}
          </span>
        </p>
      </div>

      <div className="border-t px-4 py-5 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
            <Image src={request.photo} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm leading-6 text-foreground">{request.description}</p>
            {notes ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {request.materials.trim() ? (
                  <>
                    <span className="sr-only">Materiais </span>
                    {request.materials}
                  </>
                ) : null}
                {request.materials.trim() && request.observation.trim() ? <span aria-hidden="true"> · </span> : null}
                {request.observation.trim() ? (
                  <>
                    <span className="sr-only">Observação </span>
                    {request.observation}
                  </>
                ) : null}
              </p>
            ) : null}
            <p className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-sm text-muted-foreground">Pretende pagar</span>
              <span className="ml-auto text-2xl font-black leading-none text-foreground sm:text-[28px]">{request.price}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-[41px] flex-wrap items-center gap-2 border-t bg-[#f7faf7] px-4 py-3 text-xs sm:px-5"><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black uppercase", statusStyles[status])}>{status}</span><span className="text-muted-foreground" aria-hidden="true">·</span><p className="font-semibold">{request.negotiations} {request.negotiations === 1 ? "Negociação" : "Negociações"}</p><HistoryButton open={historyOpen} onClick={() => setHistoryOpen((open) => !open)} className="ml-auto" /></div>
      {historyOpen && <HistoryTimeline events={request.history} tone={status === "Cancelada" ? "danger" : status === "Concluída" ? "success" : "default"} />}
    </article>
  );
}
