"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import type { Service } from "@/types/service";

export function ServiceNegotiation({ service }: { service: Service }) {
  const [editingValue, setEditingValue] = useState(false);
  const [proposalValue, setProposalValue] = useState("");

  return (
    <aside className="h-fit md:sticky md:top-14" aria-labelledby="negotiation-title">
      <div className="rounded-lg border bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[#527637]">Negocie direto com o prestador</p>
        <h3 id="negotiation-title" className="mt-2 text-xl font-black text-foreground">Combine o melhor valor</h3>

        <div className="mt-6 flex items-start justify-between gap-3 border-b pb-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Valor ofertado</p>
            {editingValue ? (
              <div className="relative mt-2 max-w-[220px]">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">R$</span>
                <input
                  autoFocus
                  type="number"
                  inputMode="decimal"
                  value={proposalValue}
                  onChange={(event) => setProposalValue(event.target.value)}
                  placeholder="0,00"
                  aria-label="Novo valor ofertado"
                  className="h-11 w-full rounded-md border bg-[#fbfcf9] pl-10 pr-3 text-xl font-black text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground focus:border-foreground"
                />
              </div>
            ) : <p className="mt-1 text-3xl font-black text-foreground">{service.priceLabel}</p>}
            <p className="mt-1 text-sm text-muted-foreground">{service.priceDetail}</p>
          </div>
          <button type="button" onClick={() => { setProposalValue(""); setEditingValue(true); }} className="mt-5 grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-white text-foreground transition hover:bg-muted" aria-label="Editar valor ofertado">
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <button type="button" className="mt-5 h-12 w-full rounded-md bg-foreground px-4 text-sm font-bold text-white transition hover:opacity-90">
          Enviar solicitacao
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">O valor será combinado com o prestador antes da confirmação.</p>
      </div>
    </aside>
  );
}
