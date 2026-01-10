"use client";

import Link from "next/link";

export default function SimpleBanner() {
    return (
        <section className="w-full py-24 px-4 bg-[#0A0A0A] text-white">
            <div className="max-w-5xl mx-auto text-center">
                {/* TEXT */}
                <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase">
                    Crafted for Everyday Luxury
                </h2>

                <p className="mt-6 text-sm md:text-base text-gray-300 tracking-wide max-w-2xl mx-auto">
                    Elevated essentials designed with intention, precision, and timeless style.
                </p>

                {/* BUTTON */}
                <div className="mt-12">
                    <Link
                        href="/collections/all"
                        className="
                            inline-flex items-center justify-center
                            border border-white
                            px-12 py-4
                            text-xs uppercase tracking-[0.35em]
                            transition-all duration-300
                            hover:bg-white hover:text-black
                        "
                    >
                        Shop the Collection
                    </Link>
                </div>
            </div>
        </section>
    );
}
