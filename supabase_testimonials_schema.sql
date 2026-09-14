-- ========================================================
-- SKRIP SQL SUPABASE UNTUK TABEL TESTIMONIALS (TECHSOE)
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor
-- ========================================================

-- 1. Buat Tabel Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar_url TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Akses: Izinkan Publik Melihat Testimoni
CREATE POLICY "Allow public read testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

-- 4. Kebijakan Akses: Izinkan Admin Membaca, Menambah, Mengubah, & Menghapus Testimoni
CREATE POLICY "Allow authenticated full access testimonials" 
ON public.testimonials 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Kebijakan Akses Anonim/Public Insert (Opsional untuk testing dev)
CREATE POLICY "Allow anon insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anon update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow anon delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (true);
