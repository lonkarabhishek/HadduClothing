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
              colors: [], // Don't show color swatches on product list
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
      {/* Main products grid (all except last 2) */}
      <div className="product-grid">
        {products.slice(0, -2).map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>

      {/* Banner + Last 2 Products Row */}
      {products.length >= 2 && (
        <>
          {/* Visual separator */}
          <div style={{
            marginTop: '48px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e5e5' }} />
            <span style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '500' }}>Featured</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e5e5' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
          {/* Last 2 Products - on left */}
          {products.slice(-2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Banner Image - on right, spans 2 columns */}
          <div
            className="col-span-2 row-span-1 md:row-span-2 rounded-xl overflow-hidden order-first md:order-last"
            style={{
              position: 'relative',
              background: '#fafafa'
            }}
          >
            <img
              src="/bottomimages.png"
              alt="Haddu Clothing - Premium Streetwear"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                minHeight: '200px'
              }}
            />
            {/* Fade overlay on all borders */}
            <div style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 50px 30px rgba(250,250,250,0.7)',
              pointerEvents: 'none',
              borderRadius: '12px'
            }} />
            {/* Top fade */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(250,250,250,0.6) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            {/* Bottom fade */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to top, rgba(250,250,250,0.6) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            {/* Left fade */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '40px',
              background: 'linear-gradient(to right, rgba(250,250,250,0.6) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            {/* Right fade */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '40px',
              background: 'linear-gradient(to left, rgba(250,250,250,0.6) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>
        </>
      )}

      {/* Kids Collection Bottom Nudge */}
      {hasKidsCollection && (
        <div style={{
          marginTop: '48px',
          padding: '40px 24px',
          backgroundColor: '#fefce8',
          borderRadius: '16px',
          border: '1px solid #fef08a',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            width: '100px',
            height: '100px',
            backgroundColor: '#fef08a',
            borderRadius: '50%',
            opacity: 0.4
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-30px',
            width: '120px',
            height: '120px',
            backgroundColor: '#fde047',
            borderRadius: '50%',
            opacity: 0.3
          }} />
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            fontSize: '40px',
            opacity: 0.2
          }}>⭐</div>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '30px',
            fontSize: '30px',
            opacity: 0.2
          }}>🎈</div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: '#fbbf24',
              borderRadius: '20px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '16px' }}>👶</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#78350f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kids Collection</span>
            </div>

            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#78350f',
              marginBottom: '8px'
            }}>
              For the Little Ones
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#92400e',
              marginBottom: '20px',
              maxWidth: '300px',
              margin: '0 auto 20px'
            }}>
              Cute & comfy styles designed for your kids. Same premium quality, sized just right!
            </p>

            <Link
              href="/collections/kids-collection"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#78350f',
                color: 'white',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(120, 53, 15, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Shop Kids Collection
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
