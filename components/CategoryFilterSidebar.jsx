"use client";
import Link from "next/link";

export default function CategoryFilterSidebar({ categoryName = "Clothing", subCategories = [] }) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-24 space-y-6 shadow-sm">
        
        {/* Kategori & Sub-Kategori */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 text-xs sm:text-sm">Category</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
            <li>
              <Link href="#" className="font-semibold text-[#F2A93B] flex items-center gap-1">
                ← {categoryName}
              </Link>
            </li>
            {subCategories.map((sub, idx) => (
              <li key={idx} className="pl-4 cursor-pointer hover:text-[#F2A93B] transition-colors py-0.5">
                {sub}
              </li>
            ))}
          </ul>
        </div>

        {/* Brand */}
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-900 mb-3 text-xs sm:text-sm">Brand</h3>
          <div className="mb-2.5">
            <input 
              type="text" 
              placeholder="Search Brand" 
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#F2A93B]" 
            />
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600 max-h-48 overflow-y-auto pr-2">
            {["Adidas", "Armani", "Burberry", "Diesel", "Gucci", "H&M", "Hugo Boss", "Lacoste", "Lee Cooper", "Levi's", "Mango", "Nike", "Puma", "Tommy Hilfiger", "U.S. Polo Assn"].map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="rounded border-gray-300 text-[#F2A93B] focus:ring-[#F2A93B]" />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fabric */}
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-900 mb-3 text-xs sm:text-sm">Fabric</h3>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            {["Bamboo", "Cotton", "Leather", "Nylon", "Silk"].map((fabric) => (
              <label key={fabric} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="rounded border-gray-300 text-[#F2A93B] focus:ring-[#F2A93B]" />
                <span>{fabric}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-900 mb-3 text-xs sm:text-sm">Price</h3>
          <div className="flex items-center gap-2">
            <input type="number" placeholder="Min" className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-[#F2A93B]" />
            <span className="text-gray-400">-</span>
            <input type="number" placeholder="Max" className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-[#F2A93B]" />
          </div>
        </div>

        {/* Filter by keyword */}
        <div className="border-t pt-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Filter by keyword</h3>
          <input 
            type="text" 
            placeholder="Keyword" 
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#F2A93B]" 
          />
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs sm:text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
            <span>🔍</span> Filter
          </button>
        </div>

      </div>
    </aside>
  );
}
