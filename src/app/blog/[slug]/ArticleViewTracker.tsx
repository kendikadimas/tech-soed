"use client";
import { useEffect } from 'react';

export default function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Fire and forget — never throw
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
