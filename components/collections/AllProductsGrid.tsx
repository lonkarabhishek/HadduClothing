"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";
import { mockProducts } from "@/lib/mockData";

// Helper to check if product belongs to kids collection
function isKidsProduct(node: any): boolean {
  // Check tags for kids-related keywords
  const tags = node.tags || [];
  const hasKidsTag = tags.some((tag: string) =>
    tag.toLowerCase().includes('kid') ||
    tag.toLowerCase().includes('children') ||
    tag.toLowerCase().includes('child')
  );

  // Check collections for kids-collection handle or kids-related titles
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

export default function AllProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasKidsCollection, setHasKidsCollection] = useState(false);

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

        // Check if any kids products exist
        const kidsExist = shopifyProducts.some((node: any) => isKidsProduct(node));
        setHasKidsCollection(kidsExist);

        // Filter out kids products from main listing
        const filteredProducts = shopifyProducts.filter((node: any) => !isKidsProduct(node));

        // Expand products by color variants
        const formattedProducts: Product[] = [];

        filteredProducts.forEach((node: any) => {
          const sizes: string[] =
            node.options?.find((opt: any) => opt.name === "Size")?.values || [];
          const colors: string[] =
            node.options?.find((opt: any) => opt.name.toLowerCase() === "color")?.values || [];

          const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount;
          const price = Number(node.priceRange?.minVariantPrice?.amount ?? 0);
          const hasDiscount = comparePrice && Number(comparePrice) > price;
          const tag = node.tags?.includes("bestseller") ? "Best Seller" : undefined;

          // If product has multiple colors, create a card for each color
          if (colors.length > 1) {
            colors.forEach((color: string) => {
              // Find ALL variants with this color to get their images
              const variantsWithColor = node.variants?.nodes?.filter((v: any) =>
                v.selectedOptions?.some((opt: any) =>
                  opt.name.toLowerCase() === "color" && opt.value === color
                )
              ) || [];

              // Collect all unique images for this color
              const colorImages: string[] = [];
              variantsWithColor.forEach((v: any) => {
                if (v.image?.url && !colorImages.includes(v.image.url)) {
                  colorImages.push(v.image.url);
                }
              });

              // If no variant images, use product images as fallback
              const fallbackImage = node.featuredImage?.url || node.images?.nodes?.[0]?.url || null;
              const allImages = colorImages.length > 0 ? colorImages : [fallbackImage].filter(Boolean);

              formattedProducts.push({
                id: `${node.id}-${color}`,
                handle: node.handle,
                title: `${node.title} - ${color}`,
                tag,
                image: allImages[0] || fallbackImage,
                images: allImages,
                hoverImage: allImages[1] || undefined,
                price,
                originalPrice: hasDiscount ? Number(comparePrice) : undefined,
                discount: hasDiscount
                  ? `${Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100)}% OFF`
                  : undefined,
                sizes,
                colors: [], // Don't show swatches for individual color cards
                href: `/products/${node.handle}?color=${encodeURIComponent(color)}`,
                variantId: variantsWithColor[0]?.id || node.variants?.nodes?.[0]?.id,
                availableForSale: variantsWithColor[0]?.availableForSale ?? true,
              });
            });
          } else {
            // Single color or no color - show as single product
            const firstVariant = node.variants?.nodes?.[0];
            formattedProducts.push({
              id: node.id,
              handle: node.handle,
              title: node.title,
              tag,
              image: node.featuredImage?.url || node.images?.nodes?.[0]?.url || null,
              images: node.images?.nodes?.map((img: any) => img.url).filter(Boolean) || [],
              hoverImage: node.images?.nodes?.[1]?.url,
              price,
              originalPrice: hasDiscount ? Number(comparePrice) : undefined,
              discount: hasDiscount
                ? `${Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100)}% OFF`
                : undefined,
              sizes,
              colors,
              href: `/products/${node.handle}`,
              variantId: firstVariant?.id,
              availableForSale: firstVariant?.availableForSale ?? true,
            });
          }
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
    <>
      <div className="product-grid">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>

      {/* Kids Collection Bottom Nudge */}
      {hasKidsCollection && (
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          padding: '32px 20px',
          backgroundColor: '#fefce8',
          borderRadius: '12px',
          border: '1px solid #fef08a'
        }}>
          <p style={{ fontSize: '14px', color: '#854d0e', marginBottom: '12px' }}>
            Looking for something for the little ones?
          </p>
          <Link
            href="/collections/kids-collection"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#3f5046',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Explore Kids Collection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      <style>{`
        .kids-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(251, 191, 36, 0.3);
        }
      `}</style>
    </>
  );
}
