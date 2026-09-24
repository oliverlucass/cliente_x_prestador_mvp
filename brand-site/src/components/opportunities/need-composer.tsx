"use client";

import { useState } from "react";
import { Check, ChevronRight, ImagePlus, MapPin, X } from "lucide-react";

interface NeedComposerProps {
  open: boolean;
  onClose: () => void;
}
export function NeedComposer({ open, onClose }: NeedComposerProps) {
  const [published, setPublished] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 sm:items-center" role="dialog" aria-modal="true" aria-label="Publicar uma necessidade">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Fechar" />
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-lg bg-white shadow-2xl sm:rounded-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4 sm:px-7"><div><p className="text-[10px] font-bold uppercase text-[#527637]">Novo anúncio</p><h2 className="text-lg font-black">Conte o que você precisa</h2></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted" aria-label="Fechar"><X className="h-5 w-5" /></button></div>
        {!published ? <div className="space-y-5 p-5 sm:p-7">
          <div className="rounded-lg bg-[#eef6e9] p-4 text-sm leading-5 text-[#234438]"><strong>Você mantém o controle.</strong> Profissionais interessados enviam uma apresentação e você escolhe com quem conversar.</div>
          <label className="block"><span className="text-xs font-bold">Título do serviço</span><input placeholder="Ex.: Preciso instalar duas luminárias" className="mt-2 h-12 w-full rounded-md border px-3 text-sm outline-none focus:border-foreground" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="text-xs font-bold">Categoria</span><select defaultValue="" className="mt-2 h-12 w-full rounded-md border bg-white px-3 text-sm outline-none"><option value="" disabled>Selecione</option><option>Elétrica</option><option>Montagem</option><option>Limpeza</option><option>Pintura</option><option>Reparos</option></select></label>
            <label><span className="text-xs font-bold">Quando</span><select className="mt-2 h-12 w-full rounded-md border bg-white px-3 text-sm outline-none"><option>Data flexível</option><option>Hoje</option><option>Amanhã</option><option>Neste fim de semana</option></select></label>
          </div>
          <label className="block"><span className="text-xs font-bold">Onde</span><div className="relative mt-2"><MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input defaultValue="Vila Mariana, São Paulo" className="h-12 w-full rounded-md border pl-10 pr-3 text-sm outline-none focus:border-foreground" /></div></label>
          <label className="block"><span className="text-xs font-bold">Descreva o serviço</span><textarea placeholder="Inclua medidas, condições do local e o que você já possui." className="mt-2 min-h-28 w-full resize-none rounded-md border p-3 text-sm outline-none focus:border-foreground" /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label><span className="text-xs font-bold">Orçamento aproximado</span><div className="mt-2 flex h-12 items-center rounded-md border px-3"><strong className="text-sm">R$</strong><input inputMode="decimal" placeholder="200" className="w-full px-2 text-sm outline-none" /></div></label><button type="button" className="mt-auto flex h-12 items-center justify-center gap-2 rounded-md border border-dashed text-sm font-bold text-muted-foreground hover:bg-muted"><ImagePlus className="h-4 w-4" /> Adicionar fotos</button></div>
          <button type="button" onClick={() => setPublished(true)} className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground text-sm font-black text-white hover:bg-[#1b4d3e]">Publicar necessidade <ChevronRight className="h-4 w-4" /></button>
          <p className="text-center text-[11px] text-muted-foreground">Protótipo visual: nenhum anúncio será publicado de verdade.</p>
        </div> : <div className="p-8 text-center sm:p-12"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e9f8b5]"><Check className="h-8 w-8" /></span><h3 className="mt-5 text-2xl font-black">Pronto para receber interessados</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Seu anúncio foi preparado. Profissionais próximos poderão demonstrar interesse e iniciar uma conversa.</p><button type="button" onClick={() => { setPublished(false); onClose(); }} className="mt-7 h-11 rounded-md bg-foreground px-6 text-sm font-bold text-white">Voltar para oportunidades</button></div>}
      </div>
    </div>
  );
}
