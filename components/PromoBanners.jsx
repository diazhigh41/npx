"use client";
import { PROMO_BANNERS_TOP, PROMO_BANNERS_BOTTOM } from "@/data/products";

export default function PromoBanners({ variant = "top" }) {
  const banners = variant === "top" ? PROMO_BANNERS_BOTTOM : PROMO_BANNERS_TOP;

  return (
    <div className={`mt-8 grid grid-cols-1 ${variant === "top" ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
      {banners.map((banner, index) => (
        <div 
          key={index} 
          className={`relative rounded-xl overflow-hidden bg-gray-100 shadow-sm ${
            variant === "top" ? "h-64 sm:h-80" : "h-36 sm:h-44"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-xs uppercase tracking-wider text-yellow-300 font-bold mb-1">
              {banner.subtitle || banner.discount || banner.desc}
            </span>
            <h4 className={`${variant === "top" ? "text-2xl" : "text-lg"} font-bold`}>
              {banner.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
