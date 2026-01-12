"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CATEGORIES = ["All", "Oversized Tees", "Shirts", "Hoodies"];
const SIZES = [38, 40, 42, 44, 46];

export default function CollectionFilters() {
    const [category, setCategory] = useState("All");
    const [size, setSize] = useState<number | null>(null);

    return (
        <div className="flex flex-wrap items-center gap-5 text-[11px] uppercase tracking-[0.25em]">
            {/* CATEGORY DROPDOWN */}
            <div className="relative group">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
            appearance-none
            border border-neutral-300
            bg-white
            px-5 py-3 pr-12
            text-neutral-800
            focus:outline-none
            focus:border-[#0C4008]
            focus:ring-1 focus:ring-[#0C4008]
            transition-all
            hover:border-[#0C4008]
          "
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Chevron */}
                <ChevronDown
                    size={14}
                    className="
            pointer-events-none
            absolute right-4 top-1/2 -translate-y-1/2
            text-neutral-500
            transition-transform
            group-focus-within:rotate-180
          "
                />
            </div>

            {/* SIZE FILTER */}
            <div className="flex items-center gap-2">
                {SIZES.map((s) => {
                    const active = size === s;

                    return (
                        <button
                            key={s}
                            onClick={() => setSize(active ? null : s)}
                            className={`
                min-w-[42px]
                px-4 py-3
                border
                transition-all
                ${active
                                    ? "border-[#0C4008] bg-[#0C4008] text-white"
                                    : "border-neutral-300 hover:border-[#0C4008]"
                                }
              `}
                        >
                            {s}
                        </button>
                    );
                })}
            </div>

            {/* CLEAR FILTERS */}
            {(category !== "All" || size !== null) && (
                <button
                    onClick={() => {
                        setCategory("All");
                        setSize(null);
                    }}
                    className="
            ml-2
            text-neutral-500
            hover:text-[#0C4008]
            transition
          "
                >
                    Clear
                </button>
            )}
        </div>
    );
}
