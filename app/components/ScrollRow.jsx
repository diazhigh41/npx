"use client";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ScrollRow({ items, onAddToCart }) {
  // 1. SEMUA HOOK HARUS BERADA DI PALING ATAS (Tanpa ada `if` / `return` di sela-selanya)
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Set posisi awal di set tengah saat komponen dimuat
  useEffect(() => {
    if (!items || items.length === 0) return;
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.style.scrollBehavior = "auto";
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, [items]);

  // 2. KONDISI / RETURN DILETAKKAN SETELAH SEMUA HOOK SELESAI DIPANGGIL
  if (!items || items.length === 0) return null;

  const extendedItems = [...items, ...items, ...items];

  // Fungsi untuk mengecek dan mereset posisi scroll agar muter terus tanpa batas
  const checkInfiniteScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft <= 10) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft += singleSetWidth;
    } else if (container.scrollLeft >= singleSetWidth * 2 - 10) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft -= singleSetWidth;
    }
  };

  // Handler Drag Mouse
  const handleMouseDown = (e) => {
    isDown.current = true;
    scrollRef.current.style.scrollBehavior = "auto";
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (isDown.current) {
      isDown.current = false;
      checkInfiniteScroll();
      if (scrollRef.current) scrollRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseUp = () => {
    if (isDown.current) {
      isDown.current = false;
      checkInfiniteScroll();
      if (scrollRef.current) scrollRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    
    checkInfiniteScroll();
  };

  // Handler Klik Tombol Panah
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    container.style.scrollBehavior = "smooth";
    const amount = 280; 
    const singleSetWidth = container.scrollWidth / 3;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });

    setTimeout(() => {
      if (!container) return;
      if (container.scrollLeft <= 50) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft += singleSetWidth;
        container.style.scrollBehavior = "smooth";
      } else if (container.scrollLeft >= singleSetWidth * 2 - 50) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft -= singleSetWidth;
        container.style.scrollBehavior = "smooth";
      }
    }, 350);
  };

  return (
    <div className="relative group/row">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-3 overflow-x-auto pb-3 pt-1 -mx-4 px-4 scrollbar-hide sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing select-none"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {extendedItems.map((p, i) => (
          <div key={`${p.name || p.id}-${i}`} className="flex-shrink-0 snap-start">
            <ProductCard p={p} onAddToCart={onAddToCart} isScrollRow={true} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-[#14B8A6] transition-colors opacity-0 group-hover/row:opacity-100 z-10 cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-[#14B8A6] transition-colors opacity-0 group-hover/row:opacity-100 z-10 cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}