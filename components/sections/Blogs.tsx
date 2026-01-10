"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blogs = [
    {
        id: 1,
        title: "The Art of Minimal Dressing",
        excerpt:
            "Why less is more when it comes to building a timeless wardrobe.",
        image: "/blog1.webp",
        date: "July 2025",
        href: "/blogs/minimal-dressing",
    },
    {
        id: 2,
        title: "Inside Our Fabric Selection Process",
        excerpt:
            "A closer look at how we choose materials that last and feel premium.",
        image: "/blog2.webp",
        date: "June 2025",
        href: "/blogs/fabric-selection",
    },
    {
        id: 3,
        title: "Oversized Fits: Style Without Effort",
        excerpt:
            "How relaxed silhouettes became a modern essential.",
        image: "/blog3.webp",
        date: "June 2025",
        href: "/blogs/oversized-fits",
    },
];

export default function Blogs() {
    return (
        <section className="py-28 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col justify-center items-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase">
                        Journal
                    </h2>
                    <p className="mt-6 text-sm text-gray-500 tracking-wide">
                        Stories, ideas, and inspiration behind the brand.
                    </p>
                </div>

                {/* BLOG GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                    {blogs.map((blog, index) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.12,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            {/* IMAGE */}
                            <Link href={blog.href} className="block">
                                <div className="relative h-[320px] md:h-[360px] overflow-hidden bg-gray-100">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            {/* CONTENT */}
                            <div className="mt-6 space-y-4">
                                <p className="text-xs uppercase tracking-widest text-gray-500">
                                    {blog.date}
                                </p>

                                <h3 className="text-lg font-light leading-snug group-hover:underline underline-offset-4">
                                    <Link href={blog.href}>
                                        {blog.title}
                                    </Link>
                                </h3>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={blog.href}
                                    className="inline-block text-xs uppercase tracking-widest border-b border-black pb-1 transition hover:opacity-60"
                                >
                                    Read More
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* VIEW ALL */}
                <div className="mt-24 text-center">
                    <Link
                        href="/blogs"
                        className="inline-block border border-black px-12 py-4 text-xs uppercase tracking-[0.35em] transition hover:bg-[#0C4008] hover:text-white"
                    >
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
}
