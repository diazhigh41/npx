'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('wishlists')
      .select('id, product_id, products(*)')
      .eq('user_id', user.id);

    if (!error && data) {
      setWishlistItems(data);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (wishlistId) => {
    const { error } = await supabase.from('wishlists').delete().eq('id', wishlistId);
    if (!error) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== wishlistId));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-4 max-w-7xl">
        {/* Breadcrumb persis Modesy */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-emerald-600">Home</Link> / 
          <span className="text-gray-800 ml-1">Wishlist</span>
        </div>

        {/* Judul Halaman Wishlist */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Wishlist</h1>

        {loading ? (
          <div className="py-20 text-center text-gray-400 text-sm">Loading...</div>
        ) : wishlistItems.length === 0 ? (
          /* Tampilan ketika kosong persis seperti "No products found!" di Modesy */
          <div className="text-center py-24">
            <p className="text-gray-500 text-sm">No products found!</p>
          </div>
        ) : (
          /* Grid Produk Wishlist */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {wishlistItems.map((item) => {
              const product = item.products;
              if (!product) return null;
              return (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3 flex flex-col bg-white relative group shadow-sm hover:shadow-md transition">
                  {/* Tombol Hapus / Hati di pojok */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-red-50 text-red-500 p-1.5 rounded-full shadow transition text-xs z-10"
                    title="Remove from wishlist"
                  >
                    ❤️
                  </button>

                  <Link href={`/${product.slug || product.id}`}>
                    <div className="bg-gray-100 rounded-md overflow-hidden h-48 mb-3 flex items-center justify-center">
                      <img
                        src={product.image_url || product.image || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <span className="text-xs text-gray-400 block mb-1">{product.category || 'Graphics & Photos'}</span>
                    <h3 className="font-medium text-sm text-gray-800 line-clamp-1 mb-2 hover:text-emerald-600">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-gray-900 text-base">${product.price}.00</span>
                    <Link
                      href={`/${product.slug || product.id}`}
                      className="bg-[#00a699] text-white text-xs px-3.5 py-2 rounded font-medium hover:bg-[#009287] transition"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
