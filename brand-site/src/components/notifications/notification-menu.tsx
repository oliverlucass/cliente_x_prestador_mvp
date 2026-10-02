"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  name: string;
  service: string;
  text: string;
  time: string;
  unread: boolean;
  avatar: string;
};

const notifications: Notification[] = [
  {
    id: "ana",
    name: "Ana Paula",
    service: "Limpeza completa da sua casa",
    text: "Posso ir sábado às 09:00. O valor fica R$ 180.",
    time: "14:10",
    unread: true,
    avatar: "/images/ana.jpg",
  },
  {
    id: "carlos",
    name: "Carlos Mendes",
    service: "Instalações e reparos elétricos",
    text: "Consigo passar hoje. Fica R$ 150 pela visita.",
    time: "09:15",
    unread: false,
    avatar: "/images/carlos.jpg",
  },
  {
    id: "rafael",
    name: "Rafael Nunes",
    service: "Montagem de móveis e pequenos reparos",
    text: "Fechado. Segunda às 14:00, R$ 120.",
    time: "Ontem",
    unread: false,
    avatar: "/images/rafael.jpg",
  },
  {
    id: "joao",
    name: "João Oliveira",
    service: "Pintura residencial sem bagunça",
    text: "Fechado. Quarto por R$ 350, pintura na sexta.",
    time: "Sex",
    unread: false,
    avatar: "/images/joao.jpg",
  },
];

export function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const router = useRouter();
  const hasUnread = notifications.some((notification) => notification.unread);

  const openChat = (id: string) => {
    setOpen(false);
    router.push(`/conversas?conversa=${id}`);
  };

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
    <div className="relative ml-auto lg:ml-0" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          open && "bg-muted",
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={panelId}
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5" />
        {hasUnread && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#a7ce32] ring-2 ring-background" />
        )}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Notificações"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-[#dce5d8] bg-white text-foreground shadow-[0_16px_40px_rgba(20,61,50,0.14)]"
        >
          <div className="px-4 pb-2 pt-3">
            <p className="text-sm font-semibold leading-5">Notificações</p>
            <p className="mt-0.5 text-xs leading-4 text-muted-foreground">Negociações</p>
          </div>
          <div className="mx-3 h-px bg-[#dce5d8]" role="separator" />
          {notifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Nenhuma notificação por enquanto.
            </p>
          ) : (
            <ul className="max-h-[min(24rem,70vh)] overflow-y-auto p-2">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <button
                    type="button"
                    onClick={() => openChat(notification.id)}
                    className="flex h-[102px] w-full items-start gap-3 overflow-hidden rounded-lg px-2 py-2.5 text-left transition hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="relative mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-[#dce5d8]">
                      <Image
                        src={notification.avatar}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="truncate text-sm font-semibold leading-5">{notification.name}</span>
                        <span className="shrink-0 text-xs leading-4 text-muted-foreground">{notification.time}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs leading-4 text-muted-foreground">
                        {notification.service}
                      </span>
                      <span className="mt-1 line-clamp-2 h-10 text-sm leading-5 text-foreground">{notification.text}</span>
                      {notification.unread && <span className="sr-only">Não lida</span>}
                    </span>
                    {notification.unread && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#a7ce32]" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
