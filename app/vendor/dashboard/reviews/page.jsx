"use client";
import { Star } from "lucide-react";

export default function VendorReviewsPage() {
  const reviewsData = [
    { id: 4, user: "Peter Jone", rating: 5, review: "Test 1", product: "Animal colorful digital prints", date: "2026-09-03 / 22:40" },
    { id: 7, user: "Admin", rating: 5, review: "The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and feminine look...", product: "Summer fashion top lace", date: "2026-08-05 / 14:04" },
    { id: 2, user: "Admin", rating: 5, review: "The visuals are vibrant, and it really captures the essence of each vacation spot...", product: "Animation of popular vacation spots", date: "2026-08-04 / 15:02" },
    { id: 1, user: "Admin", rating: 5, review: "The light blue color is soft and flattering, and the fabric feels high-quality and breathable...", product: "Light blue women shirt", date: "2026-08-04 / 15:01" },
    { id: 3, user: "Admin", rating: 5, review: "This skirt is beautiful and the floral pattern is very charming...", product: "Black midi skirt with white flowers", date: "2026-08-04 / 15:01" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Reviews</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-xs bg-gray-50">
                <th className="p-3">Id</th>
                <th className="p-3">User</th>
                <th className="p-3">Review</th>
                <th className="p-3">Product</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {reviewsData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{item.id}</td>
                  <td className="p-3 text-gray-800">{item.user}</td>
                  <td className="p-3 max-w-xs">
                    <div className="flex text-amber-400 mb-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{item.review}</p>
                  </td>
                  <td className="p-3 text-xs font-medium text-blue-600">{item.product}</td>
                  <td className="p-3 text-xs text-gray-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}