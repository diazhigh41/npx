"use client";
import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";

export default function PaymentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState("paypal");
  const [depositAmount, setDepositAmount] = useState("10");
  const [isAddFunds, setIsAddFunds] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("type") === "add-funds") {
      setIsAddFunds(true);
      const saved = localStorage.getItem("pendingDepositAmount");
      if (saved) setDepositAmount(saved);
    }
  }, []);

  const handleContinueToPayment = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    setShowError(false);
    
    // Simpan pilihan ke localStorage
    localStorage.setItem("selectedPaymentMethod", selectedMethod);
    
    // Langsung arahkan ke halaman sukses pembayaran (tempat data masuk ke database)
    window.location.href = "/cart/payment-completed";
  };

  const paymentOptions = [
    { id: "paypal", name: "PayPal", desc: "Pay securely via PayPal account or Credit Card.", logos: ["Visa", "Mastercard", "Amex", "Discover", "PayPal"] },
    { id: "stripe", name: "Stripe", desc: "Credit or debit card payment processed securely.", logos: ["Visa", "Mastercard", "Amex", "Discover", "JCB", "Diners", "Stripe"] },
    { id: "paystack", name: "Paystack", desc: "Online payments for Africa and globally.", logos: ["Visa", "Mastercard", "Verve", "Paystack"] },
    { id: "razorpay", name: "Razorpay", desc: "Accept UPI, Cards, NetBanking & Wallets.", logos: ["Visa", "Mastercard", "Amex", "Maestro", "Diners", "RuPay", "Razorpay"] },
    { id: "flutterwave", name: "Flutterwave", desc: "Seamless payments across Africa and beyond.", logos: ["Visa", "Mastercard", "Amex", "Maestro", "Flutterwave"] },
    { id: "iyzico", name: "Iyzico", desc: "Secure digital commerce platform.", logos: ["Visa", "Mastercard", "Amex", "Troy", "Iyzico"] },
    { id: "midtrans", name: "Midtrans", desc: "Indonesia's leading online payment gateway.", logos: ["Visa", "Mastercard", "Amex", "JCB", "Midtrans"] },
    { id: "paytabs", name: "PayTabs", desc: "Award-winning payment gateway solution.", logos: ["Visa", "Mastercard", "Amex", "Discover", "PayTabs"] },
    { id: "yoomoney", name: "YooMoney", desc: "Popular electronic payment service.", logos: ["Visa", "Mastercard", "Maestro", "MIR", "YooMoney"] },
    { id: "mercadopago", name: "Mercado Pago", desc: "Latin America leading payment technology.", logos: ["Visa", "Mastercard", "Amex", "Discover", "Boleto", "Mercado Pago"] },
    { id: "bank", name: "Bank Transfer", desc: "Make your payment directly into our bank account.", logos: [] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">1. Payment Method</h2>

              <div className="space-y-3">
                {paymentOptions.map((item) => {
                  const isSelected = selectedMethod === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMethod(item.id)}
                      className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isSelected
                          ? "border-teal-500 bg-white ring-1 ring-teal-500 shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-teal-600 bg-teal-600 text-white" : "border-gray-300 bg-white"
                        }`}>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 text-sm block">{item.name}</span>
                          <span className="text-xs text-gray-500">{item.desc}</span>
                        </div>
                      </div>

                      {item.logos.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                          {item.logos.map((logoName, idx) => (
                            <div 
                              key={idx} 
                              className="h-7 px-2 bg-gray-50 border border-gray-200 rounded flex items-center gap-1 text-[11px] text-gray-600 font-medium"
                            >
                              <ImageIcon size={12} className="text-gray-400" />
                              <span>{logoName}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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

            <div className="flex justify-end pt-2">
              <button
                onClick={handleContinueToPayment}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm shadow-sm flex items-center gap-2"
              >
                Continue to Payment <span>&rsaquo;</span>
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
                <div className="font-semibold text-gray-900">Add Funds</div>
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Deposit Amount:</span>
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