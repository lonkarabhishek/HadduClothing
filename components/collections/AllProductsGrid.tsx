"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";

/* TEMP DATA */
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
];

export default function AllProductsGrid() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="
        grid gap-x-6 gap-y-16
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
        >
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
}
