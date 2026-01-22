"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";

export default function AllProductsGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await shopifyFetch(PRODUCTS_QUERY);
                const shopifyProducts = res.data.products.nodes;

                const formattedProducts: Product[] = shopifyProducts.map((node: any) => {
                    const sizes =
                        Array.from(
                            new Set(
                                node.variants?.nodes
                                    ?.map((variant: any) =>
                                        variant.selectedOptions.find(
                                            (opt: any) => opt.name === "Size"
                                        )?.value
                                    )
                                    .filter(Boolean)
                            )
                        ) || [];

                    return {
                        id: node.id,
                        title: node.title,
                        tag: "New Drop",
                        image:
                            node.featuredImage?.url ||
                            node.images?.nodes?.[0]?.url ||
                            "/placeholder.webp",
                        price: Number(node.priceRange?.minVariantPrice?.amount ?? 0),
                        originalPrice: undefined,
                        discount: undefined,
                        sizes, // ✅ UNIQUE SIZES ONLY
                        href: `/products/${node.handle}`,
                    };
                });

                setProducts(formattedProducts);
            } catch (err) {
                console.error("Failed to load products", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <p className="text-center py-20 text-sm text-muted-foreground">
                Loading products...
            </p>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="
        grid gap-x-6 gap-y-16
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
        >
            {products.map((product) => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </motion.div>
    );
}
