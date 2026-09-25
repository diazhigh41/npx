"use client";
import { ShoppingCart } from "lucide-react";

export function CartToast({ show }) {
  return (
    <div
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-[#1A1A1A] text-white text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2">
        <ShoppingCart size={14} className="text-[#F2A93B]" />
        Product successfully added to your cart!
      </div>
    </div>
  );
}

export function CookieBanner({ visible, onAccept }) {
  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between max-w-7xl mx-auto">
        <p className="text-[11px] sm:text-xs text-gray-600 text-center sm:text-left">
          This site uses cookies. By continuing to browse the site, you are agreeing to our use of cookies.
        </p>
        <button
          onClick={onAccept}
          className="flex-shrink-0 bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-1.5 rounded-md"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
