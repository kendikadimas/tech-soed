import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://duvextmdokvbwbirzpua.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_9QHODrht1B-ZDx_uieJaKQ_bcAlFWB6';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'slug required' }, { status: 400 });
    }

    const { data } = await supabaseAdmin
      .from('article_views')
      .select('view_count')
      .eq('slug', slug)
      .maybeSingle();

    return NextResponse.json({ views: data?.view_count || 0 });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}

export async function POST(req: NextRequest) {
  let targetSlug = '';
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();
    targetSlug = body?.slug || '';
    if (!targetSlug || typeof targetSlug !== 'string') {
      return NextResponse.json({ error: 'slug required' }, { status: 400 });
    }

    let views = 1;

    // Upsert view count — increment if exists, insert if not
    const { data: rpcViews, error } = await supabaseAdmin.rpc('increment_article_views', { p_slug: targetSlug });

    if (!error && typeof rpcViews === 'number') {
      views = rpcViews;
    } else {
      // Fallback: manual upsert if RPC not created yet
      const { data: existing } = await supabaseAdmin
        .from('article_views')
        .select('id, view_count')
        .eq('slug', targetSlug)
        .maybeSingle();

      if (existing) {
        views = (existing.view_count || 0) + 1;
        await supabaseAdmin
          .from('article_views')
          .update({ view_count: views, last_viewed_at: new Date().toISOString() })
          .eq('id', existing.id);
      } else {
        views = 1;
        await supabaseAdmin
          .from('article_views')
          .insert({ slug: targetSlug, view_count: 1, last_viewed_at: new Date().toISOString() });
      }
    }

    return NextResponse.json({ ok: true, views });
  } catch (e: any) {
    console.warn('[track-view] Error recording view for slug:', targetSlug, e?.message || e);
    // Silently fail — tracking should never break the page
    return NextResponse.json({ ok: false, views: 0 }, { status: 200 });
  }
}
