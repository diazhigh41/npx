"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import LoginModal from "./components/LoginModal"; 
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import ScrollRow from "./components/ScrollRow";
import ProductGrid from "./components/ProductGrid";
import PromoBanners from "./components/PromoBanners";
import BrandList from "./components/BrandList";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import { CartToast, CookieBanner } from "./components/Notifications";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function ModesyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { addToCart: addItemToCart } = useCart();
  const [toast, setToast] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);

  // State untuk menampung data produk dari Supabase
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ambil data produk langsung dari tabel Supabase
  useEffect(() => {
    async function fetchProducts() {
      setLoadingProducts(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Gagal memuat produk dari Supabase:", error.message);
      } else if (data) {
        setProducts(data);
      }
      setLoadingProducts(false);
    }
    fetchProducts();
  }, [supabase]);

  const addToCart = (product) => {
    addItemToCart(product, 1);
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <CartToast show={toast} />

      <Header scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} />
      
      <MobileMenu 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenRegister={() => setLoginModalOpen(true)}
      />

      <Hero />

      <main className="px-4 md:px-6 max-w-7xl mx-auto">
        <CategoryGrid />

        {/* Special Offers (Mengambil data dari Supabase) */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Special Offers</h2>
          {loadingProducts ? (
            <p className="text-xs text-gray-400">Memuat penawaran...</p>
          ) : (
            <ScrollRow items={products} onAddToCart={addToCart} />
          )}
        </section>

        {/* 2 Banner Besar di Atas */}
        <PromoBanners variant="top" />

        {/* Featured Products */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Featured Products</h2>
          {loadingProducts ? (
            <p className="text-xs text-gray-400">Memuat produk...</p>
          ) : (
            <ProductGrid items={products} onAddToCart={addToCart} showLoadMore={true} />
          )}
        </section>

        {/* New Arrivals */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg sm:text-xl font-bold">New Arrivals</h2>
            <Link 
              href="/new-arrivals" 
              className="text-xs sm:text-sm text-[#F2A93B] hover:text-[#e09833] font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          {loadingProducts ? (
            <p className="text-xs text-gray-400">Memuat produk terbaru...</p>
          ) : (
            <ProductGrid items={products.slice(0, 12)} onAddToCart={addToCart} showLoadMore={false} />
          )}
        </section>

        {/* 3 Banner Kecil di Bawah */}
        <PromoBanners variant="bottom" />

        {/* Section Clothing */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg sm:text-xl font-bold">Clothing</h2>
            <Link 
              href="/categories/clothing" 
              className="text-xs sm:text-sm text-[#F2A93B] hover:text-[#e09833] font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          <ScrollRow items={products.filter(p => p.category?.toLowerCase().includes('clothing') || true).slice(0, 11)} onAddToCart={addToCart} />
        </section>

        {/* Section Jewelry & Accessories */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg sm:text-xl font-bold">Jewelry & Accessories</h2>
            <Link 
              href="/products?category=jewelry" 
              className="text-xs sm:text-sm text-[#F2A93B] hover:text-[#e09833] font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          <ScrollRow items={products} onAddToCart={addToCart} />
        </section>

        {/* Shop By Brand */}
        <BrandList />

        {/* Blog Section */}
        <BlogSection />
      </main>

      <Footer />
      <CookieBanner visible={cookieVisible} onAccept={() => setCookieVisible(false)} />

      <LoginModal 
        open={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </div>
  );
}