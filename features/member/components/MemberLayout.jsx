"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MemberLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header Utama */}
      <Header />

      {/* 2. Konten Utama (Profil / Halaman Member) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-grow">
        <div className="bg-white">
          {children}
        </div>
      </div>

      {/* 3. Footer Utama */}
      <Footer />
    </div>
  );
}
