"use client";
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface ArticleViewCounterProps {
  slug: string;
  initialViews?: number;
}

export default function ArticleViewCounter({ slug, initialViews = 0 }: ArticleViewCounterProps) {
  const [views, setViews] = useState<number>(initialViews);

  useEffect(() => {
    let isMounted = true;

    // Track view & retrieve updated view count
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.views === 'number' && data.views > 0) {
          setViews(data.views);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (views <= 0) {
    return (
      <div className="flex items-center gap-1.5" title="Jumlah pembaca artikel">
        <Eye className="w-4 h-4 text-blue-500 animate-pulse" />
        <span className="text-slate-400">...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5" title={`${views.toLocaleString('id-ID')} kali dilihat`}>
      <Eye className="w-4 h-4 text-blue-500" />
      <span>{views.toLocaleString('id-ID')} Pembaca</span>
    </div>
  );
}
