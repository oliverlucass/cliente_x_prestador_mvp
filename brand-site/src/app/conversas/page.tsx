import type { Metadata } from "next";

import { ConversationsInbox } from "@/components/conversations/conversations-inbox";

export const metadata: Metadata = {
  title: "Negociações",
  description: "Acompanhe suas negociações no Fechô.",
};

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: Promise<{ conversa?: string }>;
}) {
  const { conversa } = await searchParams;
  return <ConversationsInbox conversationId={conversa ?? null} />;
}
