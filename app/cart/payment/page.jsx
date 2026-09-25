"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    // Ambil data dari tabel cart_items Supabase
    const { data, error } = await supabase.from("cart_items").select("*");
    
    if (error) {
      console.error("Gagal memuat keranjang:", error.message);
      // Fallback ke localStorage jika gagal
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(localCart);
    } else {
      setCartItems(data || []);
      // Sinkronkan balik ke localStorage
      localStorage.setItem("cartItems", JSON.stringify(data || []));
    }
    setLoading(false);
  };

  const handleRemoveItem = async (id) => {
    // Hapus dari Supabase
    const { error } = await supabase.from("cart_items").delete().eq("id", id);
    
    if (!error) {
      // Refresh ulang data cart
      fetchCartItems();
    } else {
      alert("Gagal menghapus produk: " + error.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  // Fungsi saat tombol Proceed to Checkout diklik
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    // 1. Siapkan data pesanan sementara untuk dibawa ke halaman berikutnya
    const checkoutData = {
      items: cartItems,
      totalPrice: calculateTotal(),
      orderNumber: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    // 2. Simpan ke localStorage agar tidak hilang saat pindah halaman (belum dimasukkan ke DB orders)
    localStorage.setItem("pendingOrder", JSON.stringify(checkoutData));

    // 3. Lanjut ke halaman shipping / payment
    window.location.href = "/cart/shipping";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>

        {loading ? (
          <p className="text-gray-500">Memuat keranjang...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-gray-500">Your cart is empty!</p>
            <a href="/" className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
              Shop Now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border border-gray-200 p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />}
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name || item.title}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price} x {item.quantity || 1}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b pb-3">Cart Summary</h2>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-teal-600">${calculateTotal()}</span>
              </div>
              <button 
                onClick={handleProceedToCheckout}
                className="block text-center w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}