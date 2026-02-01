"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2, Shield, RotateCcw } from "lucide-react";
import { useCart, useCartItems, useCartTotals, FREE_SHIPPING_THRESHOLD } from "@/app/context/CartContext";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_VARIANTS_QUERY } from "@/lib/queries";
import shopifyImageLoader from "@/lib/shopifyImageLoader";

type ProductVariants = {
  options: { name: string; values: string[] }[];
  variants: {
    id: string;
    availableForSale: boolean;
    selectedOptions: { name: string; value: string }[];
  }[];
};

export default function CartSlideOver() {
  const { isCartOpen, closeCart, updateQuantity, updateVariant, removeItem, isLoading, getCheckoutUrl } = useCart();
  const items = useCartItems();
  const { totalQuantity, subtotal, shipping, total, isFreeShipping, amountToFreeShipping } = useCartTotals();
  const [productVariants, setProductVariants] = useState<Record<string, ProductVariants>>({});

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeCart]);

  useEffect(() => {
    if (!isCartOpen) return;

    items.forEach(async (item) => {
      const handle = item.merchandise.product.handle;
      if (productVariants[handle]) return;

      try {
        const res = await shopifyFetch(PRODUCT_VARIANTS_QUERY, { handle });
        if (res?.data?.product) {
          setProductVariants((prev) => ({
            ...prev,
            [handle]: {
              options: res.data.product.options,
              variants: res.data.product.variants.nodes,
            },
          }));
        }
      } catch (error) {
        console.error("Failed to fetch variants:", error);
      }
    });
  }, [isCartOpen, items]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const handleOptionChange = (
    item: typeof items[0],
    optionName: string,
    newValue: string,
    productData: ProductVariants
  ) => {
    const currentOptions = item.merchandise.selectedOptions;
    const newOptions = currentOptions.map((opt) =>
      opt.name === optionName ? { ...opt, value: newValue } : opt
    );

    const newVariant = productData.variants.find((v) =>
      v.selectedOptions.every(
        (opt) => newOptions.find((no) => no.name === opt.name)?.value === opt.value
      )
    );

    if (newVariant && newVariant.availableForSale) {
      updateVariant(item.id, newVariant.id, item.quantity);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[85%] sm:w-[420px] z-[60] flex flex-col transform transition-transform duration-300 ease-out rounded-l-2xl sm:rounded-none ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        {/* Header */}
        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e5e5', padding: '16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
              Shopping Cart ({totalQuantity})
            </h2>
            <button
              onClick={closeCart}
              style={{ padding: '8px', color: '#666' }}
              aria-label="Close cart"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: items.length > 0 ? '16px' : '0' }}>
          {items.length === 0 ? (
            /* Empty Cart State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '32px',
              textAlign: 'center',
              backgroundColor: 'white'
            }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <ShoppingBag size={40} color="#9ca3af" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111', marginBottom: '8px' }}>
                Your cart is empty
              </h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>
                Looks like you haven&apos;t added anything yet
              </p>
              <Link
                href="/collections/all"
                onClick={closeCart}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '48px',
                  padding: '0 32px',
                  backgroundColor: '#111',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {items.map((item) => {
                const image = item.merchandise.image || item.merchandise.product.featuredImage;
                const price = parseFloat(item.merchandise.price.amount);
                const handle = item.merchandise.product.handle;
                const productData = productVariants[handle];

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '12px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {/* Image */}
                      <Link
                        href={`/products/${handle}`}
                        onClick={closeCart}
                        style={{
                          position: 'relative',
                          width: '80px',
                          height: '100px',
                          flexShrink: 0,
                          backgroundColor: '#f3f4f6',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}
                      >
                        {image?.url && (
                          <Image
                            loader={shopifyImageLoader}
                            src={image.url}
                            alt={image.altText || item.merchandise.product.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="80px"
                          />
                        )}
                      </Link>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <Link
                            href={`/products/${handle}`}
                            onClick={closeCart}
                            style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#111',
                              lineHeight: '1.3',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {item.merchandise.product.title}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isLoading}
                            style={{ color: '#9ca3af', padding: '4px', flexShrink: 0 }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111', marginTop: '4px' }}>
                          {formatPrice(price)}
                        </p>

                        {/* Options */}
                        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {item.merchandise.selectedOptions.map((opt) => {
                            const optionData = productData?.options.find((o) => o.name === opt.name);
                            const hasMultiple = optionData && optionData.values.length > 1;

                            return (
                              <div key={opt.name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '12px', color: '#666' }}>{opt.name}:</span>
                                {hasMultiple && productData ? (
                                  <select
                                    value={opt.value}
                                    onChange={(e) => handleOptionChange(item, opt.name, e.target.value, productData)}
                                    disabled={isLoading}
                                    style={{
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      color: '#111',
                                      border: 'none',
                                      background: 'transparent',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {optionData.values.map((val) => {
                                      const otherOpts = item.merchandise.selectedOptions.filter((o) => o.name !== opt.name);
                                      const available = productData.variants.some(
                                        (v) =>
                                          v.availableForSale &&
                                          v.selectedOptions.find((so) => so.name === opt.name)?.value === val &&
                                          otherOpts.every((co) => v.selectedOptions.find((so) => so.name === co.name)?.value === co.value)
                                      );
                                      return (
                                        <option key={val} value={val} disabled={!available}>
                                          {val}
                                        </option>
                                      );
                                    })}
                                  </select>
                                ) : (
                                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#111' }}>{opt.value}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666'
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <span style={{
                          width: '40px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#111'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666'
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111' }}>
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Return Policy Banner */}
              <div style={{
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <RotateCcw size={18} color="#059669" />
                <span style={{ fontSize: '12px', color: '#065f46', fontWeight: '500' }}>
                  7-Days Free Return & Exchange Available
                </span>
              </div>

              {/* Free Shipping Progress Banner */}
              {!isFreeShipping && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fcd34d',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '500' }}>
                      Add {formatPrice(amountToFreeShipping)} more for <strong>FREE Shipping!</strong>
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#fde68a',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                      height: '100%',
                      backgroundColor: '#f59e0b',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              )}

              {isFreeShipping && (
                <div style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '13px', color: '#065f46', fontWeight: '600' }}>
                    🎉 You&apos;ve unlocked FREE Shipping!
                  </span>
                </div>
              )}

              {/* Order Summary */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111', marginBottom: '12px' }}>
                  Order Summary
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Total MRP</span>
                  <span style={{ fontSize: '14px', color: '#111' }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Shipping</span>
                  {isFreeShipping ? (
                    <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>FREE</span>
                  ) : (
                    <span style={{ fontSize: '14px', color: '#111' }}>{formatPrice(shipping)}</span>
                  )}
                </div>
                <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111' }}>Total</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Secure Transaction */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px',
                color: '#666',
                fontSize: '12px'
              }}>
                <Shield size={14} />
                <span>100% Secure Transaction</span>
              </div>
            </>
          )}
        </div>

        {/* Sticky Footer */}
        {items.length > 0 && (
          <div style={{
            flexShrink: 0,
            backgroundColor: 'white',
            borderTop: '1px solid #e5e5e5',
            padding: '16px',
            paddingBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Total {!isFreeShipping && <span style={{ fontSize: '10px' }}>(incl. shipping)</span>}</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111' }}>{formatPrice(total)}</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              style={{
                flex: 1,
                height: '48px',
                backgroundColor: '#3f5046',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {isLoading ? "Processing..." : "Proceed to Buy"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
