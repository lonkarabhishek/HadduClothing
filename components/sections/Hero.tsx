"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";

type HeroSlide = {
  badge: string;
  title: string;
  subtitle: string;
  type: 'hero' | 'product';
  heroImage?: string;
  productImage?: string;
  productHandle?: string;
  productTitle?: string;
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      badge: "Haddu Clothing",
      title: "Streetwear That Speaks",
      subtitle: "Premium oversized tees & hoodies. Bold graphics. Made for those who stand out.",
      type: 'hero',
      heroImage: "/hero12.png",
    }
  ]);

  // Fetch featured products from Shopify
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await shopifyFetch(PRODUCTS_QUERY, { first: 20 });
        if (res?.data?.products?.nodes) {
          const allProducts = res.data.products.nodes.filter((p: any) => p.featuredImage?.url);

          // Find a hoodie and a t-shirt
          const hoodie = allProducts.find((p: any) =>
            p.title.toLowerCase().includes('hoodie') ||
            p.productType?.toLowerCase().includes('hoodie')
          );
          // Look for the specific Olive Green No Limits t-shirt
          const tshirt = allProducts.find((p: any) =>
            p.title.toLowerCase().includes('olive') &&
            p.title.toLowerCase().includes('no limits')
          ) || allProducts.find((p: any) =>
            (p.title.toLowerCase().includes('t-shirt') ||
             p.title.toLowerCase().includes('tee') ||
             p.title.toLowerCase().includes('oversized') ||
             p.productType?.toLowerCase().includes('shirt')) &&
            !p.title.toLowerCase().includes('hoodie')
          );

          const newSlides: HeroSlide[] = [
            {
              badge: "Haddu Clothing",
              title: "Streetwear That Speaks",
              subtitle: "Premium oversized tees & hoodies. Bold graphics. Made for those who stand out.",
              type: 'hero',
              heroImage: "/hero12.png",
            }
          ];

          // Slide 2: Hoodie
          if (hoodie) {
            newSlides.push({
              badge: "Premium Hoodies",
              title: "Stay Warm, Stay Bold",
              subtitle: "300 GSM premium cotton. Oversized fit. Made for those who refuse to blend in.",
              type: 'product',
              productImage: hoodie.featuredImage.url,
              productHandle: hoodie.handle,
              productTitle: hoodie.title,
            });
          }

          // Slide 3: T-shirt (Olive Green No Limits)
          if (tshirt) {
            newSlides.push({
              badge: "Graphic Tees",
              title: "Wear Your Story",
              subtitle: "Every design tells a tale. Premium oversized tees that speak louder than words.",
              type: 'product',
              productImage: tshirt.featuredImage.url,
              productHandle: tshirt.handle,
              productTitle: tshirt.title,
            });
          }

          // Slide 4 & 5: Two more products
          const usedHandles = [hoodie?.handle, tshirt?.handle].filter(Boolean);
          const otherProducts = allProducts.filter((p: any) => !usedHandles.includes(p.handle));

          if (otherProducts.length > 0) {
            newSlides.push({
              badge: "Fresh Drops",
              title: "New & Trending",
              subtitle: "The latest additions to our collection. Get them before they're gone.",
              type: 'product',
              productImage: otherProducts[0].featuredImage.url,
              productHandle: otherProducts[0].handle,
              productTitle: otherProducts[0].title,
            });
          }

          if (otherProducts.length > 2) {
            newSlides.push({
              badge: "Limited Edition",
              title: "Make It Yours",
              subtitle: "Unique designs you won't find anywhere else. Stand out from the crowd.",
              type: 'product',
              productImage: otherProducts[2].featuredImage.url,
              productHandle: otherProducts[2].handle,
              productTitle: otherProducts[2].title,
            });
          } else if (otherProducts.length > 1) {
            newSlides.push({
              badge: "Limited Edition",
              title: "Make It Yours",
              subtitle: "Unique designs you won't find anywhere else. Stand out from the crowd.",
              type: 'product',
              productImage: otherProducts[1].featuredImage.url,
              productHandle: otherProducts[1].handle,
              productTitle: otherProducts[1].title,
            });
          }

          // Fallback if we didn't find specific types
          if (newSlides.length === 1 && allProducts.length > 0) {
            newSlides.push({
              badge: "Our Collection",
              title: "Born to Stand Out",
              subtitle: "Premium quality. Bold designs. Made for those who dare to be different.",
              type: 'product',
              productImage: allProducts[0].featuredImage.url,
              productHandle: allProducts[0].handle,
              productTitle: allProducts[0].title,
            });
          }

          setSlides(newSlides);
        }
      } catch (error) {
        console.error("Failed to fetch hero products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const currentContent = slides[currentSlide];

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-[#0a0a0a]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          {slide.type === 'hero' ? (
            // Full hero image
            <img
              src={slide.heroImage}
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          ) : (
            // Product image on the right, fading to left
            <>
              {/* Dark background base */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
              }} />

              {/* Product image - full width with heavy left fade */}
              <div style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
              }}>
                <img
                  src={slide.productImage + (slide.productImage?.includes('?') ? '&' : '?') + 'width=1200'}
                  alt={slide.productTitle || ''}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '80%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 25%',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
                  }}
                />
                {/* Extra fade overlay for smooth blend - lighter */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.85) 20%, rgba(10,10,10,0.5) 35%, rgba(10,10,10,0.2) 50%, transparent 65%)',
                }} />
                {/* Subtle top fade */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, transparent 20%)',
                }} />
                {/* Bottom fade */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 20%)',
                }} />
              </div>
            </>
          )}
        </div>
      ))}

      {/* Additional overlay for hero image */}
      {currentContent?.type === 'hero' && (
        <div className="absolute inset-0 z-[2]" style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)'
        }} />
      )}

      {/* Bottom gradient for all slides */}
      <div className="absolute inset-0 z-[2]" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 30%)'
      }} />

      {/* Main Content - Left side */}
      <div className="absolute inset-0 z-[3] flex items-center">
        <div className="container">
          <div className="max-w-lg">
            {/* Animated badge */}
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '500', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {currentContent?.badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(28px, 6vw, 52px)',
                fontWeight: '700',
                color: 'white',
                lineHeight: '1.15',
                marginBottom: '14px',
                letterSpacing: '-0.02em'
              }}
            >
              {currentContent?.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '28px',
                maxWidth: '400px',
                lineHeight: '1.6'
              }}
            >
              {currentContent?.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              key={`cta-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <Link
                href={currentContent?.type === 'product' && currentContent?.productHandle
                  ? `/products/${currentContent.productHandle}`
                  : "/collections/all"}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#3f5046',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#4a5f52'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#3f5046'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {currentContent?.type === 'product' ? 'Shop Now' : 'Explore Collection'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/collections/all"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 20px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              >
                View All
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Product CTA card - Mobile version (simpler, centered) */}
      {currentContent?.type === 'product' && currentContent?.productTitle && (
        <motion.div
          key={`product-mobile-${currentSlide}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute z-[5] md:hidden left-1/2 -translate-x-1/2"
          style={{ bottom: '70px' }}
        >
          <Link
            href={`/products/${currentContent.productHandle}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulse 2s infinite',
              flexShrink: 0,
            }} />
            <p style={{ fontSize: '12px', color: 'white', fontWeight: '500', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentContent.productTitle}
            </p>
            <div style={{
              padding: '5px 10px',
              background: '#3f5046',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: '600',
              color: 'white',
              whiteSpace: 'nowrap',
            }}>
              Buy →
            </div>
          </Link>
        </motion.div>
      )}

      {/* Product CTA card with connector line - Desktop version */}
      {currentContent?.type === 'product' && currentContent?.productTitle && (
        <motion.div
          key={`product-desktop-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute z-[5] hidden md:block"
          style={{ bottom: '100px', right: '38%' }}
        >
          {/* Connector line from card to product */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <Link
                href={`/products/${currentContent.productHandle}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <p style={{ fontSize: '13px', color: 'white', fontWeight: '500', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentContent.productTitle}
                </p>
                <div style={{
                  padding: '6px 12px',
                  background: '#3f5046',
                  borderRadius: '5px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}>
                  Buy Now →
                </div>
              </Link>
            </motion.div>
            {/* Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ duration: 0.4, delay: 0.6 }}
              style={{
                height: '2px',
                background: 'linear-gradient(to right, rgba(255,255,255,0.4), #4ade80)',
                flexShrink: 0,
              }}
            />
            {/* Dot pointing to product */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#4ade80',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
                animation: 'pulse 2s infinite',
                flexShrink: 0,
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Carousel Navigation - Desktop */}
      {slides.length > 1 && (
        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-[4] flex-col gap-2">
          <button
            onClick={prevSlide}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[4] flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: index === currentSlide ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-[4] h-[3px] bg-white/10">
          <motion.div
            key={currentSlide}
            initial={{ width: '0%' }}
            animate={{ width: isAutoPlaying ? '100%' : '0%' }}
            transition={{ duration: 6, ease: 'linear' }}
            style={{ height: '100%', background: '#3f5046' }}
          />
        </div>
      )}

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}
