"use client";
import { BRANDS } from "../data/products";

export default function CategorySidebar({
  category, subcategories, sortBy, onSortChange, selectedBrands, onToggleBrand,
}) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="border border-gray-100 rounded-xl p-5 sticky top-4">
        <h3 className="font-bold text-sm mb-4">Filter Products</h3>

        {/* Sort */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none bg-white"
          >
            <option value="recent">Most Recent</option>
            <option value="low">Lowest Price</option>
            <option value="high">Highest Price</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {/* Subcategories */}
        {subcategories && subcategories.length > 0 && (
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              {category}
            </label>
            {subcategories.map((s) => (
              <p key={s} className="text-sm text-gray-600 py-1.5 hover:text-[#14B8A6] cursor-pointer">
                {s}
              </p>
            ))}
          </div>
        )}

        {/* Brand filter */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
            Brand
          </label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => onToggleBrand(b)}
                  className="accent-[#14B8A6] w-3.5 h-3.5"
                />
                {b}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}