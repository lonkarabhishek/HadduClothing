"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const DESKTOP_ITEMS = 4;
const TABLET_ITEMS = 2;
const MOBILE_ITEMS = 1;

const SLIDE_INTERVAL = 3500;
const LAST_SLIDE_DELAY = 5200;
const SWIPE_THRESHOLD = 80;

/* ================= COMPONENT ================= */

export default function NewArrivals() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const [paused, setPaused] = useState(false);
    const [itemsPerSlide, setItemsPerSlide] = useState(DESKTOP_ITEMS);
    const [slideWidth, setSlideWidth] = useState(0);

    /* ---------- RESPONSIVE SETUP ---------- */
    useEffect(() => {
        const updateLayout = () => {
            if (!containerRef.current) return;

            setSlideWidth(containerRef.current.offsetWidth);

            if (window.innerWidth < 640) setItemsPerSlide(MOBILE_ITEMS);
            else if (window.innerWidth < 1024) setItemsPerSlide(TABLET_ITEMS);
            else setItemsPerSlide(DESKTOP_ITEMS);
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerSlide);
    const isLastSlide = page === totalPages - 1;

    /* ---------- AUTO SLIDE ---------- */
    useEffect(() => {
        if (paused) return;

        const timer = setTimeout(() => {
            setPage(isLastSlide ? 0 : page + 1);
        }, isLastSlide ? LAST_SLIDE_DELAY : SLIDE_INTERVAL);

        return () => clearTimeout(timer);
    }, [page, paused, isLastSlide]);

    /* ---------- DRAG HANDLER ---------- */
    const handleDragEnd = (_: any, info: any) => {
        setPaused(false);

        if (info.offset.x < -SWIPE_THRESHOLD && page < totalPages - 1) {
            setPage((p) => p + 1);
        }

        if (info.offset.x > SWIPE_THRESHOLD && page > 0) {
            setPage((p) => p - 1);
        }
    };

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
            <div
                ref={containerRef}
                className="overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <motion.div
                    drag="x"
                    dragElastic={0.15}
                    dragMomentum={false}
                    onDragStart={() => setPaused(true)}
                    onDragEnd={handleDragEnd}
                    animate={{ x: -page * slideWidth }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="flex cursor-grab active:cursor-grabbing"
                >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                        <div
                            key={pageIndex}
                            className={`grid gap-8 md:gap-10 min-w-full ${itemsPerSlide === 1
                                ? "grid-cols-1"
                                : itemsPerSlide === 2
                                    ? "grid-cols-2"
                                    : "grid-cols-4"
                                }`}
                        >
                            {products
                                .slice(
                                    pageIndex * itemsPerSlide,
                                    pageIndex * itemsPerSlide +
                                    itemsPerSlide
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

            {/* VIEW MORE */}
            {isLastSlide && (
                <div className="mt-16 md:mt-20 text-center">
                    <Link
                        href="/collections/new-arrivals"
                        className="inline-flex items-center border border-black px-10 md:px-12 py-3 md:py-4 text-[10px] md:text-xs uppercase tracking-[0.35em] transition hover:bg-[#084205] hover:text-white"
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
            {/* IMAGE */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link href={product.href}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>

                {/* WISHLIST */}
                <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                    <Heart size={18} />
                </button>

                {/* ADD TO CART */}
                <motion.button
                    onClick={handleAddToCart}
                    animate={{ width: added ? 52 : 160 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 h-11 bg-black text-white uppercase tracking-widest text-[10px] flex items-center justify-center overflow-hidden hover:bg-[#0A3E08] transition"
                >
                    <AnimatePresence mode="wait">
                        {!added ? (
                            <motion.span
                                key="text"
                                exit={{ opacity: 0, y: -6 }}
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
                                <ShoppingBag size={16} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* INFO */}
            <div className="mt-4 space-y-2">
                <span className="inline-block border border-black px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    {product.tag}
                </span>

                <h3 className="text-sm leading-relaxed font-medium line-clamp-2">
                    {product.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-600">
                    {product.sizes.map((size) => (
                        <span
                            key={size}
                            className="border border-gray-300 px-2 py-0.5"
                        >
                            {size}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">
                        ₹ {product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 line-through text-xs">
                        ₹ {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#0C4008] text-white text-[10px] px-2 py-0.5">
                        {product.discount}
                    </span>
                </div>
            </div>
        </div>
    );
}
