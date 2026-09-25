"use client";
import Link from "next/link";
import { ShoppingCart, DollarSign, Package, Clock, Star, Minus, X } from "lucide-react";

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-500 mt-1">Number of total sales</p>
          </div>
          <div className="text-gray-400">
            <ShoppingCart size={32} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">$1,038.48</p>
            <p className="text-sm text-gray-500 mt-1">Balance</p>
          </div>
          <div className="text-gray-400">
            <DollarSign size={32} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-500 mt-1">Products</p>
          </div>
          <div className="text-gray-400">
            <Package size={32} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-1">Pending Products</p>
          </div>
          <div className="text-gray-400">
            <Clock size={32} strokeWidth={1.5} />
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales Donut Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Sales</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <Minus size={16} className="cursor-pointer hover:text-gray-600" />
              <X size={16} className="cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-center gap-6 text-xs text-gray-600 mb-6">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#14B8A6] inline-block"></span> Active Sales (9)</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#5B85F5] inline-block"></span> Completed Sales (9)</span>
            </div>
            <div className="flex justify-center items-center py-6">
              <div className="w-56 h-56 rounded-full border-[32px] border-[#14B8A6] border-l-[#5B85F5] border-b-[#5B85F5] relative"></div>
            </div>
          </div>
        </div>

        {/* Monthly Sales Line Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Monthly sales</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <Minus size={16} className="cursor-pointer hover:text-gray-600" />
              <X size={16} className="cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span className="border border-[#14B8A6] bg-[#E6F4F1] text-[#14B8A6] px-2 py-0.5 rounded">Sales (2026)</span>
            </div>
            {/* Simulasi Grafik Garis Sesuai Referensi */}
            <div className="h-64 border-b border-l border-gray-200 relative flex items-end justify-between px-2 pb-2">
              <div className="absolute left-2 top-0 text-[10px] text-gray-400">$50000</div>
              <div className="absolute left-2 top-1/4 text-[10px] text-gray-400">$35000</div>
              <div className="absolute left-2 top-2/4 text-[10px] text-gray-400">$20000</div>
              <div className="absolute left-2 top-3/4 text-[10px] text-gray-400">$5000</div>
              
              {/* Titik Lonjakan September */}
              <div className="absolute right-[22%] top-12 bg-[#E6F4F1] border border-[#14B8A6] text-[#14B8A6] text-xs px-2 py-1 rounded shadow-sm font-semibold">
                Sep ($45k)
              </div>

              <div className="w-full flex justify-between text-xs text-gray-400 pt-4">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                <span className="text-[#14B8A6] font-bold">Sep</span>
                <span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Tables Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Latest Comments */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Latest Comments</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <Minus size={16} className="cursor-pointer" />
              <X size={16} className="cursor-pointer" />
            </div>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs">
                  <th className="pb-3 font-semibold">Id</th>
                  <th className="pb-3 font-semibold">Comment</th>
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">good</td>
                  <td className="py-4 text-gray-600">Women lace blouse with different colors</td>
                  <td className="py-4 text-xs text-gray-400">2026-09-13 / 14:16</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Reviews */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Latest Reviews</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <Minus size={16} className="cursor-pointer" />
              <X size={16} className="cursor-pointer" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-end mb-2">
              <Link href="/vendor/dashboard/reviews" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded transition-colors">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs">
                    <th className="pb-3 font-semibold">Id</th>
                    <th className="pb-3 font-semibold">Comment</th>
                    <th className="pb-3 font-semibold">Product</th>
                    <th className="pb-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  <tr>
                    <td className="py-4">4</td>
                    <td className="py-4">
                      <div className="flex text-amber-400 mb-1"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                      <span className="text-xs text-gray-600">Test 1</span>
                    </td>
                    <td className="py-4 text-xs text-gray-600">Animal colorful digital prints</td>
                    <td className="py-4 text-xs text-gray-400">2026-09-03 / 22:40</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
