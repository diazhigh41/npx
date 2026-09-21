"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";

export default function PaymentMethodPage() {
  const router = useRouter();
  const [depositAmount, setDepositAmount] = useState("10");
  const [isAddFunds, setIsAddFunds] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Midtrans Snap script secara dinamis jika belum ada
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"; 
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    
    let script = document.querySelector(`script[src="${snapScript}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = snapScript;
      if (clientKey) script.setAttribute("data-client-key", clientKey);
      script.async = true;
      document.body.appendChild(script);
    }

    // Cek parameter type & ambil nominal jika add-funds
    const params = new URLSearchParams(window.location.search);
    if (params.get("type") === "add-funds") {
      setIsAddFunds(true);
      const saved = localStorage.getItem("pendingDepositAmount");
      if (saved) setDepositAmount(saved);
    }
  }, []);

  const handlePayWithMidtrans = async () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setLoading(true);

    try {
      // Fetch ke backend API Next.js untuk mendapatkan Snap Token Midtrans
      const response = await fetch("/api/midtrans/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: isAddFunds ? "add-funds" : "cart", 
          amount: parseFloat(depositAmount) 
        })
      });
      
      // Amankan dari SyntaxError: Cek apakah status HTTP OK (200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Backend Response:", errorText);
        alert(`Gagal memproses transaksi (${response.status}). Pastikan API Route '/api/midtrans/create-transaction' sudah ada.`);
        return;
      }

      const data = await response.json();

      if (data.token) {
        if (window.snap) {
          // Panggil Midtrans Snap Popup (QRIS, VA, E-Wallet, dll)
          window.snap.pay(data.token, {
            onSuccess: function (result) {
              console.log("Success:", result);
              localStorage.setItem("selectedPaymentMethod", "midtrans");
              window.location.href = "/cart/payment-completed";
            },
            onPending: function (result) {
              console.log("Pending:", result);
              alert("Menunggu pembayaran Anda.");
            },
            onError: function (result) {
              console.log("Error:", result);
              alert("Pembayaran gagal!");
            },
            onClose: function () {
              alert("Popup pembayaran ditutup.");
            }
          });
        } else {
          alert("SDK Midtrans belum selesai dimuat. Silakan coba lagi sebentar.");
        }
      } else {
        alert(data.error || "Gagal mendapatkan token transaksi dari Midtrans.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Terjadi kesalahan koneksi atau server tidak merespons.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">1. Payment Method</h2>

              {/* Midtrans Selected Box */}
              <div className="border border-teal-500 bg-teal-50/20 rounded-xl p-5 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Midtrans Payment Gateway</h3>
                    <p className="text-xs text-gray-500">QRIS, GoPay, Transfer Bank (BCA, Mandiri, BNI), Indomaret, dll.</p>
                  </div>
                </div>
                <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-3 py-1 rounded-full">Secure</span>
              </div>
            </div>

            <div className="pt-2 space-y-1.5">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) setShowError(false);
                  }}
                  className={`mt-1 w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500 cursor-pointer ${
                    showError ? "border-red-500" : ""
                  }`}
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  I have read and agree to the <a href="#" className="text-teal-600 font-medium underline">Terms & Conditions</a>
                </label>
              </div>

              {showError && (
                <p className="text-xs text-red-500 pl-7 font-normal">
                  You have to accept the terms!
                </p>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => router.back()}
                className="px-6 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm cursor-pointer"
              >
                &lsaquo; Back
              </button>

              <button
                onClick={handlePayWithMidtrans}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Bayar Sekarang dengan Midtrans"} <span>&rsaquo;</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-bold text-gray-400">2. Payment</h2>
            </div>
          </div>

          <div className="space-y-6 sticky top-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b pb-3">Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="font-semibold text-gray-900">{isAddFunds ? "Add Funds" : "Order Summary"}</div>
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>{isAddFunds ? "Deposit Amount:" : "Subtotal:"}</span>
                  <span className="font-semibold text-gray-900">${depositAmount}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-100 flex justify-between text-gray-800 font-medium text-sm">
                  <span>Subtotal</span>
                  <span>${depositAmount}</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-gray-900">${depositAmount}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}