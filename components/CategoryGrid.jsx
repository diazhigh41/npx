import { SHOP_BY_CATEGORY, PLACEHOLDER_IMG, slugify } from "@/data/products";
import Link from "next/link";

export default function CategoryGrid() {
  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Shop By Category</h3>
        <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-black">
          View All
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 snap-x scrollbar-hide sm:grid sm:grid-cols-6 sm:mx-0 sm:px-0">
        {SHOP_BY_CATEGORY.map((c) => (
          <Link
            key={c.name} // Diubah dari key={c} menjadi key={c.name} karena c sekarang berupa object
            href={`/categories/${slugify(c.name)}`}
            className="snap-start flex-shrink-0 w-[110px] sm:w-auto text-center group cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden bg-gray-50 mb-2 ring-1 ring-gray-100 group-hover:ring-[#F2A93B] transition-all">
              <img
                src={c.image || PLACEHOLDER_IMG} // Membaca gambar unik dari Supabase sesuai objek c
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
