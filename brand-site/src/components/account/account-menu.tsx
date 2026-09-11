"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function AccountMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-2 rounded-full border bg-white px-2 pr-3 text-sm font-semibold transition hover:bg-muted"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
          <Image src="/images/carlos.jpg" alt="Foto de usuario_demo" fill sizes="24px" className="object-cover" />
        </span>
        <span>Entrar</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 rounded-lg border bg-white p-2 shadow-xl" role="menu" aria-label="Menu da conta">
          <button type="button" className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition hover:bg-muted" role="menuitem">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image src="/images/carlos.jpg" alt="Foto de usuario_demo" fill sizes="40px" className="object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-foreground">usuario_demo</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">Usuário conectado</span>
            </span>
          </button>
          <Link href="/login" className="mt-1 flex w-full items-center rounded-md px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50" role="menuitem">
            Encerrar
          </Link>
        </div>
      )}
    </div>
  );
}
