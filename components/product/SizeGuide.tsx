"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SIZE_CHART = [
  { size: "S", chest: "34-36", length: "27", shoulder: "17" },
  { size: "M", chest: "38-40", length: "28", shoulder: "18" },
  { size: "L", chest: "40-42", length: "29", shoulder: "19" },
  { size: "XL", chest: "42-44", length: "30", shoulder: "20" },
  { size: "XXL", chest: "44-46", length: "31", shoulder: "21" },
  { size: "3XL", chest: "46-48", length: "32", shoulder: "22" },
];

export default function SizeGuide({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white z-50 overflow-auto max-h-[90vh] rounded-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Size Guide</h2>
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Size Chart */}
          <div>
            <h3 className="font-semibold mb-3">Size Chart (inches)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-3 font-semibold border">Size</th>
                    <th className="text-left py-3 px-3 font-semibold border">Chest</th>
                    <th className="text-left py-3 px-3 font-semibold border">Length</th>
                    <th className="text-left py-3 px-3 font-semibold border">Shoulder</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((row) => (
                    <tr key={row.size}>
                      <td className="py-3 px-3 font-semibold border">{row.size}</td>
                      <td className="py-3 px-3 text-gray-600 border">{row.chest}"</td>
                      <td className="py-3 px-3 text-gray-600 border">{row.length}"</td>
                      <td className="py-3 px-3 text-gray-600 border">{row.shoulder}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div>
            <h3 className="font-semibold mb-3">How to Measure</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Chest:</strong> Measure around the fullest part of your chest.</li>
              <li><strong>Length:</strong> Measure from shoulder to bottom hem.</li>
              <li><strong>Shoulder:</strong> Measure from shoulder seam to seam across the back.</li>
            </ul>
          </div>

          {/* Fit Notes */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Fit Notes</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Our pieces have a relaxed, oversized fit</li>
              <li>• For a fitted look, size down</li>
              <li>• Model is 5'11" wearing size M</li>
            </ul>
          </div>

          {/* Contact */}
          <p className="text-sm text-gray-500 text-center">
            Need help? <a href="/contact" className="text-gray-700 underline">Contact us</a>
          </p>
        </div>
      </div>
    </>
  );
}
