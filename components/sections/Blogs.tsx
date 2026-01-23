"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "The Art of Minimal Dressing",
    excerpt:
      "Why less is more when it comes to building a timeless wardrobe that lasts.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
    date: "December 2025",
    category: "Style Guide",
    href: "#",
  },
  {
    id: 2,
    title: "Inside Our Fabric Selection Process",
    excerpt:
      "A closer look at how we choose materials that last and feel premium on your skin.",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop",
    date: "November 2025",
    category: "Behind the Scenes",
    href: "#",
  },
  {
    id: 3,
    title: "Oversized Fits: Style Without Effort",
    excerpt:
      "How relaxed silhouettes became a modern essential for the contemporary wardrobe.",
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=800&fit=crop",
    date: "October 2025",
    category: "Trends",
    href: "#",
  },
];

export default function Blogs() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#0C4008] mb-4">
            The Journal
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide">
            Stories & Inspiration
          </h2>
          <p className="mt-5 text-sm text-gray-500 max-w-lg mx-auto">
            Ideas, style guides, and behind-the-scenes looks at the Haddu world.
          </p>
        </motion.div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>

              {/* CONTENT */}
              <div className="mt-6 space-y-3">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  {blog.date}
                </p>

                <h3 className="text-lg font-medium leading-snug">
                  <Link
                    href={blog.href}
                    className="hover:text-[#0C4008] transition-colors"
                  >
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {blog.excerpt}
                </p>

                <Link
                  href={blog.href}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#0C4008] pt-2 group/link"
                >
                  Read Article
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* VIEW ALL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-3 border border-black px-10 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-black hover:text-white"
          >
            View All Articles
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
