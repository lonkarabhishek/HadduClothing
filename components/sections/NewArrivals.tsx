"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type Product = {
    id: number;
    title: string;
    tag: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: string;
    sizes: number[];
    href: string;
};

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

const ITEMS_PER_SLIDE = 4;
const SLIDE_INTERVAL = 3000;
const LAST_SLIDE_DELAY = 5000;

/* ================= COMPONENT ================= */

export default function NewArrivals() {
    const controls = useAnimationControls();
    const [page, setPage] = useState(0);
    const [paused, setPaused] = useState(false);

    const totalPages = Math.ceil(products.length / ITEMS_PER_SLIDE);
    const isLastSlide = page === totalPages - 1;

    useEffect(() => {
        if (paused) return;

        let timer: NodeJS.Timeout;

        if (isLastSlide) {
            timer = setTimeout(() => {
                setPage(0);
            }, LAST_SLIDE_DELAY);
        } else {
            timer = setTimeout(() => {
                setPage((p) => p + 1);
            }, SLIDE_INTERVAL);
        }

        return () => clearTimeout(timer);
    }, [page, paused, isLastSlide]);

    useEffect(() => {
        controls.start({
            x: `-${page * 100}%`,
            transition: {
                duration: 0.9,
                ease: [0.4, 0, 0.2, 1],
            },
        });
    }, [page, controls]);

    return (
        <section className="py-12 px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden">
            {/* HEADER */}
            <div className="mb-14 text-center max-w-xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light tracking-[0.25em] uppercase">
                    New Arrivals
                </h2>
                <p className="mt-5 text-sm text-gray-500 tracking-wide">
                    Fresh styles, just dropped.
                </p>
            </div>

            {/* SLIDER */}
            <div
                className="overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <motion.div animate={controls} className="flex w-full">
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                        <div
                            key={pageIndex}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 min-w-full"
                        >
                            {products
                                .slice(
                                    pageIndex * ITEMS_PER_SLIDE,
                                    pageIndex * ITEMS_PER_SLIDE +
                                    ITEMS_PER_SLIDE
                                )
                                .map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* VIEW MORE (BOTTOM – ONLY LAST SLIDE) */}
            {isLastSlide && (
                <div className="mt-20 text-center">
                    <Link
                        href="/collections/new-arrivals"
                        className="inline-flex items-center gap-3 border border-black px-12 py-4 text-xs uppercase tracking-[0.35em] transition hover:bg-[#084205] hover:text-white"
                    >
                        View More
                    </Link>
                </div>
            )}
        </section>
    );
}

/* ================= PRODUCT CARD ================= */

function ProductCard({ product }: { product: Product }) {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (added) return;
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="group relative">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link href={product.href}>
                    <motion.div
                        animate={
                            added
                                ? {
                                    scale: 0.55,
                                    y: 40,
                                    opacity: 0,
                                    filter: "blur(4px)",
                                }
                                : {}
                        }
                        transition={{
                            duration: 0.7,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </motion.div>
                </Link>

                {/* WISHLIST */}
                <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Heart size={18} />
                </button>

                {/* ADD TO CART */}
                <motion.button
                    onClick={handleAddToCart}
                    animate={{ width: added ? 56 : 180 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 h-12 bg-black text-white overflow-hidden flex items-center justify-center uppercase tracking-widest text-xs"
                >
                    <AnimatePresence mode="wait">
                        {!added ? (
                            <motion.span
                                key="text"
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                    filter: "blur(6px)",
                                }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2"
                            >
                                <ShoppingBag size={12} />
                                Add to Cart
                            </motion.span>
                        ) : (
                            <motion.span
                                key="icon"
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{
                                    scale: [1, 1.25, 1],
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <ShoppingBag size={18} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* INFO */}
            <div className="mt-5 space-y-2">
                <span className="inline-block border border-black px-2 py-0.5 text-[11px] uppercase tracking-widest">
                    {product.tag}
                </span>

                <h3 className="text-sm leading-relaxed font-medium">
                    {product.title}
                </h3>

                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    {product.sizes.map((size) => (
                        <span
                            key={size}
                            className="border border-gray-300 px-2 py-0.5"
                        >
                            {size}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold">
                        ₹ {product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 line-through">
                        ₹ {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#0C4008] text-white text-xs px-2 py-0.5">
                        {product.discount}
                    </span>
                </div>
            </div>
        </div>
    );
}
