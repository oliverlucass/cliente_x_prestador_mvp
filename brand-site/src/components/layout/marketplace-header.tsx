"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

import { AccountMenu } from "@/components/account/account-menu";
import { BrandLogo } from "@/components/brand/brand-logo";

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0" aria-label="Fechô, página inicial">
          <BrandLogo />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <Link href="/#explorar" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Explorar</Link>
          <button type="button" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Meus pedidos</button>
          <button type="button" className="rounded-md border border-foreground bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90">Anunciar serviço</button>
        </nav>
        <button type="button" className="relative ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:ml-0" aria-label="Notificações"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#a7ce32] ring-2 ring-background" /></button>
        <AccountMenu />
      </div>
    </header>
  );
}
