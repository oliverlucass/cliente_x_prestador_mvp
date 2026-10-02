"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronDown, MapPin, SendHorizontal, Star } from "lucide-react";

import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { services } from "@/data/mock/services";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

type Message = {
  id: string;
  from: "you" | "them";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  service: string;
  preview: string;
  time: string;
  unread: boolean;
  avatar: string;
  photo: string;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: "ana",
    name: "Ana Paula",
    service: "Limpeza completa da sua casa",
    preview: "Posso ir sábado às 09:00. O valor fica R$ 180.",
    time: "14:10",
    unread: true,
    avatar: "/images/ana.jpg",
    photo: "/images/limpeza.jpg",
    messages: [
      { id: "ana-1", from: "you", text: "Oi Ana, preciso de uma limpeza completa no sábado.", time: "13:42" },
      { id: "ana-2", from: "them", text: "Posso ir sábado às 09:00. O valor fica R$ 180.", time: "14:10" },
    ],
  },
  {
    id: "carlos",
    name: "Carlos Mendes",
    service: "Instalações e reparos elétricos",
    preview: "Consigo passar hoje. Fica R$ 150 pela visita.",
    time: "09:15",
    unread: false,
    avatar: "/images/carlos.jpg",
    photo: "/images/eletrica.jpg",
    messages: [
      { id: "carlos-1", from: "you", text: "O disjuntor desarma quando o ar liga junto com o chuveiro.", time: "08:50" },
      { id: "carlos-2", from: "them", text: "Consigo passar hoje. Fica R$ 150 pela visita.", time: "09:15" },
    ],
  },
  {
    id: "rafael",
    name: "Rafael Nunes",
    service: "Montagem de móveis e pequenos reparos",
    preview: "Fechado. Segunda às 14:00, R$ 120.",
    time: "Ontem",
    unread: false,
    avatar: "/images/rafael.jpg",
    photo: "/images/montagem.jpg",
    messages: [
      { id: "rafael-1", from: "you", text: "Guarda-roupa de três portas e uma estante na sala.", time: "Ontem" },
      { id: "rafael-2", from: "them", text: "Fechado. Segunda às 14:00, R$ 120.", time: "Ontem" },
    ],
  },
];

const completedNegotiations: Conversation[] = [
  {
    id: "joao",
    name: "João Oliveira",
    service: "Pintura residencial sem bagunça",
    preview: "Fechado. Quarto por R$ 350, pintura na sexta.",
    time: "Sex",
    unread: false,
    avatar: "/images/joao.jpg",
    photo: "/images/pintura.jpg",
    messages: [
      { id: "joao-1", from: "you", text: "Preciso pintar o quarto. Os móveis ficam no lugar.", time: "Qui" },
      { id: "joao-2", from: "them", text: "Fechado. Quarto por R$ 350, pintura na sexta.", time: "Sex" },
    ],
  },
  {
    id: "marcos",
    name: "Marcos Lima",
    service: "Reparos hidráulicos rápidos",
    preview: "Vazamento resolvido. Ficou R$ 90 pela visita.",
    time: "Seg",
    unread: false,
    avatar: "/images/marcos.jpg",
    photo: "/images/hidraulica.jpg",
    messages: [
      { id: "marcos-1", from: "you", text: "A torneira da cozinha não para de pingar.", time: "Dom" },
      { id: "marcos-2", from: "them", text: "Vazamento resolvido. Ficou R$ 90 pela visita.", time: "Seg" },
    ],
  },
  {
    id: "luciana",
    name: "Luciana Prado",
    service: "Jardinagem, poda e manutenção",
    preview: "Poda feita. Duas horas, R$ 140 no total.",
    time: "Sáb",
    unread: false,
    avatar: "/images/luciana.jpg",
    photo: "/images/jardinagem.jpg",
    messages: [
      { id: "luciana-1", from: "you", text: "A cerca viva passou da altura do muro.", time: "Sex" },
      { id: "luciana-2", from: "them", text: "Poda feita. Duas horas, R$ 140 no total.", time: "Sáb" },
    ],
  },
];

export function ConversationsInbox() {
  const [openConversations, setOpenConversations] = useState(initialConversations);
  const [completedConversations, setCompletedConversations] = useState(completedNegotiations);
  const [showingCompleted, setShowingCompleted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const conversations = showingCompleted ? completedConversations : openConversations;
  const setConversations = showingCompleted ? setCompletedConversations : setOpenConversations;
  const active = conversations.find((conversation) => conversation.id === activeId) ?? null;

  const showCompletedNegotiations = () => {
    setShowingCompleted((current) => !current);
    setActiveId(null);
    setDraft("");
  };

  const openConversation = (id: string) => {
    setActiveId(id);
    setDraft("");
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: false } : conversation,
      ),
    );
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !activeId) return;

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              preview: text,
              time: "Agora",
              unread: false,
              messages: [
                ...conversation.messages,
                { id: `${conversation.id}-${conversation.messages.length + 1}`, from: "you", text, time: "Agora" },
              ],
            }
          : conversation,
      ),
    );
    setDraft("");
  };

  return (
    <div className="min-h-screen bg-[#f6f7f3]">
      <MarketplaceHeader />

      <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-7 sm:px-6 lg:h-[calc(100vh-4rem)] lg:grid-cols-[380px_minmax(0,1fr)] lg:items-stretch lg:px-8 lg:py-8">
        <section className={cn("min-w-0 lg:overflow-x-hidden lg:overflow-y-auto", active && "hidden lg:block")} aria-label="Lista de negociações">
          <p className="text-[10px] font-black uppercase text-[#527637]">Suas negociações</p>
          <h1 className="mt-1 text-[30px] font-black leading-tight sm:text-[38px]">Negociações</h1>
          <p className="mt-2 text-sm text-muted-foreground">Três negociações em andamento. Abra uma para continuar.</p>

          <button
            type="button"
            onClick={showCompletedNegotiations}
            aria-pressed={showingCompleted}
            className={cn(
              "mt-6 flex h-11 w-full items-center justify-center rounded-lg border px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              showingCompleted ? "border-[#103f35] bg-[#103f35] text-white" : "bg-white hover:bg-[#f7faf7]",
            )}
          >
            {showingCompleted ? "Ver em andamento" : "Negociações fechadas"}
          </button>

          <ul className="mt-3 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3">
            {conversations.map((conversation) => (
              <li key={conversation.id} className="min-w-0">
                <ConversationCard
                  conversation={conversation}
                  selected={conversation.id === activeId}
                  onSelect={() => openConversation(conversation.id)}
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          className={cn(
            "flex min-h-[560px] flex-col overflow-hidden rounded-lg border bg-white lg:min-h-0",
            !active && "hidden lg:flex",
          )}
          aria-label={active ? `Negociação com ${active.name}` : "Negociação"}
        >
          {active ? (
            <ConversationThread
              key={active.id}
              conversation={active}
              draft={draft}
              onDraftChange={setDraft}
              onSend={sendMessage}
              onBack={() => setActiveId(null)}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
              <p className="text-lg font-black">Escolha uma negociação</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Abra um card para ver as mensagens e combinar o serviço.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ConversationCard({
  conversation,
  selected,
  onSelect,
}: {
  conversation: Conversation;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full min-w-0 max-w-full items-center gap-3 rounded-lg border bg-white p-3 text-left transition hover:bg-[#f7faf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        selected && "border-[#103f35] bg-[#f7faf7]",
      )}
    >
      <span className="relative h-12 w-12 shrink-0">
        <span className="relative block h-full w-full overflow-hidden rounded-full bg-muted">
          <Image src={conversation.avatar} alt="" fill sizes="48px" className="object-cover" />
        </span>
        {conversation.unread && (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[#c9f24a] ring-2 ring-white" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate font-black">
            {conversation.name}
            {conversation.unread && <span className="sr-only">, não lida</span>}
          </span>
          <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">{conversation.time}</span>
        </span>
        <span className="mt-0.5 block truncate text-xs font-semibold text-[#356b52]">{conversation.service}</span>
        <span className={cn("mt-1 line-clamp-2 h-10 text-sm text-muted-foreground", conversation.unread && "font-semibold text-foreground")}>
          {conversation.preview}
        </span>
      </span>
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image src={conversation.photo} alt="" fill sizes="56px" className="object-cover" />
      </span>
    </button>
  );
}

function ConversationThread({
  conversation,
  draft,
  onDraftChange,
  onSend,
  onBack,
}: {
  conversation: Conversation;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onBack: () => void;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const service = services.find(
    (item) => item.title === conversation.service && item.provider === conversation.name,
  );

  return (
    <div className="flex min-h-[560px] flex-1 flex-col lg:min-h-0">
      <div className={cn("flex min-h-0 flex-1 flex-col gap-3 px-4 py-5 sm:px-5", detailsOpen ? "overflow-hidden" : "overflow-y-auto")}>
        <header className={cn("flex flex-col overflow-hidden rounded-lg border bg-[#f7faf7]", detailsOpen && "min-h-0 flex-1")}>
          <div className="flex shrink-0 items-center gap-3 p-3">
            <button
              type="button"
              onClick={onBack}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              aria-label="Voltar para a lista"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setDetailsOpen((open) => !open)}
              aria-expanded={detailsOpen}
              aria-controls="conversation-service-details"
              className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-left hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted">
                <Image src={conversation.avatar} alt="" fill sizes="44px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-black">{conversation.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{conversation.service}</span>
                <span className="sr-only">{detailsOpen ? "Fechar detalhes" : "Ver detalhes"}</span>
              </span>
              <span className="relative hidden h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted sm:block">
                <Image src={conversation.photo} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition", detailsOpen && "rotate-180")} />
            </button>
          </div>

          {detailsOpen && (
            <div id="conversation-service-details" className="min-h-0 flex-1 overflow-y-auto border-t">
              <ServiceDetails conversation={conversation} service={service} />
            </div>
          )}
        </header>

        {!detailsOpen && <ol className="flex flex-col gap-3">
          {conversation.messages.map((message) => (
            <li
              key={message.id}
              className={cn("flex max-w-[85%] flex-col gap-1", message.from === "you" ? "self-end items-end" : "self-start")}
            >
              <p
                className={cn(
                  "rounded-lg px-3 py-2 text-sm leading-6",
                  message.from === "you" ? "bg-[#103f35] text-white" : "border bg-[#f7faf7]",
                )}
              >
                {message.text}
              </p>
              <span className="text-[11px] font-semibold text-muted-foreground">
                <span className="sr-only">{message.from === "you" ? "Você" : conversation.name}, </span>
                {message.time}
              </span>
            </li>
          ))}
        </ol>}
      </div>

      <form
        className="flex items-center gap-2 border-t p-3 sm:p-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <label htmlFor="conversation-draft" className="sr-only">
          Mensagem para {conversation.name}
        </label>
        <input
          id="conversation-draft"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Escreva uma mensagem"
          className="h-11 min-w-0 flex-1 rounded-md border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[#c9f24a] text-foreground hover:bg-[#d7fa68] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Enviar mensagem"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function ServiceDetails({ conversation, service }: { conversation: Conversation; service?: Service }) {
  if (!service) {
    return (
      <div className="px-4 py-4">
        <p className="font-black">{conversation.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{conversation.service}</p>
      </div>
    );
  }

  const availability = service.availableToday && service.availableWeekend
    ? "Hoje e fim de semana"
    : service.availableToday
      ? "Disponível hoje"
      : service.availableWeekend
        ? "Fim de semana"
        : "Sob consulta";

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="relative h-40 overflow-hidden rounded-md bg-muted">
        <Image src={service.imageUrl} alt={service.imageAlt} fill sizes="640px" className="object-cover" />
      </div>

      <div>
        <p className="text-[10px] font-black uppercase text-[#527637]">{service.category}</p>
        <h2 className="mt-1 text-lg font-black leading-snug">{service.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-[#D7FA68] px-2.5 py-1 text-xs font-medium">{tag}</span>
          ))}
        </div>
      </div>

      <p>
        <span className="text-lg font-black">{service.priceLabel}</span>
        <span className="ml-2 text-sm text-muted-foreground">{service.priceDetail}</span>
      </p>

      <div className="flex items-center gap-3 border-t pt-4">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
          <Image src={service.providerImageUrl} alt="" fill sizes="48px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1 font-black">
            {service.provider}
            {service.verified && <BadgeCheck className="h-4 w-4 fill-[#103f35] text-white" aria-label="Verificado" />}
          </span>
          <span className="block text-sm text-muted-foreground">{service.profession}</span>
        </span>
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">Avaliação</dt>
          <dd className="mt-1 flex items-center gap-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-foreground" />
            {service.rating.toFixed(2).replace(".", ",")}
            <span className="font-medium text-muted-foreground">· {service.reviewCount} avaliações</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Serviços feitos</dt>
          <dd className="mt-1 font-semibold">{service.completedJobs}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Onde atende</dt>
          <dd className="mt-1 flex items-start gap-1 font-semibold">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {service.neighborhood}, {service.city} · {service.distance.toFixed(1).replace(".", ",")} km
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Resposta</dt>
          <dd className="mt-1 font-semibold">{service.responseTime}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Disponibilidade</dt>
          <dd className="mt-1 font-semibold">{availability}</dd>
        </div>
      </dl>
    </div>
  );
}
