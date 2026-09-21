"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function checkConnection() {
      const supabase = createClient();
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        setStatus(`❌ Gagal connect: ${error.message}`);
      } else {
        setStatus(`✅ Connected! Jumlah produk di tabel: ${data.length}`);
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-mono">{status}</p>
    </div>
  );
}