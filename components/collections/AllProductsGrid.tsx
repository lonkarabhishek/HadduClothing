"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";
import { mockProducts } from "@/lib/mockData";

export default function AllProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await shopifyFetch(PRODUCTS_QUERY);

        if (!res) {
          setProducts(mockProducts);
          setLoading(false);
          return;
        }

        const shopifyProducts = res.data.products.nodes;

        const formattedProducts: Product[] = shopifyProducts.map((node: any) => {
          const sizes: string[] =
            node.options?.find((opt: any) => opt.name === "Size")?.values || [];

          const firstVariant = node.variants?.nodes?.[0];
          const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount;
          const price = Number(node.priceRange?.minVariantPrice?.amount ?? 0);
          const hasDiscount = comparePrice && Number(comparePrice) > price;

          return {
            id: node.id,
            handle: node.handle,
            title: node.title,
            tag: node.tags?.includes("bestseller") ? "Best Seller" : undefined,
            image: node.featuredImage?.url || node.images?.nodes?.[0]?.url || null,
            images: node.images?.nodes?.map((img: any) => img.url).filter(Boolean) || [],
            hoverImage: node.images?.nodes?.[1]?.url,
            price,
            originalPrice: hasDiscount ? Number(comparePrice) : undefined,
            discount: hasDiscount
              ? `${Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100)}% OFF`
              : undefined,
            sizes,
            href: `/products/${node.handle}`,
            variantId: firstVariant?.id,
            availableForSale: firstVariant?.availableForSale ?? true,
          };
        });

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Failed to load products", err);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-outline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="skeleton aspect-product rounded-lg" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
