"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";
import { shopifyFetch } from "@/lib/shopify";

// Map URL slugs to display names and product types
const TYPE_CONFIG: Record<string, { title: string; types: string[]; description: string }> = {
  "oversized-tees": {
    title: "Oversized Tees",
    types: ["Oversized Tees"],
    description: "Premium oversized t-shirts with bold graphics"
  },
  "hoodies": {
    title: "Hoodies",
    types: ["Zipper", "Non-Zipper"],
    description: "Stay warm with our premium hoodies"
  },
};

// Query to fetch products by type
const PRODUCTS_BY_TYPE_QUERY = `
  query ProductsByType($query: String!, $first: Int = 50) {
    products(first: $first, query: $query) {
      nodes {
        id
        handle
        title
        productType
        featuredImage {
          url
          altText
        }
        images(first: 6) {
          nodes {
            url
            altText
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 50) {
          nodes {
            id
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        tags
      }
    }
  }
`;

export default function ProductTypePage() {
  const params = useParams();
  const typeSlug = params.type as string;
  const config = TYPE_CONFIG[typeSlug];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!config) {
        setLoading(false);
        return;
      }

      try {
        // Build query string for multiple types: (product_type:Type1) OR (product_type:Type2)
        const typeQueries = config.types.map(t => `product_type:"${t}"`).join(" OR ");
        const query = `(${typeQueries})`;

        const res = await shopifyFetch(PRODUCTS_BY_TYPE_QUERY, { query, first: 50 });

        if (!res?.data?.products?.nodes) {
          setLoading(false);
          return;
        }

        const formattedProducts: Product[] = [];

        res.data.products.nodes.forEach((node: any) => {
          const sizes: string[] =
            node.options?.find((opt: any) => opt.name === "Size")?.values || [];
          const colors: string[] =
            node.options?.find((opt: any) => opt.name.toLowerCase() === "color")?.values || [];

          const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount;
          const price = Number(node.priceRange?.minVariantPrice?.amount ?? 0);
          const hasDiscount = comparePrice && Number(comparePrice) > price;

          let tag: string | undefined;
          if (node.tags?.includes("bestseller") || node.tags?.includes("Bestseller")) {
            tag = "Bestseller";
          } else if (node.tags?.includes("new") || node.tags?.includes("New")) {
            tag = "New";
          } else if (hasDiscount) {
            const discountPercent = Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100);
            if (discountPercent >= 10) tag = `${discountPercent}% OFF`;
          }

          // Expand by color variants
          if (colors.length > 1) {
            colors.forEach((color: string) => {
              const variantsWithColor = node.variants?.nodes?.filter((v: any) =>
                v.selectedOptions?.some((opt: any) =>
                  opt.name.toLowerCase() === "color" && opt.value === color
                )
              ) || [];

              const colorImages: string[] = [];
              variantsWithColor.forEach((v: any) => {
                if (v.image?.url && !colorImages.includes(v.image.url)) {
                  colorImages.push(v.image.url);
                }
              });

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
                colors: [],
                href: `/products/${node.handle}?color=${encodeURIComponent(color)}`,
                variantId: variantsWithColor[0]?.id || node.variants?.nodes?.[0]?.id,
                availableForSale: variantsWithColor[0]?.availableForSale ?? true,
              });
            });
          } else {
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
              colors: [],
              href: `/products/${node.handle}`,
              variantId: firstVariant?.id,
              availableForSale: firstVariant?.availableForSale ?? true,
            });
          }
        });

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products by type:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [config]);

  if (!config) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <div className="container py-16 text-center">
          <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
            Category Not Found
          </h1>
          <Link href="/collections/all" style={{ color: '#3f5046', fontWeight: '600' }}>
            Browse All Products →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header - minimal */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '16px 24px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>
          {config.title}
        </h1>
      </div>

      {/* Products Grid */}
      <div className="container" style={{ padding: '24px 16px 60px' }}>
        {loading ? (
          <div className="product-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="skeleton aspect-product rounded-lg" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Link href="/collections/all" style={{ color: '#3f5046', fontWeight: '600', marginTop: '16px', display: 'inline-block' }}>
              Browse All Products →
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
