// components/sections/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Other() {
    return (
        <section className="relative overflow-hidden bg-neutral-50">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8">
                <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center gap-12 py-16 md:py-24">

                    {/* LEFT */}
                    <div className="max-w-xl">
                        <p className="mb-4 text-sm uppercase tracking-widest text-neutral-500">
                            New Collection
                        </p>

                        <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight text-neutral-900 md:text-5xl">
                            Crafted for
                            <span className="block font-normal">Modern Living</span>
                        </h1>

                        <p className="mb-8 text-neutral-600 leading-relaxed">
                            Premium fabrics. Timeless silhouettes. Designed for everyday elegance.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/collections/all"
                                className="inline-flex items-center justify-center border border-neutral-900 px-6 py-3 text-sm uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:bg-[#0C4006] hover:text-white"
                            >
                                Shop Now
                            </Link>

                            <Link
                                href="/collections/new-arrivals"
                                className="relative text-sm uppercase tracking-wider text-neutral-700 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-neutral-900 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Explore Collection
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative h-[420px] md:h-[520px]">
                        <Image
                            src="https://images.unsplash.com/photo-1761839257349-037aea1d94de?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Haddu premium clothing"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
