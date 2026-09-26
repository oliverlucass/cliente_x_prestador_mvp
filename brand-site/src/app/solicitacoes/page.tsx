import type { Metadata } from "next";

import { CustomerRequests } from "@/components/requests/customer-requests";

export const metadata: Metadata = {
  title: "Minhas solicitações",
  description: "Acompanhe seus serviços no Fechô.",
};

export default function RequestsPage() {
  return <CustomerRequests />;
}
