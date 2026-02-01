"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart, useCartTotals } from "@/app/context/CartContext";

const NAV_LINKS = [
  { label: "Shop", href: "/collections/all" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

const MENU_CATEGORIES = [
  { label: "Shop All", href: "/collections/all" },
  { label: "Collections", href: "/collections" },
  { label: "Kids", href: "/collections/kids-collection" },
  { label: "Hoodies", href: "/products/type/hoodies" },
  { label: "Oversized Tees", href: "/products/type/oversized-tees" },
  { label: "About Us", href: "/about" },
];

const MENU_SUPPORT_LEFT = [
  { label: "Track Order", href: "/track-order" },
  { label: "Reviews", href: "/reviews" },
];

const MENU_SUPPORT_RIGHT = [
  { label: "Support", href: "/support" },
  { label: "Return & Exchange", href: "/returns" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const { openCart } = useCart();
  const { totalQuantity } = useCartTotals();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("banner_dismissed");
    if (dismissed) {
      setBannerVisible(false);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const dismissBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };

  return (
    <>
      {/* Announcement Bar */}
      {bannerVisible && (
        <div className="bg-[#3f5046] text-white py-2.5 px-4 text-center text-xs md:text-sm font-medium tracking-wide relative">
          <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>
          <button
            onClick={dismissBanner}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white py-4 md:py-5">
        <div className="container px-4">
          <div className="grid grid-cols-3 items-center">

            {/* Left - Menu (mobile) / Nav (desktop) */}
            <div className="flex items-center">
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-1"
                aria-label="Open menu"
              >
                <Menu size={26} className="text-gray-800" />
              </button>

              <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center - Logo */}
            <div className="flex justify-center items-center">
              <Link href="/" className="block">
                <Image
                  src="/logo.webp"
                  alt="Haddu"
                  width={180}
                  height={60}
                  priority
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center justify-end gap-5">
              <Link
                href="/search"
                className="text-gray-800 hover:text-gray-900 transition-colors"
                aria-label="Search"
              >
                <Search size={24} />
              </Link>

              <button
                onClick={openCart}
                className="text-gray-800 hover:text-gray-900 relative transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={24} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-[#3f5046] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalQuantity > 9 ? "9+" : totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute inset-0 bg-white transform transition-transform duration-300 ease-out flex flex-col ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #e5e5e5',
            flexShrink: 0
          }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ padding: '8px', color: '#111' }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src="/logo.webp"
                alt="Haddu"
                width={100}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <button
              onClick={() => { setMenuOpen(false); openCart(); }}
              style={{ padding: '8px', color: '#111', position: 'relative' }}
              aria-label="Cart"
            >
              <ShoppingBag size={24} />
              {totalQuantity > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  minWidth: '18px',
                  height: '18px',
                  backgroundColor: '#c9a227',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
            </button>
          </div>

          {/* Menu Categories */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <nav style={{ padding: '8px 0' }}>
              {MENU_CATEGORIES.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Support Links */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
              padding: '16px 24px',
              borderTop: '1px solid #e5e5e5'
            }}>
              <div>
                {MENU_SUPPORT_LEFT.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 0',
                      fontSize: '14px',
                      color: '#666'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div>
                {MENU_SUPPORT_RIGHT.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 0',
                      fontSize: '14px',
                      color: '#666'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Footer */}
          <div style={{
            flexShrink: 0,
            padding: '20px 24px',
            paddingBottom: '32px',
            borderTop: '1px solid #e5e5e5'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              {[
                { href: "https://www.instagram.com/haddu__clothings/", label: "Instagram", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href: "https://www.facebook.com/profile.php?id=61586133162912", label: "Facebook", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { href: "https://x.com/HadduClothing", label: "X", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: "https://in.pinterest.com/hadduclothing/", label: "Pinterest", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#3f5046',
                    color: 'white',
                    borderRadius: '50%',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
