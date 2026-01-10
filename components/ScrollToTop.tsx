"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const LOGO_COLOR = "#0A3E08";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const scrollPercent = (scrollTop / docHeight) * 100;

            setVisible(scrollTop > 300);
            setProgress(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
                background: `conic-gradient(
                    black ${progress}%,
                    rgba(255,255,255,0.12) ${progress}%
                )`,
            }}
            className="
                fixed bottom-6 right-6 z-50
                h-14 w-14 rounded-full p-[1.5px]
                transition-all duration-500 ease-out
                hover:scale-110
                hover:shadow-[0_0_30px_rgba(0,0,0,0.6)]
                animate-float
            "
        >
            <span
                className="
                    h-full w-full rounded-full
                    flex items-center justify-center
                    transition-all duration-300
                "
                style={{ backgroundColor: LOGO_COLOR }}
            >
                <ArrowUp className="h-5 w-5 text-white" />
            </span>
        </button>
    );
}
