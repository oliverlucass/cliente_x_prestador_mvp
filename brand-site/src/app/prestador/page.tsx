import type { Metadata } from "next";

import { ProviderDashboard } from "@/components/provider/provider-dashboard";

export const metadata: Metadata = {
  title: "Área do prestador",
  description: "Gerencie solicitações, agenda, anúncios e ganhos no Fechô.",
};

export default function ProviderPage() {
  return <ProviderDashboard />;
}
