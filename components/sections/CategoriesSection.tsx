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
    <section style={{
      padding: '60px 0 80px',
      backgroundColor: '#fafafa'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <p style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#152312',
            marginBottom: '12px',
            fontWeight: '500'
          }}>
            Explore Our Collection
          </p>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#111',
            marginBottom: '8px'
          }}>
            Shop By Category
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#666',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            Find your perfect style from our curated collections
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }} className="md:!grid-cols-4 md:!gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'block',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="group-hover:scale-105"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '18px',
                  marginBottom: '4px'
                }}>
                  {cat.title}
                </h3>
                <span style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
