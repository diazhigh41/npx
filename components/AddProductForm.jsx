"use client";
import { useState } from "react";
// Import fungsi upload dari Langkah 3 yang dibuat di utils/supabase/storage.js
import { uploadProductImage } from "@/utils/supabase/storage"; 
import { createClient } from "@/utils/supabase/client";

export default function AddProductForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih foto produk dulu bro!");

    setLoading(true);
    const supabase = createClient();

    // ==========================================
    // LANGKAH 3: Upload foto ke Supabase Storage
    // ==========================================
    const imageUrl = await uploadProductImage(file);

    if (!imageUrl) {
      alert("Gagal upload gambar!");
      setLoading(false);
      return;
    }

    // ==========================================
    // LANGKAH 4: Simpan data + URL foto ke Database
    // ==========================================
    const { data, error } = await supabase
      .from("products") // Nama tabel database kamu
      .insert([
        {
          name: name,
          price: Number(price),
          category: category,
          images: [imageUrl], // <-- LANGKAH 4 TERJADI DI SINI (URL foto disimpan ke tabel!)
        },
      ]);

    if (error) {
      console.error("Gagal simpan ke database:", error.message);
      alert("Error simpan data!");
    } else {
      alert("Berhasil! Produk dan foto sudah masuk ke Database!");
      // Reset form
      setName("");
      setPrice("");
      setFile(null);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md space-y-4 border rounded-lg">
      <h2 className="text-xl font-bold">Tambah Produk Baru</h2>
      
      <div>
        <label className="block text-sm font-medium">Nama Produk</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Harga</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Foto Produk</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded" 
          required 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#14B8A6] text-white py-2 rounded font-semibold"
      >
        {loading ? "Proses Simpan..." : "Simpan Ke Database"}
      </button>
    </form>
  );
}
