"use client";

import Image from "next/image";

const squareSize = 28;
const stackOffset = Math.round(squareSize * 0.7);
const tileRadius = "calc((var(--radius) - 2px) * 28 / 160)";

type ReviewPhotoStackProps = {
  photos: [string, string];
};

export function ReviewPhotoStack({ photos }: ReviewPhotoStackProps) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: squareSize + stackOffset * 2, height: squareSize }}
      aria-hidden="true"
    >
      <span
        className="absolute top-0 grid place-items-center border bg-[#eef3e9] text-xs font-bold leading-none text-foreground"
        style={{ left: stackOffset * 2, zIndex: 1, width: squareSize, height: squareSize, borderRadius: tileRadius }}
      >
        +
      </span>
      <span
        className="absolute top-0 overflow-hidden border bg-muted ring-1 ring-white"
        style={{ left: stackOffset, zIndex: 2, width: squareSize, height: squareSize, borderRadius: tileRadius }}
      >
        <Image src={photos[1]} alt="" fill sizes={`${squareSize}px`} className="object-cover" />
      </span>
      <span
        className="absolute left-0 top-0 overflow-hidden border bg-muted shadow-sm ring-1 ring-white"
        style={{ zIndex: 3, width: squareSize, height: squareSize, borderRadius: tileRadius }}
      >
        <Image src={photos[0]} alt="" fill sizes={`${squareSize}px`} className="object-cover" />
      </span>
    </div>
  );
}
