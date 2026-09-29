import { History, X } from "lucide-react";

import { cn } from "@/lib/utils";

export function HistoryButton({ open, onClick, className }: { open: boolean; onClick: () => void; className?: string }) {
  return <button
    type="button"
    onClick={onClick}
    className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", open ? "border-[#174b3e] bg-[#174b3e] text-white shadow-[0_0_0_2px_#d8e9d5] hover:bg-[#0e382e]" : "border-[#cbdacf] bg-white text-[#356b52] hover:border-[#91ad98] hover:bg-[#edf5ea]", className)}
    aria-label={open ? "Ocultar histórico do serviço" : "Ver histórico do serviço"}
    aria-expanded={open}
    title={open ? "Ocultar histórico do serviço" : "Ver histórico do serviço"}
  >
    {open ? <X className="h-4 w-4" aria-hidden="true" /> : <History className="h-4 w-4" aria-hidden="true" />}
  </button>;
}
