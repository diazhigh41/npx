"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  User, 
  MapPin, 
  Truck, 
  Link as LinkIcon, 
  Share2, 
  Lock, 
  UserX, 
  Camera, 
  Trash2, 
  Plus, 
  Edit3,
  Loader2 
} from "lucide-react";

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("update-profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();
  const router = useRouter();

  // Data State untuk Update Profile
  const [profileData, setProfileData] = useState({
    email: "",
    slug: "",
    firstName: "",
    lastName: "",
    phone: "",
    taxNumber: "",
    coverType: "full",
    coverUrl: "",
    avatarUrl: "",
    notifyMessage: false,
    showEmail: false,
    showPhone: false,
  });

  // Data State untuk Location
  const [locationData, setLocationData] = useState({
    country: "France",
    state: "Centre",
    city: "",
    address: "",
    zipCode: "",
    showLocation: false,
  });

  // Data State untuk Shipping Address
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Home",
      name: "Peter Jone",
      address: "Test Address 45343 Centre/Centre/France",
      email: "test@codingest.net",
      phone: "876 5766 6578"
    }
  ]);

  // Data State untuk Affiliate Links
  const [affiliates, setAffiliates] = useState([
    { id: 1, product: "Black bag over the shoulder", link: "https://modesy.codingest.net/affiliate/68bacd27669e0", date: "2026-08-05" },
    { id: 2, product: "Black midi skirt with white flowers", link: "https://modesy.codingest.net/affiliate/68bacd1598f70", date: "2026-08-05" },
    { id: 3, product: "Floral women sundress", link: "https://modesy.codingest.net/affiliate/68bac4be6002a", date: "2026-08-05" },
  ]);

  // Data State untuk Social Media
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    youtube: "",
    discord: "",
    telegram: "",
    pinterest: "",
    linkedin: "",
    twitch: "",
    vk: "",
    website: "",
  });

  // Data State untuk Change Password
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Data State untuk Delete Account
  const [deletePassword, setDeletePassword] = useState("");

  // Ambil data user dari Supabase saat halaman dimuat
  useEffect(() => {
    async function fetchUserData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
        return;
      }

      setUser(session.user);

      // Ambil data profil berdasarkan ID user aktif
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setProfileData({
          email: session.user.email || "",
          slug: data.slug || "",
          firstName: data.name?.split(" ")[0] || data.first_name || "",
          lastName: data.name?.split(" ").slice(1).join(" ") || data.last_name || "",
          phone: data.phone || "",
          taxNumber: data.tax_number || "",
          coverType: data.cover_type || "full",
          coverUrl: data.cover_url || "",
          avatarUrl: data.avatar_url || "",
          notifyMessage: data.notify_message || false,
          showEmail: data.show_email || false,
          showPhone: data.show_phone || false,
        });
      }
      setLoading(false);
    }

    fetchUserData();
  }, [router, supabase]);

  // Fungsi untuk handle upload / ganti gambar Avatar atau Cover secara langsung via URL
  const handleImageInput = (type) => {
    const url = prompt(`Masukkan URL gambar ${type} baru:`);
    if (url) {
      if (type === 'avatar') {
        setProfileData(prev => ({ ...prev, avatarUrl: url }));
      } else {
        setProfileData(prev => ({ ...prev, coverUrl: url }));
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        name: `${profileData.firstName} ${profileData.lastName}`.trim(),
        slug: profileData.slug,
        phone: profileData.phone,
        tax_number: profileData.taxNumber,
        cover_type: profileData.coverType,
        cover_url: profileData.coverUrl,
        avatar_url: profileData.avatarUrl,
        notify_message: profileData.notifyMessage,
        show_email: profileData.showEmail,
        show_phone: profileData.showPhone,
      })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      alert("Gagal menyimpan perubahan: " + error.message);
    } else {
      alert("Changes saved successfully!");
      window.dispatchEvent(new Event("profileUpdated"));
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-teal-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/member/settings" className="hover:underline">Profile Settings</Link> / <span className="text-gray-900 font-normal capitalize">{activeTab.replace("-", " ")}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= SIDEBAR MENU KIRI ================= */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 shadow-2xs">
            
            <button 
              onClick={() => setActiveTab("update-profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "update-profile" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <User size={16} /> Update Profile
            </button>

            <button 
              onClick={() => setActiveTab("location")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "location" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <MapPin size={16} /> Location
            </button>

            <button 
              onClick={() => setActiveTab("shipping-address")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "shipping-address" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <Truck size={16} /> Shipping Address
            </button>

            <button 
              onClick={() => setActiveTab("affiliate-links")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "affiliate-links" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <LinkIcon size={16} /> Affiliate Links
            </button>

            <button 
              onClick={() => setActiveTab("social-media")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "social-media" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <Share2 size={16} /> Social Media
            </button>

            <button 
              onClick={() => setActiveTab("change-password")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "change-password" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <Lock size={16} /> Change Password
            </button>

            <button 
              onClick={() => setActiveTab("delete-account")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left transition-colors ${activeTab === "delete-account" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <UserX size={16} /> Delete Account
            </button>

          </div>
        </div>

        {/* ================= KONTEN KANAN ================= */}
        <div className="lg:col-span-9 bg-white">
          
          {/* 1. UPDATE PROFILE */}
          {activeTab === "update-profile" && (
            <form onSubmit={handleSave} className="space-y-5">
              {/* Cover & Avatar Section dengan fungsi ganti gambar */}
              <div className="relative bg-gray-100 rounded-lg h-48 sm:h-64 flex items-center justify-center overflow-hidden border border-gray-200">
                {profileData.coverUrl ? (
                  <img src={profileData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-xs">No Cover Image</div>
                )}
                
                <button 
                  type="button" 
                  onClick={() => handleImageInput('cover')}
                  className="absolute top-4 right-4 bg-teal-600 text-white p-2.5 rounded-md hover:bg-teal-700 transition-colors shadow-sm cursor-pointer"
                  title="Ganti Cover"
                >
                  <Camera size={16} />
                </button>

                {/* Avatar Bulat di Tengah Bawah Cover */}
                <div className="absolute -bottom-10 left-8">
                  <div className="relative">
                    <img 
                      src={profileData.avatarUrl || "https://via.placeholder.com/150"} 
                      alt="Avatar" 
                      className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md bg-white"
                    />
                    <button 
                      type="button" 
                      onClick={() => handleImageInput('avatar')}
                      className="absolute bottom-2 right-2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 shadow-sm cursor-pointer"
                      title="Ganti Avatar"
                    >
                      <Camera size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 pt-10 pb-2">
                *Click on the save changes button after selecting your image
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={profileData.email}
                  disabled
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3.5 py-2.5 text-xs text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Slug</label>
                <input 
                  type="text" 
                  value={profileData.slug}
                  onChange={(e) => setProfileData({...profileData, slug: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1.5">First Name</label>
                  <input 
                    type="text" 
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1.5">Last Name</label>
                  <input 
                    type="text" 
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Tax Registration Number</label>
                <input 
                  type="text" 
                  placeholder="Tax Registration Number"
                  value={profileData.taxNumber}
                  onChange={(e) => setProfileData({...profileData, taxNumber: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Cover Image Type</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input 
                      type="radio" 
                      name="coverType" 
                      checked={profileData.coverType === "full"}
                      onChange={() => setProfileData({...profileData, coverType: "full"})}
                      className="accent-teal-600 w-4 h-4"
                    />
                    Full Width
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input 
                      type="radio" 
                      name="coverType" 
                      checked={profileData.coverType === "boxed"}
                      onChange={() => setProfileData({...profileData, coverType: "boxed"})}
                      className="accent-teal-600 w-4 h-4"
                    />
                    Boxed
                  </label>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700">
                  <input 
                    type="checkbox" 
                    checked={profileData.notifyMessage}
                    onChange={(e) => setProfileData({...profileData, notifyMessage: e.target.checked})}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  Send me an email when someone send me a message
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700">
                  <input 
                    type="checkbox" 
                    checked={profileData.showEmail}
                    onChange={(e) => setProfileData({...profileData, showEmail: e.target.checked})}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  Show my email address
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700">
                  <input 
                    type="checkbox" 
                    checked={profileData.showPhone}
                    onChange={(e) => setProfileData({...profileData, showPhone: e.target.checked})}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  Show my phone number
                </label>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-md text-xs transition-colors cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 className="animate-spin" size={14} />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. LOCATION */}
          {activeTab === "location" && (
            <form onSubmit={handleSave} className="space-y-5">
              <h3 className="text-xs font-bold text-gray-900">Location</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <select 
                    value={locationData.country}
                    onChange={(e) => setLocationData({...locationData, country: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700"
                  >
                    <option value="France">France</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div>
                  <select 
                    value={locationData.state}
                    onChange={(e) => setLocationData({...locationData, state: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700"
                  >
                    <option value="Centre">Centre</option>
                    <option value="Jawa Timur">Jawa Timur</option>
                  </select>
                </div>
                <div>
                  <select 
                    value={locationData.city}
                    onChange={(e) => setLocationData({...locationData, city: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700"
                  >
                    <option value="">City</option>
                    <option value="Paris">Paris</option>
                    <option value="Malang">Malang</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <input 
                    type="text" 
                    placeholder="Address"
                    value={locationData.address}
                    onChange={(e) => setLocationData({...locationData, address: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Zip Code"
                    value={locationData.zipCode}
                    onChange={(e) => setLocationData({...locationData, zipCode: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700">
                  <input 
                    type="checkbox" 
                    checked={locationData.showLocation}
                    onChange={(e) => setLocationData({...locationData, showLocation: e.target.checked})}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  Show my location
                </label>
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-md text-xs transition-colors cursor-pointer shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* 3. SHIPPING ADDRESS */}
          {activeTab === "shipping-address" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-gray-200 rounded-lg p-5 bg-white shadow-2xs relative">
                    <div className="inline-block bg-teal-50 text-teal-700 font-semibold px-2.5 py-1 rounded text-[11px] mb-3">
                      {addr.title}
                    </div>
                    <div className="space-y-1 text-xs text-gray-700">
                      <p className="font-bold text-gray-900">{addr.name}</p>
                      <p>{addr.address}</p>
                      <p>{addr.email} {addr.phone}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                      <button className="text-gray-400 hover:text-teal-600 transition-colors cursor-pointer"><Edit3 size={15} /></button>
                      <button 
                        onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2.5 rounded-md text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                  <Plus size={15} /> Add New Address
                </button>
              </div>
            </div>
          )}

          {/* 4. AFFILIATE LINKS */}
          {activeTab === "affiliate-links" && (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-bold text-gray-700 uppercase">
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Affiliate Link</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs text-gray-600">
                  {affiliates.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="p-3.5 font-medium text-gray-900">{item.product}</td>
                      <td className="p-3.5 text-teal-600 truncate max-w-xs"><a href={item.link} target="_blank" rel="noreferrer" className="hover:underline">{item.link}</a></td>
                      <td className="p-3.5">
                        {item.date} <br />
                        <button 
                          onClick={() => setAffiliates(affiliates.filter(a => a.id !== item.id))}
                          className="text-red-500 hover:underline text-[11px] mt-0.5 inline-block cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 5. SOCIAL MEDIA */}
          {activeTab === "social-media" && (
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { label: "Facebook URL", key: "facebook" },
                { label: "X (Twitter) URL", key: "twitter" },
                { label: "Instagram URL", key: "instagram" },
                { label: "TikTok URL", key: "tiktok" },
                { label: "WhatsApp URL", key: "whatsapp" },
                { label: "Youtube URL", key: "youtube" },
                { label: "Discord Url", key: "discord" },
                { label: "Telegram URL", key: "telegram" },
                { label: "Pinterest URL", key: "pinterest" },
                { label: "Linkedin URL", key: "linkedin" },
                { label: "Twitch Url", key: "twitch" },
                { label: "VK URL", key: "vk" },
                { label: "Personal Website URL", key: "website" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-bold text-gray-900 mb-1.5">{field.label}</label>
                  <input 
                    type="text" 
                    placeholder={field.label}
                    value={socials[field.key]}
                    onChange={(e) => setSocials({...socials, [field.key]: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              ))}

              <div className="pt-2">
                <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-md text-xs transition-colors cursor-pointer shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* 6. CHANGE PASSWORD */}
          {activeTab === "change-password" && (
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Old Password</label>
                <input 
                  type="password" 
                  placeholder="Old Password"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Password</label>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-md text-xs transition-colors cursor-pointer shadow-sm">
                  Change Password
                </button>
              </div>
            </form>
          )}

          {/* 7. DELETE ACCOUNT */}
          {activeTab === "delete-account" && (
            <div className="space-y-5">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-xs leading-relaxed">
                Deleting your account is permanent and cannot be reversed. All data, including preferences and subscriptions, will be lost. The process requires admin approval, which may take some time. Please enter your password and confirm to proceed.
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5">Password</label>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <button 
                  onClick={() => alert("Delete request submitted!")}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-md text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <UserX size={15} /> Delete Account
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}