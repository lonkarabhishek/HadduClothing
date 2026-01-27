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

// Parse description HTML into intro text + spec rows
function parseDescription(html: string): { intro: string; specs: { label: string; value: string }[] } {
  const specs: { label: string; value: string }[] = [];
  let intro = "";

  // Decode HTML entities
  const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

  // Replace <br>, <br/>, <br /> with newlines, then strip all tags
  const text = decode(html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<[^>]*>/g, ""));

  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && colonIdx < 30) {
      const label = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim();
      if (label && value) {
        specs.push({ label, value });
        continue;
      }
    }
    // It's intro text
    if (!intro) {
      intro = line;
    } else if (specs.length === 0) {
      intro += " " + line;
    }
  }

  return { intro, specs };
}

function AccordionItem({ icon, title, subtitle, children, defaultOpen = false }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#444'
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '15px', fontWeight: '600', color: '#111' }}>{title}</p>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>{subtitle}</p>
        </div>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: '20px', paddingLeft: '54px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function ProductDescription({ descriptionHtml, description }: { descriptionHtml?: string; description?: string }) {
  const { intro, specs } = descriptionHtml
    ? parseDescription(descriptionHtml)
    : { intro: description || "", specs: [] };

  const hasContent = intro || specs.length > 0 || descriptionHtml;

  return (
    <div style={{ paddingTop: '20px', borderTop: '1px solid #eee' }}>
      {/* Spec rows - static, not collapsible */}
      {specs.length > 0 && (
        <div style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            padding: '8px 0',
          }}>
            {specs.map((spec, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                  paddingRight: i % 2 === 0 ? '16px' : '0',
                  paddingLeft: i % 2 === 1 ? '16px' : '0',
                }}
              >
                <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                  {spec.label}
                </p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Description accordion - open by default */}
      {(intro || (!specs.length && (descriptionHtml || description))) && (
        <AccordionItem
          defaultOpen
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          }
          title="Product Description"
          subtitle="Manufacture, Care and Fit"
        >
          {intro ? (
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }}>{intro}</p>
          ) : descriptionHtml ? (
            <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          ) : description ? (
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }}>{description}</p>
          ) : null}
        </AccordionItem>
      )}

      <AccordionItem
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="3" width="15" height="13" rx="2" />
            <polyline points="16 8 20 8 23 11 23 16 20 16" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
            <line x1="8" y1="16" x2="16" y2="16" />
          </svg>
        }
        title="Free Shipping"
        subtitle="We offer free shipping across India"
      >
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7' }}>
          Enjoy free shipping on all orders across India. Orders are processed within 1-2 business days and typically delivered in 5-7 business days.
        </p>
      </AccordionItem>

      <AccordionItem
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="1 4 1 10 7 10" />
            <polyline points="23 20 23 14 17 14" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        }
        title="7 Days Returns & Exchange"
        subtitle="Know about return & exchange policy"
      >
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7' }}>
          Not satisfied? Return or exchange unworn items with original tags within 7 days of delivery. Contact us to initiate a return.
        </p>
      </AccordionItem>
    </div>
  );
}

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
  const hasDiscount = !!(compareAtPrice && compareAtPrice > price);
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
                          border: isSelected ? '2px solid #3f5046' : '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: !isAvailable ? '#f5f5f5' : isSelected ? '#3f5046' : 'white',
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
            <ProductDescription
              descriptionHtml={product.descriptionHtml}
              description={product.description}
            />
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
            backgroundColor: selectedVariant?.availableForSale ? (isAdding ? '#16a34a' : '#3f5046') : '#e5e5e5',
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
