"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
    Menu,
    X,
    ShoppingBag,
    Search,
    User,
    Heart,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { label: "Shop", href: "/collections/all" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
    { label: "About", href: "/about" },
];

/* ================= TYPEWRITER HOOK ================= */

function useTypewriter(
    words: string[],
    typingSpeed = 160,
    deletingSpeed = 100,
    pauseDuration = 1800
) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timer: NodeJS.Timeout;

        if (phase === "typing") {
            timer = setTimeout(() => {
                setText(currentWord.slice(0, charIndex + 1));
                setCharIndex((i) => i + 1);

                if (charIndex + 1 === currentWord.length) {
                    setPhase("pausing");
                }
            }, typingSpeed);
        }

        if (phase === "pausing") {
            timer = setTimeout(() => {
                setPhase("deleting");
            }, pauseDuration);
        }

        if (phase === "deleting") {
            timer = setTimeout(() => {
                setText(currentWord.slice(0, charIndex - 1));
                setCharIndex((i) => i - 1);

                if (charIndex - 1 === 0) {
                    setPhase("typing");
                    setWordIndex((i) => (i + 1) % words.length);
                }
            }, deletingSpeed);
        }

        return () => clearTimeout(timer);
    }, [
        charIndex,
        phase,
        wordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
    ]);

    return text;
}


export default function Header() {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const animatedText = useTypewriter(
        [
            "oversized tees",
            "hoodies",
            "shirts",
            "new arrivals",
            "best sellers",
        ],
        160,
        100,
        1800
    );


    /* Auto focus when search opens */
    useEffect(() => {
        if (searchOpen) {
            inputRef.current?.focus();
        }
    }, [searchOpen]);

    /* ESC to close search */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSearchOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8">
                <div className="grid h-16 grid-cols-2 md:grid-cols-3 items-center">

                    {/* LEFT */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <button
                            onClick={() => setOpen(true)}
                            className="md:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>

                        <Link href="/" className="md:hidden">
                            <Image
                                src="/logo.webp"
                                alt="Haddu Clothing"
                                width={90}
                                height={28}
                                priority
                            />
                        </Link>

                        <nav className="hidden md:flex items-center gap-8 text-sm">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="relative text-neutral-700 transition hover:text-[#0C4008]
                  after:absolute after:left-0 after:-bottom-1 after:h-[1px]
                  after:w-0 after:bg-[#0C4008] after:transition-all hover:after:w-full"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* CENTER */}
                    <div className="hidden md:flex justify-center">
                        <Link href="/">
                            <Image
                                src="/logo.webp"
                                alt="Haddu Clothing"
                                width={100}
                                height={30}
                                priority
                            />
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-end items-center gap-4 relative">

                        {/* SEARCH */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {!searchOpen ? (
                                    <motion.button
                                        key="icon"
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.85 }}
                                        onClick={() => setSearchOpen(true)}
                                        aria-label="Open search"
                                        className="h-9 w-9 flex items-center justify-center text-neutral-700 hover:text-[#0C4008] transition"
                                    >
                                        <Search size={20} strokeWidth={1.2} />
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        key="input"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 240, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        className="h-9 flex items-center border border-neutral-300 rounded-full px-4 bg-white"
                                    >
                                        <Search size={16} className="text-neutral-400 mr-2" />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            placeholder={`Search for ${animatedText}`}
                                            className="w-full text-sm outline-none placeholder:text-neutral-400 caret-[#0C4008]"
                                        />
                                        <button
                                            onClick={() => setSearchOpen(false)}
                                            aria-label="Close search"
                                            className="ml-2 text-neutral-400 hover:text-[#0C4008]"
                                        >
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="hidden md:flex h-9 w-9 items-center justify-center text-neutral-700 hover:text-[#0C4008] transition"
                        >
                            <Heart size={20} strokeWidth={1.2} />
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="flex h-9 w-9 items-center justify-center text-neutral-700 hover:text-[#0C4008] transition"
                        >
                            <ShoppingBag size={20} strokeWidth={1.2} />
                        </Link>

                        {/* User */}
                        <Link
                            href="/account"
                            className="hidden md:flex h-9 w-9 items-center justify-center text-neutral-700 hover:text-[#0C4008] transition"
                        >
                            <User size={20} strokeWidth={1.2} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
