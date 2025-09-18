// app/components/Hero.tsx
"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="relative ">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Centre for Law, Governance <br /> and Policy
          </h1>
          <p className="mt-6 text-lg lg:text-xl font-light max-w-2xl">
            Advancing research, education, and public engagement in law,
            governance, and policy to build a just and informed society.
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              href="/research"
              className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-md shadow hover:bg-yellow-300 transition"
            >
              Explore Research
            </Link>
            <Link
              href="/programs"
              className="px-6 py-3 border border-white font-medium rounded-md hover:bg-white hover:text-[#0347A7] transition"
            >
              Join Programs
            </Link>
          </div>
        </div>

        {/* Right Slider */}
        <div className="flex-1 flex justify-center lg:justify-end w-full h-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            className="max-w-2xl lg:max-w-lg w-full rounded-lg shadow-xl"
          >
            <SwiperSlide>
              <img
                src="/slider-1.png" // put your image in public folder
                alt="Research"
                className="rounded-lg w-full h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/slider-2.jpg"
                alt="Governance"
                className="rounded-lg w-full h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/slider-3.webp"
                alt="Policy"
                className="rounded-lg w-full h-96 object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
