"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_LINE_MUTATION,
  REMOVE_FROM_CART_MUTATION,
} from "@/lib/queries";
import type { ShopifyCart, CartLineItem } from "@/lib/types";

type CartContextType = {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  updateVariant: (lineId: string, newVariantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  getCheckoutUrl: () => string | null;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_ID_KEY = "haddu_cart_id";

// Shipping constants
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_CHARGE = 45;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!isMounted) return;

    const loadCart = async () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      if (savedCartId) {
        try {
          const res = await shopifyFetch(GET_CART_QUERY, { cartId: savedCartId });
          if (res.data?.cart) {
            setCart(res.data.cart);
          } else {
            // Cart no longer exists, clear localStorage
            localStorage.removeItem(CART_ID_KEY);
          }
        } catch (error) {
          console.error("Failed to load cart:", error);
          localStorage.removeItem(CART_ID_KEY);
        }
      }
    };
    loadCart();
  }, [isMounted]);

  // Create a new cart
  const createCart = useCallback(async (lines?: { merchandiseId: string; quantity: number }[]) => {
    const res = await shopifyFetch(CREATE_CART_MUTATION, { lines });
    const newCart = res.data?.cartCreate?.cart;

    if (newCart) {
      localStorage.setItem(CART_ID_KEY, newCart.id);
      setCart(newCart);
      return newCart;
    }

    throw new Error("Failed to create cart");
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      if (!cart) {
        // Create new cart with the item
        await createCart([{ merchandiseId: variantId, quantity }]);
      } else {
        // Add to existing cart
        const res = await shopifyFetch(ADD_TO_CART_MUTATION, {
          cartId: cart.id,
          lines: [{ merchandiseId: variantId, quantity }],
        });

        if (res.data?.cartLinesAdd?.cart) {
          setCart(res.data.cartLinesAdd.cart);
        }
      }
      // Open cart drawer after adding
      setIsCartOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart, createCart]);

  // Update line item quantity
  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        await removeItem(lineId);
        return;
      }

      const res = await shopifyFetch(UPDATE_CART_LINE_MUTATION, {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }],
      });

      if (res.data?.cartLinesUpdate?.cart) {
        setCart(res.data.cartLinesUpdate.cart);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  // Remove item from cart
  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const res = await shopifyFetch(REMOVE_FROM_CART_MUTATION, {
        cartId: cart.id,
        lineIds: [lineId],
      });

      if (res.data?.cartLinesRemove?.cart) {
        setCart(res.data.cartLinesRemove.cart);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  // Update variant (swap to different size/color)
  const updateVariant = useCallback(async (lineId: string, newVariantId: string, quantity: number) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      // Remove old line item
      const removeRes = await shopifyFetch(REMOVE_FROM_CART_MUTATION, {
        cartId: cart.id,
        lineIds: [lineId],
      });

      if (removeRes.data?.cartLinesRemove?.cart) {
        // Add new variant
        const addRes = await shopifyFetch(ADD_TO_CART_MUTATION, {
          cartId: cart.id,
          lines: [{ merchandiseId: newVariantId, quantity }],
        });

        if (addRes.data?.cartLinesAdd?.cart) {
          setCart(addRes.data.cartLinesAdd.cart);
        }
      }
    } catch (error) {
      console.error("Failed to update variant:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  // Get checkout URL
  const getCheckoutUrl = useCallback(() => {
    return cart?.checkoutUrl || null;
  }, [cart]);

  // Cart open/close handlers
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({
      cart,
      isLoading,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      updateVariant,
      removeItem,
      getCheckoutUrl,
    }),
    [
      cart,
      isLoading,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      updateVariant,
      removeItem,
      getCheckoutUrl,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Helper hook to get cart totals with shipping
export function useCartTotals() {
  const { cart } = useCart();

  return useMemo(() => {
    if (!cart) {
      return {
        totalQuantity: 0,
        subtotal: 0,
        shipping: 0,
        total: 0,
        isFreeShipping: true,
        amountToFreeShipping: FREE_SHIPPING_THRESHOLD,
        currencyCode: "INR",
      };
    }

    const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shipping = isFreeShipping ? 0 : SHIPPING_CHARGE;
    const amountToFreeShipping = isFreeShipping ? 0 : FREE_SHIPPING_THRESHOLD - subtotal;

    return {
      totalQuantity: cart.totalQuantity,
      subtotal,
      shipping,
      total: subtotal + shipping,
      isFreeShipping,
      amountToFreeShipping,
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  }, [cart]);
}

// Helper hook to get cart items
export function useCartItems(): CartLineItem[] {
  const { cart } = useCart();
  return cart?.lines.nodes || [];
}
