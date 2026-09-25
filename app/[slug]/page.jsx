'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (slug) {
      fetchProductFromSupabase();
    }
  }, [slug]);

  const fetchProductFromSupabase = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      console.error('Error fetching from Supabase:', error.message);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      // Pencocokan slug yang akurat dengan database
      const found = data.find(
        (item) =>
          item.slug === slug ||
          (item.name && item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) ||
          item.id.toString() === slug
      );

      if (found) {
        setProduct(found);

        let imgs = [];
        if (found.images && Array.isArray(found.images) && found.images.length > 0) {
          imgs = found.images;
        } else if (found.image_url) {
          imgs = [found.image_url];
        } else if (found.image) {
          imgs = [found.image];
        } else {
          imgs = ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600'];
        }

        setProductImages(imgs);
        setActiveImage(imgs[0]);
      }
    }

    setLoading(false);
  };

  // Fungsi Wishlist yang terhubung langsung ke Supabase
  const handleAddToWishlist = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Silakan login terlebih dahulu untuk menambahkan produk ke wishlist!');
      return;
    }

    const { error } = await supabase.from('wishlists').insert([
      { user_id: user.id, product_id: product.id }
    ]);

    if (error) {
      if (error.code === '23505') {
        alert('Produk ini sudah ada di wishlist kamu!');
      } else {
        alert('Gagal menambahkan ke wishlist: ' + error.message);
      }
    } else {
      alert('Berhasil ditambahkan ke wishlist!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-sm animate-pulse">Memuat produk dari database...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-500 text-sm mb-6">Produk dengan slug &quot;{slug}&quot; tidak ada di database Supabase.</p>
          <Link href="/" className="bg-[#00a699] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#009287] transition">
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-emerald-600">Home</Link> / 
          <span className="hover:text-emerald-600 cursor-pointer">Graphics & Photos</span> / 
          <span className="hover:text-emerald-600 cursor-pointer">Graphics</span> / 
          <span className="hover:text-emerald-600 cursor-pointer">Vectors</span> / 
          <span className="text-gray-800 ml-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Kolom Kiri: Thumbnail Vertikal MENYATU di Samping Kiri Foto Utama */}
          <div className="lg:col-span-7 flex gap-3 items-start">
            
            {/* List Thumbnail Vertikal */}
            <div className="flex flex-col gap-2 w-20 flex-shrink-0">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded border overflow-hidden bg-gray-50 transition ${
                    activeImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Kotak Foto Utama */}
            <div className="flex-grow relative bg-[#f8f9fa] border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-[480px]">
              <button 
                onClick={() => {
                  const idx = productImages.indexOf(activeImage);
                  setActiveImage(productImages[(idx - 1 + productImages.length) % productImages.length]);
                }}
                className="absolute left-3 bg-white/90 hover:bg-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-10 transition"
              >
                ‹
              </button>
              <img src={activeImage} alt={product.name} className="max-h-[460px] max-w-full object-contain p-2" />
              <button 
                onClick={() => {
                  const idx = productImages.indexOf(activeImage);
                  setActiveImage(productImages[(idx + 1) % productImages.length]);
                }}
                className="absolute right-3 bg-white/90 hover:bg-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-10 transition"
              >
                ›
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Detail Produk & Tombol Aksi */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 text-xs px-2.5 py-1 rounded font-medium">
                📥 Instant download
              </span>
              <div className="flex items-center gap-2">
                <button className="bg-[#25D366] hover:bg-[#22bf5b] text-white text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1 transition">
                  🟢 WhatsApp
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded transition">
                  💬 Ask Question
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center text-xs text-gray-500 gap-3 mb-4 pb-3 border-b border-gray-100">
              <span>Seller: <strong className="text-emerald-600 font-medium">{product.seller || 'Trendshop'}</strong></span>
              <span>|</span>
              <div className="flex items-center text-amber-400">
                ★★★★★ <span className="text-gray-500 ml-1">Reviews (1)</span>
              </div>
              <span>|</span>
              <span className="flex items-center gap-1">💬 0</span>
              <span className="flex items-center gap-1">🤍 0</span>
              <span className="flex items-center gap-1">👁️ 154</span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-gray-900">${product.price || 0}.00</span>
              {product.old_price && (
                <span className="text-lg text-gray-400 line-through">${product.old_price}.00</span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>

            <div className="text-xs space-y-2 mb-6 text-gray-600">
              <div className="flex">
                <span className="w-28 text-gray-400">SKU</span>
                <span className="font-medium text-gray-800">{product.sku || 'A1C2D3P4R5N6'}</span>
              </div>
              <div className="flex">
                <span className="w-28 text-gray-400">Files Included</span>
                <span className="font-medium text-gray-800">{product.files_included || 'JPG, PNG'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <button className="flex-grow bg-[#00a699] hover:bg-[#009287] text-white font-medium py-3 px-6 rounded transition flex items-center justify-center gap-2 text-sm shadow-sm">
                🛒 Add to Cart
              </button>
              {/* Tombol Add to Wishlist yang sudah tersambung */}
              <button 
                onClick={handleAddToWishlist}
                className="border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded flex items-center justify-center text-gray-600 text-sm gap-2 transition"
              >
                🤍 Add to wishlist
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
              <span>Share:</span>
              <button className="hover:text-emerald-600 font-bold px-1">f</button>
              <button className="hover:text-emerald-600 font-bold px-1">𝕏</button>
              <button className="hover:text-emerald-600 font-bold px-1">Ᵽ</button>
              <button className="hover:text-emerald-600 font-bold px-1">in</button>
            </div>
          </div>
        </div>

        {/* Tab Description */}
        <div className="border border-gray-200 rounded-lg p-6 mb-12">
          <div className="flex border-b border-gray-200 gap-8 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-medium text-sm border-b-2 -mb-[1px] ${
                activeTab === 'description' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-medium text-sm border-b-2 -mb-[1px] ${
                activeTab === 'reviews' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'
              }`}
            >
              Reviews (1)
            </button>
          </div>

          <div>
            {activeTab === 'description' && (
              <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                <p>{product.description || 'No description available for this product.'}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <p className="text-gray-500 text-sm">No reviews for this product yet.</p>
            )}
          </div>
        </div>
      </div>  

      <Footer />
    </div>
  );
}