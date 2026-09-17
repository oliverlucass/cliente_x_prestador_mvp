"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronDown, CircleHelp, LogOut, MessageCircle, Settings } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

function RealizadosIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="16.5" cy="16.75" r="6.5" />
      <path d="M16.5 13.4v3.7l2.6 1.5" />
      <rect
        x="1.5"
        y="4.5"
        width="14"
        height="11.5"
        rx="2"
        className="fill-white transition-colors group-hover:fill-[#eef3e9]"
      />
      <path d="M12.5 16V3.75a1.8 1.8 0 0 0-1.8-1.8H7.3A1.8 1.8 0 0 0 5.5 3.75V16" />
    </svg>
  );
}

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative hidden sm:block" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-2 rounded-full border bg-white px-2 pr-3 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <span className="relative h-6 w-6 overflow-hidden rounded-full bg-muted ring-1 ring-[#dce5d8]">
          <Image src="/images/carlos.jpg" alt="Foto de usuario_demo" fill sizes="24px" className="object-cover" />
        </span>
        <span>Entrar</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 rounded-xl border border-[#dce5d8] bg-white p-2 text-foreground shadow-[0_16px_40px_rgba(20,61,50,0.14)]"
          role="menu"
          aria-label="Menu da conta"
        >
          <div className="flex items-center gap-2.5 px-2 py-2">
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-[#dce5d8]">
              <Image src="/images/carlos.jpg" alt="Foto de usuario_demo" fill sizes="32px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex min-w-0 items-center gap-1">
                <span className="truncate text-sm font-semibold leading-5">Carlos Garcia</span>
                <BadgeCheck className="h-4 w-4 shrink-0 text-[#327054]" aria-hidden="true" />
                <span className="sr-only">Verificado</span>
              </span>
              <span className="mt-0.5 block truncate text-xs leading-4 text-muted-foreground">
                Meu perfil
              </span>
            </span>
          </div>

          <div className="mx-2 my-1.5 h-px bg-[#dce5d8]" role="separator" />

          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            Orçamentos
          </button>
          <button
            type="button"
            className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            <RealizadosIcon />
            Realizados
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            <Settings className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            Configurações
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            <CircleHelp className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            Suporte
          </button>

          <div className="mx-2 my-1.5 h-px bg-[#dce5d8]" role="separator" />

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            Encerrar
          </Link>
        </div>
      )}
    </div>
  );
}
