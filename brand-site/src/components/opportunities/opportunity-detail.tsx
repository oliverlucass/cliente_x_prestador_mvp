"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, Check, CheckCircle2, Clock3, MapPin, MessageCircle, ShieldCheck, Star, UsersRound, X } from "lucide-react";

import type { Opportunity } from "@/types/opportunity";

interface OpportunityDetailProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export function OpportunityDetail({ opportunity, onClose }: OpportunityDetailProps) {
  const [interested, setInterested] = useState(false);
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45" role="dialog" aria-modal="true" aria-label={`Detalhes de ${opportunity.title}`}>
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Fechar detalhes" />
      <aside className="absolute inset-y-0 right-0 w-full overflow-x-hidden overflow-y-auto bg-[#f7f8f4] shadow-2xl sm:w-[88%] lg:w-[72%] xl:w-[68%]">
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/95 px-4 backdrop-blur sm:px-7">
          <div><p className="text-[10px] font-bold uppercase text-[#527637]">Oportunidade perto de você</p><p className="text-sm font-bold">{opportunity.neighborhood}</p></div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border bg-white hover:bg-muted" aria-label="Fechar"><X className="h-5 w-5" /></button>
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
          <div className="min-w-0 bg-white">
            <div className="relative aspect-[16/8] min-h-[230px] overflow-hidden sm:min-h-[320px]">
              <Image src={opportunity.imageUrl} alt={opportunity.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white px-3 py-1.5 text-xs font-bold">{opportunity.category}</span>
            </div>

            <div className="space-y-7 p-5 sm:p-8">
              <section>
                <p className="text-xs font-semibold text-[#527637]">Publicado {opportunity.publishedAt}</p>
                <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">{opportunity.title}</h2>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {opportunity.neighborhood} · {opportunity.distance.toFixed(1).replace(".", ",")} km</span>
                  <span className="flex items-center gap-1.5"><UsersRound className="h-4 w-4" /> {opportunity.interests} interessados</span>
                </div>
              </section>

              <section className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-[#fafbf8] p-4"><CalendarDays className="h-5 w-5 text-[#527637]" /><p className="mt-3 text-xs font-bold uppercase text-muted-foreground">Quando</p><p className="mt-1 font-bold">{opportunity.dateLabel}</p></div>
                <div className="rounded-lg border bg-[#fafbf8] p-4"><Clock3 className="h-5 w-5 text-[#527637]" /><p className="mt-3 text-xs font-bold uppercase text-muted-foreground">Horário</p><p className="mt-1 font-bold">{opportunity.timeLabel}</p></div>
              </section>

              <section className="border-t pt-7"><h3 className="text-lg font-black">O que o cliente precisa</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{opportunity.description}</p></section>

              <section className="flex items-center gap-4 border-t pt-7">
                <Image src={opportunity.clientImageUrl} alt={opportunity.clientName} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <div><p className="flex items-center gap-1.5 font-black">{opportunity.clientName} {opportunity.verified && <CheckCircle2 className="h-4 w-4 fill-[#dff3e7] text-[#356b52]" />}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-foreground" /> {opportunity.clientRating.toFixed(1).replace(".", ",")} · {opportunity.completedHires} serviços contratados</p></div>
              </section>

              <div className="flex gap-3 rounded-lg bg-[#eef6e9] p-4 text-sm text-[#234438]"><ShieldCheck className="h-5 w-5 shrink-0" /><p><strong>Endereço protegido.</strong> A localização exata só aparece depois que cliente e profissional confirmarem o serviço.</p></div>
            </div>
          </div>

          <div className="min-w-0 p-4 sm:p-7">
            <div className="sticky top-24 rounded-lg border bg-white p-5 shadow-[0_12px_35px_rgba(10,35,29,0.08)] sm:p-6">
              {!interested ? <>
                <p className="text-[10px] font-bold uppercase text-[#527637]">Orçamento sugerido</p>
                <p className="mt-1 text-3xl font-black">{opportunity.budgetLabel}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">O valor final é combinado diretamente com o cliente antes da confirmação.</p>
                <div className="my-5 border-t" />
                <label className="text-xs font-bold">Sua mensagem</label>
                <textarea defaultValue={`Olá, ${opportunity.clientName.split(" ")[0]}! Tenho experiência com esse tipo de serviço e disponibilidade para conversar.`} className="mt-2 min-h-28 w-full resize-none rounded-md border bg-white p-3 text-sm leading-5 outline-none focus:border-foreground" />
                <label className="mt-4 block text-xs font-bold">Valor que você sugere</label>
                <div className="mt-2 flex h-11 items-center rounded-md border px-3"><span className="text-sm font-bold">R$</span><input inputMode="decimal" placeholder={String(opportunity.budget)} className="w-full bg-transparent px-2 text-sm outline-none" /></div>
                <button type="button" onClick={() => setInterested(true)} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#c9f24a] text-sm font-black text-foreground transition hover:bg-[#d7fa68]"><MessageCircle className="h-4 w-4" /> Tenho interesse</button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">Sem compromisso. O cliente decide com quem conversar.</p>
              </> : <div className="py-4 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e9f8b5]"><Check className="h-7 w-7" /></span>
                <h3 className="mt-4 text-xl font-black">Interesse enviado</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{opportunity.clientName.split(" ")[0]} recebeu seu perfil, mensagem e valor sugerido. A conversa aparece em Solicitações.</p>
                <button type="button" onClick={onClose} className="mt-6 h-11 w-full rounded-md border text-sm font-bold hover:bg-muted">Continuar explorando</button>
              </div>}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
