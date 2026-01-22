"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
    CREATE_CART_MUTATION,
    ADD_TO_CART_MUTATION,
} from "@/lib/queries";

type CartContextType = {
    count: number;
    addToCart: (variantId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartId, setCartId] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const savedCartId = localStorage.getItem("cartId");
        if (savedCartId) setCartId(savedCartId);
    }, []);

    const createCart = async () => {
        const res = await shopifyFetch(CREATE_CART_MUTATION);
        const newCart = res.data.cartCreate.cart;

        localStorage.setItem("cartId", newCart.id);
        setCartId(newCart.id);
        setCount(newCart.totalQuantity);

        return newCart.id;
    };

    const addToCart = async (variantId: string) => {
        const id = cartId ?? (await createCart());

        const res = await shopifyFetch(ADD_TO_CART_MUTATION, {
            cartId: id,
            variantId,
        });

        setCount(res.data.cartLinesAdd.cart.totalQuantity);
    };

    return (
        <CartContext.Provider value={{ count, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
};
