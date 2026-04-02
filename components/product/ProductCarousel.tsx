"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { CartPandaProduct } from "@/types/cartpanda";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: CartPandaProduct[];
  multiplier?: number;
  desktopCols?: 3 | 4;
}

// Mesmo valor do px-4 do container-main no mobile (16px)
const MOBILE_OFFSET = 16;

export default function ProductCarousel({
  products,
  multiplier = 200,
  desktopCols = 4,
}: ProductCarouselProps) {
  return (
    <Swiper
      slidesPerView={1.35}
      spaceBetween={12}
      slidesOffsetBefore={MOBILE_OFFSET}
      slidesOffsetAfter={MOBILE_OFFSET}
      breakpoints={{
        768: {
          slidesPerView: desktopCols,
          spaceBetween: 16,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} multiplier={multiplier} showEntries />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
