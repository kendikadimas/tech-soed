import { blogPosts as defaultBlogPosts } from './blogData';
import { createClient } from './supabase/client';

export interface ExistingArticleRef {
  id?: string;
  title: string;
  slug?: string;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  isExact: boolean;
  matchedTitle?: string;
  matchedSlug?: string;
  matchedSource?: 'database' | 'default';
  reason?: string;
}

/**
 * Standardize text for similarity / duplicate comparison:
 * lowercase, removes punctuation/symbols, condenses extra whitespace.
 */
export function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^\w\s]/gi, ' ')       // replace symbols with spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate slug URL from title string
 */
export function generateSlug(title: string): string {
  return (title || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fetch all existing articles (from Supabase articles table, merged with fallback defaultBlogPosts).
 * Cached / deduplicated by title and slug.
 */
export async function fetchAllExistingArticles(): Promise<ExistingArticleRef[]> {
  const list: ExistingArticleRef[] = [];
  const seenSlugs = new Set<string>();

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug');

    if (!error && data) {
      data.forEach((item) => {
        if (item.title) {
          list.push({
            id: item.id,
            title: item.title,
            slug: item.slug,
          });
          if (item.slug) seenSlugs.add(item.slug.toLowerCase());
        }
      });
    }
  } catch (err) {
    console.error('Failed to fetch existing articles for duplicate check:', err);
  }

  // Also include default blog posts so we never duplicate seed/preset articles
  defaultBlogPosts.forEach((post) => {
    if (post.slug && !seenSlugs.has(post.slug.toLowerCase())) {
      list.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
      });
      seenSlugs.add(post.slug.toLowerCase());
    }
  });

  return list;
}

/**
 * Check if candidate title or slug matches any existing articles.
 * @param title Candidate title
 * @param existingList List of existing articles
 * @param currentArticleId If editing an article, exclude self from checking
 */
export function checkArticleDuplicate(
  title: string,
  existingList: ExistingArticleRef[],
  currentArticleId?: string
): DuplicateCheckResult {
  const trimmed = (title || '').trim();
  if (!trimmed) {
    return { isDuplicate: false, isExact: false };
  }

  const normCandidate = normalizeText(trimmed);
  const slugCandidate = generateSlug(trimmed);

  for (const existing of existingList) {
    if (currentArticleId && existing.id && existing.id === currentArticleId) {
      continue;
    }

    const normExisting = normalizeText(existing.title);
    const existingSlug = existing.slug ? existing.slug.toLowerCase() : generateSlug(existing.title);

    // 1. Exact match (case & punctuation normalized)
    if (normCandidate === normExisting) {
      return {
        isDuplicate: true,
        isExact: true,
        matchedTitle: existing.title,
        matchedSlug: existing.slug,
        reason: `Judul sudah pernah digunakan pada artikel: "${existing.title}"`,
      };
    }

    // 2. Slug match (identical URL slug would collide)
    if (slugCandidate && slugCandidate === existingSlug) {
      return {
        isDuplicate: true,
        isExact: true,
        matchedTitle: existing.title,
        matchedSlug: existing.slug,
        reason: `Slug URL (/blog/${slugCandidate}) sudah ada dan akan bertabrakan dengan: "${existing.title}"`,
      };
    }

    // 3. Very high similarity (e.g. candidate is identical prefix/suffix with length > 25 chars)
    if (normCandidate.length > 25 && normExisting.length > 25) {
      if (normCandidate.startsWith(normExisting) || normExisting.startsWith(normCandidate)) {
        return {
          isDuplicate: true,
          isExact: false,
          matchedTitle: existing.title,
          matchedSlug: existing.slug,
          reason: `Judul sangat mirip dengan artikel yang sudah terbit: "${existing.title}"`,
        };
      }
    }
  }

  return { isDuplicate: false, isExact: false };
}
