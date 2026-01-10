import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
    Shop: [
        { label: "All Products", href: "/collections/all" },
        { label: "New Arrivals", href: "/collections/new-arrivals" },
        { label: "Best Sellers", href: "/collections/best-sellers" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200">
            <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">

                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

                    {/* Brand */}
                    <div>
                        <Link href="/" aria-label="Haddu Clothing">
                            <Image
                                src="/logo.webp"
                                alt="Haddu Clothing Logo"
                                width={140}
                                height={36}
                                priority
                                className="object-contain"
                            />
                        </Link>

                        <p className="mt-6 text-sm leading-relaxed text-neutral-600 max-w-sm">
                            Premium streetwear crafted with intention — minimal,
                            timeless, and built for everyday confidence.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-900">
                                {title}
                            </h4>

                            <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="relative inline-block transition-all duration-300 hover:text-neutral-900
                                            after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0
                                            after:bg-neutral-900 after:transition-all after:duration-300
                                            hover:after:w-full"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="my-14 h-px w-full bg-neutral-200" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wide text-neutral-500">
                    <p>
                        © {new Date().getFullYear()} Haddu Clothing. All rights reserved.
                    </p>
                    <p className="uppercase">
                        Designed & developed with care
                    </p>
                </div>
            </div>
        </footer>
    );
}
