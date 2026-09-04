"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useState } from "react";

import { RatingStars } from "@/components/services/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Service } from "@/types/service";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-premium-lg",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={service.imageUrl}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={isSaved ? "Remove from saved" : "Save service"}
          aria-pressed={isSaved}
          onClick={() => setIsSaved((prev) => !prev)}
          className={cn(
            "absolute right-3 top-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm",
            "transition-colors hover:bg-background",
            isSaved && "text-accent"
          )}
        >
          <Bookmark
            className={cn("h-4 w-4", isSaved && "fill-current")}
            aria-hidden="true"
          />
        </Button>
      </div>

      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="accent" className="shrink-0">
            {service.category}
          </Badge>
          <span className="text-sm font-semibold text-foreground">
            {service.priceLabel}
          </span>
        </div>
        <h3 className="text-h3 text-foreground">{service.title}</h3>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="line-clamp-2 text-body text-muted-foreground">
          {service.description}
        </p>
        <RatingStars
          rating={service.rating}
          reviewCount={service.reviewCount}
          className="mt-4"
        />
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="accent" className="w-full" asChild>
          <Link href={`#service-${service.slug}`}>View Service</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
