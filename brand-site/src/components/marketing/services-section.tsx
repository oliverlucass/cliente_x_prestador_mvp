"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { FadeInView } from "@/components/motion/fade-in-view";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/mock/services";
import type { Service } from "@/types/service";

const INITIAL_COUNT = 6;
const BATCH_SIZE = 3;
const LOAD_DELAY_MS = 250;

interface DisplayedService {
  key: string;
  service: Service;
}

function getCycledService(index: number): DisplayedService {
  const service = services[index % services.length];
  const cycle = Math.floor(index / services.length);
  return {
    key: `${service.id}-${cycle}-${index}`,
    service,
  };
}

function buildBatch(start: number, count: number): DisplayedService[] {
  return Array.from({ length: count }, (_, offset) =>
    getCycledService(start + offset)
  );
}

export function ServicesSection() {
  const [items, setItems] = useState<DisplayedService[]>(() =>
    buildBatch(0, INITIAL_COUNT)
  );
  const [isLoading, setIsLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const nextIndexRef = useRef(INITIAL_COUNT);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    window.setTimeout(() => {
      const start = nextIndexRef.current;
      const batch = buildBatch(start, BATCH_SIZE);
      nextIndexRef.current = start + BATCH_SIZE;
      setItems((prev) => [...prev, ...batch]);
      isLoadingRef.current = false;
      setIsLoading(false);
    }, LOAD_DELAY_MS);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const sentinel = sentinelRef.current;
    if (!scroller || !sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadMore();
        }
      },
      {
        root: scroller,
        rootMargin: "80px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-muted/30 px-4 py-12 md:py-16"
    >
      <div className="container">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <h2 id="services-heading" className="text-balance text-h2">
            Popular services
          </h2>
          <p className="mt-3 text-balance text-body text-muted-foreground">
            Browse top-rated services with transparent pricing and verified
            reviews.
          </p>
        </header>

        <div
          ref={scrollerRef}
          tabIndex={0}
          aria-label="Services list"
          aria-busy={isLoading}
          className="max-h-[min(70vh,720px)] overflow-y-auto overscroll-contain rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={item.key}>
                {index < INITIAL_COUNT ? (
                  <FadeInView delay={index * 0.06}>
                    <ServiceCard service={item.service} />
                  </FadeInView>
                ) : (
                  <ServiceCard service={item.service} />
                )}
              </li>
            ))}
          </ul>

          <div
            ref={sentinelRef}
            className="flex min-h-12 items-center justify-center py-6"
            aria-hidden={!isLoading}
          >
            {isLoading ? (
              <p
                className="flex items-center gap-2 text-sm text-muted-foreground"
                aria-live="polite"
              >
                <Loader2
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Loading more services…
              </p>
            ) : (
              <span className="sr-only">Scroll for more services</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
