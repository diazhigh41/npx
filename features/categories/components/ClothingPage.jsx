import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryFilterSidebar from "@/components/CategoryFilterSidebar";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/utils/supabase/server";

export default async function ClothingPage() {
  const supabase = await createClient();

  // Ambil data langsung dari tabel products Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Gagal mengambil produk:", error.message);
  }

  const allProducts = products || [];

  // Filter khusus produk kategori pakaian (clothing)
  const clothingProducts = allProducts.filter(p => {
    const cat = (p.category || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
     
    const isExcluded = 
      name.includes('hat') || 
      name.includes('shoes') || 
      name.includes('sneakers') || 
      name.includes('boots') || 
      name.includes('necklace') || 
      name.includes('pillow') ||
      name.includes('backpack') ||
      name.includes('lamp') ||
      name.includes('plant') ||
      name.includes('script') ||
      name.includes('music') ||
      name.includes('animation') ||
      name.includes('photo pack') ||
      cat.includes('shoes') ||
      cat.includes('toys') ||
      cat.includes('graphics') ||
      cat.includes('home & living');

    if (isExcluded) return false;

    return (
      cat.includes('clothing') || 
      cat.includes('dress') || 
      cat.includes('shirt') ||
      cat.includes('shorts') ||
      name.includes('top') || 
      name.includes('blouse') || 
      name.includes('sundress') || 
      name.includes('skirt') || 
      name.includes('t-shirt') ||
      name.includes('polo') ||
      name.includes('dress')
    );
  });

  // PEMETAAN PENTING: Menyesuaikan agar properti dibaca dengan pas oleh ProductCard.jsx
  const formattedProducts = clothingProducts.map((p, index) => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60"
    ];
    const defaultImg = fallbackImages[index % fallbackImages.length];

    return {
      ...p,
      name: p.name || p.title || "Produk Pakaian",
      price: p.price ?? p.amount ?? 0, 
      old: p.old_price || p.oldPrice || null,
      image: p.image || p.image_url || p.img || defaultImg,
      image2: p.image2 || p.image_url2 || p.image || defaultImg,
      seller: p.seller || p.store_name || "Admin",
      slug: p.slug || p.id || "#",
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:underline">Home</Link> / <span className="hover:underline cursor-pointer">Products</span> / <span className="text-gray-800 font-medium">Clothing</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <CategoryFilterSidebar 
            categoryName="Clothing" 
            subCategories={["Women's Clothing", "Men's Clothing", "Kid's Clothing"]} 
          />

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
              <h1 className="text-lg font-bold text-gray-900">Clothing ({formattedProducts.length} Produk)</h1>
              <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-white outline-none cursor-pointer">
                <option>Most Recent</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
              </select>
            </div>

            {formattedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {formattedProducts.map((product) => (
                  <ProductCard key={product.id} p={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-100 text-gray-500 text-sm">
                Belum ada produk clothing di database Supabase.
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
