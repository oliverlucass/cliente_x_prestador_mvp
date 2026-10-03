"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Mail } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  name: string;
  label: string;
  text: string;
  time: string;
  unread: boolean;
  tone: "system" | "person";
  avatar?: string;
};

const initialNotifications: Notification[] = [
  {
    id: "fecho-email",
    name: "Fechô",
    label: "Ação necessária",
    text: "confirme seu e-mail para receber avisos de proposta.",
    time: "Agora",
    unread: false,
    tone: "system",
  },
  {
    id: "ana",
    name: "Ana Paula",
    label: "Nova proposta",
    text: "sábado às 09:00, R$ 180.",
    time: "14:10",
    unread: true,
    tone: "person",
    avatar: "/images/ana.jpg",
  },
  {
    id: "carlos",
    name: "Carlos Mendes",
    label: "Mensagem",
    text: "pode ir hoje, fica R$ 150 pela visita. Levo o material.",
    time: "09:15",
    unread: true,
    tone: "person",
    avatar: "/images/carlos.jpg",
  },
  {
    id: "rafael",
    name: "Rafael Nunes",
    label: "Mensagem",
    text: "segunda às 14:00, R$ 120.",
    time: "Ontem",
    unread: false,
    tone: "person",
    avatar: "/images/rafael.jpg",
  },
  {
    id: "luciana",
    name: "Luciana Prado",
    label: "Nova proposta",
    text: "sábado às 08:00, R$ 140.",
    time: "Seg",
    unread: false,
    tone: "person",
    avatar: "/images/luciana.jpg",
  },
];

function NotificationCopy({ notification }: { notification: Notification }) {
  return (
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-semibold leading-5">{notification.name}</span>
      <span className="mt-0.5 block text-sm leading-5 text-foreground">
        <span className="font-semibold">{notification.label}:</span> {notification.text}
      </span>
    </span>
  );
}

function NotificationAvatar({ notification }: { notification: Notification }) {
  if (notification.tone === "system") {
    return (
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground" aria-hidden="true">
        <Mail className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className="relative mt-0.5 h-9 w-9 shrink-0">
      {notification.unread && (
        <span className="absolute -left-3.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#a7ce32]" aria-hidden="true" />
      )}
      <span className="relative block h-9 w-9 overflow-hidden rounded-full bg-muted ring-1 ring-[#dce5d8]">
        <Image src={notification.avatar ?? ""} alt="" fill sizes="36px" className="object-cover" />
      </span>
    </span>
  );
}

export function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [statusMessage, setStatusMessage] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();
  const router = useRouter();
  const hasUnread = notifications.some((notification) => notification.unread);

  const openChat = (id: string) => {
    setOpen(false);
    router.push(`/conversas?conversa=${id}`);
  };

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => (notification.unread ? { ...notification, unread: false } : notification)),
    );
    setStatusMessage("Notificações marcadas como lidas.");
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
          aria-labelledby={titleId}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-[#dce5d8] bg-white text-foreground shadow-[0_16px_40px_rgba(20,61,50,0.14)]"
        >
          <header className="flex items-center justify-between gap-3 py-3 pl-5 pr-4">
            <h2 id={titleId} className="text-sm font-semibold leading-5">
              Notificações
            </h2>
            <button
              type="button"
              onClick={markAllRead}
              disabled={!hasUnread}
              className="rounded-md px-1 text-sm font-semibold leading-5 text-foreground transition hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Marcar lidas
            </button>
          </header>
          <p className="sr-only" aria-live="polite">
            {statusMessage}
          </p>
          {notifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">Nenhuma notificação por enquanto.</p>
          ) : (
            <ul className="max-h-[min(24rem,70vh)] overflow-y-auto">
              {notifications.map((notification) => (
                <li key={notification.id} className={cn(notification.tone === "system" && "bg-[#eef3e9]")}>
                  {notification.tone === "system" ? (
                    // Inert until the confirm-email action exists.
                    <div className="flex items-start gap-3 py-2.5 pl-5 pr-4">
                      <NotificationAvatar notification={notification} />
                      <NotificationCopy notification={notification} />
                      <span className="shrink-0 text-xs leading-5 text-muted-foreground">{notification.time}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openChat(notification.id)}
                      className="flex w-full items-start gap-3 py-2.5 pl-5 pr-4 text-left transition hover:bg-[#eef3e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:bg-muted"
                    >
                      <NotificationAvatar notification={notification} />
                      <NotificationCopy notification={notification} />
                      <span className="shrink-0 text-xs leading-5 text-muted-foreground">{notification.time}</span>
                      {notification.unread && <span className="sr-only">Não lida</span>}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
