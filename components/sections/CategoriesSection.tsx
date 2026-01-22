"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/lib/queries";

/* ================= TYPES ================= */

type Category = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    href: string;
};

/* ================= SPLIT TEXT ================= */

function SplitText({ text }: { text: string }) {
    return (
        <span className="inline-flex overflow-hidden">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    whileHover={{ y: "-12%" }}
                    transition={{
                        delay: i * 0.018,
                        duration: 0.35,
                        ease: "easeOut",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

/* ================= SECTION ================= */

export default function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await shopifyFetch(COLLECTIONS_QUERY);

                const formatted: Category[] =
                    res.data.collections.nodes.map((col: any) => ({
                        id: col.id,
                        title: col.title,
                        subtitle: "Shop Collection",
                        description:
                            col.description ||
                            "Explore curated styles from this collection.",
                        image: col.image?.url || "/placeholder.webp",
                        href: `/collections/${col.handle}`,
                    }));

                setCategories(formatted);
            } catch (error) {
                console.error("Failed to load collections", error);
            }
        }

        fetchCategories();
    }, []);

    if (!categories.length) return null;

    return (
        <section className="pt-16 md:pt-24 pb-14 overflow-hidden">
            {/* ---------- HEADER ---------- */}
            <div className="mb-10 md:mb-14 text-center max-w-xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-light tracking-[0.25em] uppercase">
                    Categories
                </h2>
                <p className="mt-4 text-xs md:text-sm text-gray-500 tracking-wide">
                    Designed for movement. Built for presence.
                </p>
            </div>

            {/* ---------- HORIZONTAL SCROLL ---------- */}
            <div
                className="
                    flex gap-6 md:gap-14
                    px-6 md:px-16
                    overflow-x-auto no-scrollbar
                    snap-x snap-mandatory
                "
            >
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>

            {/* ---------- MOBILE SCROLL HINT ---------- */}
            <p className="mt-6 text-[10px] text-center text-gray-400 tracking-[0.35em] md:hidden">
                SWIPE →
            </p>
        </section>
    );
}

/* ================= CARD ================= */

function CategoryCard({ category }: { category: Category }) {
    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <Link
            href={category.href}
            ref={ref}
            className="
                relative
                min-w-[85vw] sm:min-w-[360px] md:min-w-[440px]
                h-[460px] sm:h-[520px] md:h-[580px]
                snap-center
            "
        >
            <motion.div
                className="
                    absolute inset-0 overflow-hidden rounded-sm
                    group
                "
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
                        sizes="(max-width: 768px) 85vw, 440px"
                        className="object-cover"
                    />
                </motion.div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full px-6 md:px-10 pb-8 md:pb-12 text-white">
                    <div className="flex flex-col gap-3 md:gap-4 max-w-md">
                        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/70">
                            {category.subtitle}
                        </p>

                        <motion.h3
                            className="
                                text-2xl md:text-4xl
                                font-light uppercase
                                tracking-[0.2em] md:tracking-[0.25em]
                            "
                            whileHover={{ letterSpacing: "0.35em" }}
                            transition={{ duration: 0.35 }}
                        >
                            <SplitText text={category.title} />
                        </motion.h3>

                        <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-sm">
                            {category.description}
                        </p>

                        <motion.div
                            className="h-[1px] bg-white/90"
                            initial={{ width: "35%" }}
                            whileHover={{ width: "60%" }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
