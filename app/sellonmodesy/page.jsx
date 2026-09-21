"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SellOnModesyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header scrolled={false} onOpenMenu={() => {}} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1 w-full">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#14B8A6]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">Sell on Modesy</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sell on Modesy</h1>

        <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
          <p>
            At Modesy, we make it easy and hassle-free for you to sell your products to
            customers all over the world. Whether you are a professional seller or just
            looking to make some extra cash, Modesy provides you with the perfect platform
            to showcase your products and reach a wider audience.
          </p>
          <p>
            Our platform is designed to provide you with the tools and support you need to
            create a successful online business. With a user-friendly interface and
            powerful features, you can easily list your products, manage your inventory,
            and process orders.
          </p>
          <p>
            At Modesy, we understand that selling online can be a daunting task. That's why
            we offer a range of resources to help you succeed. From seller guides and
            tutorials to customer support and seller forums, we are committed to helping
            you grow your business and achieve your goals.
          </p>
          <p>
            With Modesy, you can sell a wide range of products, including fashion, beauty,
            home and garden, electronics, and more. Our platform is designed to provide you
            with maximum exposure and reach, so you can connect with customers from all
            over the world.
          </p>
          <p>
            Join the Modesy community today and start selling your products to a global
            audience. With our powerful platform and dedicated support team, the sky is the
            limit for your online business.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}