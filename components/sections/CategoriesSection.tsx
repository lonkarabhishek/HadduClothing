"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

type Category = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    href: string;
};

const categories: Category[] = [
    {
        id: 1,
        title: "Hoodies",
        subtitle: "Everyday Essential",
        description: "Relaxed silhouettes crafted for comfort and presence.",
        image: "/hoodies.webp",
        href: "/collections/hoodies",
    },
    {
        id: 2,
        title: "Oversized Tees",
        subtitle: "Modern Fit",
        description: "Statement tees designed with breathable premium cotton.",
        image: "/tees.webp",
        href: "/collections/oversized-tees",
    },
    {
        id: 3,
        title: "Streetwear",
        subtitle: "Urban Culture",
        description: "Bold layers inspired by street and motion.",
        image: "/street.webp",
        href: "/collections/streetwear",
    },
];

function SplitText({ text }: { text: string }) {
    return (
        <span className="inline-flex overflow-hidden">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    whileHover={{ y: "-10%" }}
                    transition={{ delay: i * 0.02, ease: "easeOut" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

export default function CategoriesSection() {
    return (
        <section className="py-10 pt-20 overflow-hidden">
            {/* ---------- HEADER ---------- */}
            <div className="mb-12 text-center max-w-xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light tracking-[0.25em] uppercase">
                    Categories
                </h2>
                <p className="mt-5 text-sm text-gray-500 tracking-wide">
                    Designed for movement. Built for presence.
                </p>
            </div>

            {/* ---------- HORIZONTAL SCROLL ---------- */}
            <div className="flex gap-14 px-16 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </section>
    );
}

/* ================= CLEAN CARD (NO SHADOW) ================= */

function CategoryCard({ category }: { category: Category }) {
    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <Link
            href={category.href}
            ref={ref}
            className="relative min-w-[440px] h-[580px] snap-center"
        >
            <motion.div
                className="absolute inset-0 overflow-hidden rounded-sm group transition-transform duration-500"
                whileHover={{ y: -6 }}
                transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* IMAGE */}
                <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full px-10 pb-12 text-white">
                    <div className="flex flex-col gap-4 max-w-md">
                        {/* Subtitle */}
                        <motion.p
                            className="text-[11px] uppercase tracking-[0.4em] text-white/70"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                        >
                            {category.subtitle}
                        </motion.p>

                        {/* Title */}
                        <motion.h3
                            className="text-4xl font-light uppercase tracking-[0.25em]"
                            whileHover={{ letterSpacing: "0.4em" }}
                            transition={{ duration: 0.35 }}
                        >
                            <SplitText text={category.title} />
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                            className="text-sm text-white/80 leading-relaxed max-w-sm"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.35 }}
                        >
                            {category.description}
                        </motion.p>

                        {/* Divider */}
                        <motion.div
                            className="h-[1px] bg-white/90"
                            initial={{ width: "40%" }}
                            whileHover={{ width: "65%" }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
