"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/lib/queries";
import { mockCollections } from "@/lib/mockData";

type Category = {
  id: string;
  title: string;
  image: string;
  href: string;
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await shopifyFetch(COLLECTIONS_QUERY);

        if (!res) {
          setCategories(mockCollections.slice(0, 4));
          return;
        }

        const formatted: Category[] = res.data.collections.nodes.map((col: any) => ({
          id: col.id,
          title: col.title,
          image: col.image?.url || mockCollections[0].image,
          href: `/collections/${col.handle}`,
        }));

        setCategories(formatted.slice(0, 4));
      } catch (error) {
        console.error("Failed to load collections", error);
        setCategories(mockCollections.slice(0, 4));
      }
    }

    fetchCategories();
  }, []);

  if (!categories.length) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Shop By Category</h2>
          <p className="text-gray-500 text-sm mt-1">Find your perfect style</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{cat.title}</h3>
                <span className="text-white/80 text-sm">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
