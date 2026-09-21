"use client";
import { useState } from "react";
import { PLACEHOLDER_IMG } from "../data/products";

export default function ProductGallery() {
  // Sementara semua thumbnail pakai placeholder yang sama.
  // Nanti kalau produk sudah punya banyak foto, tinggal ganti array ini jadi p.images
  const images = [PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
        <img src={images[active]} className="w-full h-full object-contain p-10" />
      </div>
      <div className="flex gap-2.5 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              active === i ? "border-[#14B8A6]" : "border-gray-100"
            }`}
          >
            <img src={img} className="w-full h-full object-contain p-2 bg-gray-50" />
          </button>
        ))}
      </div>
    </div>
  );
}