"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Tag, 
  Download, 
  RefreshCcw, 
  Clock, 
  Info, 
  Star, 
  PlusCircle, 
  X,
  ChevronDown
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useCurrency } from "@/app/context/CurrencyContext";

export default function MemberDashboardPage() {
  const [activeMenu, setActiveMenu] = useState("orders"); 
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false); 
  const [downloadSubMenu, setDownloadSubMenu] = useState(false);
  
  const [ordersList, setOrdersList] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [refundReason, setRefundReason] = useState("");

  const { formatPrice } = useCurrency();
  const supabase = createClient();

  useEffect(() => {
    if (activeMenu === "orders") {
      fetchOrders();
    }
  }, [activeMenu]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil orders:", error.message);
      } else if (data) {
        setOrdersList(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="text-xs text-gray-500 capitalize">
        <Link href="/" className="hover:underline">Home</Link> / <span className="text-gray-900 font-medium">
          {activeMenu === "orders" && "Orders"}
          {activeMenu === "quotes" && "Quote Requests"}
          {activeMenu === "downloads" && "Downloads"}
          {activeMenu === "refunds" && "Refund Requests"}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 capitalize">
        {activeMenu === "orders" && "Orders"}
        {activeMenu === "quotes" && "Quote Requests"}
        {activeMenu === "downloads" && "Downloads"}
        {activeMenu === "refunds" && "Refund Requests"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1 space-y-1">
          {[
            { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
            { id: "quotes", label: "Quote Requests", icon: <Tag size={18} /> },
            { id: "downloads", label: "Downloads", icon: <Download size={18} /> },
            { id: "refunds", label: "Refund Requests", icon: <RefreshCcw size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeMenu === item.id
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {activeMenu === "orders" && (
            <div className="space-y-3">
              {isLoadingOrders ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm">
                  Loading orders from database...
                </div>
              ) : ordersList.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 text-sm">
                  No orders found in database!
                </div>
              ) : (
                ordersList.map((order) => {
                  const formattedDate = order.created_at 
                    ? new Date(order.created_at).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short"
                      })
                    : "-";
                  
                  const statusColor = order.status === "Completed" || order.status === "Processing"
                    ? "bg-teal-50 text-teal-600" 
                    : "bg-gray-100 text-gray-600";
                  
                  const isTopUp = order.order_type === "add_funds" || order.order_type === "topup";

                  return (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                      <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                        <span className="font-bold text-gray-900 text-sm">
                          {isTopUp ? "Add Funds: " : "Order: "} 
                          <span className="text-teal-600">{order.order_number}</span>
                        </span>
                        <span className="text-sm font-medium text-gray-700">Total: <span className="font-bold text-gray-900">{formatPrice(order.total_price)}</span></span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-md ${statusColor}`}>{order.status || "Pending"}</span>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock size={14} />
                          <span>{formattedDate}</span>
                        </div>
                        <button className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer">
                          <Info size={14} /> Details
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeMenu === "quotes" && (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 text-sm">
              No records found!
            </div>
          )}

          {activeMenu === "downloads" && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img 
                    src="https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4f94de21-55399162.webp" 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Animal colorful digital prints</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Trendshop</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Rate this product:</p>
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setDownloadSubMenu(!downloadSubMenu)}
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Download <ChevronDown size={14} />
                  </button>

                  {downloadSubMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 text-xs">
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Main File(s)</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">License Certificate</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "refunds" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsRefundModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <PlusCircle size={14} /> Submit a Refund Request
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src="https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/img_w960_68b47e4f94de21-55399162.webp" 
                      alt="Product" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-xs">Order: <span className="text-teal-600">#10007</span></span>
                    <h3 className="font-semibold text-gray-900 text-sm mt-0.5">Animal colorful digital prints</h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-gray-100 text-gray-600">Processing</span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={14} />
                    <span>6 days ago</span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer">
                    <Info size={14} /> Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isRefundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl">
            <button 
              onClick={() => setIsRefundModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-6">Submit a Refund Request</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select 
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
                >
                  <option value="">Select</option>
                  <option value="10007">2026-08-05 / 13:50</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want a refund? Explain in detail.
                </label>
                <textarea 
                  rows={5}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white resize-y"
                  placeholder="Tuliskan alasan pengembalian di sini..."
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    alert(`Refund submitted!\nProduct: ${selectedProduct}\nReason: ${refundReason}`);
                    setIsRefundModalOpen(false);
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}