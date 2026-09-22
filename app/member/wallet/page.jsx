"use client";
import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  PlusCircle, 
  Send, 
  X 
} from "lucide-react";
// Sesuaikan path import supabase client dengan struktur project Anda
import { createClient } from "@/utils/supabase/client"; 

export default function WalletPage() {
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState("deposits");
  const [payoutMethod, setPayoutMethod] = useState("paypal");
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("10");

  const [walletBalance, setWalletBalance] = useState(0);
  const [depositsData, setDepositsData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Fallback jika belum login (untuk testing lokal)
        setLoading(false);
        return;
      }

      // 1. Ambil Saldo Wallet
      let { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (wallet) {
        setWalletBalance(wallet.balance);
      } else {
        // Jika belum ada record wallet, buatkan default
        await supabase.from('wallets').insert([{ user_id: user.id, balance: 9.95 }]);
        setWalletBalance(9.95);
      }

      // 2. Ambil Data Deposits
      const { data: deposits } = await supabase
        .from('wallet_deposits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (deposits) setDepositsData(deposits);

      // 3. Ambil Data Expenses
      const { data: expenses } = await supabase
        .from('wallet_expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (expenses) setExpensesData(expenses);

    } catch (err) {
      console.error("Error fetching wallet data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToCheckout = () => {
    if (Number(depositAmount) < 10) {
      alert("Minimum deposit amount is $10");
      return;
    }
    localStorage.setItem("pendingDepositAmount", depositAmount);
    window.location.href = "/cart/payment-method?type=add-funds";
  };

  return (
    <div className="space-y-6 pb-12">
      <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center relative shadow-xs max-w-2xl mx-auto">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <Wallet size={28} />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-1">
          ${walletBalance.toFixed(2)}
        </h2>
        
        <button
          onClick={() => setIsAddFundsOpen(true)}
          className="absolute top-6 right-6 inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <PlusCircle size={14} />
          Add Funds
        </button>
      </div>

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
              activeTab === tab.id ? "bg-teal-600 text-white shadow-xs" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
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
                {depositsData.length > 0 ? (
                  depositsData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-4 px-4 font-medium text-gray-900">{item.id || item.payment_id}</td>
                      <td className="py-4 px-4 text-gray-600">{item.method}</td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900 font-medium">{item.amount}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div>{item.date || new Date(item.created_at).toLocaleString()}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-16 text-center text-gray-500 text-sm">No records found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "expenses" && (
          <div>
            {expensesData.length > 0 ? (
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
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {expensesData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-4 px-4 font-medium text-gray-900">{item.order_id || item.id}</td>
                        <td className="py-4 px-4 text-gray-600">{item.description}</td>
                        <td className="py-4 px-4 text-gray-900 font-medium">${item.amount}</td>
                        <td className="py-4 px-4 text-gray-600">{new Date(item.created_at || item.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-16 text-center text-gray-500 text-sm">No records found!</div>
            )}
          </div>
        )}

        {activeTab === "payouts" && (
          <div>
            <div className="flex justify-end mb-4">
              <button className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                <PlusCircle size={14} /> New Payout Request
              </button>
            </div>
            <div className="py-16 text-center text-gray-500 text-sm">No records found!</div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
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
                    payoutMethod === m.id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              {payoutMethod === "paypal" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">PayPal Email Address*</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
                </div>
              )}
              {payoutMethod === "bitcoin" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">BTC Address*</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
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

      {isAddFundsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
            <button onClick={() => setIsAddFundsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Add Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm px-3">$</span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>
              <button onClick={handleContinueToCheckout} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}