"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items, onAddToCart, showLoadMore = false }) {
  // Kalau showLoadMore aktif (Featured), awal-awal tampilkan 12 item (2 baris x 6 kolom)
  const [visibleCount, setVisibleCount] = useState(12);

  const displayedItems = showLoadMore ? items.slice(0, visibleCount) : items;
  const hasMore = showLoadMore && visibleCount < items.length;

  return (
    <div>
      {/* Grid 6 kolom per baris */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {displayedItems.map((product, idx) => (
          <ProductCard 
            key={product.slug || idx} 
            p={product} 
            onAddToCart={onAddToCart} 
            isFeatured={showLoadMore} 
          />
        ))}
      </div>

      {/* Tombol Load More untuk menambah 3 produk per klik */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="flex items-center gap-1 px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm active:scale-95"
          >
            Load More 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}