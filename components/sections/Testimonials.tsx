"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote:
            "The fabric quality instantly stood out. You can feel the craftsmanship the moment you wear it.",
        name: "Aarav Mehta",
        role: "Creative Director",
    },
    {
        quote:
            "Minimal, premium, and timeless. Exactly what modern wardrobes need.",
        name: "Ritika Sharma",
        role: "Fashion Buyer",
    },
    {
        quote:
            "Every detail feels intentional — from stitching to fit. Truly elevated essentials.",
        name: "Kunal Verma",
        role: "Brand Consultant",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 md:py-28 px-5 md:px-8 bg-white text-[#171717]">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="mb-14 md:mb-20 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-light tracking-[0.3em] uppercase">
                        What People Say
                    </h2>
                    <p className="mt-5 text-xs md:text-sm text-gray-500 tracking-wide">
                        Honest words from those who value refined design and quality.
                    </p>
                </div>

                {/* TESTIMONIAL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* DESKTOP VERTICAL LINE */}
                            <div className="absolute -left-6 top-0 h-full w-px bg-black/10 hidden md:block" />

                            {/* MOBILE DIVIDER */}
                            {index !== 0 && (
                                <div className="mb-10 block md:hidden">
                                    <div className="h-px w-full bg-black/10" />
                                </div>
                            )}

                            {/* QUOTE */}
                            <p className="text-base md:text-lg leading-relaxed font-light tracking-wide text-[#171717]">
                                “{item.quote}”
                            </p>

                            {/* AUTHOR */}
                            <div className="mt-8 md:mt-10">
                                <p className="text-xs md:text-sm uppercase tracking-widest text-[#171717]">
                                    {item.name}
                                </p>
                                <p className="mt-1 text-[11px] md:text-xs text-gray-500 tracking-wide">
                                    {item.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
