"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";
import { shopifyFetch } from "@/lib/shopify";
import { LATEST_PRODUCTS_QUERY } from "@/lib/queries";
import { mockProducts } from "@/lib/mockData";

// Helper to check if product belongs to kids collection
function isKidsProduct(node: any): boolean {
  const tags = node.tags || [];
  const hasKidsTag = tags.some((tag: string) =>
    tag.toLowerCase().includes('kid') ||
    tag.toLowerCase().includes('children') ||
    tag.toLowerCase().includes('child')
  );

  const collections = node.collections?.nodes || [];
  const inKidsCollection = collections.some((col: any) =>
    col.handle === 'kids-collection' ||
    col.handle?.toLowerCase().includes('kid') ||
    col.title?.toLowerCase().includes('kid') ||
    col.handle?.toLowerCase().includes('children') ||
    col.title?.toLowerCase().includes('children')
  );

  return hasKidsTag || inKidsCollection;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        // Fetch more to account for kids products being filtered out
        const res = await shopifyFetch(LATEST_PRODUCTS_QUERY, { first: 16 });

        if (!res) {
          // Use mock data if Shopify not configured
          const newArrivals = mockProducts.slice(0, 8).map((p) => ({
            ...p,
            tag: "New",
          }));
          setProducts(newArrivals);
          return;
        }

        // Filter out kids products and limit to 8
        const filteredNodes = res.data.products.nodes
          .filter((node: any) => !isKidsProduct(node))
          .slice(0, 8);

        const formattedProducts: Product[] = filteredNodes.map((node: any) => {
          const sizes: string[] = node.options?.find(
            (opt: any) => opt.name === "Size"
          )?.values || [];
          const colors: string[] = node.options?.find(
            (opt: any) => opt.name.toLowerCase() === "color"
          )?.values || [];

          const firstVariant = node.variants?.nodes?.[0];
          const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount;
          const price = Number(node.priceRange?.minVariantPrice?.amount ?? 0);
          const hasDiscount = comparePrice && Number(comparePrice) > price;

          return {
            id: node.id,
            handle: node.handle,
            title: node.title,
            tag: "New",
            image: node.featuredImage?.url || node.images?.nodes?.[0]?.url || null,
            images: node.images?.nodes?.map((img: any) => img.url).filter(Boolean) || [],
            hoverImage: node.images?.nodes?.[1]?.url,
            price,
            originalPrice: hasDiscount ? Number(comparePrice) : undefined,
            discount: hasDiscount
              ? `${Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100)}% OFF`
              : undefined,
            sizes,
            colors: [], // Don't show color swatches
            href: `/products/${node.handle}`,
            variantId: firstVariant?.id,
            availableForSale: firstVariant?.availableForSale ?? true,
          };
        });

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch new arrivals", error);
        const newArrivals = mockProducts.slice(0, 8).map((p) => ({
          ...p,
          tag: "New",
        }));
        setProducts(newArrivals);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestProducts();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
            <p className="text-gray-500 text-sm mt-1">Fresh styles just dropped</p>
          </div>
          <Link
            href="/collections/all"
            className="text-[#0C4008] text-sm font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="product-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="skeleton aspect-product rounded-lg" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
