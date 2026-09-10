"use client";

import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bell, BriefcaseBusiness, CheckCircle2, ChevronDown, CircleUserRound,
  Compass, Drill, Flower2, Heart, House, LayoutGrid, ListFilter,
  LocateFixed, Map as MapIcon, MapPin, MessageCircle, Navigation,
  PaintRoller, PawPrint, Search, SlidersHorizontal, SprayCan,
  Wrench, X, Zap,
} from "lucide-react";

import { BrandLogo, BrandMark } from "@/components/brand/brand-logo";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceDetail } from "@/components/services/service-detail";
import { categories, services } from "@/data/mock/services";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

const categoryIcons: Record<string, LucideIcon> = {
  Todos: LayoutGrid,
  Limpeza: SprayCan,
  Reparos: Wrench,
  Elétrica: Zap,
  Pintura: PaintRoller,
  Montagem: Drill,
  Jardinagem: Flower2,
  "Pet care": PawPrint,
};

const quickSearches = ["Pintor", "Eletricista", "Montador", "Diarista"];
const neighborhoods = ["Vila Mariana, São Paulo", "Moema, São Paulo", "Pinheiros, São Paulo", "Tatuapé, São Paulo"];

export function MarketplaceHome() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Vila Mariana, São Paulo");
  const [locationOpen, setLocationOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [todayOnly, setTodayOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [radius, setRadius] = useState(6);
  const [view, setView] = useState<"list" | "map">("list");
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filtered = useMemo(() => services.filter((service) => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    const matchesQuery = !term || [service.title, service.provider, service.profession, service.category, ...service.tags]
      .some((value) => value.toLocaleLowerCase("pt-BR").includes(term));
    const matchesCategory = activeCategory === "Todos" || service.category === activeCategory;
    return matchesQuery && matchesCategory && service.distance <= radius && (!todayOnly || service.availableToday);
  }), [query, activeCategory, radius, todayOnly]);

  const toggleSave = (id: string) => setSaved((current) => current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id]);

  const runSearch = () => document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <a href="#inicio" className="shrink-0" aria-label="Fechô, página inicial">
            <BrandLogo />
          </a>
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            <a href="#servicos" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Explorar</a>
            <button type="button" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Meus pedidos</button>
            <button type="button" className="rounded-md border border-foreground bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90">Anunciar serviço</button>
          </nav>
          <button type="button" className="relative ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:ml-0" aria-label="Notificações"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#a7ce32] ring-2 ring-background" /></button>
          <button type="button" className="hidden h-10 items-center gap-2 rounded-full border bg-white px-2 pr-3 text-sm font-semibold sm:flex"><CircleUserRound className="h-6 w-6" /> Entrar</button>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden bg-foreground text-white">
        <BrandMark className="pointer-events-none absolute right-8 top-8 hidden h-52 w-52 text-white/[0.08] md:block lg:right-16 lg:top-1/2 lg:h-72 lg:w-72 lg:-translate-y-1/2 lg:text-white/[0.12]" accentClassName="text-[#c9f24a]" />
        <div className="relative mx-auto max-w-[1440px] px-4 pb-9 pt-9 sm:px-6 md:pb-12 md:pt-12 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-[#c9f24a]"><BrandMark className="h-6 w-6 text-white md:hidden" accentClassName="text-[#c9f24a]" /> Serviços reais, gente por perto</p>
            <h1 className="max-w-2xl text-[34px] font-black leading-[1.06] sm:text-5xl md:text-[56px]">Achou, conversou, <span className="text-[#c9f24a]">fechô.</span></h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">Explore anúncios, compare profissionais e escolha um horário. Sem disputa de orçamento e sem enrolação.</p>
          </div>

          <div className="mt-7 max-w-4xl rounded-lg bg-white p-2 text-foreground shadow-[0_16px_50px_rgba(0,0,0,0.24)] sm:flex sm:items-stretch">
            <label className="relative block flex-1 border-b p-3 sm:border-b-0 sm:border-r sm:px-4">
              <span className="block text-[11px] font-bold uppercase text-muted-foreground">O que você procura?</span>
              <Search className="absolute bottom-4 left-4 h-5 w-5 text-muted-foreground sm:left-5" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && runSearch()} placeholder="Ex.: pintor ou montagem de móveis" className="mt-1 h-7 w-full bg-transparent pl-8 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground" />
            </label>
            <button type="button" onClick={() => setLocationOpen(true)} className="flex min-h-[66px] flex-1 items-center gap-3 p-3 text-left hover:bg-muted/60 sm:px-4">
              <MapPin className="h-5 w-5 shrink-0 text-[#527637]" />
              <span className="min-w-0"><span className="block text-[11px] font-bold uppercase text-muted-foreground">Onde?</span><span className="mt-1 block truncate text-sm font-semibold">{location}</span></span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </button>
            <button type="button" onClick={runSearch} className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#c9f24a] px-6 text-sm font-black text-foreground transition hover:bg-[#d7fa68] sm:h-auto sm:w-auto"><Search className="h-4 w-4" /> Buscar</button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60"><span>Buscas rápidas:</span>{quickSearches.map((item) => <button key={item} type="button" onClick={() => { setQuery(item); runSearch(); }} className="rounded-full border border-white/20 px-3 py-1.5 text-white transition hover:border-[#c9f24a] hover:text-[#c9f24a]">{item}</button>)}</div>
        </div>
      </section>

      <section className="border-b bg-white">
        <div className="scrollbar-hide mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-4 sm:px-6 md:justify-center lg:px-10">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return <button key={category} type="button" onClick={() => setActiveCategory(category)} className={cn("flex min-w-[82px] shrink-0 flex-col items-center gap-1.5 border-b-2 px-3 py-4 text-xs font-semibold transition", activeCategory === category ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}><Icon className="h-5 w-5" />{category}</button>;
          })}
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 md:py-10 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase text-[#527637]">Anúncios perto de {location.split(",")[0]}</p><h2 className="mt-1 text-2xl font-black sm:text-3xl">Escolha quem combina com você</h2><p className="mt-1 text-sm text-muted-foreground">{filtered.length} profissionais num raio de até {radius} km</p></div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setTodayOnly((value) => !value)} className={cn("flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold", todayOnly ? "border-foreground bg-foreground text-background" : "bg-white")}><CheckCircle2 className="h-4 w-4" /> Hoje</button>
            <button type="button" onClick={() => setShowFilters((value) => !value)} className={cn("flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold", showFilters ? "border-foreground bg-muted" : "bg-white")}><SlidersHorizontal className="h-4 w-4" /> <span className="hidden sm:inline">Filtros</span></button>
            <div className="flex rounded-md border bg-white p-1"><button type="button" onClick={() => setView("list")} className={cn("grid h-8 w-8 place-items-center rounded-sm", view === "list" && "bg-foreground text-background")} aria-label="Ver anúncios"><ListFilter className="h-4 w-4" /></button><button type="button" onClick={() => setView("map")} className={cn("grid h-8 w-8 place-items-center rounded-sm", view === "map" && "bg-foreground text-background")} aria-label="Ver mapa"><MapIcon className="h-4 w-4" /></button></div>
          </div>
        </div>

        {showFilters && <div className="mt-5 flex flex-wrap items-center gap-3 border-y bg-white py-4"><span className="text-sm font-semibold">Distância:</span>{[3, 6, 10].map((value) => <button key={value} type="button" onClick={() => setRadius(value)} className={cn("h-9 rounded-full border px-4 text-sm", radius === value && "border-foreground bg-foreground text-white")}>Até {value} km</button>)}<span className="hidden h-6 w-px bg-border sm:block" /><span className="text-sm text-muted-foreground">Os preços publicados são definidos por cada profissional.</span></div>}

        {view === "list" ? (
          filtered.length ? <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((service) => <ServiceCard key={service.id} service={service} saved={saved.includes(service.id)} onSave={() => toggleSave(service.id)} onOpen={() => setSelectedService(service)} />)}</div> : <div className="mt-10 border-y py-16 text-center"><Search className="mx-auto h-8 w-8 text-muted-foreground" /><h3 className="mt-3 text-lg font-bold">Nada por aqui ainda</h3><p className="mt-1 text-sm text-muted-foreground">Tente aumentar a distância ou buscar outro serviço.</p></div>
        ) : (
          <div className="relative mt-7 h-[520px] overflow-hidden rounded-lg border bg-[#dcead8]">
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(32deg,transparent_45%,white_46%,white_50%,transparent_51%),linear-gradient(122deg,transparent_45%,white_46%,white_50%,transparent_51%)] [background-size:130px_130px]" />
            <div className="absolute left-[8%] top-[12%] h-32 w-52 rounded-[50%] border-2 border-dashed border-[#79a68c]/50" />
            {filtered.map((service, index) => <button key={service.id} type="button" onClick={() => setSelectedService(service)} className="absolute z-10 rounded-full bg-foreground px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:scale-105" style={{ left: `${12 + (index * 16) % 72}%`, top: `${18 + (index * 23) % 62}%` }}>{service.priceLabel.replace("A partir de ", "")}</button>)}
            <button type="button" onClick={() => setLocationOpen(true)} className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold shadow-lg"><Navigation className="h-4 w-4" /> Alterar região</button>
          </div>
        )}
      </section>

      <section className="mt-5 border-y bg-[#e6eee7] text-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.6fr] md:items-center md:py-16 lg:px-10">
          <div><p className="text-xs font-bold uppercase">Tem um talento?</p><h2 className="mt-2 text-3xl font-black">Transforme seu tempo livre em renda.</h2><p className="mt-3 max-w-md text-sm leading-6 text-foreground/70">Publique seu anúncio, escolha como cobrar e abra apenas os horários em que quiser trabalhar.</p><button type="button" className="mt-6 rounded-md bg-foreground px-5 py-3 text-sm font-bold text-white">Criar meu anúncio</button></div>
          <div className="grid grid-cols-3 gap-3">{[{ icon: BriefcaseBusiness, value: "Você anuncia", label: "serviço e preço" }, { icon: MessageCircle, value: "Vocês conversam", label: "direto no app" }, { icon: CheckCircle2, value: "Você confirma", label: "o melhor horário" }].map((item) => <div key={item.label} className="border-l border-foreground/20 pl-3 sm:pl-5"><item.icon className="mb-5 h-5 w-5" /><strong className="block text-sm sm:text-base">{item.value}</strong><span className="mt-1 block text-xs text-foreground/60">{item.label}</span></div>)}</div>
        </div>
      </section>

      <footer className="bg-white px-4 py-7 text-center text-xs text-muted-foreground"><p><strong className="brand-wordmark mr-1 text-sm text-foreground">fechô</strong> Marketplace local de serviços · Conceito 2026</p></footer>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-white/95 px-1 pt-2 backdrop-blur md:hidden" aria-label="Navegação principal">{[{ icon: House, label: "Início" }, { icon: Compass, label: "Explorar" }, { icon: Wrench, label: "Pedidos" }, { icon: Heart, label: "Salvos" }, { icon: CircleUserRound, label: "Perfil" }].map((item, index) => <button key={item.label} type="button" className={cn("flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium", index === 0 ? "text-foreground" : "text-muted-foreground")}><item.icon className={cn("h-5 w-5", index === 0 && "fill-[#c9f24a]")} />{item.label}</button>)}</nav>

      {locationOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 sm:items-center" role="dialog" aria-modal="true" aria-label="Escolher região"><button type="button" className="absolute inset-0" onClick={() => setLocationOpen(false)} aria-label="Fechar" /><div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-lg bg-white shadow-2xl sm:rounded-lg"><div className="flex items-center justify-between border-b px-5 py-4"><div><h2 className="font-bold">Onde você quer buscar?</h2><p className="text-xs text-muted-foreground">A localização é aproximada até a confirmação.</p></div><button type="button" onClick={() => setLocationOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted" aria-label="Fechar"><X className="h-5 w-5" /></button></div><div className="grid sm:grid-cols-[0.9fr_1.1fr]"><div className="p-5"><label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input placeholder="Bairro, cidade ou CEP" className="h-11 w-full rounded-md border pl-10 pr-3 text-sm outline-none focus:border-foreground" /></label><button type="button" className="mt-3 flex w-full items-center gap-2 rounded-md bg-[#e9f8b5] px-3 py-3 text-sm font-semibold"><LocateFixed className="h-4 w-4" /> Usar minha localização</button><div className="mt-4 space-y-1">{neighborhoods.map((item) => <button key={item} type="button" onClick={() => { setLocation(item); setLocationOpen(false); }} className={cn("flex w-full items-center gap-2 rounded-md px-3 py-3 text-left text-sm hover:bg-muted", location === item && "bg-muted font-semibold")}><MapPin className="h-4 w-4 text-muted-foreground" />{item}</button>)}</div></div><div className="relative hidden min-h-[360px] bg-[#dcead8] sm:block"><div className="absolute inset-0 opacity-50 [background-image:linear-gradient(32deg,transparent_45%,white_46%,white_50%,transparent_51%),linear-gradient(122deg,transparent_45%,white_46%,white_50%,transparent_51%)] [background-size:100px_100px]" /><div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#356b52]/50 bg-[#c9f24a]/20" /><span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground text-white shadow-lg"><MapPin className="h-5 w-5" /></span></div></div></div></div>}

      <ServiceDetail key={selectedService?.id ?? "empty"} service={selectedService} saved={selectedService ? saved.includes(selectedService.id) : false} onSave={() => selectedService && toggleSave(selectedService.id)} onClose={() => setSelectedService(null)} />
    </div>
  );
}
