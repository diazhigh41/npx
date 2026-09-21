"use client";
import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("followers");

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 capitalize">
          {activeTab === "reviews" ? "My Reviews" : activeTab}
        </span>
      </div>

      {/* Bagian Header Profil */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
        <div className="w-36 h-36 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 shadow-xs">
          <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300" 
            alt="Peter Jone" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-gray-900">Peter Jone</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>Last seen: Just Now</span>
          </div>
          <p className="text-xs text-gray-500 pt-1">
            Member since August 2026
          </p>
        </div>
      </div>

      {/* Tab Navigasi */}
      <div className="flex border-b border-gray-200 mt-2 mb-6">
        <button
          onClick={() => setActiveTab("followers")}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
            activeTab === "followers"
              ? "border-black text-black font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Followers (0)
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
            activeTab === "following"
              ? "border-black text-black font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Following (0)
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
            activeTab === "reviews"
              ? "border-black text-black font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          My Reviews (1)
        </button>
      </div>

      {/* Konten Tab */}
      {activeTab === "followers" && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No records found!
        </div>
      )}

      {activeTab === "following" && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No records found!
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <h2 className="text-sm font-bold text-gray-800 mb-4">My Reviews (1)</h2>
          
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <img 
                  src="https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/profile_300x300_68b9697dcac325-71870421.webp" 
                  alt="Reviewer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">Product:</span> Animal colorful digital prints
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-medium text-gray-800">Peter Jone</p>
                <p className="text-sm text-gray-600 pt-1">Test 1</p>
                <p className="text-[11px] text-gray-400 pt-0.5">11 days ago</p>
              </div>
            </div>

            <button className="text-xs text-red-500 hover:text-red-700 font-medium self-end sm:self-start cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}