import type { Metadata } from "next";

import { ConversationsInbox } from "@/components/conversations/conversations-inbox";

export const metadata: Metadata = {
  title: "Negociações",
  description: "Acompanhe suas negociações no Fechô.",
};

export default function ConversationsPage() {
  return <ConversationsInbox />;
}
