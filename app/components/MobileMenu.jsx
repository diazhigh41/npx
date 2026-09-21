"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight, MapPin, Globe, ChevronDown } from "lucide-react";
import { CATEGORIES, slugify } from "../data/products";
import LoginModal from "./LoginModal";
import { createClient } from "../../utils/supabase/client";

export default function MobileMenu({ open, onClose, onOpenLogin, onOpenRegister }) {
  const [activeTab, setActiveTab] = useState("main"); // "main" atau "categories"
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    
    // Cek sesi user aktif secara otomatis
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Handler proteksi untuk menu yang butuh login (misal: Wishlist)
  const handleProtectedClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      onClose();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-[70] md:hidden transition-all duration-300 ${open ? "visible" : "invisible"}`}>
        {/* Backdrop Gelap */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        {/* Konten Menu Samping */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-white shadow-xl transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Area Atas: Tombol Sell Now & Tab Switcher */}
          <div className="p-4 border-b space-y-3">
            <Link
              href="/sell-now"
              onClick={onClose}
              className="block w-full text-center bg-[#00A699] text-white py-2.5 rounded font-medium text-sm hover:bg-[#008f82] transition"
            >
              Sell Now
            </Link>

            {/* Tab Tombol Main Menu / Categories */}
            <div className="flex bg-gray-100 p-1 rounded-lg text-sm font-medium">
              <button
                onClick={() => setActiveTab("main")}
                className={`flex-1 py-1.5 rounded-md transition cursor-pointer ${
                  activeTab === "main" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Main Menu
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex-1 py-1.5 rounded-md transition cursor-pointer ${
                  activeTab === "categories" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Categories
              </button>
            </div>
          </div>

          {/* Area Scrollable untuk Menu */}
          <div className="flex-1 overflow-y-auto px-4 py-2 text-sm">
            {activeTab === "main" ? (
              <div className="divide-y divide-gray-100">
                <Link href="/" onClick={onClose} className="block py-3 text-gray-800 hover:text-[#00A699]">Home</Link>
                
                {/* Wishlist diproteksi login */}
                <Link 
                  href="/wishlist" 
                  onClick={(e) => handleProtectedClick(e, "/wishlist")}
                  className="block py-3 text-gray-800 hover:text-[#00A699]"
                >
                  Wishlist
                </Link>

                <Link href="/contact" onClick={onClose} className="block py-3 text-gray-800 hover:text-[#00A699]">Contact</Link>
                <Link href="/blog" onClick={onClose} className="block py-3 text-gray-800 hover:text-[#00A699]">Blog</Link>
                <Link href="/sell-now" onClick={onClose} className="block py-3 text-gray-800 hover:text-[#00A699]">Sell on Modesy</Link>
                
                {!user ? (
                  <>
                    <button 
                      onClick={() => { onClose(); onOpenLogin && onOpenLogin(); }} 
                      className="w-full text-left py-3 text-gray-800 hover:text-[#00A699] cursor-pointer"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => { onClose(); onOpenRegister && onOpenRegister(); }} 
                      className="w-full text-left py-3 text-gray-800 hover:text-[#00A699] cursor-pointer"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <div className="py-3 text-xs text-emerald-600 font-medium">
                    Logged in as {user.email}
                  </div>
                )}

                <div className="py-3 flex items-center gap-2 text-gray-700 cursor-pointer hover:text-[#00A699]">
                  <MapPin size={16} className="text-gray-500" />
                  <span>Location</span>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c}
                    href={`/categories/${slugify(c)}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 text-gray-800 hover:text-[#00A699] cursor-pointer"
                  >
                    <span>{c}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bagian Bawah: Bahasa & Mata Uang */}
          <div className="p-4 border-t bg-gray-50 flex items-center justify-between text-xs font-medium text-gray-700">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#00A699]">
              <span>🇺🇸</span>
              <span>English</span>
              <ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#00A699]">
              <span>USD ($)</span>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Login Cadangan jika dipicu dari menu mobile */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}