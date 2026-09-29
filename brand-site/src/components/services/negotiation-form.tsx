"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft, ArrowRight, CalendarDays, Camera, Check, Clock3,
  MapPin, ShieldCheck, X,
} from "lucide-react";

import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import type { Service } from "@/types/service";

type FormValues = {
  title: string;
  description: string;
  neighborhood: string;
  city: string;
  place: string;
  materials: string;
  date: string;
  period: string;
  urgency: string;
  offer: string;
};

type Photo = { id: string; name: string; preview: string };

const inputClass = "mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm text-foreground outline-none transition focus:border-[#357258] focus:ring-2 focus:ring-[#dcebdc]";
const textareaClass = "mt-2 w-full resize-y rounded-md border bg-white px-3 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-[#357258] focus:ring-2 focus:ring-[#dcebdc]";

export function NegotiationForm({ service, initialDate, initialOffer, initialLocation }: { service: Service; initialDate: string; initialOffer: string; initialLocation: string }) {
  const [initialNeighborhood, ...initialCityParts] = initialLocation.split(",").map((part) => part.trim());
  const [values, setValues] = useState<FormValues>({
    title: "",
    description: "",
    neighborhood: initialNeighborhood,
    city: initialCityParts.join(", ") || service.city,
    place: "",
    materials: "",
    date: initialDate,
    period: "A combinar",
    urgency: "Flexível",
    offer: initialOffer,
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [formError, setFormError] = useState("");
  const [readingPhotos, setReadingPhotos] = useState(false);
  const [step, setStep] = useState<"form" | "review" | "done">("form");

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFormError("");
  };

  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!selected.length) return;
    if (readingPhotos) return;
    if (selected.length + photos.length > 4) {
      setPhotoError("Você pode selecionar até 4 imagens.");
      return;
    }
    if (selected.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setPhotoError("Use JPG, PNG ou WebP de até 5 MB por imagem.");
      return;
    }

    setPhotoError("");
    setReadingPhotos(true);
    try {
      const next = await Promise.all(selected.map((file, index) => new Promise<Photo>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ id: `${Date.now()}-${index}`, name: file.name, preview: String(reader.result) });
        reader.onerror = () => reject(new Error("Não foi possível abrir a imagem."));
        reader.readAsDataURL(file);
      })));
      setPhotos((current) => [...current, ...next]);
    } catch {
      setPhotoError("Não foi possível abrir uma das imagens. Tente novamente.");
    } finally {
      setReadingPhotos(false);
    }
  }

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (readingPhotos) return;
    if (values.title.trim().length < 5 || values.description.trim().length < 20 || !values.neighborhood.trim() || !values.city.trim()) {
      setFormError("Preencha título, descrição e localização com informações válidas.");
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const formattedDate = values.date
    ? new Date(`${values.date}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
    : "A combinar";

  return <div className="min-h-screen bg-[#f7f8f4] pb-12">
    <MarketplaceHeader />
    <div className="mx-auto max-w-[1160px] px-4 py-7 sm:px-6 md:py-10 lg:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#356b52] hover:underline"><ArrowLeft className="h-4 w-4" /> Voltar aos serviços</Link>

      {step === "done" ? <div className="mx-auto max-w-2xl py-14 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#dcf0e7] text-[#1f644d]"><Check className="h-7 w-7" /></span>
        <h1 className="mt-5 text-[30px] font-black leading-tight sm:text-[38px]">Prévia concluída</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Você preparou o pedido para {service.provider}. Esta versão ainda não envia a solicitação ao prestador.</p>
        <div className="mt-8 border-y py-5 text-left"><p className="text-xs font-bold uppercase text-[#527637]">Seu pedido</p><h2 className="mt-2 text-lg font-black">{values.title}</h2><p className="mt-1 text-sm text-muted-foreground">{values.neighborhood}, {values.city} · {formattedDate}</p></div>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => setStep("form")} className="h-11 rounded-md border bg-white px-5 text-sm font-bold hover:bg-muted">Editar pedido</button><Link href="/" className="flex h-11 items-center rounded-md bg-foreground px-5 text-sm font-bold text-white">Voltar à vitrine</Link></div>
      </div> : <>
        <div className="mt-7"><p className="text-[10px] font-black uppercase text-[#527637]">Nova negociação</p><h1 className="mt-1 text-[30px] font-black leading-tight sm:text-[38px]">{step === "review" ? "Revise seu pedido" : "Conte o que você precisa"}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{step === "review" ? "Confira os detalhes antes de concluir a prévia." : `Prepare os detalhes que ${service.provider} precisará para avaliar o trabalho e combinar os próximos passos.`}</p></div>

        <div className="mt-5 flex items-center gap-3 border-y py-3 lg:hidden"><span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted"><Image src={service.imageUrl} alt="" fill sizes="56px" className="object-cover" /></span><div className="min-w-0"><p className="truncate text-sm font-bold">{service.title}</p><p className="mt-0.5 text-xs text-muted-foreground">{service.provider}</p><p className="mt-0.5 text-xs font-semibold text-[#356b52]">{service.priceLabel}</p></div></div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          {step === "form" ? <form onSubmit={review} className="min-w-0">
            <section className="border-b pb-8"><SectionTitle number="01" title="O que precisa ser feito" />
              <label className="mt-6 block text-sm font-bold" htmlFor="request-title">Título do pedido <span className="text-[#aa4d3b]">*</span></label>
              <input id="request-title" name="title" required minLength={5} maxLength={80} value={values.title} onChange={(event) => update("title", event.target.value)} placeholder="Ex.: Instalar 3 luminárias na sala" className={inputClass} />
              <label className="mt-5 block text-sm font-bold" htmlFor="request-description">Descrição <span className="text-[#aa4d3b]">*</span></label>
              <textarea id="request-description" name="description" required minLength={20} maxLength={1200} rows={5} value={values.description} onChange={(event) => update("description", event.target.value)} placeholder="Conte o que já está pronto, o que precisa ser feito e qualquer detalhe que ajude no orçamento." className={textareaClass} />
              <p className="mt-1 text-xs text-muted-foreground">Mínimo de 20 caracteres.</p>

              <div className="mt-6 flex items-end justify-between gap-3"><div><label htmlFor="request-photos" className="block text-sm font-bold">Fotos do local ou do problema</label><p className="mt-1 text-xs text-muted-foreground">Até 4 imagens JPG, PNG ou WebP · 5 MB cada.</p></div><span className="text-xs text-muted-foreground">{photos.length}/4</span></div>
              <label htmlFor="request-photos" className="mt-3 flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#a6bea7] bg-white px-4 text-center text-sm font-semibold text-[#356b52] hover:bg-[#f1f7ee]"><Camera className="h-5 w-5" />{readingPhotos ? "Preparando imagens..." : "Adicionar imagens"}</label>
              <input id="request-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => void addPhotos(event)} className="sr-only" aria-describedby={photoError ? "photo-error" : undefined} />
              {photoError && <p id="photo-error" role="alert" className="mt-2 text-xs font-semibold text-[#9f3825]">{photoError}</p>}
              {photos.length > 0 && <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">{photos.map((photo) => <li key={photo.id} className="relative min-w-0 overflow-hidden rounded-md border bg-white"><div className="relative aspect-square"><Image src={photo.preview} alt={photo.name} fill unoptimized sizes="160px" className="object-cover" /></div><p className="truncate px-2 py-2 text-[11px]" title={photo.name}>{photo.name}</p><button type="button" onClick={() => setPhotos((current) => current.filter((item) => item.id !== photo.id))} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-white text-foreground shadow-sm hover:bg-muted" aria-label={`Remover ${photo.name}`}><X className="h-4 w-4" /></button></li>)}</ul>}
            </section>

            <section className="border-b py-8"><SectionTitle number="02" title="Local e condições" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><div><label htmlFor="request-neighborhood" className="text-sm font-bold">Bairro ou região <span className="text-[#aa4d3b]">*</span></label><input id="request-neighborhood" required value={values.neighborhood} onChange={(event) => update("neighborhood", event.target.value)} placeholder="Ex.: Vila Mariana" className={inputClass} /></div><div><label htmlFor="request-city" className="text-sm font-bold">Cidade <span className="text-[#aa4d3b]">*</span></label><input id="request-city" required value={values.city} onChange={(event) => update("city", event.target.value)} className={inputClass} /></div></div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />O endereço exato pode ser combinado depois.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label htmlFor="request-place" className="text-sm font-bold">Tipo de local <span className="text-[#aa4d3b]">*</span></label><select id="request-place" required value={values.place} onChange={(event) => update("place", event.target.value)} className={inputClass}><option value="">Selecione</option><option>Residência</option><option>Empresa</option><option>Área externa</option><option>Outro local</option></select></div><div><label htmlFor="request-materials" className="text-sm font-bold">Materiais e equipamentos</label><select id="request-materials" value={values.materials} onChange={(event) => update("materials", event.target.value)} className={inputClass}><option value="">A combinar</option><option>Já tenho o necessário</option><option>Preciso que o prestador leve</option></select></div></div>
            </section>

            <section className="border-b py-8"><SectionTitle number="03" title="Quando e por quanto" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><div><label htmlFor="request-date" className="text-sm font-bold">Data preferida</label><input id="request-date" type="date" min={new Date().toLocaleDateString("sv-SE")} value={values.date} onChange={(event) => update("date", event.target.value)} className={inputClass} /></div><div><label htmlFor="request-period" className="text-sm font-bold">Período</label><select id="request-period" value={values.period} onChange={(event) => update("period", event.target.value)} className={inputClass}><option>A combinar</option><option>Manhã</option><option>Tarde</option><option>Noite</option></select></div></div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label htmlFor="request-urgency" className="text-sm font-bold">Prazo</label><select id="request-urgency" value={values.urgency} onChange={(event) => update("urgency", event.target.value)} className={inputClass}><option>Flexível</option><option>Nos próximos dias</option><option>Urgente</option></select></div><div><label htmlFor="request-offer" className="text-sm font-bold">Valor que pretende pagar</label><div className="relative"><span className="absolute left-3 top-[30px] text-sm font-bold text-muted-foreground">R$</span><input id="request-offer" type="number" min="1" step="0.01" inputMode="decimal" value={values.offer} onChange={(event) => update("offer", event.target.value)} placeholder="A combinar" className={`${inputClass} pl-10`} /></div></div></div>
              <p className="mt-2 text-xs text-muted-foreground">O valor final depende da conversa com {service.provider.split(" ")[0]}.</p>
            </section>

            {formError && <p role="alert" className="pt-5 text-sm font-semibold text-[#9f3825]">{formError}</p>}
            <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between"><p className="flex max-w-md items-start gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#327054]" />A prévia não gera cobrança. O envio ao prestador ainda não está disponível nesta versão.</p><button type="submit" disabled={readingPhotos} className="flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">Revisar pedido <ArrowRight className="h-4 w-4" /></button></div>
          </form> : <div className="min-w-0">
            <ReviewSection title="Pedido"><p className="text-lg font-black">{values.title}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/75">{values.description}</p>{photos.length > 0 && <div className="mt-4 flex gap-2 overflow-x-auto">{photos.map((photo) => <span key={photo.id} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md"><Image src={photo.preview} alt={photo.name} fill unoptimized sizes="80px" className="object-cover" /></span>)}</div>}</ReviewSection>
            <ReviewSection title="Local"><p className="text-sm font-semibold">{values.neighborhood}, {values.city}</p><p className="mt-1 text-sm text-muted-foreground">{values.place} · {values.materials || "Materiais a combinar"}</p></ReviewSection>
            <ReviewSection title="Agenda e valor"><p className="text-sm font-semibold">{formattedDate} · {values.period}</p><p className="mt-1 text-sm text-muted-foreground">Prazo: {values.urgency} · {values.offer ? `Oferta de R$ ${Number(values.offer).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "Valor a combinar"}</p></ReviewSection>
            <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => setStep("form")} className="h-11 rounded-md border bg-white px-5 text-sm font-bold hover:bg-muted">Editar</button><button type="button" onClick={() => { setStep("done"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="h-11 rounded-md bg-foreground px-5 text-sm font-bold text-white hover:opacity-90">Concluir prévia</button></div>
          </div>}

          <aside className="hidden overflow-hidden rounded-lg border bg-white lg:sticky lg:top-24 lg:block"><div className="relative aspect-[16/9] bg-muted"><Image src={service.imageUrl} alt={service.imageAlt} fill sizes="320px" className="object-cover" /></div><div className="p-5"><p className="text-[10px] font-black uppercase text-[#527637]">Serviço escolhido</p><h2 className="mt-1 text-lg font-black leading-snug">{service.title}</h2><div className="mt-5 flex items-center gap-3 border-y py-4"><span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted"><Image src={service.providerImageUrl} alt={service.provider} fill sizes="40px" className="object-cover" /></span><div><p className="text-sm font-bold">{service.provider}</p><p className="text-xs text-muted-foreground">{service.profession}</p></div></div><div className="mt-4 space-y-2 text-xs text-muted-foreground"><p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{service.neighborhood}, {service.city}</p><p className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{service.responseTime}</p><p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />Horário a combinar com o prestador</p></div><p className="mt-5 border-t pt-4 text-sm"><strong>{service.priceLabel}</strong> <span className="text-xs text-muted-foreground">{service.priceDetail}</span></p></div></aside>
        </div>
      </>}
    </div>
  </div>;
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <div className="flex items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#dff4a0] text-xs font-black text-foreground">{number}</span><h2 className="text-lg font-black">{title}</h2></div>;
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-b py-6 first:pt-0"><h2 className="mb-3 text-xs font-black uppercase text-[#527637]">{title}</h2>{children}</section>;
}
