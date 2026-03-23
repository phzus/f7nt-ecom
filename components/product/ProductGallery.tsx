"use client";
// Migrado de: snippets/product-media-gallery.liquid

import { useState } from "react";
import Image from "next/image";
import type { CartPandaImage } from "@/types/cartpanda";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: CartPandaImage[];
  productTitle: string;
  activeImageId?: number | null;
}

export default function ProductGallery({
  images,
  productTitle,
  activeImageId,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (activeImageId) {
      const idx = images.findIndex((img) => img.id === activeImageId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  if (images.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center bg-gray-100 rounded"
        style={{ aspectRatio: "1/1" }}
      >
        <span className="text-gray-400 text-6xl">📦</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded bg-gray-100" style={{ aspectRatio: "1/1" }}>
        <Image
          src={activeImage.src}
          alt={activeImage.alt ?? productTitle}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Nav arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIndex}
              className={`flex-shrink-0 relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                i === activeIndex ? "border-black" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt ?? `${productTitle} - ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
