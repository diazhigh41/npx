import { createClient } from "./client";

export async function uploadProductImage(file) {
  const supabase = createClient();
  
  // Buat nama file unik
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  // Upload file ke Supabase Storage Bucket 'products'
  const { data, error } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (error) {
    console.error("Gagal upload gambar:", error.message);
    return null;
  }

  // Ambil Public URL
  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}