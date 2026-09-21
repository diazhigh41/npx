"use client";
import React, { useState } from "react";
import { 
  Wallet, 
  PlusCircle, 
  Send, 
  X 
} from "lucide-react";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("deposits"); // deposits, expenses, payouts, settings
  const [payoutMethod, setPayoutMethod] = useState("paypal"); // paypal, bitcoin, iban, swift
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("10");

  // Contoh data deposits
  const depositsData = [
    { id: "BTR-HM95ZHFS7S-369RASZE", method: "Bank Transfer", amount: "$10 (USD) - Pending Payment", date: "2026-09-13 / 14:19" },
    { id: "BTR-HM0LWO7M4I-AG10P9OR", method: "Bank Transfer", amount: "$10 (USD) - Pending Payment", date: "2026-09-05 / 20:02" },
    { id: "BTR-HLWS2ZQSXN-5CTYLLNC", method: "Bank Transfer", amount: "$25 (USD) - Pending Payment", date: "2026-09-02 / 08:42" },
    { id: "BTR-HLVTZUEYA6-8ACIIO9U", method: "Bank Transfer", amount: "$100 (USD) - Pending Payment", date: "2026-09-01 / 12:05" },
  ];

  const handleContinueToCheckout = () => {
    if (Number(depositAmount) < 10) {
      alert("Minimum deposit amount is $10");
      return;
    }
    // Simpan nominal ke localStorage agar bisa dibaca halaman checkout
    localStorage.setItem("pendingDepositAmount", depositAmount);
    
    // Alihkan langsung ke halaman payment method dengan parameter add-funds
    window.location.href = "/cart/payment-method?type=add-funds";
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Judul Halaman */}
      <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>

      {/* Kotak Saldo Utama */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center relative shadow-xs max-w-2xl mx-auto">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <Wallet size={28} />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-1">$9.95</h2>
        
        <button
          onClick={() => setIsAddFundsOpen(true)}
          className="absolute top-6 right-6 inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <PlusCircle size={14} />
          Add Funds
        </button>
      </div>

      {/* Navigasi Tab */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-gray-100 pb-4">
        {[
          { id: "deposits", label: "Deposits" },
          { id: "expenses", label: "Expenses" },
          { id: "payouts", label: "Payouts" },
          { id: "settings", label: "Set Payout Account" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-teal-600 text-white shadow-xs"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Konten Berdasarkan Tab */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
        
        {/* 1. TAB DEPOSITS */}
        {activeTab === "deposits" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                  <th className="py-3 px-4">Payment Id</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Deposit Amount</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {depositsData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-4 px-4 font-medium text-gray-900">{item.id}</td>
                    <td className="py-4 px-4 text-gray-600">{item.method}</td>
                    <td className="py-4 px-4">
                      <div className="text-gray-900 font-medium">{item.amount}</div>
                      <button className="mt-1.5 inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                        <Send size={12} />
                        Report Bank Transfer
                      </button>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      <div>{item.date}</div>
                      <a href="#" className="text-teal-600 hover:underline text-xs mt-1 inline-block">
                        View Invoice
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. TAB EXPENSES */}
        {activeTab === "expenses" && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                    <th className="py-3 px-4">Payment Id</th>
                    <th className="py-3 px-4">Expense</th>
                    <th className="py-3 px-4">Expense Amount</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="py-16 text-center text-gray-500 text-sm">
              No records found!
            </div>
          </div>
        )}

        {/* 3. TAB PAYOUTS */}
        {activeTab === "payouts" && (
          <div>
            <div className="flex justify-end mb-4">
              <button className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                <PlusCircle size={14} />
                New Payout Request
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                    <th className="py-3 px-4">Withdrawal Method</th>
                    <th className="py-3 px-4">Withdrawal Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="py-16 text-center text-gray-500 text-sm">
              No records found!
            </div>
          </div>
        )}

        {/* 4. TAB SET PAYOUT ACCOUNT */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Sub-tab Payout Method */}
            <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4">
              {[
                { id: "paypal", label: "PayPal" },
                { id: "bitcoin", label: "Bitcoin (BTC)" },
                { id: "iban", label: "IBAN" },
                { id: "swift", label: "SWIFT" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayoutMethod(m.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    payoutMethod === m.id
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Form Payout Account */}
            <div className="space-y-4 pt-2">
              {payoutMethod === "paypal" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    PayPal Email Address*
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              )}

              {payoutMethod === "bitcoin" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    BTC Address*
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              )}

              {payoutMethod === "iban" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Country*</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden bg-white">
                      <option>Select Country</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Bank Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">International Bank Account Number (IBAN)*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                </div>
              )}

              {payoutMethod === "swift" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Country*</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden bg-white"><option>Select Country</option></select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">State*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">City*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Postcode*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Address*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Bank Account Holder's Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Bank Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Bank Branch Country*</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden bg-white"><option>Select Country</option></select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Bank Branch City*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Bank Account Number/IBAN*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">SWIFT Code*</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-600 outline-hidden" />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal Add Funds */}
      {isAddFundsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
            <button 
              onClick={() => setIsAddFundsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Add Funds</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm px-3">
                    $
                  </span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Minimum Deposit Amount: <span className="font-semibold text-gray-700">$10</span></p>
              </div>

              <button
                onClick={handleContinueToCheckout}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}