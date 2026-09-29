import type { Metadata } from "next";

import { ProviderServices } from "@/components/requests/provider-services";

export const metadata: Metadata = {
  title: "Serviços prestados",
  description: "Acompanhe os serviços que você presta no Fechô.",
};

export default function ProvidedServicesPage() {
  return <ProviderServices />;
}
