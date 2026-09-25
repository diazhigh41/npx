"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { PLACEHOLDER_IMG } from "@/data/products";
import LoginModal from "@/components/LoginModal";
import { createClient } from "@/utils/supabase/client";

export default function ProductCard({ p = {}, onAddToCart, isFeatured = false, isScrollRow = false }) {
  const [wished, setWished] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function checkUserAndWishlist() {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser && p?.id) {
        const { data } = await supabase
          .from("wishlists")
          .select("id")
          .eq("user_id", currentUser.id)
          .eq("product_id", p.id)
          .maybeSingle();

        if (data) {
          setWished(true);
        }
      }
    }

    checkUserAndWishlist();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [p?.id]);

  // Helper untuk memastikan nama file dari Supabase dikonversi ke Full URL Public
  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return PLACEHOLDER_IMG;
    if (imgSrc.startsWith("http://") || imgSrc.startsWith("https://") || imgSrc.startsWith("data:")) {
      return imgSrc;
    }
    const cleanPath = imgSrc.replace(/^\/+/, "");
    return `https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/${cleanPath}`;
  };

  const mainImage = formatImageUrl(p.image || p.image_url);
  const hoverImage = formatImageUrl(p.image2 || p.image || p.image_url);
  const productName = p.name || p.title || "Product";
  
  const generatedSlug = p.slug || p.id || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "");
  const productRoute = `/${generatedSlug}`;

  const handleAddToCartClick = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, p];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    const { error } = await supabase
      .from("cart_items")
      .insert([
        {
          user_id: user.id,
          product_id: p.id ? p.id.toString() : "1",
          name: productName,
          price: p.price ?? p.amount ?? 0,
          quantity: 1,
          image: mainImage
        }
      ]);

    if (error) {
      console.error("Gagal menyimpan ke database Supabase:", error.message);
    } else {
      console.log("Berhasil masuk ke cart_items Supabase!");
    }

    if (onAddToCart) {
      onAddToCart(p);
    }
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!p?.id) {
      alert("ID produk tidak valid.");
      return;
    }

    if (wished) {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", p.id);

      if (error) {
        console.error("Gagal menghapus wishlist:", error.message);
      } else {
        setWished(false);
        window.dispatchEvent(new Event("wishlistUpdated"));
      }
    } else {
      const { error } = await supabase
        .from("wishlists")
        .insert([{ user_id: user.id, product_id: p.id }]);

      if (error) {
        console.error("Gagal menambah wishlist:", error.message);
      } else {
        setWished(true);
        window.dispatchEvent(new Event("wishlistUpdated"));
      }
    }
  };

  return (
    <>
      <div 
        className={`group relative flex flex-col justify-between bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex-shrink-0 ${
          isScrollRow ? "w-[170px] sm:w-[200px]" : "w-full"
        }`}
      >
        <div>
          {p.off && (
            <span className="absolute top-2 left-2 z-20 bg-[#E0483C] text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
              -{p.off}%
            </span>
          )}

          <Link href={productRoute}>
            <div className="relative w-full h-[170px] sm:h-[200px] overflow-hidden bg-gray-50 cursor-pointer">
              <img
                src={mainImage}
                alt={productName}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 pointer-events-none"
                loading="lazy"
              />
              <img
                src={hoverImage}
                alt={productName}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                loading="lazy"
              />
            </div>
          </Link>

          <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5">
            {onAddToCart && (
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#14B8A6] hover:scale-105 transition-all cursor-pointer"
                title="Add to Cart"
              >
                <ShoppingCart size={13} />
              </button>
            )}

            <button
              type="button"
              onClick={handleWishlistClick}
              className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-gray-100 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              title="Add to Wishlist"
            >
              <Heart size={13} className={wished ? "fill-[#E0483C] text-[#E0483C]" : "text-gray-600"} />
            </button>
          </div>

          <div className="p-2.5">
            {isFeatured && <p className="text-[11px] text-gray-400 mb-0.5">{p.seller || p.store_name || "Admin"}</p>}

            <Link href={productRoute}>
              <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-800 leading-snug line-clamp-2 h-[34px] hover:text-[#14B8A6] transition-colors cursor-pointer">
                {productName}
              </h3>
            </Link>

            {!isFeatured && <p className="text-[11px] text-[#F2A93B] font-medium mt-0.5">{p.seller || p.store_name}</p>}

            {isFeatured && (
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < (p.rating || 0) ? "fill-[#F2A93B] text-[#F2A93B]" : "text-gray-200"}
                  />
                ))}
                <span className="text-[10px] text-gray-400 ml-1">0</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-2.5 pt-0">
          <div className="mt-1 flex items-baseline gap-1.5">
            {p.quote ? (
              <span className="text-[12px] font-semibold text-gray-900">Request a Quote</span>
            ) : p.free ? (
              <span className="text-[13px] font-semibold text-green-600">Free</span>
            ) : (
              <>
                <span className="text-[13px] sm:text-[14px] font-bold text-gray-900">${p.price ?? p.amount ?? 0}</span>
                {p.old && <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">${p.old}</span>}
              </>
            )}
          </div>
        </div>
      </div>

      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}