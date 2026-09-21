'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProductDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState(null);

  const [detailsForm, setDetailsForm] = useState({
    stock: '1',
    sku: '',
    price: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    agreed: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('temp_product_general');
      if (saved) {
        setGeneralData(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetailsForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!detailsForm.agreed) {
      alert('You must read and agree to the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const defaultImg = 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600';
      const imageUrl = generalData?.imagePreview || generalData?.image_url || defaultImg;
      const productTitle = generalData?.title || 'Untitled Product';
      const productSlug = productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

      const finalPayload = {
        name: productTitle,
        slug: productSlug,
        category: generalData?.category || 'Clothing',
        description: generalData?.description || '',
        image: imageUrl,
        image2: generalData?.image2 || null,
        stock: parseInt(detailsForm.stock) || 1,
        sku: detailsForm.sku || null,
        price: parseFloat(detailsForm.price) || 0,
        weight: detailsForm.weight ? parseFloat(detailsForm.weight) : null,
        seller: 'Trendshop',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('products')
        .insert([finalPayload]);

      if (error) {
        console.error('Supabase error:', error);
        alert('Gagal menyimpan ke database: ' + error.message);
      } else {
        // Langsung pindah halaman tanpa alert
        localStorage.removeItem('temp_product_general');
        router.push('/'); 
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen py-6 px-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800 text-center mb-4">Add Product</h1>
          <div className="flex items-center justify-center max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#00a699] flex items-center justify-center font-bold text-sm">✓</div>
              <span className="text-xs font-medium text-gray-400 mt-1">General Information</span>
            </div>
            <div className="flex-1 h-1 bg-[#00a699] mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#00a699] text-white flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-xs font-semibold text-[#00a699] mt-1">Details</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleFinalSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={detailsForm.stock}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">SKU <span className="text-gray-400 font-normal">(Product Code)</span></label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="sku"
                  value={detailsForm.sku}
                  onChange={handleChange}
                  placeholder="SKU (Optional)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]"
                />
                <button
                  type="button"
                  onClick={() => setDetailsForm(prev => ({ ...prev, sku: 'SKU-' + Math.floor(100000 + Math.random() * 900000) }))}
                  className="bg-gray-100 border border-gray-300 px-4 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-200"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50/20">
            <h3 className="text-sm font-bold text-gray-800 border-b pb-3">Product Price</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="flex">
                  <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2.5 text-sm text-gray-600 font-medium">USD ($)</span>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={detailsForm.price}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    className="w-full border border-gray-300 rounded-r-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-5">
                <input type="checkbox" id="noDiscount" defaultChecked className="w-4 h-4 text-[#00a699] rounded border-gray-300 focus:ring-[#00a699]" />
                <label htmlFor="noDiscount" className="text-sm text-gray-700 font-medium">No Discount</label>
              </div>

              <div className="flex items-center space-x-2 pt-5">
                <input type="checkbox" id="noVat" defaultChecked className="w-4 h-4 text-[#00a699] rounded border-gray-300 focus:ring-[#00a699]" />
                <label htmlFor="noVat" className="text-sm text-gray-700 font-medium">No VAT</label>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50/20">
            <h3 className="text-sm font-bold text-gray-800 border-b pb-3">Shipping (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Weight (kg)</label>
                <input type="number" step="0.1" name="weight" value={detailsForm.weight} onChange={handleChange} placeholder="e.g., 1.5" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Length (cm)</label>
                <input type="number" name="length" value={detailsForm.length} onChange={handleChange} placeholder="Length" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Width (cm)</label>
                <input type="number" name="width" value={detailsForm.width} onChange={handleChange} placeholder="Width" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Height (cm)</label>
                <input type="number" name="height" value={detailsForm.height} onChange={handleChange} placeholder="Height" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#00a699]" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" name="agreed" id="agreed" checked={detailsForm.agreed} onChange={handleChange} className="w-4 h-4 text-[#00a699] rounded border-gray-300 focus:ring-[#00a699]" />
            <label htmlFor="agreed" className="text-sm text-gray-700">
              I have read and agree to the <span className="text-[#00a699] underline cursor-pointer">Terms & Conditions</span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <button type="button" onClick={() => router.push('/vendor/dashboard/products/add')} className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-6 py-2.5 rounded-lg transition text-sm">
              Back
            </button>
            <button type="submit" disabled={loading} className="bg-[#00a699] hover:bg-[#009287] text-white font-medium px-8 py-2.5 rounded-lg transition text-sm shadow-sm cursor-pointer disabled:opacity-50">
              {loading ? 'Submitting to Database...' : 'Submit'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}