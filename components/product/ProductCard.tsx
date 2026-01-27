"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import type { Product } from "./types";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart, isLoading } = useCart();

  const allImages = product.images && product.images.length > 1
    ? product.images
    : [product.image].filter(Boolean);

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

  const getImageUrl = (url: string, width: number = 400) => {
    if (!url) return '';
    return url.includes('?') ? `${url}&width=${width}` : `${url}?width=${width}`;
  };

  return (
    <div
      className="group flex flex-col h-full"
      onMouseEnter={() => {
        setHovered(true);
        // Auto-switch to second image on hover if available
        if (allImages.length > 1) setCurrentImage(1);
      }}
      onMouseLeave={() => { setHovered(false); setCurrentImage(0); }}
      style={{
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderRadius: '12px',
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
        {allImages.length > 0 ? (
          <img
            src={getImageUrl(allImages[currentImage], 400)}
            alt={product.title}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
            }}
          />
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

        {/* Dot indicators - only on hover with multiple images */}
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
            justifyContent: 'center'
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
            zIndex: 1,
          }}>
            {product.tag}
          </span>
        )}
      </Link>

      {/* INFO */}
      <div className="mt-3 flex flex-col flex-grow">
        <Link href={product.href} className="flex-grow">
          <h3 className="text-[14px] font-medium line-clamp-2 leading-tight min-h-[40px]">
            {product.title}
          </h3>
        </Link>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
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
              marginTop: '10px',
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
              marginTop: '10px',
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
