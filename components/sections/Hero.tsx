"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
    id: number;
    image: string;
    subtitle: string;
    title: string;
    description: string;
    cta: string;
    href: string;
    align: "left" | "center" | "right";
};

const slides: Slide[] = [
    {
        id: 1,
        image: "/hero1.png",
        subtitle: "New Collection",
        title: "Crafted for Modern Living",
        description:
            "Premium fabrics. Timeless silhouettes. Designed for everyday elegance.",
        cta: "Shop Now",
        href: "/collections/all",
        align: "left",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop",
        subtitle: "Season Edit",
        title: "Minimal. Confident. Timeless.",
        description:
            "Designed to move with you — understated luxury for daily wear.",
        cta: "Explore",
        href: "/collections/new-arrivals",
        align: "center",
    },
    {
        id: 3,
        image: "/hero3.jpg",
        subtitle: "Signature Styles",
        title: "Built to Last",
        description:
            "Clean tailoring and refined textures for a modern wardrobe.",
        cta: "View Collection",
        href: "/collections/best-sellers",
        align: "right",
    },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const reduceMotion = useReducedMotion();

    // ---------------- AUTO SLIDE ----------------
    useEffect(() => {
        startAutoSlide();
        return stopAutoSlide;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const restartAutoSlide = () => {
        startAutoSlide();
    };

    // ---------------- MANUAL CONTROLS ----------------
    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slides.length);
        restartAutoSlide();
    };

    const prevSlide = () => {
        setIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
        restartAutoSlide();
    };

    // ---------------- SWIPE ----------------
    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x < -80) nextSlide();
        if (info.offset.x > 80) prevSlide();
    };

    // ---------------- MOTION CONFIG ----------------
    const initial = reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, scale: 1.04 };

    const animate = reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, scale: 1 };

    const exit = reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, scale: 1.02 };

    return (
        <section className="relative h-[85vh] overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[index].id}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                        duration: reduceMotion ? 0.2 : 0.9,
                        ease: "easeInOut",
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[index].image}
                        alt={slides[index].title}
                        fill
                        priority
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30" />

                    <div
                        className={`relative z-10 mx-auto max-w-[1280px] h-full px-4 md:px-8 flex items-center
                        ${slides[index].align === "left"
                                ? "justify-start text-left"
                                : slides[index].align === "center"
                                    ? "justify-center text-center"
                                    : "justify-end text-right"
                            }`}
                    >
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="max-w-xl text-white"
                        >
                            <p className="mb-4 text-sm uppercase tracking-widest opacity-80">
                                {slides[index].subtitle}
                            </p>

                            <h1 className="mb-6 text-4xl md:text-5xl font-light leading-tight">
                                {slides[index].title}
                            </h1>

                            <p className="mb-8 text-sm md:text-base opacity-90">
                                {slides[index].description}
                            </p>

                            <Link
                                href={slides[index].href}
                                className="inline-block border border-white px-6 py-3 text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
                            >
                                {slides[index].cta}
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ---------------- ARROWS (HOVER ONLY) ---------------- */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                hidden md:flex items-center justify-center
                h-10 w-10 rounded-full bg-black/40 text-white
                opacity-0 group-hover:opacity-100 transition"
                aria-label="Previous slide"
            >
                <ChevronLeft size={22} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                hidden md:flex items-center justify-center
                h-10 w-10 rounded-full bg-black/40 text-white
                opacity-0 group-hover:opacity-100 transition"
                aria-label="Next slide"
            >
                <ChevronRight size={22} />
            </button>

            {/* ---------------- PROGRESS BAR ---------------- */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/20">
                <motion.div
                    key={index}
                    className="h-full bg-[#0C400A]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: SLIDE_DURATION / 1000,
                        ease: "linear",
                    }}
                />
            </div>
        </section>
    );
}
