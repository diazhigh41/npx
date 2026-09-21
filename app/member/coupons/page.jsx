"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Clock, 
  ArrowRight, 
  Copy, 
  Check 
} from "lucide-react";

export default function MyCouponsPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  // Data Kupon sesuai aslinya
  const couponsList = [
    {
      id: 1,
      store: "ADMIN",
      discount: "10% Coupon",
      validUntil: "16 April 2027",
      code: "P6PG5GLS",
      image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/profile_300x300_68b1aede09f500-26161786.webp"
    },
    {
      id: 2,
      store: "TRENDSHOP",
      discount: "15% Coupon",
      validUntil: "31 March 2027",
      code: "41GNOLDX",
      image: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/profile_300x300_68b2ca44722146-57359149.webp"
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / <span className="text-gray-900 font-normal">My Coupons</span>
      </div>

      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Coupons</h1>

      {/* Daftar Kupon (Grid 2 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {couponsList.map((coupon) => (
          <div 
            key={coupon.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs relative flex flex-col justify-between"
          >
            {/* Bagian Atas Card */}
            <div className="flex items-center gap-5 pb-6 border-b border-dashed border-gray-300">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-inner">
                <img 
                  src={coupon.image} 
                  alt={coupon.store} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  {coupon.store}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {coupon.discount}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium pt-0.5">
                  <Clock size={13} />
                  <span>Valid till: {coupon.validUntil}</span>
                </div>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:text-teal-600 pt-1 transition-colors group"
                >
                  See Products 
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Bagian Bawah Card (Kode Kupon & Tombol Copy) */}
            <div className="pt-6 flex items-center justify-between gap-4">
              <div className="font-mono font-bold text-gray-800 text-sm tracking-wider bg-gray-50 border border-dashed border-gray-300 px-3 py-2.5 rounded-lg w-full text-center">
                {coupon.code}
              </div>
              <button
                onClick={() => handleCopy(coupon.code)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                  copiedCode === coupon.code 
                    ? "bg-emerald-600 hover:bg-emerald-700" 
                    : "bg-teal-600 hover:bg-teal-700 shadow-sm"
                }`}
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check size={14} /> COPIED!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> COPY CODE
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}