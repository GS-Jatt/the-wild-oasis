import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = 'https://elcqlrjjttzoarzsezwa.supabase.co';
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsY3FscmpqdHR6b2FyenNlendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNTkwNzQsImV4cCI6MjAwNzgzNTA3NH0.Hc_Ozn8btRkWh8PngECMNsHOgC3jqaG6__9Z-PjPggo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
