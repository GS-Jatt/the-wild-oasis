import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_S_URL;
const supabaseKey = import.meta.env.VITE_S_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
