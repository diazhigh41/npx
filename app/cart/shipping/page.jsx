"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Check, X, AlertTriangle, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  // State daftar alamat
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Shipping Address",
      title: "Home",
      firstName: "Peter",
      lastName: "Jone",
      email: "test@codingest.net",
      phone: "876 5766 6578",
      country: "France",
      state: "Centre",
      city: "Centre",
      zipCode: "45343",
      address: "Test Address",
      selected: true,
    }
  ]);

  const [useSameBilling, setUseSameBilling] = useState(true);
  
  // State untuk modal (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" atau "edit"
  const [currentAddressId, setCurrentAddressId] = useState(null);

  // State form input modal
  const [formData, setFormData] = useState({
    type: "Shipping Address",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "France",
    state: "",
    city: "",
    zipCode: "",
    address: ""
  });

  // State modal hapus
  const [deleteId, setDeleteId] = useState(null);

  // Buka modal Add
  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({
      type: "Shipping Address",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "France",
      state: "",
      city: "",
      zipCode: "",
      address: ""
    });
    setIsModalOpen(true);
  };

  // Buka modal Edit (data lama langsung masuk ke form)
  const handleOpenEdit = (addr) => {
    setModalMode("edit");
    setCurrentAddressId(addr.id);
    setFormData({
      type: addr.type,
      title: addr.title,
      firstName: addr.firstName,
      lastName: addr.lastName,
      email: addr.email,
      phone: addr.phone,
      country: addr.country,
      state: addr.state,
      city: addr.city,
      zipCode: addr.zipCode,
      address: addr.address
    });
    setIsModalOpen(true);
  };

  // Simpan data dari modal (Add / Edit)
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      const newAddr = {
        id: Date.now(),
        ...formData,
        selected: addresses.length === 0
      };
      setAddresses([...addresses, newAddr]);
    } else {
      setAddresses(addresses.map(item => item.id === currentAddressId ? { ...item, ...formData } : item));
    }
    setIsModalOpen(false);
  };

  // Hapus alamat
  const confirmDelete = () => {
    setAddresses(addresses.filter(item => item.id !== deleteId));
    setDeleteId(null);
  };

  const handleSelectAddress = (id) => {
    setAddresses(addresses.map(item => ({
      ...item,
      selected: item.id === id
    })));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. SHIPPING INFORMATION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">1. Shipping Information</h2>
                <button 
                  onClick={handleOpenAdd}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>

              <div className="text-sm font-bold text-gray-900 pt-2">Shipping Address</div>

              {/* List Alamat */}
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr.id)}
                    className={`border rounded-xl p-5 relative cursor-pointer transition-all ${addr.selected ? "border-teal-500 bg-teal-50/10 ring-1 ring-teal-500" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white mt-0.5 ${addr.selected ? "bg-teal-600" : "border border-gray-300"}`}>
                          {addr.selected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{addr.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {addr.firstName} {addr.lastName} | {addr.address}, {addr.city}, {addr.state} {addr.zipCode}, {addr.country}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{addr.email} • {addr.phone}</p>
                        </div>
                      </div>

                      {/* Tombol Edit & Delete */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenEdit(addr); }}
                          className="text-gray-400 hover:text-teal-600 transition-colors p-1"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setDeleteId(addr.id); }}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkbox Same Address */}
              <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={useSameBilling} 
                  onChange={(e) => setUseSameBilling(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">Use same address for billing address</span>
              </label>
            </div>

            {/* SHIPPING METHOD */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Truck size={18} className="text-teal-600" /> Shipping Method
              </h3>
              
              <div className="border border-teal-500 rounded-xl p-4 bg-teal-50/10 ring-1 ring-teal-500 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Flat Rate</div>
                    <div className="text-xs text-gray-500">Standard shipping</div>
                  </div>
                </div>
                <span className="font-bold text-gray-900 text-sm">$10</span>
              </div>
            </div>

            {/* Tombol Lanjut */}
            <div className="space-y-3 pt-2">
              <a 
                href="/cart/payment-method"
                className="block w-full bg-[#00b09b] hover:bg-[#009b88] text-white font-bold py-3.5 text-center rounded-xl transition-colors shadow-sm text-sm"
              >
                Continue to Payment Method &rarr;
              </a>
              <div>
                <a href="/cart" className="text-xs text-teal-600 hover:underline font-medium">&lt; Return to cart</a>
              </div>
            </div>

            {/* 2 & 3 Placeholder */}
            <div className="border-t pt-6 space-y-4 text-gray-400">
              <div className="text-lg font-bold">2. Payment Method</div>
              <div className="text-lg font-bold">3. Payment</div>
            </div>

          </div>

          {/* KOLOM KANAN: ORDER SUMMARY */}
          <div className="space-y-6 sticky top-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b pb-3">Order Summary (3)</h2>
              
              {/* Item list */}
              <div className="space-y-4 text-sm divide-y divide-gray-100">
                <div className="flex gap-3 pt-2">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <div className="flex-grow text-xs">
                    <p className="font-bold text-gray-900 line-clamp-1">Floral women sundress</p>
                    <p className="text-gray-500">Color: Dark Size: S</p>
                    <div className="flex justify-between mt-1 font-semibold text-gray-800">
                      <span>Quantity: 1</span>
                      <span>$80</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">$105</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">$10</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>$115</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* MODAL ADD / EDIT ADDRESS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 my-8 relative shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {modalMode === "add" ? "Add New Address" : "Edit Address"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Address Type</label>
                <select 
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option>Shipping Address</option>
                  <option>Billing Address</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Address Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Address Title (e.g. Home, Office)"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="First Name"
                    value={formData.firstName} 
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Last Name"
                    value={formData.lastName} 
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Email"
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Phone Number"
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                  <select 
                    value={formData.country} 
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option>France</option>
                    <option>Indonesia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                  <input 
                    type="text" 
                    required
                    placeholder="State"
                    value={formData.state} 
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    required
                    placeholder="City"
                    value={formData.city} 
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Zip Code</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Zip Code"
                    value={formData.zipCode} 
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                <textarea 
                  rows={2} 
                  required
                  placeholder="Street address..."
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI DELETE */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base">Are you sure you want to delete this item?</h3>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button 
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium w-full"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium w-full"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}   