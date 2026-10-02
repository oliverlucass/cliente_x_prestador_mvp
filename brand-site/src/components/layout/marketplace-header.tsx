"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AccountMenu } from "@/components/account/account-menu";
import { BrandLogo } from "@/components/brand/brand-logo";
import { NotificationMenu } from "@/components/notifications/notification-menu";
import { cn } from "@/lib/utils";

export function MarketplaceHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const onConversations = pathname === "/conversas";

  return (
    <header className="sticky top-0 z-40 shrink-0 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0" aria-label="Fechô, página inicial">
          <BrandLogo />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <Link href="/#explorar" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Explorar</Link>
          <button
            type="button"
            onClick={() => router.push("/conversas")}
            aria-current={onConversations ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted",
              onConversations && "bg-muted",
            )}
          >
            Negociações
          </button>
          <button type="button" className="rounded-md border border-foreground bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90">Anunciar serviço</button>
        </nav>
        <NotificationMenu />
        <AccountMenu />
      </div>
    </header>
  );
}
