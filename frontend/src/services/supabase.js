import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jjflppokeyujfeqactsy.supabase.co"  
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmxwcG9rZXl1amZlcWFjdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMzgwMzYsImV4cCI6MjA5MzcxNDAzNn0.O1psWiuxS8Ifghn1azvcvC9mgo87X4sLo9mViFZaLnc"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)