"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const slides = [
    {
        img: "/slider-1.jpg",
        title: "Trusted Care for Your Little Ones",
        desc: "Professional babysitting services that give you peace of mind while your children are happy, safe, and loved.",
    },
    {
        img: "/slider-2.jpg",
        title: "Expert Care During Recovery",
        desc: "Skilled healthcare support for recovery and chronic illness management, right in the comfort of your home.",
    },
    {
        img: "/slider-3.jpg",
        title: "Compassionate Elderly Care at Home",
        desc: "Skilled healthcare support for recovery and chronic illness management, right in the comfort of your home.",
    },
];

const Slider = () => {
    return (
        <div className="w-full h-[80vh]">
            <Swiper
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={1200}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* Background Image Container */}
                        <div
                            className="relative w-full h-full bg-center bg-cover flex items-center justify-center text-center"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/60"></div>

                            {/* TOP TEXT CONTENT */}
                            <div className="relative z-10 px-6 flex flex-col items-center justify-center text-center">

                                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight drop-shadow-xl">
                                    {slide.title}
                                </h2>

                                <p className="text-white/80 mt-5 max-w-2xl text-base md:text-lg leading-relaxed">
                                    {slide.desc}
                                </p>

                                <div className="mt-8 flex gap-4 flex-wrap justify-center">

                                    {/* PRIMARY BUTTON */}
                                    <button className=" bg-white text-[#2e9e93] px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-[#2e9e93] hover:text-white transition-all duration-300">
                                        Explore Services
                                    </button>

                                    {/* GLASS BUTTON */}
                                    <button className=" px-6 py-3 rounded-full border border-white/30 backdrop-blur-xl bg-white/10 text-white font-semibold hover:bg-[#2e9e93] hover:border-[#2e9e93] transition-all duration-300">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;