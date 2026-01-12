"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
    { label: "Newest", value: "newest" },
];

export default function CollectionSort() {
    const [sort, setSort] = useState("recommended");

    return (
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em]">
            <span className="text-neutral-500">Sort</span>

            <div className="relative">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="
            appearance-none
            border border-neutral-300
            bg-white
            px-5 py-3 pr-10
            focus:outline-none
            focus:border-black
            transition
          "
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />
            </div>
        </div>
    );
}
