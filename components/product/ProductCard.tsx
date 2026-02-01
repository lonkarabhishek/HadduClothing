"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import type { Product } from "./types";
import { useCart } from "@/app/context/CartContext";

// Color mapping for swatches
function getColorHex(colorName: string): string {
  const name = colorName.toLowerCase().replace(/\s+/g, '');
  const map: Record<string, string> = {
    black: '#333', deepblack: '#333', carbonblack: '#3a3a3a',
    white: '#f0f0f0', offwhite: '#f5f0e8',
    red: '#d94040', blue: '#4a7ab5', childblue: '#9cf1f8',
    softcyan: '#9cf1f8', skyblue: '#7ec8e3',
    navyblue: '#2c3e6b', navy: '#2c3e6b',
    green: '#5a8a5a', mintgreen: '#8bc5a7', litemintgreen: '#a0d6b8',
    olivegreen: '#6b7a4a', grey: '#b7b1b0', gray: '#b7b1b0',
    charcoal: '#555', maroon: '#7a3040', brown: '#8a6a4a',
    beige: '#d4c5a0', pink: '#d98aa0', purple: '#7a5a90',
    yellow: '#d4c040', orange: '#d48a40', cream: '#f0e8d0',
    lavender: '#a090c0', teal: '#508080',
    arcticsky: '#a0c8e0', arcticskyblue: '#a0c8e0',
  };
  if (map[name]) return map[name];
  for (const key of Object.keys(map)) {
    if (name.includes(key) || key.includes(name)) return map[key];
  }
  return '#3f5046';
}

type Props = {
  product: Product;
  priority?: boolean; // true for above-the-fold products
};

export default function ProductCard({ product, priority = false }: Props) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const { addToCart, isLoading } = useCart();

  const allImages = product.images && product.images.length > 1
    ? product.images
    : [product.image].filter(Boolean);

  // Preload all images in background on mount
  useEffect(() => {
    if (allImages.length <= 1) return;
    let loaded = 0;
    allImages.forEach((url) => {
      const img = new Image();
      img.src = getImageUrl(url, 400);
      img.onload = () => {
        loaded++;
        if (loaded === allImages.length) setImagesPreloaded(true);
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.variantId) {
      window.location.href = product.href;
      return;
    }

    if (added || isLoading) return;

    try {
      await addToCart(product.variantId);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  const price = product.price ?? 0;
  const originalPrice = product.originalPrice;
  const discount = product.discount;
  const isOutOfStock = product.availableForSale === false;

  return (
    <div
      className="group"
      onMouseEnter={() => {
        setHovered(true);
        if (allImages.length > 1) setCurrentImage(1);
      }}
      onMouseLeave={() => { setHovered(false); setCurrentImage(0); }}
      style={{
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* IMAGE with carousel */}
      <Link
        href={product.href}
        style={{
          display: 'block',
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          flexShrink: 0
        }}
      >
        {/* Render ALL images stacked, toggle visibility for instant switching */}
        {allImages.length > 0 ? (
          allImages.map((url, i) => (
            <img
              key={i}
              src={getImageUrl(url, 400)}
              alt={i === 0 ? product.title : `${product.title} - ${i + 1}`}
              loading={priority && i === 0 ? "eager" : "lazy"}
              decoding="async"
              {...(priority && i === 0 ? { fetchPriority: "high" as any } : {})}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: i === currentImage ? 1 : 0,
                transition: 'opacity 0.35s ease',
                zIndex: i === currentImage ? 1 : 0,
              }}
            />
          ))
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '48px', height: '48px', color: '#ddd' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Carousel arrows - only on hover, only if multiple images */}
        {hovered && allImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                zIndex: 2,
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
            >
              <ChevronLeft size={16} color="#333" strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                zIndex: 2,
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
            >
              <ChevronRight size={16} color="#333" strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {hovered && allImages.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px',
            zIndex: 2,
          }}>
            {allImages.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentImage ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: i === currentImage ? 'white' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Out of Stock */}
        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}>
            <span style={{
              backgroundColor: '#111',
              color: 'white',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase'
            }}>
              Sold Out
            </span>
          </div>
        )}

        {/* Tag Badge */}
        {product.tag && !isOutOfStock && (
          <span style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: product.tag.toLowerCase().includes('off') ? '#dc2626' : '#3f5046',
            color: 'white',
            fontSize: '11px',
            fontWeight: '600',
            padding: '4px 8px',
            borderRadius: '4px',
            zIndex: 3,
          }}>
            {product.tag}
          </span>
        )}
      </Link>

      {/* INFO */}
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link href={product.href}>
          <h3
            className="text-[14px] font-medium line-clamp-2 leading-snug"
            style={{ minHeight: '38px' }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Color Swatches - only show if colors exist */}
        {product.colors && product.colors.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color}
                title={color}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: getColorHex(color),
                  border: '1px solid rgba(0,0,0,0.1)',
                  flexShrink: 0,
                }}
              />
            ))}
            {product.colors.length > 5 && (
              <span style={{ fontSize: '11px', color: '#666' }}>
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: isOutOfStock ? '#999' : '#111' }}>
            ₹{Math.round(price).toLocaleString("en-IN")}
          </span>

          {originalPrice && (
            <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>
              ₹{Math.round(originalPrice).toLocaleString("en-IN")}
            </span>
          )}

          {discount && (
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a' }}>{discount}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        {!isOutOfStock ? (
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            style={{
              marginTop: 'auto',
              paddingTop: '10px',
              width: '100%',
              height: '36px',
              backgroundColor: added ? '#16a34a' : '#3f5046',
              color: 'white',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'background-color 0.2s'
            }}
          >
            {added ? (
              <>
                <Check size={16} />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        ) : (
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '10px',
              width: '100%',
              height: '36px',
              backgroundColor: '#e5e5e5',
              color: '#999',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Sold Out
          </div>
        )}
      </div>
    </div>
  );
}

function getImageUrl(url: string, width: number = 400) {
  if (!url) return '';
  return url.includes('?') ? `${url}&width=${width}` : `${url}?width=${width}`;
}
