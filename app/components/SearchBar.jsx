"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { ALL_PRODUCTS_WITH_SLUG, PLACEHOLDER_IMG } from "../data/products";
import Link from "next/link";
import { useCurrency } from "../context/CurrencyContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { formatPrice } = useCurrency();

  // Tutup dropdown kalau klik di luar area search
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results =
    query.trim().length > 0
      ? ALL_PRODUCTS_WITH_SLUG.filter((p) =>
          p.name.toLowerCase().includes(query.trim().toLowerCase())
        ).slice(0, 6)
      : [];

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2.5">
        <Search size={16} className="text-gray-400 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for products, categories or brands"
          className="flex-1 ml-2 outline-none text-sm bg-transparent min-w-0"
        />
        {query && (
          <button onClick={() => setQuery("")} className="flex-shrink-0">
            <X size={15} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Dropdown hasil */}
      {open && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {results.length > 0 ? (
            results.map((p, i) => (
              <Link
                key={i}
                href={`/${p.slug}`}
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-md bg-gray-50 overflow-hidden flex-shrink-0">
                  <img src={PLACEHOLDER_IMG} className="w-full h-full object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.seller}</p>
                </div>
                {!p.quote && !p.free && (
                  <span className="text-sm font-semibold text-gray-900 flex-shrink-0">{formatPrice(p.price)}</span>
                )}
              </Link>
            ))
          ) : (
            <p className="px-4 py-4 text-sm text-gray-400 text-center">
              No products found for "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}