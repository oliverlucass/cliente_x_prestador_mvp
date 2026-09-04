import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  className,
}: RatingStarsProps) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${rating} out of 5${reviewCount ? ` from ${reviewCount} reviews` : ""}`}
    >
      <Star
        className="h-4 w-4 fill-amber-400 text-amber-400"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
}
