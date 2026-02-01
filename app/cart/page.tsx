"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart, useCartItems, useCartTotals, FREE_SHIPPING_THRESHOLD } from "@/app/context/CartContext";
import shopifyImageLoader from "@/lib/shopifyImageLoader";

export default function CartPage() {
  const { updateQuantity, removeItem, isLoading, getCheckoutUrl } = useCart();
  const items = useCartItems();
  const { totalQuantity, subtotal, shipping, total, isFreeShipping, amountToFreeShipping } = useCartTotals();

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const handleCheckout = () => {
    let checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      // Replace Shopify domain with custom checkout domain
      checkoutUrl = checkoutUrl.replace(
        /https:\/\/[^\/]*\.myshopify\.com/,
        'https://checkout.hadduclothing.com'
      );
      window.location.href = checkoutUrl;
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag size={64} className="text-gray-200 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add some items to get started</p>
        <Link href="/collections/all" className="btn btn-primary">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">
          Shopping Cart ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const image = item.merchandise.image || item.merchandise.product.featuredImage;
            const price = parseFloat(item.merchandise.price.amount);
            const lineTotal = parseFloat(item.cost.totalAmount.amount);

            return (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                {/* Image */}
                <Link
                  href={`/products/${item.merchandise.product.handle}`}
                  className="relative w-24 h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                >
                  {image?.url && (
                    <Image
                      loader={shopifyImageLoader}
                      src={image.url}
                      alt={image.altText || item.merchandise.product.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.merchandise.product.handle}`}
                    className="font-semibold line-clamp-2"
                  >
                    {item.merchandise.product.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.merchandise.selectedOptions.map((opt) => opt.value).join(" / ")}
                  </p>
                  <p className="font-bold mt-2">{formatPrice(price)}</p>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="qty-selector">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={isLoading}
                        className="qty-btn"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isLoading}
                        className="qty-btn"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Line Total - Desktop */}
                <div className="hidden md:block text-right">
                  <p className="font-bold">{formatPrice(lineTotal)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>

            {/* Free Shipping Progress */}
            {!isFreeShipping && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  Add {formatPrice(amountToFreeShipping)} more for <strong>FREE Shipping!</strong>
                </p>
                <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {isFreeShipping && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 text-center">
                <span className="text-sm text-emerald-700 font-semibold">
                  🎉 You&apos;ve unlocked FREE Shipping!
                </span>
              </div>
            )}

            <div className="space-y-3 pb-4 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                {isFreeShipping ? (
                  <span className="text-emerald-600 font-medium">FREE</span>
                ) : (
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between py-4 border-b">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold">{formatPrice(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="btn btn-primary w-full h-14 text-base mt-6"
            >
              {isLoading ? <span className="spinner" /> : "Proceed to Checkout"}
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Secure checkout powered by Shopify
            </p>

            {/* Trust */}
            <div className="mt-6 pt-4 border-t text-center text-xs text-gray-400">
              Free Shipping over ₹1,999 • Easy Returns • Secure Payment
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
