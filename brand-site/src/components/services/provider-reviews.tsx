"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeCheck, CheckCircle2, ChevronLeft, ChevronRight, CircleDollarSign, MessageCircle, Sparkles, Star } from "lucide-react";

import { ReviewPhotoStack } from "@/components/services/review-photo-stack";
import type { Service } from "@/types/service";

const reviewPhotos = [
  "/images/limpeza.jpg",
  "/images/montagem.jpg",
  "/images/pintura.jpg",
  "/images/hidraulica.jpg",
  "/images/eletrica.jpg",
  "/images/jardinagem.jpg",
] as const;

const reviewsPerPage = 4;
const reviewCopy = [
  { name: "Marina", area: "Vila Mariana", avatar: "/images/ana.jpg", text: "Muito cuidadoso, explicou tudo antes de começar e entregou o serviço no horário combinado." },
  { name: "Rafael", area: "Aclimação", avatar: "/images/rafael.jpg", text: "Ótima comunicação e trabalho muito bem feito. Já salvei o contato para chamar de novo." },
  { name: "Camila", area: "Saúde", avatar: "/images/luciana.jpg", text: "Pontual, organizado e super tranquilo para combinar os detalhes pelo chat." },
  { name: "Bruno", area: "Moema", avatar: "/images/marcos.jpg", text: "Preço justo e resultado conforme o anúncio. Recomendo bastante." },
  { name: "Juliana", area: "Paraíso", avatar: "/images/ana.jpg", text: "Serviço impecável e atendimento muito atencioso. Deixou tudo organizado ao terminar." },
];

export function ProviderReviews({ service }: { service: Service }) {
  const [reviewPage, setReviewPage] = useState(0);
  const reviewPageCount = Math.ceil(reviewCopy.length / reviewsPerPage);
  const visibleReviews = reviewCopy.slice(reviewPage * reviewsPerPage, (reviewPage + 1) * reviewsPerPage);
  const categories = [
    { label: "Qualidade", value: Math.max(4.6, service.rating - 0.03).toFixed(1), icon: CheckCircle2 },
    { label: "Comunicação", value: Math.min(5, service.rating + 0.02).toFixed(1), icon: MessageCircle },
    { label: "Pontualidade", value: Math.max(4.6, service.rating - 0.05).toFixed(1), icon: BadgeCheck },
    { label: "Custo-benefício", value: Math.max(4.5, service.rating - 0.08).toFixed(1), icon: CircleDollarSign },
  ];

  return (
    <section className="border-y py-7" aria-labelledby="reviews-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="reviews-title" className="flex items-center gap-2 text-xl font-bold"><Star className="h-5 w-5 fill-foreground" /> {service.rating.toFixed(1).replace(".", ",")} · {service.reviewCount} avaliações</h3>
          <p className="mt-1 text-xs text-muted-foreground">Avaliações de clientes que contrataram este prestador.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-md border bg-white p-3"><p className="truncate text-xs font-medium text-muted-foreground">{label}</p><p className="mt-1 flex items-center gap-1 text-lg font-bold">{value} <Icon className="h-4 w-4 text-[#527637]" /></p></div>)}
      </div>

      <div className="mt-6 rounded-md bg-muted/60 p-4">
        <p className="-ml-4 inline-flex items-center gap-1.5 text-sm font-bold">
          O que os clientes destacam
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </p>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto pb-1">
          {["Muito cuidadoso", "Boa comunicação", "Pontual", "Preço justo"].map((highlight) => <span key={highlight} className="shrink-0 rounded-full border bg-white px-3 py-2 text-xs font-semibold shadow-sm">{highlight}</span>)}
        </div>
      </div>

      <div className="mt-6">
        <div className="grid min-h-[724px] gap-x-8 gap-y-7 sm:min-h-[348px] sm:grid-cols-2" aria-live="polite">
          {visibleReviews.map((review, index) => {
            const photoIndex = reviewPage * reviewsPerPage + index;
            const photos: [string, string] = [
              reviewPhotos[photoIndex % reviewPhotos.length],
              reviewPhotos[(photoIndex + 1) % reviewPhotos.length],
            ];

            return (
            <article key={review.name} className="h-[160px] min-w-0 rounded-md border bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image src={review.avatar} alt={`Foto de ${review.name}`} fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{review.name}</p>
                </div>
                </div>
                <ReviewPhotoStack photos={photos} />
              </div>

              <p className="mt-2 flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <span className="flex">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3 w-3 fill-foreground text-foreground" />)}</span>
                · há {review.name === "Marina" ? "2 dias" : "3 semanas"}
              </p>
              <p className="mt-1 line-clamp-3 text-left text-sm leading-6 text-foreground/80">{review.text}</p>
            </article>
            );
          })}
        </div>

        <nav className="mt-5 flex items-center justify-center gap-1" aria-label="Paginação das avaliações">
          <button
            type="button"
            onClick={() => setReviewPage((page) => Math.max(0, page - 1))}
            disabled={reviewPage === 0}
            className="grid h-9 w-9 place-items-center rounded-md transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Ver avaliações anteriores"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: reviewPageCount }, (_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              onClick={() => setReviewPage(pageIndex)}
              className={`grid h-9 min-w-9 place-items-center rounded-md px-2 text-sm font-semibold transition ${
                reviewPage === pageIndex ? "bg-foreground text-white" : "hover:bg-muted"
              }`}
              aria-label={`Ir para a página ${pageIndex + 1} das avaliações`}
              aria-current={reviewPage === pageIndex ? "page" : undefined}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setReviewPage((page) => Math.min(reviewPageCount - 1, page + 1))}
            disabled={reviewPage === reviewPageCount - 1}
            className="grid h-9 w-9 place-items-center rounded-md transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Ver próximas avaliações"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </section>
  );
}
