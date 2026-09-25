"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES, PLACEHOLDER_IMG } from "@/data/products";

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((v) => (v + 1) % SLIDES.length);

  return (
    <div className="relative w-full h-[280px] sm:h-[420px] overflow-hidden bg-gray-100">
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Diubah jadi membaca s.image dari Supabase, jika kosong lari ke placeholder */}
          <img 
            src={s.image || PLACEHOLDER_IMG} 
            alt={s.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/10 flex items-center">
            <div
              className={`px-6 sm:px-14 max-w-lg transition-all duration-700 delay-150 ${
                idx === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight drop-shadow-md">{s.title}</h2>
              <p className="text-white text-xs sm:text-sm mt-3 hidden sm:block drop-shadow-md">{s.sub}</p>
              <button className="mt-4 sm:mt-5 bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-md transition-colors">
                {s.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prev} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white items-center justify-center transition-colors">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white items-center justify-center transition-colors">
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
