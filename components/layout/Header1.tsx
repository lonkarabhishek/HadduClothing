





"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Search, User, Heart } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
    { label: "Shop", href: "/collections/all" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
    { label: "About", href: "/about" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8">
                <div className="grid h-16 grid-cols-2 md:grid-cols-3 items-center">

                    {/* LEFT */}
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Hamburger (mobile only) */}
                        <button
                            onClick={() => setOpen(true)}
                            className="md:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={24} className="text-black" />
                        </button>

                        {/* Logo (mobile left, desktop center handled below) */}
                        <Link href="/" aria-label="Haddu Clothing" className="md:hidden">
                            <Image
                                src="/logo.webp"
                                alt="Haddu Clothing Logo"
                                width={90}
                                height={28}
                                priority
                                className="object-contain"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8 text-sm">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="relative text-neutral-700 transition-all duration-300 hover:text-[#0C4006] hover:-translate-y-[0.5px] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#0C4006] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* CENTER (desktop only) */}
                    <div className="hidden md:flex justify-center">
                        <Link href="/" aria-label="Haddu Clothing">
                            <Image
                                src="/logo.webp"
                                alt="Haddu Clothing Logo"
                                width={100}
                                height={30}
                                priority
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-end gap-6 text-black">
                        {/* Search – always visible */}
                        <Link
                            href="/search"
                            aria-label="Search"
                            className="relative text-neutral-700 transition-all duration-300 hover:text-[#0C4006] hover:-translate-y-[0.5px]"
                        >
                            <Search size={20} strokeWidth={1.2} />
                        </Link>

                        {/* Wishlist – desktop only */}
                        <Link
                            href="/wishlist"
                            aria-label="Wishlist"
                            className="hidden md:block relative text-neutral-700 transition-all duration-300 hover:text-[#0C4006] hover:-translate-y-[0.5px]"
                        >
                            <Heart size={20} strokeWidth={1.2} />
                        </Link>

                        {/* Cart – always visible */}
                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="relative text-neutral-700 transition-all duration-300 hover:text-[#0C4006] hover:-translate-y-[0.5px]"
                        >
                            <ShoppingBag size={20} strokeWidth={1.2} />
                        </Link>

                        {/* User – desktop only */}
                        <Link
                            href="/account"
                            aria-label="Account"
                            className="hidden md:block relative text-neutral-700 transition-all duration-300 hover:text-[#0C4006] hover:-translate-y-[0.5px]"
                        >
                            <User size={20} strokeWidth={1.2} />
                        </Link>
                    </div>


                </div>
            </div>



            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-white transition-all duration-300 ease-in-out
    ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                {/* Top Bar */}
                <div className="flex h-16 items-center justify-between px-4 border-b">
                    <span className="font-semibold uppercase text-black">Menu</span>
                    <button onClick={() => setOpen(false)} aria-label="Close menu">
                        <X size={24} className="text-black" />
                    </button>
                </div>

                {/* Menu Content */}
                <nav
                    className={`flex flex-col gap-6 px-6 py-10 text-lg transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
                >
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-neutral-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="grid grid-cols-4">

                        {/* <Link
                            href="/cart"
                            className="relative text-neutral-900 hover:text-neutral-700 transition"
                            aria-label="Cart"
                        >
                            <Search size={20} strokeWidth={1.5} />
                        </Link> */}
                        {/* <Link
                            href="/cart"
                            className="relative text-neutral-900 hover:text-neutral-700 transition"
                            aria-label="Cart"
                        >
                            <Heart size={20} strokeWidth={1.5} />
                        </Link> */}
                        {/* <Link
                            href="/cart"
                            className="relative text-neutral-900 hover:text-neutral-700 transition"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} />
                        </Link> */}
                        <Link
                            href="/cart"
                            className="relative text-neutral-900 hover:text-neutral-700 transition"
                            aria-label="Cart"
                        >
                            <User size={20} strokeWidth={1.5} />
                        </Link>
                    </div>
                </nav>
            </div>

        </header>
    );
}
