"use client";
import { useState } from "react";
import Link from "next/link";
import { Filter, Download, Info } from "lucide-react";

export default function VendorSalesPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const salesData = [
    { sale: "#10026", total: "$11.00", paymentStatus: "Pending Payment", status: "Processing", date: "2026-09-17 / 18:28" },
    { sale: "#10022", total: "$218.90", paymentStatus: "Pending Payment", status: "Processing", date: "2026-09-14 / 16:08" },
    { sale: "#10020", total: "$194.70", paymentStatus: "Pending Payment", status: "Processing", date: "2026-09-11 / 09:26" },
    { sale: "#10019", total: "$174.40", paymentStatus: "Payment Received", status: "Processing", date: "2026-09-09 / 11:39" },
    { sale: "#10018", total: "$143.00", paymentStatus: "Payment Received", status: "Processing", date: "2026-09-09 / 05:59" },
    { sale: "#10014", total: "$822.90", paymentStatus: "Pending Payment", status: "Processing", date: "2026-09-04 / 08:31" },
    { sale: "#10013", total: "$69.90", paymentStatus: "Pending Payment", status: "Processing", date: "2026-09-03 / 13:21" },
    { sale: "#10012", total: "$91.90", paymentStatus: "Pending Payment", status: "Processing", date: "2026-09-01 / 03:31" },
    { sale: "#10010", total: "$156.80", paymentStatus: "Payment Received", status: "Processing", date: "2026-08-31 / 17:37" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Sales</h2>

        {/* Bagian Filter dan Pencarian di Atas Tabel */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="All">All</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Payment Received">Payment Received</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Search</label>
              <input 
                type="text" 
                placeholder="Sale Id" 
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
            <div className="self-end">
              <button className="bg-[#5C53B2] hover:bg-[#4d4499] text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          <div className="self-end">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
              <Download size={14} /> Export <span className="text-xs">▼</span>
            </button>
          </div>
        </div>

        {/* Tabel Data Penjualan */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-xs bg-gray-50">
                <th className="p-3">Sale</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {salesData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-900">{item.sale}</td>
                  <td className="p-3 font-medium">{item.total}</td>
                  <td className="p-3 text-gray-600">{item.paymentStatus}</td>
                  <td className="p-3">
                    <span className="bg-[#10B981] text-white text-xs px-2.5 py-1 rounded font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500">{item.date}</td>
                  <td className="p-3 text-center">
                    <Link 
                      href={`/vendor/dashboard/sales/${item.sale.replace('#', '')}`}
                      className="bg-[#14B8A6] hover:bg-[#119083] text-white px-3 py-1 rounded text-xs font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <Info size={12} /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}