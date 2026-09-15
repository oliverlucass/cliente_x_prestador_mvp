"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight, BadgeCheck, CalendarCheck, CalendarDays, Check, CheckCircle2,
  ChevronLeft, Clock3, Hammer, Heart, Home, MapPin, ShieldCheck,
  Star, X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { AvailabilityCalendar } from "@/components/services/availability-calendar";
import { ProviderReviews } from "@/components/services/provider-reviews";
import { ServiceNegotiation } from "@/components/services/service-negotiation";
import type { Service } from "@/types/service";

interface ServiceDetailProps {
  service: Service | null;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}

type Stage = "booking" | "requested" | "provider" | "confirmed";
const selectedTime = "A combinar";
const galleryPool = [
  "/images/eletrica.jpg",
  "/images/hidraulica.jpg",
  "/images/montagem.jpg",
  "/images/pintura.jpg",
  "/images/limpeza.jpg",
  "/images/jardinagem.jpg",
];

function formatFullDate(value: string) {
  if (!value) return "Data a combinar";
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

function getInitialAvailableDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ServiceDetail({ service, saved, onSave, onClose }: ServiceDetailProps) {
  const [stage, setStage] = useState<Stage>("booking");
  const [selectedDate, setSelectedDate] = useState(getInitialAvailableDate);
  const [message] = useState("Preciso instalar duas luminárias na sala.");
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [alternateOpen, setAlternateOpen] = useState(false);
  const [counterOffer, setCounterOffer] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);

  if (!service) return null;

  const selectedDateLabel = formatFullDate(selectedDate);
  const galleryImages = [service.imageUrl, ...galleryPool.filter((image) => image !== service.imageUrl)].slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 md:flex md:justify-end" role="dialog" aria-modal="true" aria-label={`Detalhes de ${service.title}`}>
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Fechar detalhes" />
      <section className="absolute inset-x-0 bottom-0 z-10 max-h-[95dvh] overflow-y-auto rounded-t-lg bg-background shadow-2xl md:inset-y-0 md:left-auto md:w-[70vw] md:max-h-none md:rounded-none">
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
          <button type="button" onClick={stage === "booking" ? onClose : () => setStage(stage === "provider" ? "requested" : "booking")} className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Voltar"><ChevronLeft className="h-5 w-5" /></button>
          <p className="text-sm font-semibold">{stage === "provider" ? "Visão do prestador" : stage === "confirmed" ? "Serviço confirmado" : stage === "requested" ? "Acompanhar solicitação" : "Detalhes do serviço"}</p>
          {stage === "booking" ? <button type="button" onClick={onSave} className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Favoritar"><Heart className={cn("h-5 w-5", saved && "fill-[#ff6d62] text-[#ff6d62]")} /></button> : <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Fechar"><X className="h-5 w-5" /></button>}
        </div>

        {stage === "booking" && <>
          <div className="grid h-[300px] grid-cols-2 grid-rows-[1.35fr_1fr_1fr] gap-1 overflow-hidden bg-muted md:h-[390px] md:grid-cols-[1.45fr_1fr_1fr] md:grid-rows-2">
            <button type="button" onClick={() => setActiveGalleryImage(0)} className="relative col-span-2 row-span-1 min-h-0 overflow-hidden md:col-span-1 md:row-span-2" aria-label="Ver foto principal">
              <Image src={galleryImages[activeGalleryImage]} alt={service.imageAlt} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" priority />
            </button>
            {galleryImages.slice(1).map((image, index) => <button key={image} type="button" onClick={() => setActiveGalleryImage(index + 1)} className="relative min-h-0 overflow-hidden" aria-label={`Ver foto ${index + 2}`}><Image src={image} alt={`Foto do serviço de ${service.profession}`} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition hover:scale-105" />{index === 3 && <span className="absolute bottom-3 right-3 rounded-md bg-white px-3 py-2 text-xs font-semibold shadow-sm">Ver todas as fotos</span>}</button>)}
          </div>
          <div className="gap-5 bg-[#f7f9f4] p-4 sm:p-5 md:grid md:grid-cols-[3fr_2fr] md:items-start">
          <div className="min-w-0 rounded-lg border bg-white px-5 pb-8 pt-6 shadow-sm sm:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold leading-tight">{service.title}</h2>
              <p className="leading-7 text-muted-foreground">{service.description}</p>
              <div className="flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-md bg-[#D7FA68] px-3 py-1.5 text-xs font-medium">{tag}</span>)}</div>
            </div>

            <div className="mt-6 flex items-center gap-3 border-t py-5"><div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted"><Image src={service.providerImageUrl} alt={service.provider} fill sizes="56px" className="object-cover" /></div><div className="min-w-0 flex-1"><p className="flex items-center gap-1 font-semibold">{service.provider} {service.verified && <BadgeCheck className="h-4 w-4 fill-foreground text-white" />}</p><p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Hammer className="h-4 w-4 shrink-0" /> {service.profession} · {service.completedJobs} serviços</p><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Home className="h-4 w-4 shrink-0" /> {service.neighborhood}, {service.city} · {service.distance.toFixed(1).replace(".", ",")} km</p><p className="mt-1 text-xs font-medium text-[#327054]">{service.responseTime}</p></div></div>
            <ProviderReviews service={service} />

            <div className="mt-8">
              <h3 className="text-lg font-bold">Disponibilidade de {service.provider.split(" ")[0]}</h3>
              <AvailabilityCalendar value={selectedDate} onChange={setSelectedDate} />
            </div>

            <div className="mt-6 flex gap-3 rounded-lg bg-[#edf7ef] py-4 pr-4"><ShieldCheck className="h-5 w-5 shrink-0 text-[#277246]" /><div><p className="text-sm font-semibold">Primeiro vocês combinam</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Enviar a solicitação não confirma nem cobra o serviço. {service.provider} revisa os detalhes e aceita o horário.</p></div></div>
          </div>
          <ServiceNegotiation service={service} />
          </div>
        </>}

        {stage === "requested" && <div className="px-5 py-7 sm:px-8">
          <div className={cn("rounded-lg p-5", counterOffer ? "bg-[#fff6d9]" : "bg-[#e9f8b5]")}><span className="grid h-11 w-11 place-items-center rounded-full bg-white"><Clock3 className="h-5 w-5" /></span><h2 className="mt-4 text-2xl font-black">{counterOffer ? `${service.provider.split(" ")[0]} sugeriu outro horário` : "Solicitação enviada"}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{counterOffer ? "Confira a nova opção e confirme se funcionar para você." : `${service.provider.split(" ")[0]} recebeu os detalhes e pode aceitar ou sugerir uma mudança.`}</p></div>

          <div className="mt-5 rounded-lg border bg-white p-5"><div className="flex items-center gap-3"><div className="relative h-11 w-11 overflow-hidden rounded-full"><Image src={service.providerImageUrl} alt={service.provider} fill sizes="44px" className="object-cover" /></div><div><p className="font-semibold">{service.provider}</p><p className="text-xs text-muted-foreground">{service.responseTime}</p></div><span className="ml-auto rounded-full bg-[#eef3e9] px-2.5 py-1 text-xs font-semibold">{counterOffer ? "Sua vez" : "Aguardando"}</span></div><dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm"><div><dt className="text-xs text-muted-foreground">Data</dt><dd className="mt-1 capitalize font-semibold">{counterOffer ? "sábado, 09:00" : selectedDateLabel}</dd></div><div><dt className="text-xs text-muted-foreground">Horário</dt><dd className="mt-1 font-semibold">{counterOffer ? "09:00" : selectedTime}</dd></div><div className="col-span-2"><dt className="text-xs text-muted-foreground">Seu pedido</dt><dd className="mt-1 leading-6">{message}</dd></div></dl></div>

          {counterOffer ? <button type="button" onClick={() => setStage("confirmed")} className="mt-4 h-12 w-full rounded-md bg-foreground font-semibold text-white">Aceitar sábado às 09:00</button> : <div className="mt-6"><p className="text-sm font-bold">O que acontece agora</p><ol className="mt-4 space-y-4"><StatusStep done label="Você enviou os detalhes" detail="Agora mesmo" /><StatusStep active label={`${service.provider.split(" ")[0]} revisa o pedido`} detail="Normalmente responde em poucos minutos" /><StatusStep label="Horário confirmado" detail="Depois do aceite, entra na agenda dos dois" /></ol><button type="button" onClick={() => setStage("provider")} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md border bg-white font-semibold">Ver como chega para {service.provider.split(" ")[0]} <ArrowRight className="h-4 w-4" /></button></div>}
        </div>}

        {stage === "provider" && <div className="px-5 py-7 sm:px-8"><div className="rounded-lg bg-foreground p-5 text-white"><p className="text-xs font-bold uppercase text-[#c9f24a]">Novo pedido perto de você</p><h2 className="mt-2 text-2xl font-black">Instalação de luminárias</h2><p className="mt-2 flex items-center gap-1.5 text-sm text-white/70"><MapPin className="h-4 w-4" /> Vila Mariana · 1,2 km</p></div>
          <div className="mt-5 rounded-lg border bg-white p-5"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#eef3e9] font-bold">PB</span><div><p className="font-semibold">Pedro B.</p><p className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-foreground" /> 5,0 · 8 contratações</p></div></div><p className="mt-5 rounded-md bg-muted p-4 text-sm leading-6">“{message}”</p><dl className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-xs text-muted-foreground">Quando</dt><dd className="mt-1 capitalize font-semibold">{selectedDateLabel}, {selectedTime}</dd></div><div><dt className="text-xs text-muted-foreground">Seu anúncio</dt><dd className="mt-1 font-semibold">{service.priceLabel}</dd></div></dl></div>
          {alternateOpen ? <div className="mt-4 rounded-lg border bg-white p-4"><p className="text-sm font-bold">Sugira um horário livre</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => { setCounterOffer(true); setStage("requested"); }} className="rounded-md border bg-[#e9f8b5] px-3 py-3 text-sm font-semibold">Sábado · 09:00</button><button type="button" onClick={() => { setCounterOffer(true); setStage("requested"); }} className="rounded-md border px-3 py-3 text-sm font-semibold">Segunda · 14:00</button></div></div> : <div className="mt-5 grid gap-2 sm:grid-cols-2"><button type="button" onClick={() => setAlternateOpen(true)} className="h-12 rounded-md border bg-white font-semibold">Sugerir outro horário</button><button type="button" onClick={() => setStage("confirmed")} className="h-12 rounded-md bg-[#c9f24a] font-bold text-foreground">Aceitar serviço</button></div>}
          <p className="mt-4 text-center text-xs text-muted-foreground">O endereço completo só aparece depois da confirmação.</p>
        </div>}

        {stage === "confirmed" && <div className="px-5 py-7 sm:px-8"><div className="rounded-lg bg-[#e9f8b5] p-6 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-foreground text-[#c9f24a]"><Check className="h-7 w-7" strokeWidth={3} /></span><h2 className="mt-4 text-2xl font-black">Fechô!</h2><p className="mt-2 text-sm text-muted-foreground">O serviço foi confirmado e já está na agenda.</p></div>
          <div className="mt-5 rounded-lg border bg-white p-5"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase text-muted-foreground">{service.title}</p><p className="mt-1 capitalize font-bold">{counterOffer ? "sábado" : selectedDateLabel} · {counterOffer ? "09:00" : selectedTime}</p></div><CalendarCheck className="h-6 w-6 text-[#327054]" /></div><div className="mt-4 flex items-center gap-3 border-t pt-4"><div className="relative h-10 w-10 overflow-hidden rounded-full"><Image src={service.providerImageUrl} alt={service.provider} fill sizes="40px" className="object-cover" /></div><div><p className="text-sm font-semibold">{service.provider}</p><p className="text-xs text-muted-foreground">{service.neighborhood}, São Paulo</p></div></div></div>
          <button type="button" onClick={() => setCalendarAdded(true)} className={cn("mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md border bg-white font-semibold", calendarAdded && "bg-[#edf7ef] text-[#277246]")}>{calendarAdded ? <CheckCircle2 className="h-4 w-4" /> : <CalendarDays className="h-4 w-4" />}{calendarAdded ? "Adicionado à agenda" : "Adicionar à agenda"}</button>
          <div className="mt-7"><p className="text-sm font-bold">Tudo organizado</p><ol className="mt-4 space-y-4"><StatusStep done label="Pedido aceito" detail={`${service.provider.split(" ")[0]} confirmou o serviço`} /><StatusStep active label="Serviço agendado" detail="Você receberá um lembrete antes do horário" /><StatusStep label="Conclusão e avaliação" detail="Avalie somente depois que o trabalho terminar" /></ol></div>
        </div>}
      </section>
    </div>
  );
}

function StatusStep({ label, detail, done, active }: { label: string; detail: string; done?: boolean; active?: boolean }) {
  return <li className="flex gap-3"><span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs", done && "border-[#327054] bg-[#327054] text-white", active && "border-[#a3c82f] bg-[#e9f8b5]")}>{done ? <Check className="h-3.5 w-3.5" /> : active ? <Clock3 className="h-3.5 w-3.5" /> : "3"}</span><div><p className="text-sm font-semibold">{label}</p><p className="mt-0.5 text-xs text-muted-foreground">{detail}</p></div></li>;
}
