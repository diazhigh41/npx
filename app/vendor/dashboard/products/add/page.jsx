'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Sesuaikan dengan path supabase client kamu

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    productType: 'physical',
    listingType: 'ordinary',
    category: '',
    title: '',
    shortDescription: '',
    tags: '',
    description: '',
    image: null,        // File objek asli untuk dikirim ke Supabase
    imagePreview: null, // URL temporary untuk preview tampilan
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler saat user pilih gambar (pakai createObjectURL biar cepat & ringan)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = '';

      // Upload gambar ke Supabase Storage jika ada file yang diunggah
      if (form.image) {
        const fileExt = form.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, form.image);

        if (uploadError) throw uploadError;

        // Ambil Public URL hasil upload Supabase
        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        uploadedImageUrl = urlData.publicUrl;
      }

      // Simpan data form + URL Gambar Supabase ke localStorage
      const dataToSave = {
        productType: form.productType,
        listingType: form.listingType,
        category: form.category,
        title: form.title,
        shortDescription: form.shortDescription,
        tags: form.tags,
        description: form.description,
        imageUrl: uploadedImageUrl,     // URL publik dari Supabase Storage
        imagePreview: form.imagePreview, // URL preview temporary
      };

      localStorage.setItem('temp_product_general', JSON.stringify(dataToSave));

      // Mengarahkan ke halaman details
      router.push('/vendor/dashboard/products/details');
    } catch (err) {
      console.error('Gagal mengunggah gambar/menyimpan data:', err);
      alert('Gagal mengunggah gambar. Pastikan Policy RLS di bucket products Supabase sudah kamu atur!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen py-6 px-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Images Section */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Images</label>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-teal-400 rounded-lg p-10 text-center bg-white hover:bg-gray-50 transition cursor-pointer"
            >
              {form.imagePreview ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <img src={form.imagePreview} alt="Preview" className="h-32 object-contain rounded-md border" />
                  <p className="text-xs text-[#00a699] font-medium">Klik untuk mengganti gambar</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Drag and drop images here or <span className="text-[#00a699] font-medium">Browse Files</span>
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-gray-500 text-white flex items-center justify-center text-[10px] font-bold">i</span>
              You can click on the "Main" button on the images to select the main image of your product
            </p>
          </div>

          {/* 2. Product Type */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Product Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`border rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition ${form.productType === 'physical' ? 'border-[#00a699] bg-teal-50/10' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="productType"
                  value="physical"
                  checked={form.productType === 'physical'}
                  onChange={handleChange}
                  className="mt-1 text-[#00a699] focus:ring-[#00a699]"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-800">Physical</span>
                  <span className="text-xs text-gray-500">A tangible product that you will ship to buyers</span>
                </div>
              </label>

              <label className={`border rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition ${form.productType === 'digital' ? 'border-[#00a699] bg-teal-50/10' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="productType"
                  value="digital"
                  checked={form.productType === 'digital'}
                  onChange={handleChange}
                  className="mt-1 text-[#00a699] focus:ring-[#00a699]"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-800">Digital</span>
                  <span className="text-xs text-gray-500">A digital file that buyers will download</span>
                </div>
              </label>
            </div>
          </div>

          {/* 3. Listing Type */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Listing Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <label className={`border rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition ${form.listingType === 'ordinary' ? 'border-[#00a699] bg-teal-50/10' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="ordinary"
                  checked={form.listingType === 'ordinary'}
                  onChange={handleChange}
                  className="mt-1 text-[#00a699] focus:ring-[#00a699]"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-800">Add a Product for Sale</span>
                  <span className="text-xs text-gray-500">Add a product to sell on the site</span>
                </div>
              </label>

              <label className={`border rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition ${form.listingType === 'service' ? 'border-[#00a699] bg-teal-50/10' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="service"
                  checked={form.listingType === 'service'}
                  onChange={handleChange}
                  className="mt-1 text-[#00a699] focus:ring-[#00a699]"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-800">Add a Product or Service as an Ordinary Listing</span>
                  <span className="text-xs text-gray-500">Add a product or service without buy option</span>
                </div>
              </label>

              <label className={`border rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition ${form.listingType === 'quote' ? 'border-[#00a699] bg-teal-50/10' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="quote"
                  checked={form.listingType === 'quote'}
                  onChange={handleChange}
                  className="mt-1 text-[#00a699] focus:ring-[#00a699]"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-800">Add a Product to Receive Quote (Price) Requests</span>
                  <span className="text-xs text-gray-500">Add a product without adding a price to get price requests from customers</span>
                </div>
              </label>

              <label className={`border rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition ${form.listingType === 'license' ? 'border-[#00a699] bg-teal-50/10' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="license"
                  checked={form.listingType === 'license'}
                  onChange={handleChange}
                  className="mt-1 text-[#00a699] focus:ring-[#00a699]"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-800">Add a Product to Sell License Keys</span>
                  <span className="text-xs text-gray-500">Add a product to sell only license keys</span>
                </div>
              </label>

            </div>
          </div>

          {/* 4. Category */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-800 mb-1">Category</label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00a699] outline-none bg-white cursor-pointer appearance-none pr-10"
              >
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Toys & Entertainment">Toys & Entertainment</option>
                <option value="Women's Clothing">Women's Clothing</option>
                <option value="Men's Clothing">Men's Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Necklaces & Accessories">Necklaces & Accessories</option>
                <option value="Graphics">Graphics</option>
                <option value="Painting">Painting</option>
                <option value="Boots">Boots</option>
                <option value="Decorative Pillows">Decorative Pillows</option>
                <option value="Handbags">Handbags</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 5. Details: English Section */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50/20">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-sm font-bold text-gray-800">Details: English</span>
              <button
                type="button"
                className="bg-[#00a699] hover:bg-[#009287] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                ✨ Generate with AI
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags <span className="text-gray-400 font-normal">(Add relevant keywords for your product to increase visibility in search results)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Type tag and hit enter"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]"
              />
            </div>

            {/* Description Editor Box */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Description</label>
              <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center justify-between">
                  <button type="button" className="bg-[#00a699] text-white px-3 py-1 rounded text-xs font-medium">Add Image</button>
                  <div className="flex items-center space-x-3 text-gray-600 text-xs">
                    <span className="font-bold">File</span>
                    <span className="font-bold">Insert</span>
                    <span className="font-bold">Format</span>
                    <span className="font-bold">Table</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">tiny</span>
                </div>
                <textarea
                  name="description"
                  rows="6"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write detailed product description..."
                  className="w-full p-4 text-sm outline-none resize-y"
                ></textarea>
              </div>
            </div>

          </div>

          {/* Submit Button (Save and Continue) */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00a699] hover:bg-[#009287] text-white font-medium px-8 py-3 rounded-lg transition text-sm shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Save and Continue'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}