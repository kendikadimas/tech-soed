-- ====================================================================
-- SKRIP SQL SUPABASE UNTUK ANALYTICS VIEW COUNTER ARTIKEL (TECHSOE)
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- URL Dashboard: https://supabase.com/dashboard/project/duvextmdokvbwbirzpua/editor
-- ====================================================================

-- 1. Buat Tabel article_views jika belum ada
CREATE TABLE IF NOT EXISTS public.article_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    view_count INTEGER DEFAULT 0 NOT NULL,
    last_viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Index untuk performa query cepat berdasarkan slug artikel
CREATE INDEX IF NOT EXISTS idx_article_views_slug ON public.article_views (slug);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.article_views ENABLE ROW LEVEL SECURITY;

-- 4. Hapus policy lama jika ada (untuk menghindari duplikasi error saat re-run)
DROP POLICY IF EXISTS "Allow public read article_views" ON public.article_views;
DROP POLICY IF EXISTS "Allow public insert article_views" ON public.article_views;
DROP POLICY IF EXISTS "Allow public update article_views" ON public.article_views;
DROP POLICY IF EXISTS "Allow authenticated all article_views" ON public.article_views;

-- 5. Kebijakan Akses (RLS Policies):
-- Izinkan publik/anon untuk membaca jumlah views artikel
CREATE POLICY "Allow public read article_views" 
ON public.article_views 
FOR SELECT 
USING (true);

-- Izinkan publik/anon untuk memasukkan view artikel baru
CREATE POLICY "Allow public insert article_views" 
ON public.article_views 
FOR INSERT 
WITH CHECK (true);

-- Izinkan publik/anon untuk memperbarui counter views
CREATE POLICY "Allow public update article_views" 
ON public.article_views 
FOR UPDATE 
USING (true);

-- Izinkan user terautentikasi (Admin) kontrol penuh
CREATE POLICY "Allow authenticated all article_views" 
ON public.article_views 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 6. Fungsi Stored Procedure Atomic (increment_article_views)
-- Fungsi ini berjalan dengan hak SECURITY DEFINER agar aman, cepat, dan bebas race-condition
CREATE OR REPLACE FUNCTION public.increment_article_views(p_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_count INTEGER;
BEGIN
    INSERT INTO public.article_views (slug, view_count, last_viewed_at)
    VALUES (p_slug, 1, now())
    ON CONFLICT (slug)
    DO UPDATE SET 
        view_count = public.article_views.view_count + 1,
        last_viewed_at = now()
    RETURNING view_count INTO v_count;
    
    RETURN v_count;
END;
$$;

-- 7. Berikan izin eksekusi fungsi RPC kepada publik (anon), user login, dan service_role
GRANT EXECUTE ON FUNCTION public.increment_article_views(TEXT) TO anon, authenticated, service_role;

-- 8. Opsional: Inisialisasi baris untuk seluruh artikel yang sudah ada agar terdaftar di analytics
INSERT INTO public.article_views (slug, view_count, last_viewed_at)
SELECT slug, 0, now()
FROM public.articles
ON CONFLICT (slug) DO NOTHING;
