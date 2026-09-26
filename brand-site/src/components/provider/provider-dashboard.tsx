"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowUpRight, Bell, BriefcaseBusiness, CalendarDays, Check, CheckCircle2,
  ChevronRight, CircleUserRound, Clock3, Eye, Heart, LayoutDashboard,
  MapPin, MessageCircle, MoreHorizontal, Plus, Search, Star, WalletCards, X,
} from "lucide-react";

import { BrandLogo, BrandMark } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

type ProviderView = "overview" | "requests" | "calendar" | "listings";
type RequestStatus = "Nova" | "Em conversa" | "Confirmada";
type RequestFilter = "Todas" | RequestStatus;

const requests = [
  { id: 1, customer: "Mariana Alves", initials: "MA", service: "Instalação de 3 luminárias", message: "As luminárias já estão compradas. Preciso instalar na sala e nos quartos.", location: "Vila Mariana", distance: "1,4 km", date: "Hoje", time: "18:30", price: "R$ 150", status: "Nova" as RequestStatus, createdAt: "há 12 min" },
  { id: 2, customer: "Felipe Rocha", initials: "FR", service: "Troca de chuveiro", message: "O ponto elétrico está pronto. Posso receber no sábado pela manhã.", location: "Paraíso", distance: "2,1 km", date: "Sáb, 19 set", time: "09:00", price: "R$ 95", status: "Em conversa" as RequestStatus, createdAt: "há 1 h" },
  { id: 3, customer: "Renata Nogueira", initials: "RN", service: "Revisão elétrica do apartamento", message: "Algumas tomadas pararam de funcionar depois de uma queda de energia.", location: "Aclimação", distance: "2,8 km", date: "Seg, 21 set", time: "14:00", price: "R$ 180", status: "Confirmada" as RequestStatus, createdAt: "ontem" },
  { id: 4, customer: "Lucas Martins", initials: "LM", service: "Instalação de ventilador de teto", message: "Quero substituir a luminária atual por um ventilador com controle remoto.", location: "Saúde", distance: "3,2 km", date: "Ter, 22 set", time: "10:30", price: "R$ 140", status: "Nova" as RequestStatus, createdAt: "há 3 h" },
];

const agenda = [
  { day: "15", weekday: "Hoje", month: "SET", time: "18:30", customer: "Mariana Alves", service: "Instalação de luminárias", location: "Vila Mariana", value: "R$ 150" },
  { day: "19", weekday: "Sábado", month: "SET", time: "09:00", customer: "Felipe Rocha", service: "Troca de chuveiro", location: "Paraíso", value: "R$ 95" },
  { day: "21", weekday: "Segunda", month: "SET", time: "14:00", customer: "Renata Nogueira", service: "Revisão elétrica", location: "Aclimação", value: "R$ 180" },
];

const listings = [
  { id: 1, title: "Instalações e reparos elétricos", image: "/images/eletrica.jpg", price: "A partir de R$ 85", detail: "por visita", views: 312, favorites: 27, requests: 18 },
  { id: 2, title: "Troca de chuveiro e luminárias", image: "/images/montagem.jpg", price: "A partir de R$ 75", detail: "por instalação", views: 184, favorites: 11, requests: 9 },
];

const navigation = [
  { id: "overview" as ProviderView, label: "Visão geral", mobileLabel: "Início", icon: LayoutDashboard },
  { id: "requests" as ProviderView, label: "Solicitações", mobileLabel: "Solicitações", icon: MessageCircle, count: 2 },
  { id: "calendar" as ProviderView, label: "Agenda", mobileLabel: "Agenda", icon: CalendarDays },
  { id: "listings" as ProviderView, label: "Meus anúncios", mobileLabel: "Anúncios", icon: BriefcaseBusiness },
];

const viewTitles: Record<ProviderView, { title: string; description: string }> = {
  overview: { title: "Visão geral", description: "Terça-feira, 15 de setembro" },
  requests: { title: "Solicitações", description: "Converse, combine e confirme" },
  calendar: { title: "Agenda", description: "Seus horários e atendimentos" },
  listings: { title: "Meus anúncios", description: "O que os clientes encontram" },
};

const statusStyles: Record<RequestStatus, string> = {
  Nova: "bg-[#ffe2da] text-[#9f3825]",
  "Em conversa": "bg-[#dcecf7] text-[#285a78]",
  Confirmada: "bg-[#dcf0e7] text-[#1f644d]",
};

export function ProviderDashboard() {
  const [view, setView] = useState<ProviderView>("overview");
  const [available, setAvailable] = useState(true);
  const [filter, setFilter] = useState<RequestFilter>("Todas");
  const [composerOpen, setComposerOpen] = useState(false);
  const filteredRequests = useMemo(() => filter === "Todas" ? requests : requests.filter((request) => request.status === filter), [filter]);
  const changeView = (nextView: ProviderView) => { setView(nextView); window.scrollTo({ top: 0 }); };

  return (
    <div className="min-h-screen bg-[#f4f6f1] pb-20 lg:pb-0">
      <DesktopSidebar view={view} onViewChange={changeView} onCreate={() => setComposerOpen(true)} />
      <div className="lg:pl-60">
        <MobileHeader onCreate={() => setComposerOpen(true)} />
        <header className="hidden h-[72px] items-center border-b bg-white px-8 lg:flex xl:px-12">
          <div><h1 className="text-lg font-black">{viewTitles[view].title}</h1><p className="text-xs text-muted-foreground">{viewTitles[view].description}</p></div>
          <label className="relative ml-auto hidden xl:block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input className="h-10 w-64 rounded-md border bg-[#f7f8f4] pl-9 pr-3 text-sm outline-none focus:border-foreground" placeholder="Buscar nesta área" /></label>
          <button type="button" className="relative ml-3 grid h-10 w-10 place-items-center rounded-full border hover:bg-muted" aria-label="Notificações"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ff795f] ring-2 ring-white" /></button>
          <button type="button" className="ml-3 flex items-center gap-2 rounded-full border bg-white p-1 pr-3 text-left"><span className="relative h-8 w-8 overflow-hidden rounded-full"><Image src="/images/carlos.jpg" alt="Carlos Mendes" fill sizes="32px" className="object-cover" /></span><span><strong className="block text-xs">Carlos</strong><span className="block text-[10px] text-muted-foreground">Prestador</span></span></button>
        </header>
        <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6 md:py-8 lg:px-8 xl:px-12">
          {view === "overview" && <Overview available={available} onAvailabilityChange={() => setAvailable((value) => !value)} onViewChange={changeView} onCreateListing={() => setComposerOpen(true)} />}
          {view === "requests" && <RequestsView filter={filter} onFilterChange={setFilter} requests={filteredRequests} />}
          {view === "calendar" && <CalendarView />}
          {view === "listings" && <ListingsView onCreate={() => setComposerOpen(true)} />}
        </div>
      </div>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-white/95 px-1 pt-2 backdrop-blur lg:hidden" aria-label="Navegação do prestador">
        {navigation.map((item) => <button key={item.id} type="button" onClick={() => changeView(item.id)} className={cn("relative flex min-w-0 flex-col items-center gap-1 text-[10px] font-semibold", view === item.id ? "text-foreground" : "text-muted-foreground")}><span className={cn("grid h-7 w-10 place-items-center rounded-full", view === item.id && "bg-[#dff4a0]")}><item.icon className="h-[18px] w-[18px]" /></span>{item.mobileLabel}{item.count && <span className="absolute right-[20%] top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#ff795f] px-1 text-[9px] text-white">{item.count}</span>}</button>)}
        <Link href="/" className="flex min-w-0 flex-col items-center gap-1 text-[10px] font-semibold text-muted-foreground"><span className="grid h-7 w-10 place-items-center"><CircleUserRound className="h-[18px] w-[18px]" /></span>Cliente</Link>
      </nav>
      {composerOpen && <ListingComposer onClose={() => setComposerOpen(false)} />}
    </div>
  );
}

function DesktopSidebar({ view, onViewChange, onCreate }: { view: ProviderView; onViewChange: (view: ProviderView) => void; onCreate: () => void }) {
  return <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-[#103f35] p-4 text-white lg:flex">
    <Link href="/" className="flex h-14 items-center px-3" aria-label="Fechô, voltar ao marketplace"><BrandLogo markClassName="text-white" wordmarkClassName="text-white" /></Link>
    <div className="mt-5 px-3"><p className="text-[10px] font-bold uppercase text-white/45">Espaço de trabalho</p><p className="mt-1 text-sm font-bold text-white/90">Carlos Elétrica</p></div>
    <nav className="mt-5 space-y-1" aria-label="Área do prestador">{navigation.map((item) => <button key={item.id} type="button" onClick={() => onViewChange(item.id)} className={cn("flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-semibold transition", view === item.id ? "bg-[#c9f24a] text-[#103f35]" : "text-white/70 hover:bg-white/10 hover:text-white")}><item.icon className="h-[18px] w-[18px]" /><span>{item.label}</span>{item.count && <span className={cn("ml-auto grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px]", view === item.id ? "bg-[#103f35] text-white" : "bg-[#ff795f] text-white")}>{item.count}</span>}</button>)}</nav>
    <button type="button" onClick={onCreate} className="mt-6 flex h-11 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 text-sm font-bold transition hover:bg-white/15"><Plus className="h-4 w-4" /> Novo anúncio</button>
    <div className="mt-auto border-t border-white/15 pt-4"><div className="flex items-center gap-3 px-2"><span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20"><Image src="/images/carlos.jpg" alt="Carlos Mendes" fill sizes="40px" className="object-cover" /></span><span className="min-w-0"><strong className="block truncate text-sm">Carlos Mendes</strong><span className="block text-xs text-white/50">Perfil verificado</span></span><MoreHorizontal className="ml-auto h-4 w-4 text-white/50" /></div><Link href="/" className="mt-3 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold text-white/55 hover:bg-white/10 hover:text-white">Ver como cliente <ArrowUpRight className="h-3.5 w-3.5" /></Link></div>
  </aside>;
}

function MobileHeader({ onCreate }: { onCreate: () => void }) {
  return <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-white/95 px-4 backdrop-blur lg:hidden"><Link href="/" aria-label="Fechô, voltar ao marketplace"><BrandLogo markClassName="h-9 w-9" wordmarkClassName="text-[23px]" /></Link><span className="ml-3 rounded-full bg-[#dcf0e7] px-2 py-1 text-[9px] font-black uppercase text-[#28644f]">Prestador</span><button type="button" onClick={onCreate} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-foreground text-white" aria-label="Anunciar serviço"><Plus className="h-4 w-4" /></button><button type="button" className="relative ml-2 grid h-9 w-9 place-items-center rounded-full border bg-white" aria-label="Notificações"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ff795f] ring-2 ring-white" /></button></header>;
}

function Overview({ available, onAvailabilityChange, onViewChange, onCreateListing }: { available: boolean; onAvailabilityChange: () => void; onViewChange: (view: ProviderView) => void; onCreateListing: () => void }) {
  return <>
    <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-[#527637]">Boa tarde, Carlos</p><h2 className="mt-1 max-w-2xl text-[28px] font-black leading-tight sm:text-[34px]">Hoje tem trabalho pra fechar.</h2><p className="mt-2 text-sm text-muted-foreground">Duas pessoas estão esperando sua resposta.</p></div><button type="button" onClick={onAvailabilityChange} className="flex w-full items-center justify-between gap-4 rounded-md border bg-white px-4 py-3 text-left shadow-[0_5px_18px_rgba(16,63,53,0.05)] sm:w-auto" aria-pressed={available}><span><span className="flex items-center gap-2 text-sm font-bold"><span className={cn("h-2 w-2 rounded-full", available ? "bg-[#7da51d]" : "bg-muted-foreground")} />{available ? "Aceitando solicitações" : "Perfil pausado"}</span><span className="mt-0.5 block pl-4 text-[11px] text-muted-foreground">Visível para clientes próximos</span></span><span className={cn("relative h-6 w-11 shrink-0 rounded-full transition", available ? "bg-[#8caf24]" : "bg-muted-foreground/30")}><span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white shadow transition", available ? "left-6" : "left-1")} /></span></button></section>
    <section className="mt-7 grid gap-4 xl:grid-cols-[1.45fr_0.75fr]"><div className="relative overflow-hidden rounded-lg bg-[#103f35] p-5 text-white sm:p-7"><BrandMark className="pointer-events-none absolute -bottom-10 -right-7 h-44 w-44 text-white/[0.06]" accentClassName="text-[#c9f24a]/10" /><div className="relative"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[#ff795f] px-3 py-1 text-[10px] font-black uppercase text-white">Precisa de você</span><span className="text-xs text-white/50">há 12 min</span></div><h3 className="mt-5 max-w-xl text-xl font-black sm:text-2xl">Mariana quer instalar 3 luminárias hoje.</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/65"><span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#c9f24a]" />Vila Mariana · 1,4 km</span><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#c9f24a]" />18:30</span><strong className="text-white">R$ 150</strong></div><div className="mt-6 flex flex-wrap gap-2"><button type="button" className="rounded-md bg-[#c9f24a] px-4 py-2.5 text-sm font-black text-[#103f35]">Responder agora</button><button type="button" className="rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">Ver detalhes</button></div></div></div><div className="rounded-lg bg-[#dcecf7] p-5 text-[#163d54] sm:p-6"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase text-[#416f89]">Setembro</span><WalletCards className="h-5 w-5" /></div><p className="mt-7 text-xs text-[#416f89]">Você já ganhou</p><strong className="mt-1 block text-[32px] font-black leading-none">R$ 2.840</strong><div className="mt-5 flex items-center justify-between border-t border-[#163d54]/15 pt-4"><span className="text-xs">18 serviços concluídos</span><span className="flex items-center gap-1 text-xs font-bold text-[#176c4e]">+18% <ArrowUpRight className="h-3.5 w-3.5" /></span></div></div></section>
    <section className="mt-4 grid grid-cols-3 overflow-hidden rounded-lg border bg-white"><Metric label="Avaliação" value="4,98" detail="127 avaliações" icon={<Star className="h-4 w-4 fill-[#f4be37] text-[#f4be37]" />} /><Metric label="Resposta" value="98%" detail="média de 8 min" icon={<MessageCircle className="h-4 w-4 text-[#416f89]" />} /><Metric label="Perfil" value="90%" detail="quase completo" icon={<CheckCircle2 className="h-4 w-4 text-[#527637]" />} /></section>
    <div className="mt-10 grid gap-10 xl:grid-cols-[1.45fr_0.75fr] xl:gap-8"><section><SectionHeading kicker="Entrada" title="Solicitações recentes" count="4" action={<button type="button" onClick={() => onViewChange("requests")} className="flex items-center gap-1 text-sm font-bold">Ver todas <ChevronRight className="h-4 w-4" /></button>} /><div className="mt-4 space-y-3">{requests.slice(0, 3).map((request) => <RequestRow key={request.id} request={request} compact />)}</div></section><aside className="space-y-9"><section><SectionHeading kicker="Próximos" title="Na agenda" action={<button type="button" onClick={() => onViewChange("calendar")} className="text-sm font-bold">Ver agenda</button>} /><div className="relative mt-5 space-y-5 before:absolute before:bottom-3 before:left-[17px] before:top-3 before:w-px before:bg-border">{agenda.slice(0, 2).map((item) => <AgendaTimelineItem key={`${item.day}-${item.time}`} item={item} />)}</div></section><section className="rounded-lg border bg-white p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-bold text-[#527637]">SEUS ANÚNCIOS</p><h3 className="mt-1 text-lg font-black">2 ativos agora</h3></div><Eye className="h-5 w-5 text-muted-foreground" /></div><p className="mt-2 text-sm leading-6 text-muted-foreground">496 visualizações e 27 solicitações neste mês.</p><button type="button" onClick={onCreateListing} className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md border text-sm font-bold hover:bg-muted"><Plus className="h-4 w-4" /> Criar novo anúncio</button></section></aside></div>
  </>;
}

function Metric({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: ReactNode }) {
  return <div className="min-w-0 border-r p-3 last:border-r-0 sm:flex sm:items-center sm:gap-3 sm:p-5"><span className="hidden h-9 w-9 shrink-0 place-items-center rounded-md bg-[#f4f6f1] sm:grid">{icon}</span><div className="min-w-0"><span className="block truncate text-[10px] font-bold uppercase text-muted-foreground sm:text-xs">{label}</span><strong className="mt-1 block text-lg font-black sm:inline sm:text-xl">{value}</strong><span className="mt-0.5 block truncate text-[9px] text-muted-foreground sm:ml-2 sm:inline sm:text-xs">{detail}</span></div></div>;
}

function SectionHeading({ kicker, title, count, action }: { kicker?: string; title: string; count?: string; action?: ReactNode }) {
  return <div className="flex items-end justify-between gap-4"><div>{kicker && <p className="text-[10px] font-black uppercase text-[#527637]">{kicker}</p>}<div className="mt-1 flex items-center gap-2"><h2 className="text-xl font-black">{title}</h2>{count && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#e3e7df] px-1.5 text-[10px] font-black">{count}</span>}</div></div>{action}</div>;
}

function RequestsView({ filter, onFilterChange, requests: visibleRequests }: { filter: RequestFilter; onFilterChange: (filter: RequestFilter) => void; requests: typeof requests }) {
  const filters: RequestFilter[] = ["Todas", "Nova", "Em conversa", "Confirmada"];
  return <section><PageIntro eyebrow="Atendimento" title="Solicitações" description="Tudo o que chegou dos seus anúncios, organizado por etapa." /><div className="mt-7 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between"><div className="scrollbar-hide flex gap-2 overflow-x-auto">{filters.map((item) => <button key={item} type="button" onClick={() => onFilterChange(item)} className={cn("h-9 shrink-0 rounded-full border bg-white px-4 text-xs font-bold", filter === item && "border-foreground bg-foreground text-white")}>{item}</button>)}</div><span className="text-xs text-muted-foreground">{visibleRequests.length} solicitações</span></div><div className="mt-5 grid gap-3">{visibleRequests.map((request) => <RequestRow key={request.id} request={request} />)}</div></section>;
}

function RequestRow({ request, compact = false }: { request: (typeof requests)[number]; compact?: boolean }) {
  return <article className={cn("rounded-lg border bg-white p-4 transition hover:border-[#9eb19f] hover:shadow-[0_8px_24px_rgba(16,63,53,0.06)] sm:p-5", request.status === "Nova" && "border-l-[3px] border-l-[#ff795f]")}><div className="flex gap-3 sm:gap-4"><span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-black", request.status === "Nova" ? "bg-[#ffe2da] text-[#9f3825]" : "bg-[#e8efea] text-[#356b52]")}>{request.initials}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-black">{request.service}</h3><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black uppercase", statusStyles[request.status])}>{request.status}</span></div><p className="mt-1 text-xs text-muted-foreground"><strong className="text-foreground/75">{request.customer}</strong> · {request.createdAt}</p></div><strong className="text-sm">{request.price}</strong></div>{!compact && <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/65">{request.message}</p>}<div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{request.location} · {request.distance}</span><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{request.date}, {request.time}</span></div><div className="mt-4 flex flex-wrap gap-2"><button type="button" className="flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-bold hover:bg-muted"><MessageCircle className="h-3.5 w-3.5" /> Conversar</button><button type="button" className="h-9 rounded-md px-3 text-xs font-bold text-muted-foreground hover:bg-muted">Ver detalhes</button>{request.status === "Nova" && <button type="button" className="h-9 rounded-md bg-foreground px-4 text-xs font-bold text-white">Aceitar</button>}</div></div></div></article>;
}

function CalendarView() {
  return <section><PageIntro eyebrow="Organização" title="Sua agenda" description="Visualize os compromissos e proteja os horários em que não pode atender." action={<button type="button" className="rounded-md border bg-white px-4 py-2.5 text-sm font-bold">Definir disponibilidade</button>} /><div className="scrollbar-hide mt-7 flex gap-2 overflow-x-auto rounded-lg border bg-white p-3">{["Ter 15", "Qua 16", "Qui 17", "Sex 18", "Sáb 19", "Dom 20", "Seg 21"].map((day, index) => <button key={day} type="button" className={cn("flex h-[72px] min-w-[78px] flex-col items-center justify-center rounded-md text-xs font-semibold", index === 0 ? "bg-[#103f35] text-white" : "hover:bg-muted")}><span className={index === 0 ? "text-[#c9f24a]" : "text-muted-foreground"}>{day.split(" ")[0]}</span><strong className="mt-1 text-xl">{day.split(" ")[1]}</strong></button>)}</div><div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.65fr]"><div><SectionHeading kicker="Próximos dias" title="Serviços marcados" /><div className="relative mt-5 space-y-5 before:absolute before:bottom-5 before:left-[19px] before:top-5 before:w-px before:bg-border">{agenda.map((item) => <AgendaTimelineItem key={`${item.day}-${item.time}`} item={item} detailed />)}</div></div><aside className="h-fit rounded-lg bg-[#dcecf7] p-5 text-[#163d54]"><Clock3 className="h-5 w-5" /><h2 className="mt-3 text-lg font-black">Horários de atendimento</h2><p className="mt-2 text-sm leading-6 text-[#416f89]">Segunda a sexta, das 08:00 às 19:00. Sábado, das 08:00 às 13:00.</p><button type="button" className="mt-5 w-full rounded-md bg-white px-4 py-2.5 text-sm font-bold">Editar horários</button></aside></div></section>;
}

function AgendaTimelineItem({ item, detailed = false }: { item: (typeof agenda)[number]; detailed?: boolean }) {
  return <article className="relative flex gap-4"><span className="z-10 mt-2 h-9 w-9 shrink-0 rounded-full border-4 border-[#f4f6f1] bg-[#8caf24]" /><div className="min-w-0 flex-1 rounded-lg border bg-white p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase text-[#527637]">{item.weekday}, {item.day} {item.month} · {item.time}</p><h3 className="mt-1 text-sm font-black">{item.service}</h3><p className="mt-1 text-xs text-muted-foreground">{item.customer} · {item.location}</p></div><strong className="shrink-0 text-sm">{item.value}</strong></div>{detailed && <div className="mt-4 flex gap-2 border-t pt-3"><button type="button" className="text-xs font-bold">Ver detalhes</button><button type="button" className="ml-auto flex items-center gap-1 text-xs font-bold text-[#356b52]"><MessageCircle className="h-3.5 w-3.5" /> Conversar</button></div>}</div></article>;
}

function ListingsView({ onCreate }: { onCreate: () => void }) {
  return <section><PageIntro eyebrow="Seu catálogo" title="Meus anúncios" description="Acompanhe a procura e mantenha cada serviço atualizado." action={<button type="button" onClick={onCreate} className="flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-bold text-white"><Plus className="h-4 w-4" /> Novo anúncio</button>} /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}<button type="button" onClick={onCreate} className="flex min-h-[330px] flex-col items-center justify-center rounded-lg border border-dashed border-[#91a796] bg-white/50 p-6 text-center hover:bg-white"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#dff4a0]"><Plus className="h-5 w-5" /></span><strong className="mt-4">Anunciar outro serviço</strong><span className="mt-1 max-w-48 text-xs leading-5 text-muted-foreground">Defina preço, fotos e os horários que deseja trabalhar.</span></button></div></section>;
}

function ListingCard({ listing }: { listing: (typeof listings)[number] }) {
  return <article className="group overflow-hidden rounded-lg border bg-white"><div className="relative aspect-[16/10] overflow-hidden"><Image src={listing.image} alt="" fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover transition duration-300 group-hover:scale-[1.02]" /><span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase shadow-sm"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#8caf24]" />Publicado</span><button type="button" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm" aria-label="Mais opções"><MoreHorizontal className="h-4 w-4" /></button></div><div className="p-4"><h3 className="font-black">{listing.title}</h3><p className="mt-1 text-sm"><strong>{listing.price}</strong> <span className="text-xs text-muted-foreground">{listing.detail}</span></p><div className="mt-4 grid grid-cols-3 border-y py-3 text-center"><ListingMetric icon={<Eye />} value={listing.views} label="visitas" /><ListingMetric icon={<Heart />} value={listing.favorites} label="salvos" /><ListingMetric icon={<MessageCircle />} value={listing.requests} label="solicitações" /></div><button type="button" className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-bold hover:bg-muted">Editar anúncio</button></div></article>;
}

function ListingMetric({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return <span className="min-w-0 border-r px-1 last:border-r-0"><span className="mx-auto flex items-center justify-center gap-1 text-xs font-black [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}{value}</span><span className="mt-0.5 block truncate text-[9px] text-muted-foreground">{label}</span></span>;
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase text-[#527637]">{eyebrow}</p><h2 className="mt-1 text-[28px] font-black leading-tight sm:text-[34px]">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{description}</p></div>{action}</div>;
}

function ListingComposer({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0a211c]/70 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="listing-composer-title"><button type="button" onClick={onClose} className="absolute inset-0" aria-label="Fechar" /><div className="relative z-10 max-h-[94vh] w-full overflow-y-auto rounded-t-lg bg-white shadow-2xl sm:max-w-2xl sm:rounded-lg"><header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4 sm:px-7"><div><p className="text-[10px] font-black uppercase text-[#527637]">Novo anúncio</p><h2 id="listing-composer-title" className="text-xl font-black">Coloque seu serviço no Fechô</h2></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted" aria-label="Fechar"><X className="h-5 w-5" /></button></header><div className="space-y-5 p-5 sm:p-7"><div className="flex items-center gap-3 rounded-md bg-[#dcf0e7] p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white"><Check className="h-4 w-4 text-[#356b52]" /></span><p className="text-xs leading-5 text-[#285b49]">Você poderá revisar tudo antes de publicar para os clientes.</p></div><Field label="Título do serviço"><input className="h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-foreground" placeholder="Ex.: Instalações e reparos elétricos" /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Categoria"><select className="h-11 w-full rounded-md border bg-white px-3 text-sm outline-none"><option>Elétrica</option><option>Reparos</option><option>Montagem</option><option>Limpeza</option></select></Field><Field label="Forma de cobrança"><select className="h-11 w-full rounded-md border bg-white px-3 text-sm outline-none"><option>Preço por serviço</option><option>A partir de</option><option>Por hora</option><option>Por diária</option></select></Field></div><Field label="Valor inicial"><div className="flex h-11 items-center rounded-md border px-3 focus-within:border-foreground"><span className="text-sm font-bold text-muted-foreground">R$</span><input type="number" className="h-full min-w-0 flex-1 px-2 text-sm outline-none" placeholder="0,00" /></div></Field><Field label="Descrição"><textarea rows={4} className="w-full resize-none rounded-md border p-3 text-sm outline-none focus:border-foreground" placeholder="Conte o que está incluso e como funciona o atendimento." /></Field><button type="button" className="flex min-h-24 w-full items-center justify-center gap-2 rounded-md border border-dashed bg-[#f7f8f4] text-sm font-bold"><Plus className="h-4 w-4" /> Adicionar fotos</button></div><footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t bg-white px-5 py-4 sm:px-7"><button type="button" onClick={onClose} className="px-3 py-2 text-sm font-bold">Cancelar</button><button type="button" className="rounded-md bg-foreground px-5 py-3 text-sm font-bold text-white">Revisar anúncio</button></footer></div></div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}</label>;
}
