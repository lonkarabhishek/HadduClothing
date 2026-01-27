"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { shopifyFetch } from "@/lib/shopify";
import { SEARCH_PRODUCTS_QUERY } from "@/lib/queries";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/types";

// Transform raw Shopify product to Product type
function transformProduct(node: any): Product {
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || "0");
  const compareAt = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || "0");
  const hasDiscount = compareAt > price;
  const discountPercent = hasDiscount ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

  // Get tag from product tags
  let tag: string | undefined;
  if (node.tags?.includes("bestseller") || node.tags?.includes("Bestseller")) {
    tag = "Bestseller";
  } else if (node.tags?.includes("new") || node.tags?.includes("New")) {
    tag = "New";
  } else if (hasDiscount && discountPercent >= 10) {
    tag = `${discountPercent}% OFF`;
  }

  // Get first variant for quick add
  const firstVariant = node.variants?.nodes?.[0];
  const sizes = node.options?.find((o: any) => o.name.toLowerCase() === "size")?.values || [];

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    tag,
    image: node.featuredImage?.url || node.images?.nodes?.[0]?.url || "",
    hoverImage: node.images?.nodes?.[1]?.url,
    price,
    originalPrice: hasDiscount ? compareAt : undefined,
    discount: hasDiscount ? `${discountPercent}% OFF` : undefined,
    sizes,
    href: `/products/${node.handle}`,
    variantId: firstVariant?.id,
    availableForSale: firstVariant?.availableForSale ?? true,
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await shopifyFetch(SEARCH_PRODUCTS_QUERY, {
        query: searchQuery,
        first: 20,
      });

      if (res?.data?.search?.nodes) {
        const transformed = res.data.search.nodes.map(transformProduct);
        setResults(transformed);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchProducts(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, searchProducts]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '60px 24px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '150px', height: '150px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
          Find What You Love
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Search Products
        </h1>

        {/* Search Input inside banner */}
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.5)'
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              autoFocus
              style={{
                width: '100%',
                paddingLeft: '48px',
                paddingRight: '48px',
                paddingTop: '16px',
                paddingBottom: '16px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                boxSizing: 'border-box'
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '4px',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#9ca3af' }} />
          </div>
        ) : hasSearched ? (
          results.length > 0 ? (
            <>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ color: '#6b7280', marginBottom: '8px' }}>No products found for &quot;{query}&quot;</p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>Try a different search term</p>
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <Search size={48} style={{ margin: '0 auto 16px', color: '#e5e7eb' }} />
            <p style={{ color: '#6b7280' }}>Start typing to search products</p>
          </div>
        )}
      </div>
    </main>
  );
}
