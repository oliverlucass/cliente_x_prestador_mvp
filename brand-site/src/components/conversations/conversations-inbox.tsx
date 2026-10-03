"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, SendHorizontal } from "lucide-react";

import { NegotiationRequestCard, type NegotiationRequest } from "@/components/conversations/negotiation-request-card";
import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { cn } from "@/lib/utils";

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
  request: NegotiationRequest;
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
    request: {
      title: "Limpeza completa no sábado",
      description: "Apartamento com dois quartos, sala e cozinha. Preciso de limpeza completa no sábado de manhã, com atenção extra no piso da sala e nos armários da cozinha.",
      photos: [{ id: "ana-foto-1", src: "/images/limpeza.jpg", alt: "Foto da sala e da cozinha que precisam de limpeza" }],
      neighborhood: "Saúde",
      cep: "04055-000",
      street: "Rua Loefgreen",
      number: "1200",
      complement: "Apto 42",
      placeType: "Residência",
      observation: "Portão azul, interfone 12",
      preferredDate: "Sábado, 3 de outubro",
      period: "Manhã",
      deadline: "Nos próximos dias",
      materials: "Preciso que o prestador leve",
      offer: 180,
    },
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
    request: {
      title: "Disjuntor desarma com o ar e o chuveiro",
      description: "O disjuntor desarma quando o ar-condicionado liga junto com o chuveiro. Quero o diagnóstico e o reparo do quadro.",
      photos: [{ id: "carlos-foto-1", src: "/images/eletrica.jpg", alt: "Foto do quadro que desarma" }],
      neighborhood: "Vila Mariana",
      cep: "04012-000",
      street: "Rua Domingos de Morais",
      number: "256",
      complement: "Sem complemento",
      placeType: "Residência",
      observation: "Quadro de luz no corredor",
      preferredDate: "Sábado, 3 de outubro",
      period: "Tarde",
      deadline: "Urgente",
      materials: "Já tenho o necessário",
      offer: 150,
    },
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
    request: {
      title: "Guarda-roupa e estante na sala",
      description: "Guarda-roupa de três portas e uma estante na sala. As peças já estão no local e o manual está separado.",
      photos: [{ id: "rafael-foto-1", src: "/images/montagem.jpg", alt: "Foto das peças do guarda-roupa na sala" }],
      neighborhood: "Aclimação",
      cep: "01531-001",
      street: "Rua Muniz de Sousa",
      number: "88",
      complement: "Casa 2",
      placeType: "Residência",
      observation: "Peças na sala, manual no envelope",
      preferredDate: "Segunda, 5 de outubro",
      period: "Tarde",
      deadline: "Flexível",
      materials: "Já tenho o necessário",
      offer: 120,
    },
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
    request: {
      title: "Pintura do quarto",
      description: "Pintar o quarto com os móveis no lugar. A parede tem marcas e precisa de correção antes da tinta.",
      photos: [{ id: "joao-foto-1", src: "/images/pintura.jpg", alt: "Foto da parede do quarto com marcas" }],
      neighborhood: "Ipiranga",
      cep: "04216-030",
      street: "Rua Silva Bueno",
      number: "410",
      complement: "Apto 71",
      placeType: "Residência",
      observation: "Móveis ficam no lugar",
      preferredDate: "Sexta, 2 de outubro",
      period: "Manhã",
      deadline: "Nos próximos dias",
      materials: "Preciso que o prestador leve",
      offer: 350,
    },
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
    request: {
      title: "Torneira da cozinha pingando",
      description: "A torneira da cozinha não para de pingar. O registro fecha, mas a goteira continua.",
      photos: [{ id: "marcos-foto-1", src: "/images/hidraulica.jpg", alt: "Foto da torneira da cozinha que pinga" }],
      neighborhood: "Moema",
      cep: "04503-010",
      street: "Alameda dos Nhambiquaras",
      number: "320",
      complement: "Sem complemento",
      placeType: "Residência",
      observation: "Torneira da pia da cozinha",
      preferredDate: "Segunda, 28 de setembro",
      period: "Manhã",
      deadline: "Urgente",
      materials: "Preciso que o prestador leve",
      offer: 90,
    },
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
    request: {
      title: "Poda da cerca viva",
      description: "A cerca viva passou da altura do muro. Preciso de poda e retirada dos galhos.",
      photos: [{ id: "luciana-foto-1", src: "/images/jardinagem.jpg", alt: "Foto da cerca viva acima do muro" }],
      neighborhood: "Brooklin",
      cep: "04562-001",
      street: "Rua Joaquim Floriano",
      number: "150",
      complement: "Sem complemento",
      placeType: "Área externa",
      observation: "Cerca viva no muro da frente",
      preferredDate: "Sábado, 26 de setembro",
      period: "Manhã",
      deadline: "Flexível",
      materials: "Preciso que o prestador leve",
      offer: 140,
    },
    messages: [
      { id: "luciana-1", from: "you", text: "A cerca viva passou da altura do muro.", time: "Sex" },
      { id: "luciana-2", from: "them", text: "Poda feita. Duas horas, R$ 140 no total.", time: "Sáb" },
    ],
  },
];

function isCompletedConversation(id: string) {
  return completedNegotiations.some((conversation) => conversation.id === id);
}

function isKnownConversation(id: string) {
  return isCompletedConversation(id) || initialConversations.some((conversation) => conversation.id === id);
}

export function ConversationsInbox({ conversationId = null }: { conversationId?: string | null }) {
  const router = useRouter();
  const [openConversations, setOpenConversations] = useState(initialConversations);
  const [completedConversations, setCompletedConversations] = useState(completedNegotiations);
  const [showingCompleted, setShowingCompleted] = useState(
    () => Boolean(conversationId && isCompletedConversation(conversationId)),
  );
  const [activeId, setActiveId] = useState<string | null>(
    conversationId && isKnownConversation(conversationId) ? conversationId : null,
  );
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
    };
  }, []);

  const selectConversation = useCallback((id: string) => {
    if (!isKnownConversation(id)) return;

    const completed = isCompletedConversation(id);
    setShowingCompleted(completed);
    setActiveId(id);
    setDraft("");
    const markRead = (current: Conversation[]) =>
      current.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: false } : conversation,
      );
    if (completed) setCompletedConversations(markRead);
    else setOpenConversations(markRead);
  }, []);

  useEffect(() => {
    if (!conversationId) {
      setActiveId(null);
      setDraft("");
      return;
    }
    selectConversation(conversationId);
  }, [conversationId, selectConversation]);
  const conversations = showingCompleted ? completedConversations : openConversations;
  const setConversations = showingCompleted ? setCompletedConversations : setOpenConversations;
  const active = conversations.find((conversation) => conversation.id === activeId) ?? null;

  const showCompletedNegotiations = () => {
    setShowingCompleted((current) => !current);
    setActiveId(null);
    setDraft("");
    router.replace("/conversas", { scroll: false });
  };

  const openConversation = (id: string) => {
    selectConversation(id);
    router.replace(`/conversas?conversa=${id}`, { scroll: false });
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
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#f6f7f3]">
      <MarketplaceHeader />

      <div className="mx-auto grid min-h-0 w-full max-w-[1240px] flex-1 grid-rows-[minmax(0,1fr)] gap-6 overflow-hidden px-4 py-7 sm:px-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <section className={cn("min-h-0 min-w-0 overflow-hidden", active && "hidden lg:block")} aria-label="Lista de negociações">
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
            "flex min-h-0 flex-col overflow-hidden rounded-lg border bg-white",
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
              onBack={() => {
                setActiveId(null);
                setDraft("");
                router.replace("/conversas", { scroll: false });
              }}
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
  const messageScrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scroller = messageScrollerRef.current;
    if (!scroller) return;
    if (scroller.scrollHeight <= scroller.clientHeight) return;
    scroller.scrollTop = scroller.scrollHeight;
  }, [conversation.messages.length]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={cn("flex min-h-0 flex-1 flex-col gap-3 px-4 pt-5 pb-2 sm:px-5", detailsOpen && "overflow-hidden")}>
        <NegotiationRequestCard
          name={conversation.name}
          avatarSrc={conversation.avatar}
          time={conversation.time}
          request={conversation.request}
          open={detailsOpen}
          onToggle={() => setDetailsOpen((open) => !open)}
          leading={
            <button
              type="button"
              onClick={onBack}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              aria-label="Voltar para a lista"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          }
        />

        {!detailsOpen && (
          <div ref={messageScrollerRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <ol className="mt-auto flex flex-col gap-3">
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
            </ol>
          </div>
        )}
      </div>

      <form
        className="px-3 pt-1 pb-3 sm:px-4 sm:pt-2 sm:pb-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <label htmlFor="conversation-draft" className="sr-only">
          Mensagem para {conversation.name}
        </label>
        <div className="relative">
          <input
            id="conversation-draft"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Escreva uma mensagem"
            className="h-14 w-full rounded-md border bg-white pl-3 pr-14 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="absolute top-1/2 right-1.5 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md bg-[#c9f24a] text-foreground hover:bg-[#d7fa68] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Enviar mensagem"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
