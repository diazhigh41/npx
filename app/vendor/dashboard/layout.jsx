"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, PlusSquare, Upload, Package, ShoppingCart, 
  FileText, Tag, AlertCircle, Truck, MessageSquare, 
  Star, Settings, ChevronDown, CreditCard, BookOpen, User, Wallet, ShoppingBag, Mail, LogOut 
} from "lucide-react";

export default function VendorDashboardLayout({ children }) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="h-screen bg-[#F4F6F8] flex text-gray-800 font-sans overflow-hidden">
      
      {/* SIDEBAR UTAMA */}
      <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 select-none h-full">
        <div className="px-6 py-5 flex-shrink-0">
          <Link href="/" className="text-3xl font-extrabold tracking-tight text-[#111827]">
            M<span className="text-[#14B8A6]">o</span>desy
          </Link>
        </div>

        <div className="px-6 pb-6 flex flex-col items-center text-center border-b border-gray-100 flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-300 mb-2 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" 
              alt="Trendshop" 
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-semibold text-gray-800 text-sm">Hi, Trendshop</h4>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6 text-sm">
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">NAVIGATION</p>
            <Link 
              href="/vendor/dashboard" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${pathname === "/vendor/dashboard" ? "bg-[#E6F4F1] text-[#14B8A6]" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">PRODUCTS</p>
            <div className="space-y-1">
              <Link href="/vendor/dashboard/products/add" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <PlusSquare size={18} /> Add Product
              </Link>
              <Link href="/vendor/dashboard/products/bulk" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <Upload size={18} /> Bulk Product Upload
              </Link>
              <Link href="/vendor/dashboard/products" className="flex items-center justify-between px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <span className="flex items-center gap-3"><Package size={18} /> Products</span>
                <span className="text-gray-400 text-xs">‹</span>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">SALES</p>
            <div className="space-y-1">
              <Link href="/vendor/dashboard/sales" className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${pathname.includes("/sales") ? "bg-[#E6F4F1] text-[#14B8A6] font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
                <span className="flex items-center gap-3"><ShoppingCart size={18} /> Sales</span>
                <span className="text-gray-400 text-xs">‹</span>
              </Link>
              <Link href="/vendor/dashboard/quotes" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <FileText size={18} /> Quote Requests
              </Link>
              <Link href="/vendor/dashboard/coupons" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <Tag size={18} /> Coupons
              </Link>
              <Link href="/vendor/dashboard/refunds" className="flex items-center justify-between px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <span className="flex items-center gap-3"><AlertCircle size={18} /> Refund Requests</span>
                <span className="bg-[#10B981] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">2</span>
              </Link>
              <Link href="/vendor/dashboard/cod" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <Truck size={18} /> Cash on Delivery
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">PAYMENTS</p>
            <div className="space-y-1">
              <Link href="/vendor/dashboard/payments" className="flex items-center justify-between px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <span className="flex items-center gap-3"><CreditCard size={18} /> Payments</span>
                <span className="text-gray-400 text-xs">‹</span>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">COMMENTS</p>
            <div className="space-y-1">
              <Link href="/vendor/dashboard/comments" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageSquare size={18} /> Comments
              </Link>
              <Link href="/vendor/dashboard/reviews" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${pathname.includes("/reviews") ? "bg-[#E6F4F1] text-[#14B8A6] font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
                <Star size={18} /> Reviews
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">SETTINGS</p>
            <div className="space-y-1">
              <Link href="/vendor/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <Settings size={18} /> Shop Settings
              </Link>
              <Link href="/vendor/dashboard/policies" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <BookOpen size={18} /> Shop Policies
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* HEADER ATAS */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <button className="text-gray-500 hover:text-gray-800 text-lg">
            ☰
          </button>

          <div className="flex items-center gap-4">
            {/* Tombol View Site diarahkan ke Landing Page Utama (/) */}
            <Link href="/" className="bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors">
              View Site
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer border border-gray-200 px-3 py-2 rounded-md">
              <span>🇺🇸 English</span> <ChevronDown size={12} className="text-gray-400" />
            </div>

            {/* Dropdown Trendshop */}
            <div className="relative">
              <div 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer pl-3 border-l border-gray-200 select-none py-2"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                    alt="Trendshop" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-800">Trendshop</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </div>

              {/* Menu Dropdown Kanan Atas */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl py-1.5 z-50 text-sm">
                  <Link 
                    href="/vendor/dashboard" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LayoutDashboard size={16} className="text-gray-400" /> Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={16} className="text-gray-400" /> Profile
                  </Link>
                  <Link 
                    href="/wallet" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Wallet size={16} className="text-gray-400" /> Wallet
                  </Link>
                  <Link 
                    href="/orders" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBag size={16} className="text-gray-400" /> Orders
                  </Link>
                  <Link 
                    href="/coupons" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Tag size={16} className="text-gray-400" /> My Coupons
                  </Link>
                  <Link 
                    href="/messages" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Mail size={16} className="text-gray-400" /> Messages
                  </Link>
                  <Link 
                    href="/vendor/dashboard/settings" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" /> Profile Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 text-left transition-colors font-medium"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* KONTEN UTAMA */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

    </div>
  );
}