import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key to bypass RLS for tracking (read-only tracking table)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug required' }, { status: 400 });
    }

    // Upsert view count — increment if exists, insert if not
    const { error } = await supabaseAdmin.rpc('increment_article_views', { p_slug: slug });

    if (error) {
      // Fallback: manual upsert if RPC not created yet
      const { data: existing } = await supabaseAdmin
        .from('article_views')
        .select('id, view_count')
        .eq('slug', slug)
        .maybeSingle();

      if (existing) {
        await supabaseAdmin
          .from('article_views')
          .update({ view_count: existing.view_count + 1, last_viewed_at: new Date().toISOString() })
          .eq('id', existing.id);
      } else {
        await supabaseAdmin
          .from('article_views')
          .insert({ slug, view_count: 1, last_viewed_at: new Date().toISOString() });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Silently fail — tracking should never break the page
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
