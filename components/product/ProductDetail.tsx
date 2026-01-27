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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Main Image - Using native img for fastest loading */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              backgroundColor: '#f5f5f5',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {product.images[currentImageIndex]?.url ? (
                <img
                  src={`${product.images[currentImageIndex].url}&width=800`}
                  alt={product.images[currentImageIndex].altText || product.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5'
                }}>
                  <span style={{ color: '#999' }}>No image</span>
                </div>
              )}

              {/* Navigation Arrows - Always Visible */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '1px solid #e5e5e5',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} color="#111" />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '1px solid #e5e5e5',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} color="#111" />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {hasDiscount && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '4px'
                }}>
                  {discountPercentage}% OFF
                </span>
              )}

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - Desktop */}
            {product.images.length > 1 && (
              <div className="hidden md:flex" style={{ gap: '8px', overflowX: 'auto' }}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      position: 'relative',
                      flexShrink: 0,
                      width: '72px',
                      height: '90px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: currentImageIndex === index ? '2px solid #111' : '2px solid transparent',
                      cursor: 'pointer',
                      padding: 0,
                      background: '#f5f5f5'
                    }}
                  >
                    <img
                      src={`${image.url}&width=150`}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
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
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111' }}>{product.title}</h1>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#111' }}>
                  ₹{Math.round(price).toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <>
                    <span style={{ fontSize: '16px', color: '#999', textDecoration: 'line-through' }}>
                      ₹{Math.round(compareAtPrice).toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Options (Size, Color, etc.) */}
            {product.options.map((option) => (
              <div key={option.name}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600', fontSize: '15px', color: '#111' }}>
                    {option.name}: <span style={{ fontWeight: '400' }}>{selectedOptions[option.name]}</span>
                  </span>
                  {option.name.toLowerCase() === "size" && (
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      style={{ fontSize: '14px', color: '#666', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Size Guide
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
                        style={{
                          minWidth: '56px',
                          padding: '10px 16px',
                          border: isSelected ? '2px solid #111' : '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: !isAvailable ? '#f5f5f5' : isSelected ? '#111' : 'white',
                          color: !isAvailable ? '#bbb' : isSelected ? 'white' : '#333',
                          fontWeight: '500',
                          fontSize: '14px',
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          opacity: isAvailable ? 1 : 0.5,
                          textDecoration: !isAvailable ? 'line-through' : 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span>{value}</span>
                        {isSize && sizeInches && (
                          <span style={{
                            fontSize: '10px',
                            color: isSelected ? 'rgba(255,255,255,0.7)' : '#999',
                            fontWeight: '400'
                          }}>
                            {sizeInches}
                          </span>
                        )}
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
            ₹{Math.round(price).toLocaleString("en-IN")}
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
