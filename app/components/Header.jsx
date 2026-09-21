"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, Menu, ChevronDown, MapPin, Globe, UserCircle, Wallet, Package, Tag, MessageCircle, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { CATEGORIES, slugify } from "../data/products";
import SearchBar from "./SearchBar";
import LocationModal from "./LocationModal";
import LoginModal from "./LoginModal";
import CurrencyDropdown from "./CurrencyDropdown";
import { createClient } from "../../utils/supabase/client";

export default function Header({ scrolled, onOpenMenu }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [locationOpen, setLocationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const fetchWishlistCount = async (userId) => {
    if (!userId) {
      setWishlistCount(0);
      return;
    }
    const { count, error } = await supabase
      .from("wishlists")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (!error) {
      setWishlistCount(count || 0);
    }
  };

  const fetchCartCount = async (userId) => {
    if (userId) {
      const { count, error } = await supabase
        .from("cart_items")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      if (!error) {
        setCartCount(count || 0);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartCount(localCart.length);
    }
  };

  useEffect(() => {
    async function loadUserAndRole(sessionUser) {
      setUser(sessionUser);
      if (sessionUser) {
        setLoginOpen(false); 
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        if (!error && data) {
          setRole(data.role ?? "buyer");
          setProfileData(data);
        } else {
          setRole("buyer");
          setProfileData(null);
        }
        
        fetchWishlistCount(sessionUser.id);
        fetchCartCount(sessionUser.id);
      } else {
        setRole(null);
        setProfileData(null);
        setWishlistCount(0);
        fetchCartCount(null);
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      loadUserAndRole(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUserAndRole(session?.user ?? null);
      router.refresh();
    });

    const handleWishlistUpdated = () => {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          fetchWishlistCount(data.session.user.id);
        }
      });
    };

    const handleCartUpdated = () => {
      supabase.auth.getSession().then(({ data }) => {
        fetchCartCount(data.session?.user?.id ?? null);
      });
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdated);
    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    
    localStorage.clear();
    sessionStorage.clear();

    setAccountOpen(false);
    setUser(null);
    setRole(null);
    setProfileData(null);
    setWishlistCount(0);
    setCartCount(0);
    router.push("/");
    router.refresh();
  };

  const vendorMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/vendor/dashboard" },
    { label: "Profile", icon: UserCircle, href: "/vendor/profile" },
    { label: "Wallet", icon: Wallet, href: "/vendor/wallet" },
    { label: "Orders", icon: Package, href: "/vendor/orders" },
    { label: "My Coupons", icon: Tag, href: "/vendor/coupons" },
    { label: "Messages", icon: MessageCircle, href: "/vendor/messages" },
    { label: "Profile Settings", icon: Settings, href: "/vendor/settings" },
  ];

  const memberMenuItems = [
    { label: "Profile", icon: UserCircle, href: "/member/profile" },
    { label: "Wallet", icon: Wallet, href: "/member/wallet" },
    { label: "Orders", icon: Package, href: "/member/orders" },
    { label: "My Coupons", icon: Tag, href: "/member/coupons" },
    { label: "Messages", icon: MessageCircle, href: "/member/messages" },
    { label: "Profile Settings", icon: Settings, href: "/member/settings" },
  ];

  const isPrivilegedUser = ['vendor', 'seller', 'moderator', 'admin'].includes(role);
  const activeMenuItems = isPrivilegedUser ? vendorMenuItems : memberMenuItems;

  const isPeterJone = profileData?.username === "peter_jone";
  const displayName = isPeterJone ? "Peter Jone" : (profileData?.name || profileData?.full_name || profileData?.username || role || "Account");
  const displayAvatar = profileData?.avatar_url || profileData?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

  return (
    <>
      <div className="hidden md:flex items-center justify-between px-6 py-2 text-[12px] bg-white border-b border-gray-100 text-gray-600 relative z-50">
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-gray-900">Contact</Link>
          <Link href="/sell-on-modesy" className="hover:text-gray-900">Sell on Modesy</Link>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setLocationOpen(true)} className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
            <MapPin size={12} /> Location
          </button>
          <CurrencyDropdown />
          <span className="flex items-center gap-1 cursor-pointer"><Globe size={12} /> English <ChevronDown size={11} /></span>

          {user ? (
            <div className="relative">
              <button 
                type="button" 
                onClick={() => setAccountOpen((o) => !o)} 
                className="flex items-center gap-2 hover:text-gray-900 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                  <img 
                    src={displayAvatar} 
                    alt={displayName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-gray-800">{displayName}</span> 
                {isPrivilegedUser && <span className="bg-teal-100 text-teal-800 text-[10px] px-1.5 py-0.5 rounded font-semibold capitalize">{role}</span>}
                <ChevronDown size={11} className="text-gray-500" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-2xl py-2 z-[9999]">
                  {activeMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <item.icon size={18} className="text-gray-500" /> 
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors text-left"
                  >
                    <LogOut size={18} className="text-red-500" /> 
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              type="button"
              onClick={() => setLoginOpen(true)} 
              className="hover:text-gray-900 cursor-pointer"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      <header className={`sticky top-0 z-40 md:relative md:top-auto bg-white transition-shadow ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <button type="button" className="md:hidden" onClick={onOpenMenu}>
            <Menu size={22} />
          </button>

          <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
            M<span className="text-[#14B8A6]">o</span>desy
          </Link>

          <div className="hidden md:flex flex-1 mx-8 max-w-xl">
            <SearchBar />
          </div>

          <div className="flex items-center gap-5">
            <Link href="/wishlist" className="relative flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#14B8A6]">
              <Heart size={19} />
              <span className="hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E0483C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#14B8A6]">
              <ShoppingCart size={19} />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E0483C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Tombol Dinamis: Kalau vendor/seller/admin -> Dashboard (/vendor/dashboard). Kalau buyer/belum login -> Sell Now (/sell-on-modesy) */}
            <Link 
              href={isPrivilegedUser ? "" : ""} 
              className="hidden md:block bg-[#14B8A6] hover:bg-[#119083] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer text-center"
            >
              {isPrivilegedUser ? "Sell Now" : "Sell Now"}
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 px-6 py-2.5 border-t border-gray-100 text-sm font-medium relative">
          {CATEGORIES.map((c) => {
            const isClothing = c.toLowerCase() === "clothing";
            
            if (isClothing) {
              return (
                <div 
                  key={c}
                  className="relative py-1"
                  onMouseEnter={() => setShowClothingDropdown(true)}
                  onMouseLeave={() => setShowClothingDropdown(false)}
                >
                  <Link 
                    href="/categories/clothing" 
                    className="text-gray-700 hover:text-[#14B8A6] transition-colors flex items-center gap-1"
                  >
                    {c}
                  </Link>

                  {showClothingDropdown && (
                    <div className="absolute top-full left-0 w-[820px] bg-white shadow-2xl border border-gray-100 rounded-b-xl p-6 grid grid-cols-4 gap-6 z-[999] animate-fadeIn">
                      <div>
                        <Link href="/categories/clothing" className="font-bold text-gray-900 hover:text-[#14B8A6] block mb-3 text-[13px]">
                          Women's Clothing
                        </Link>
                        <ul className="space-y-2 text-[13px] text-gray-600">
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Dresses</Link></li>
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Skirts</Link></li>
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Pants & Capris</Link></li>
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Sweaters</Link></li>
                        </ul>
                      </div>

                      <div>
                        <Link href="/categories/clothing" className="font-bold text-gray-900 hover:text-[#14B8A6] block mb-3 text-[13px]">
                          Men's Clothing
                        </Link>
                        <ul className="space-y-2 text-[13px] text-gray-600">
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Jackets & Coats</Link></li>
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Sweaters</Link></li>
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Pants & Jeans</Link></li>
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Shirts</Link></li>
                        </ul>
                      </div>

                      <div>
                        <Link href="/categories/clothing" className="font-bold text-gray-900 hover:text-[#14B8A6] block mb-3 text-[13px]">
                          Kid's Clothing
                        </Link>
                        <ul className="space-y-2 text-[13px] text-gray-600">
                          <li><Link href="/categories/clothing" className="hover:text-[#14B8A6]">Clothing Sets</Link></li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <Link href="/categories/clothing" className="relative group overflow-hidden rounded-lg border border-gray-100 block">
                          <img 
                            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=60" 
                            alt="Women's Clothing" 
                            className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                            <span className="text-[11px] text-white font-medium block truncate">Women's Clothing</span>
                          </div>
                        </Link>

                        <div className="relative group overflow-hidden rounded-lg border border-gray-100 block">
                          <img 
                            src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=300&auto=format&fit=crop&q=60" 
                            alt="Men's Clothing" 
                            className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                            <span className="text-[11px] text-white font-medium block truncate">Men's Clothing</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={c} href={`/${slugify(c)}`} className="text-gray-700 hover:text-[#14B8A6] transition-colors py-1">
                {c}
              </Link>
            );
          })}
        </nav>
      </header>

      <LocationModal open={locationOpen} onClose={() => setLocationOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}