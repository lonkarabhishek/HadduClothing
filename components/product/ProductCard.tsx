"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Product } from "./types";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
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
                <button
                    aria-label="Add to wishlist"
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                >
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
                                animate={{ scale: [1, 1.25, 1], opacity: 1 }}
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
