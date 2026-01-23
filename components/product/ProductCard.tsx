"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "./types";
import shopifyImageLoader from "@/lib/shopifyImageLoader";
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

  return (
    <div className="group flex flex-col h-full">
      {/* IMAGE */}
      <Link href={product.href} className="block relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg flex-shrink-0">
        {product.image ? (
          <Image
            loader={shopifyImageLoader}
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Out of Stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-4 py-2 text-xs font-semibold uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* Tag Badge */}
        {product.tag && !isOutOfStock && (
          <span className={`badge absolute top-2 left-2 ${
            product.tag.toLowerCase().includes('best') ? 'badge-bestseller' :
            product.tag.toLowerCase().includes('new') ? 'badge-new' :
            product.tag.toLowerCase().includes('off') ? 'badge-sale' :
            'badge-primary'
          }`}>
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
