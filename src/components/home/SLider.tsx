// app/components/HeroSlider.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HeroSlider() {
  const slides = [
    {
      image: "/slide1.jpg",
      title: "Advancing Law and Justice",
      description:
        "Promoting research, education, and dialogue in law and governance.",
      button: { text: "Explore Research", href: "/research" },
    },
    {
      image: "/slide6.jpg",
      title: "Shaping Governance",
      description:
        "Building policies that foster accountability, transparency, and progress.",
      button: { text: "View Programs", href: "/programs" },
    },
    {
      image: "/slider-4.jpg",
      title: "Policy for a Better Future",
      description:
        "Engaging communities to design informed and impactful policies.",
      button: { text: "Read Publications", href: "/resources" },
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto h-[600px] mb-10 mt-6 px-6">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden ">
              {/* Background Image with next/image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={idx === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="max-w-2xl text-lg sm:text-xl font-light mb-6">
                  {slide.description}
                </p>
                <Link
                  href={slide.button.href}
                  className="inline-block px-6 py-3 bg-blue-900  text-white font-medium rounded-md shadow hover:bg-[#02357d] transition"
                >
                  {slide.button.text}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
