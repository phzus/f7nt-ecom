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

export default function ProductCarousel({
  products,
  multiplier = 200,
  desktopCols = 4,
}: ProductCarouselProps) {
  return (
    <Swiper
      slidesPerView={1.35}
      spaceBetween={12}
      breakpoints={{
        768: {
          slidesPerView: desktopCols,
          spaceBetween: 16,
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
