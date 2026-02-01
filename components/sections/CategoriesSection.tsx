"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/lib/queries";
import { mockCollections } from "@/lib/mockData";

type Category = {
  id: string;
  title: string;
  image: string;
  href: string;
  isKids?: boolean;
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || categories.length === 0 || isPaused) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    let scrollSpeed = 0.5; // pixels per frame

    const autoScroll = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset to beginning when reaching the end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, [categories, isPaused]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await shopifyFetch(COLLECTIONS_QUERY);

        if (!res) {
          setCategories(mockCollections.slice(0, 6));
          return;
        }

        const formatted: Category[] = res.data.collections.nodes
          .filter((col: any) => col.image?.url || col.products?.nodes?.[0]?.featuredImage?.url)
          .map((col: any) => ({
            id: col.id,
            title: col.title,
            image: col.image?.url || col.products?.nodes?.[0]?.featuredImage?.url || mockCollections[0].image,
            href: `/collections/${col.handle}`,
            isKids: col.handle.toLowerCase().includes('kid') || col.title.toLowerCase().includes('kid'),
          }));

        setCategories(formatted);
      } catch (error) {
        console.error("Failed to load collections", error);
        setCategories(mockCollections.slice(0, 6));
      }
    }

    fetchCategories();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollButtons);
      return () => scrollEl.removeEventListener('scroll', checkScrollButtons);
    }
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      setIsPaused(true);
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Resume auto-scroll after 3 seconds
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  if (!categories.length) return null;

  return (
    <section style={{
      padding: '60px 0 80px',
      backgroundColor: '#fafafa'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div>
            <p style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#3f5046',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Explore Our Collection
            </p>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111'
            }}>
              Shop By Category
            </h2>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex" style={{ gap: '8px' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #e5e5e5',
                background: canScrollLeft ? 'white' : '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                opacity: canScrollLeft ? 1 : 0.5,
                transition: 'all 0.2s'
              }}
            >
              <ChevronLeft size={20} color="#333" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #e5e5e5',
                background: canScrollRight ? 'white' : '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                opacity: canScrollRight ? 1 : 0.5,
                transition: 'all 0.2s'
              }}
            >
              <ChevronRight size={20} color="#333" />
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
        >
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: '8px'
            }}
            className="hide-scrollbar"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                style={{
                  position: 'relative',
                  flex: '0 0 calc(45% - 8px)',
                  maxWidth: 'calc(45% - 8px)',
                  aspectRatio: '3/4',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'block',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  scrollSnapAlign: 'start',
                  transition: 'transform 0.3s ease'
                }}
                className="md:!flex-[0_0_calc(25%-12px)] md:!max-w-[calc(25%-12px)] hover:scale-[1.02]"
              >
                <img
                  src={cat.image + (cat.image.includes('?') ? '&' : '?') + 'width=400'}
                  alt={cat.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                }} />
                {/* Kids badge */}
                {cat.isKids && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    background: 'rgba(251, 191, 36, 0.9)',
                    borderRadius: '20px',
                    zIndex: 2
                  }}>
                    <span style={{ fontSize: '12px' }}>👶</span>
                    <span style={{ fontSize: '10px', fontWeight: '600', color: '#78350f', textTransform: 'uppercase' }}>Kids</span>
                  </div>
                )}
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

        {/* Mobile scroll hint with arrows */}
        <div className="md:hidden" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginTop: '20px'
        }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #e5e5e5',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <ChevronLeft size={18} color="#333" />
          </button>
          <span style={{
            fontSize: '12px',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Swipe to explore
          </span>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #e5e5e5',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <ChevronRight size={18} color="#333" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
