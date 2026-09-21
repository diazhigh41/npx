"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";

export default function CurrencyDropdown() {
  const { currency, setCurrencyCode, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 hover:text-gray-900">
        {currency.label} <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl py-2 w-32 z-50">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrencyCode(c.code); setOpen(false); }}
              className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 ${
                c.code === currency.code ? "text-[#14B8A6] font-medium" : "text-gray-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}