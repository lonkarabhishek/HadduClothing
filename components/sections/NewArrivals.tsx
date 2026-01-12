"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";

/* ================= DATA ================= */

const products: Product[] = [
    {
        id: 1,
        title: "Mandarin Collar Cotton-Linen Shirt – Zephyr",
        tag: "Oversized Tees",
        image: "/p2.webp",
        price: 2249,
        originalPrice: 2499,
        discount: "10% OFF",
        sizes: [39, 40, 42, 44, 46],
        href: "/products/zephyr-shirt",
    },
    {
        id: 2,
        title: "Classic Oversized Cotton Shirt – Drift",
        tag: "Hoodies",
        image: "/p1.webp",
        price: 1999,
        originalPrice: 2299,
        discount: "13% OFF",
        sizes: [38, 40, 42, 44],
        href: "/products/drift-shirt",
    },
    {
        id: 3,
        title: "Mandarin Collar Cotton-Linen Shirt – Zephyr",
        tag: "Oversized Tees",
        image: "/p2.webp",
        price: 2249,
        originalPrice: 2499,
        discount: "10% OFF",
        sizes: [39, 40, 42, 44, 46],
        href: "/products/zephyr-shirt",
    },
    {
        id: 4,
        title: "Classic Oversized Cotton Shirt – Drift",
        tag: "Hoodies",
        image: "/p1.webp",
        price: 1999,
        originalPrice: 2299,
        discount: "13% OFF",
        sizes: [38, 40, 42, 44],
        href: "/products/drift-shirt",
    },
];

/* ================= CONFIG ================= */

const DESKTOP_ITEMS = 4;
const TABLET_ITEMS = 2;
const MOBILE_ITEMS = 1;

export default function NewArrivals() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(DESKTOP_ITEMS);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect(() => {
        const update = () => {
            if (!containerRef.current) return;
            setSlideWidth(containerRef.current.offsetWidth);

            if (window.innerWidth < 640) setItemsPerSlide(MOBILE_ITEMS);
            else if (window.innerWidth < 1024) setItemsPerSlide(TABLET_ITEMS);
            else setItemsPerSlide(DESKTOP_ITEMS);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerSlide);

    return (
        <section className="py-16 md:py-20 px-5 md:px-8 max-w-[1600px] mx-auto overflow-hidden">
            {/* HEADER */}
            <div className="mb-12 md:mb-16 text-center max-w-xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-light tracking-[0.25em] uppercase">
                    New Arrivals
                </h2>
                <p className="mt-4 text-xs md:text-sm text-gray-500 tracking-wide">
                    Fresh styles, just dropped.
                </p>
            </div>

            {/* SLIDER */}
            <div ref={containerRef} className="overflow-hidden">
                <motion.div
                    animate={{ x: -page * slideWidth }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="flex"
                >
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <div
                            key={i}
                            className={`grid gap-8 min-w-full ${itemsPerSlide === 1
                                    ? "grid-cols-1"
                                    : itemsPerSlide === 2
                                        ? "grid-cols-2"
                                        : "grid-cols-4"
                                }`}
                        >
                            {products
                                .slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide)
                                .map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* VIEW MORE */}
            <div className="mt-16 text-center">
                <Link
                    href="/collections/new-arrivals"
                    className="inline-flex items-center border border-black px-12 py-4 text-[10px] uppercase tracking-[0.35em] transition hover:bg-[#084205] hover:text-white"
                >
                    View More
                </Link>
            </div>
        </section>
    );
}
