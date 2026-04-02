"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const PRIZE_CARS = [
  { src: "/images/car-1.png", alt: "2026 BMW M4 - View 1" },
  { src: "/images/car-2.png", alt: "2026 BMW M4 - View 2" },
  { src: "/images/car-3.png", alt: "2026 BMW M4 - View 3" },
  { src: "/images/car-1.png", alt: "2026 BMW M4 - View 4" },
  { src: "/images/car-2.png", alt: "2026 BMW M4 - View 5" },
];

export default function GiveawaySection() {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000 0%, #0d2d0d 50%, #000 100%)",
      }}
    >
      {/* Carousel */}
      <div className="mb-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={16}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="giveaway-swiper"
        >
          {PRIZE_CARS.map((car, i) => (
            <SwiperSlide key={i} className="giveaway-slide">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 55vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Text content */}
      <div className="container-main text-center">
        <h2
          className="font-black text-white uppercase leading-tight"
          style={{ fontSize: "clamp(1rem, 7vw, 2.5rem)", letterSpacing: "-0.01em", lineHeight: "130%" }}
        >
          THIS MURDERED OUT BMW M4 COULD BE YOURS
        </h2>
        <p
          className="text-sm mt-5 max-w-4xl mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.80)" }}
        >
          This fully blacked-out BMW M4 packs an aggressively tuned engine,
          high-end M Competition components, and the unmistakable road presence
          of a true luxury sports machine... and it could be YOURS.{" "}
          <strong className="text-white">
            But hurry, you only have 8 DAYS to make it YOURS!
          </strong>
        </p>

        <Link
          href="/catalog"
          className="btn-cta inline-flex items-center justify-center mt-8 px-14 py-4 text-sm font-bold tracking-widest"
          style={{ borderRadius: "4px", minWidth: "260px" }}
        >
          ALL THE DETAILS
        </Link>
      </div>

      <style>{`
        .giveaway-swiper {
          padding: 0 12% !important;
        }
        @media (max-width: 640px) {
          .giveaway-swiper {
            padding: 0 7% !important;
          }
        }
        .giveaway-slide {
          width: 58% !important;
          aspect-ratio: 4/3;
        }
        @media (max-width: 640px) {
          .giveaway-slide {
            width: 82% !important;
          }
        }
        .giveaway-swiper .swiper-pagination {
          position: relative;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        .giveaway-swiper .swiper-pagination-bullet {
          width: 28px;
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transition: background 0.3s;
        }
        .giveaway-swiper .swiper-pagination-bullet-active {
          background: #e53e3e;
          width: 40px;
        }
      `}</style>
    </section>
  );
}
