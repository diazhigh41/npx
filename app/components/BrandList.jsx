"use client";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BrandList({ brands = [] }) {
  const scrollRef = useRef(null);

  // Fallback data logo brand
  const brandList = brands.length > 0 ? brands : [
    { name: "Levi's", image: "https://modesy.codingest.net/uploads/brand/brand_64a2333b2a8d6.png" },
    { name: "Mango", image: "https://modesy.codingest.net/uploads/brand/brand_64a2333f38d12.png" },
    { name: "Nike", image: "https://modesy.codingest.net/uploads/brand/brand_64a23344658e3.png" },
    { name: "Puma", image: "https://modesy.codingest.net/uploads/brand/brand_64a2334b1234a.png" },
    { name: "Hilfiger", image: "https://modesy.codingest.net/uploads/brand/brand_64a233519871c.png" },
    { name: "US Polo", image: "https://modesy.codingest.net/uploads/brand/brand_64a2335834f81.png" },
    { name: "Adidas", image: "https://modesy.codingest.net/uploads/brand/brand_64a2335eb123a.png" },
    { name: "Armani", image: "https://modesy.codingest.net/uploads/brand/brand_64a2336491823.png" },
  ];

  const extendedBrands = [...brandList, ...brandList, ...brandList];

  // Set posisi awal scroll tepat di bagian set tengah
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.style.scrollBehavior = "auto";
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, [brandList]);

  // Fungsi penjaga infinite loop
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

  // Efek Auto-Scroll Otomatis
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container) return;
      container.style.scrollBehavior = "smooth";
      const itemWidth = 186; // 170px width + 16px gap (gap-4)
      container.scrollLeft += itemWidth;

      setTimeout(() => {
        checkInfiniteScroll();
      }, 400);

    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Fungsi Handler Tombol Panah Klik
  const scrollManual = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    container.style.scrollBehavior = "smooth";
    const amount = 200;
    container.scrollLeft += direction === "left" ? -amount : amount;

    setTimeout(() => {
      checkInfiniteScroll();
    }, 350);
  };

  return (
    <section className="mt-12 mb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Shop By Brand</h2>
      <div className="relative group/row">
        
        {/* Tombol Panah Kiri */}
        <button
          type="button"
          onClick={() => scrollManual("left")}
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-[#F2A93B] transition-colors opacity-0 group-hover/row:opacity-100 z-10 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Kontainer Brand */}
        <div
          ref={scrollRef}
          onScroll={checkInfiniteScroll}
          className="flex gap-4 overflow-x-auto py-2 scrollbar-hide select-none cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {extendedBrands.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center gap-2 text-xs sm:text-sm border border-gray-200 rounded-lg px-6 py-4 text-gray-700 bg-white shadow-sm hover:border-[#F2A93B] transition-colors w-[170px] h-[75px]"
            >
              {b?.image ? (
                <img src={b.image} alt={b.name} className="max-h-8 max-w-[100px] object-contain" />
              ) : (
                <span className="font-semibold">{b?.name}</span>
              )}
            </div>
          ))}
        </div>

        {/* Tombol Panah Kanan */}
        <button
          type="button"
          onClick={() => scrollManual("right")}
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-[#F2A93B] transition-colors opacity-0 group-hover/row:opacity-100 z-10 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </section>
  );
}