"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "../../utils/supabase/client";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      
      // Menggunakan getUser() agar langsung mengambil data user yang valid dari server/auth
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !currentUser) {
        console.log("User belum login atau session habis.");
        setUser(null);
        
        // Fallback ke localStorage jika belum login
        const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const formatted = localCart.map((item, index) => ({
          id: index,
          product_id: item.id || "1",
          name: item.name || item.title || "Product",
          price: item.price ?? item.amount ?? 0,
          quantity: item.qty || 1,
          image: item.image || item.image_url || "/images/placeholder.jpg"
        }));
        setItems(formatted);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      console.log("User aktif ditemukan:", currentUser.id);

      // Ambil data dari tabel cart_items berdasarkan user_id akun yang sedang login
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", currentUser.id);

      if (error) {
        console.error("Gagal mengambil cart dari Supabase:", error.message);
      } else {
        console.log("Data cart berhasil dimuat:", data);
        setItems(data || []);
      }

      setLoading(false);
    }

    fetchCart();
  }, []);

  // Fungsi Update Quantity
  const handleUpdateQty = async (id, newQty) => {
    if (newQty < 1) return;

    if (user) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQty })
        .eq("id", id);

      if (!error) {
        setItems(items.map(item => item.id === id ? { ...item, quantity: newQty } : item));
      } else {
        console.error("Gagal update quantity:", error.message);
      }
    } else {
      const updated = items.map(item => item.id === id ? { ...item, quantity: newQty } : item);
      setItems(updated);
    }
  };

  // Fungsi Hapus Item Satuan
  const handleRemoveItem = async (id) => {
    if (user) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", id);

      if (!error) {
        setItems(items.filter(item => item.id !== id));
      } else {
        console.error("Gagal menghapus item:", error.message);
      }
    } else {
      const updated = items.filter(item => item.id !== id);
      setItems(updated);
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
  };

  // Hitung Total Harga
  const totalPrice = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  // Fungsi Checkout
  const handleProceedToCheckout = () => {
    if (!user) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    if (items.length === 0) {
      alert("Keranjang kamu kosong!");
      return;
    }

    const checkoutData = {
      items: items,
      totalPrice: totalPrice,
      orderNumber: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase()
    };

    localStorage.setItem("pendingOrder", JSON.stringify(checkoutData));
    window.location.href = "/cart/shipping";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat keranjang...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header scrolled={false} onOpenMenu={() => {}} />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 flex-1 w-full">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty!</p>
            <Link
              href="/"
              className="bg-[#14B8A6] hover:bg-[#119083] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Daftar item */}
            <div className="md:col-span-2 divide-y divide-gray-100 border border-gray-100 rounded-xl">
              {items.map((item) => {
                const itemImage = item.image || "/images/placeholder.jpg";

                return (
                  <div key={item.id} className="flex items-center gap-4 p-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <img 
                        src={itemImage} 
                        alt={item.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">Admin</p>
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-lg flex-shrink-0">
                      <button onClick={() => handleUpdateQty(item.id, (item.quantity || 1) - 1)} className="p-2 text-gray-500 hover:text-gray-900 cursor-pointer">
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity || 1}</span>
                      <button onClick={() => handleUpdateQty(item.id, (item.quantity || 1) + 1)} className="p-2 text-gray-500 hover:text-gray-900 cursor-pointer">
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-gray-900 w-20 text-right flex-shrink-0">
                      ${(item.price || 0) * (item.quantity || 1)}
                    </span>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-[#E0483C] flex-shrink-0 cursor-pointer"
                    >
                      <Trash2 size= {16} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Ringkasan */}
            <div className="border border-gray-100 rounded-xl p-5 h-fit shadow-xs">
              <h2 className="font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-bold mb-5 text-gray-900">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
              
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-[#171717] hover:bg-black text-white text-sm font-semibold py-3 rounded-lg transition-colors cursor-pointer shadow-sm"
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