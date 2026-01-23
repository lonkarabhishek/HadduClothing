"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import SizeGuide from "./SizeGuide";
import ProductCard from "./ProductCard";
import type { ProductDetail as ProductDetailType, Product } from "@/lib/types";
import shopifyImageLoader from "@/lib/shopifyImageLoader";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";

type Props = {
  product: ProductDetailType;
};

// Size mapping with inches
const SIZE_INCHES: Record<string, string> = {
  "XS": "32-34\"",
  "S": "34-36\"",
  "M": "38-40\"",
  "L": "40-42\"",
  "XL": "42-44\"",
  "XXL": "44-46\"",
  "2XL": "44-46\"",
  "3XL": "46-48\"",
};

// Transform raw Shopify product to Product type for cards
function transformProductForCard(node: any): Product {
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || "0");
  const compareAt = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || "0");
  const hasDiscount = compareAt > price;
  const discountPercent = hasDiscount ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

  let tag: string | undefined;
  if (node.tags?.includes("bestseller") || node.tags?.includes("Bestseller")) {
    tag = "Bestseller";
  } else if (node.tags?.includes("new") || node.tags?.includes("New")) {
    tag = "New";
  } else if (hasDiscount && discountPercent >= 10) {
    tag = `${discountPercent}% OFF`;
  }

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

export default function ProductDetail({ product }: Props) {
  const { addToCart, isLoading } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const firstAvailable = product.variants.find((v) => v.availableForSale);
    if (firstAvailable) {
      return Object.fromEntries(
        firstAvailable.selectedOptions.map((opt) => [opt.name, opt.value])
      );
    }
    return Object.fromEntries(
      product.variants[0]?.selectedOptions.map((opt) => [opt.name, opt.value]) || []
    );
  });

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  // Fetch similar products
  useEffect(() => {
    async function fetchSimilarProducts() {
      try {
        const res = await shopifyFetch(PRODUCTS_QUERY, { first: 8 });
        if (res?.data?.products?.nodes) {
          const transformed = res.data.products.nodes
            .filter((p: any) => p.handle !== product.handle)
            .slice(0, 4)
            .map(transformProductForCard);
          setSimilarProducts(transformed);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    }
    fetchSimilarProducts();
  }, [product.handle]);

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    );
  }, [product.variants, selectedOptions]);

  const isOptionAvailable = (optionName: string, optionValue: string) => {
    const potentialOptions = { ...selectedOptions, [optionName]: optionValue };
    return product.variants.some(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.every(
          (opt) => potentialOptions[opt.name] === opt.value
        )
    );
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;

    setIsAdding(true);
    try {
      await addToCart(selectedVariant.id, quantity);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setTimeout(() => setIsAdding(false), 1500);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const price = selectedVariant?.price ?? product.price;
  const compareAtPrice = selectedVariant?.compareAtPrice ?? product.compareAtPrice;
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <>
      {/* Main Content - Add padding at bottom for mobile sticky bar */}
      <div className="container py-6 md:py-12 pb-28 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-product bg-gray-100 rounded-lg overflow-hidden">
              {product.images[currentImageIndex]?.url ? (
                <Image
                  loader={shopifyImageLoader}
                  src={product.images[currentImageIndex].url}
                  alt={product.images[currentImageIndex].altText || product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No image</span>
                </div>
              )}

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {hasDiscount && (
                <span className="badge badge-sale absolute top-3 left-3">
                  {discountPercentage}% OFF
                </span>
              )}

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - Desktop */}
            {product.images.length > 1 && (
              <div className="hidden md:flex gap-2 overflow-x-auto no-scrollbar">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      loader={shopifyImageLoader}
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-2xl font-bold">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{compareAtPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="price-discount">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Options (Size, Color, etc.) */}
            {product.options.map((option) => (
              <div key={option.name}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">
                    {option.name}: <span className="font-normal">{selectedOptions[option.name]}</span>
                  </span>
                  {option.name.toLowerCase() === "size" && (
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-sm text-gray-600 underline"
                    >
                      Size Guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    const isAvailable = isOptionAvailable(option.name, value);
                    const isSize = option.name.toLowerCase() === "size";
                    const sizeInches = SIZE_INCHES[value.toUpperCase()];

                    return (
                      <button
                        key={value}
                        onClick={() => handleOptionChange(option.name, value)}
                        disabled={!isAvailable}
                        className={`size-btn ${isSelected ? "selected" : ""}`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{value}</span>
                          {isSize && sizeInches && (
                            <span className="text-[10px] text-gray-400 font-normal">
                              {sizeInches}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div>
              <span className="block font-semibold mb-3">Quantity</span>
              <div className="qty-selector inline-flex">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button - Hidden on mobile, shown on desktop */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || isLoading || isAdding}
              className={`hidden md:flex btn w-full h-14 text-base ${
                selectedVariant?.availableForSale
                  ? isAdding
                    ? "btn-primary"
                    : "btn-black"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isAdding ? (
                <span className="flex items-center gap-2">
                  <Check size={20} />
                  Added to Cart!
                </span>
              ) : !selectedVariant?.availableForSale ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="trust-icon">
                <Truck size={18} />
                <span>Free Shipping</span>
              </div>
              <div className="trust-icon">
                <RotateCcw size={18} />
                <span>Easy Returns</span>
              </div>
              <div className="trust-icon">
                <Shield size={18} />
                <span>Secure Pay</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-3">Description</h3>
              {product.descriptionHtml ? (
                <div
                  className="prose text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-gray-600 text-sm">
                  {product.description || "No description available."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section style={{ backgroundColor: '#fafafa', padding: '40px 0' }}>
          <div className="container">
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: '#111'
            }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Breadcrumb Navigation - At the end */}
      <div className="container py-6">
        <nav style={{
          fontSize: '14px',
          color: '#666',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Link href="/" style={{ color: '#666' }}>Home</Link>
          <span>/</span>
          <Link href="/collections/all" style={{ color: '#666' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: '#111' }}>{product.title}</span>
        </nav>
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #e5e5e5',
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }}
      >
        {/* Price */}
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
            ₹{price.toLocaleString("en-IN")}
          </p>
          {hasDiscount && (
            <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: '500' }}>
              {discountPercentage}% OFF
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale || isLoading || isAdding}
          style={{
            flex: 1,
            height: '48px',
            backgroundColor: selectedVariant?.availableForSale ? (isAdding ? '#16a34a' : '#152312') : '#e5e5e5',
            color: selectedVariant?.availableForSale ? 'white' : '#999',
            fontWeight: '600',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            cursor: selectedVariant?.availableForSale ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {isAdding ? (
            <>
              <Check size={20} />
              Added!
            </>
          ) : !selectedVariant?.availableForSale ? (
            "Out of Stock"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  );
}
