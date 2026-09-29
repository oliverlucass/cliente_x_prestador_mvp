import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { services } from "@/data/mock/services";
import { NegotiationForm } from "@/components/services/negotiation-form";

export const metadata: Metadata = {
  title: "Negociação",
  description: "Descreva o serviço e combine os detalhes com o prestador no Fechô.",
};

export default async function NegotiationPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ data?: string; valor?: string; local?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const initialDate = /^\d{4}-\d{2}-\d{2}$/.test(query.data ?? "") ? query.data! : "";
  const amount = Number(query.valor);
  const initialOffer = Number.isFinite(amount) && amount > 0 ? String(amount) : "";
  const initialLocation = typeof query.local === "string" && query.local.length <= 120 ? query.local : "";

  return <NegotiationForm service={service} initialDate={initialDate} initialOffer={initialOffer} initialLocation={initialLocation} />;
}
