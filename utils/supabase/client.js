import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Contoh fetch atau insert data
const { data, error } = await supabase.from("orders").select("*");