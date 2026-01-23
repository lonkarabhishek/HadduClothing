"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "./types";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [added, setAdded] = useState(false);
  const { addToCart, isLoading } = useCart();

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

  const price = product.price ?? 0;
  const originalPrice = product.originalPrice;
  const discount = product.discount;
  const isOutOfStock = product.availableForSale === false;

  // Get optimized image URL from Shopify CDN
  const getImageUrl = (url: string, width: number = 400) => {
    if (!url) return '';
    return url.includes('?') ? `${url}&width=${width}` : `${url}?width=${width}`;
  };

  return (
    <div className="group flex flex-col h-full">
      {/* IMAGE - Native img for lightning fast loading */}
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
        {product.image ? (
          <img
            src={getImageUrl(product.image, 400)}
            alt={product.title}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
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
            backgroundColor: product.tag.toLowerCase().includes('off') ? '#dc2626' : '#152312',
            color: 'white',
            fontSize: '11px',
            fontWeight: '600',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            {product.tag}
          </span>
        )}
      </Link>

      {/* INFO - Fixed height section */}
      <div className="mt-3 flex flex-col flex-grow">
        <Link href={product.href} className="flex-grow">
          <h3 className="text-[14px] font-medium line-clamp-2 leading-tight min-h-[40px]">
            {product.title}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-[16px] font-bold ${isOutOfStock ? "text-gray-400" : ""}`}>
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}

          {discount && (
            <span className="text-[12px] font-semibold text-green-600">{discount}</span>
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
              backgroundColor: added ? '#16a34a' : '#152312',
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
