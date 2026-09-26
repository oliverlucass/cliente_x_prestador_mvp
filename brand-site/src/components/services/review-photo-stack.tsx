"use client";

import Image from "next/image";

type ReviewPhotoStackProps = {
  photos: [string, string];
  size?: number;
};

export function ReviewPhotoStack({ photos, size = 28 }: ReviewPhotoStackProps) {
  const stackOffset = Math.round(size * 0.7);
  const tileRadius = `calc((var(--radius) - 2px) * ${size} / 160)`;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size + stackOffset * 2, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute top-0 grid place-items-center border bg-[#eef3e9] font-bold leading-none text-foreground"
        style={{ left: stackOffset * 2, zIndex: 1, width: size, height: size, borderRadius: tileRadius, fontSize: Math.round(size * 0.42) }}
      >
        +
      </span>
      <span
        className="absolute top-0 overflow-hidden border bg-muted ring-1 ring-white"
        style={{ left: stackOffset, zIndex: 2, width: size, height: size, borderRadius: tileRadius }}
      >
        <Image src={photos[1]} alt="" fill sizes={`${size}px`} className="object-cover" />
      </span>
      <span
        className="absolute left-0 top-0 overflow-hidden border bg-muted shadow-sm ring-1 ring-white"
        style={{ zIndex: 3, width: size, height: size, borderRadius: tileRadius }}
      >
        <Image src={photos[0]} alt="" fill sizes={`${size}px`} className="object-cover" />
      </span>
    </div>
  );
}
