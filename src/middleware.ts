import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const DEFAULT_SUPABASE_URL = 'https://duvextmdokvbwbirzpua.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_9QHODrht1B-ZDx_uieJaKQ_bcAlFWB6';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });


  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  const isAccessingAdmin = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect /admin routes (except /admin/login)
    if (isAccessingAdmin && !isLoginPage && !user) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // If already logged in and accessing /admin/login, redirect to /admin
    if (isLoginPage && user) {
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    }
  } catch (err) {
    console.error('Middleware auth check error:', err);
    // If auth check fails and user is trying to access protected admin, redirect to login
    if (isAccessingAdmin && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}


export const config = {
  matcher: ['/admin/:path*'],
};
