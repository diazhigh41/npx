"use client";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS, PLACEHOLDER_IMG } from "@/data/products";
import { Reveal } from "@/hooks/useReveal";

export default function BlogSection() {
  const scrollRef = useRef(null);

  if (!BLOG_POSTS || BLOG_POSTS.length === 0) return null;

  // Triplikasi data untuk infinite loop seamless
  const extendedBlogs = [...BLOG_POSTS, ...BLOG_POSTS, ...BLOG_POSTS];

  // Set posisi awal scroll persis di set tengah saat komponen dimuat
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.style.scrollBehavior = "auto";
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  // Fungsi penjaga infinite loop agar bisa diputar terus tanpa batas
  const checkInfiniteScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft <= 20) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft += singleSetWidth;
    } else if (container.scrollLeft >= singleSetWidth * 2 - 20) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft -= singleSetWidth;
    }
  };

  // Handler klik tombol panah kiri / kanan
  const scrollManual = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    container.style.scrollBehavior = "smooth";
    // Lebar geseran disesuaikan dengan ukuran card yang besar (lebar card + gap)
    const amount = 310; 
    container.scrollLeft += direction === "left" ? -amount : amount;

    setTimeout(() => {
      checkInfiniteScroll();
    }, 350);
  };

  return (
    <Reveal className="mt-12 mb-12">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Latest Blog Posts</h2>
      
      <div className="relative group/row">
        {/* Tombol Panah Kiri */}
        <button
          type="button"
          onClick={() => scrollManual("left")}
          className="hidden sm:flex absolute -left-4 top-[35%] -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:text-[#F2A93B] transition-colors opacity-0 group-hover/row:opacity-100 z-10 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Kontainer Scroll Row */}
        <div
          ref={scrollRef}
          onScroll={checkInfiniteScroll}
          className="flex gap-5 overflow-x-auto pb-3 pt-1 -mx-4 px-4 scrollbar-hide select-none cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {extendedBlogs.map((p, i) => (
            <div 
              key={`${p.title}-${i}`} 
              className="snap-start flex-shrink-0 w-[280px] sm:w-[295px] group cursor-pointer flex flex-col"
            >
              {/* Gambar Besar Landscape ala Web Asli */}
              <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-gray-100 shadow-sm">
                <img
                  src={p.image || PLACEHOLDER_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Kategori & Waktu */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-1.5">
                <span className="flex items-center gap-1">📁 {p.cat || p.category || "Life Style"}</span>
                <span>•</span>
                <span className="flex items-center gap-1">⏱️ {p.time || "2 months ago"}</span>
              </div>

              {/* Judul Blog */}
              <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#F2A93B] transition-colors mb-1.5">
                {p.title}
              </h3>

              {/* Deskripsi Singkat */}
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {p.excerpt || p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tombol Panah Kanan */}
        <button
          type="button"
          onClick={() => scrollManual("right")}
          className="hidden sm:flex absolute -right-4 top-[35%] -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:text-[#F2A93B] transition-colors opacity-0 group-hover/row:opacity-100 z-10 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </Reveal>
  );
}
