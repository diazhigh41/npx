"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import { createClient } from '../../../utils/supabase/client';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PaymentCompletedPage() {
  const [txNumber, setTxNumber] = useState("");
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const supabase = createClient();
  const hasProcessed = useRef(false); // Pengaman agar useEffect tidak berjalan 2 kali

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    async function processCompletedOrder() {
      // 1. Ambil data user yang sedang login
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      // 2. Ambil data pesanan sementara dari localStorage
      const savedOrderData = localStorage.getItem("pendingOrder");

      if (!savedOrderData) {
        console.error("Data pesanan tidak ditemukan di localStorage.");
        return;
      }

      const parsedOrder = JSON.parse(savedOrderData);
      setTxNumber(parsedOrder.orderNumber);
      setPurchasedItems(parsedOrder.items);
      setTotalPrice(Number(parsedOrder.totalPrice) || 0);

      try {
        // 3. Format data sesuai dengan kolom yang ada di tabel 'orders' Supabase
        const orderRows = parsedOrder.items.map(item => ({
          order_number: parsedOrder.orderNumber,
          user_id: user ? user.id : null,
          product_id: String(item.product_id || item.id),
          name: item.name || item.title,
          price: Number(item.price || 0),
          quantity: item.quantity || 1,
          image: item.image || item.image_url || "",
          total_price: Number(item.price || 0) * (item.quantity || 1),
          status: "completed",
          payment_method: localStorage.getItem("selectedPaymentMethod") || "Bank Transfer"
        }));

        // Insert ke tabel 'orders'
        const { error: insertError } = await supabase
          .from('orders')
          .insert(orderRows);

        if (insertError) {
          console.error("Gagal menyimpan ke database orders:", insertError.message);
          return;
        }

        // 4. Kosongkan cart_items di database jika user login
        if (user) {
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", user.id);
        }

        // 5. Bersihkan data sementara di localStorage
        localStorage.removeItem("cartItems");
        localStorage.removeItem("pendingOrder");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("selectedPaymentMethod");

      } catch (err) {
        console.error("Terjadi kesalahan saat memproses pesanan:", err);
      }
    }

    processCompletedOrder();
  }, [supabase]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-12 text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">
            <Check size={40} strokeWidth={2.5} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Payment completed successfully!</h1>
          <p className="text-sm text-gray-500">Your order has been placed and is now being processed.</p>
        </div>

        <div className="py-2 inline-block bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl">
          <p className="text-xs text-gray-500">Order / Transaction Number</p>
          <p className="text-lg font-bold text-teal-600">#{txNumber}</p>
        </div>

        {/* Ringkasan item yang dibeli */}
        {purchasedItems.length > 0 && (
          <div className="max-w-xl mx-auto text-left bg-gray-50 border border-gray-200 p-5 rounded-xl space-y-3">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2 flex items-center gap-2">
              <ShoppingBag size={16} /> Purchased Items
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {purchasedItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-700">
                  <span>{item.name || item.title} (x{item.quantity || 1})</span>
                  <span className="font-medium">${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-900">
              <span>Total Paid</span>
              <span className="text-teal-600">${Number(totalPrice).toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a 
            href="/member/orders" 
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingBag size={16} /> View My Orders
          </a>
          <a 
            href="/" 
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Continue Shopping <ArrowRight size={16} />
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}