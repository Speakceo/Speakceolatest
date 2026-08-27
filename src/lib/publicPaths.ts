/** Paths that must not get a forced trailing slash (app / auth). */
const TRAILING_SLASH_SKIP_PREFIXES = [
  '/dashboard',
  '/admin',
  '/login',
  '/forgot-password',
  '/setup',
  '/test-leads',
];

/**
 * Canonical public URLs use a trailing slash (Netlify Pretty URLs + sitemap).
 * Homepage stays `/` without a trailing slash.
 */
export function withTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';

  const hashIdx = path.indexOf('#');
  const queryIdx = path.indexOf('?');
  const cut = [hashIdx, queryIdx].filter((i) => i >= 0).sort((a, b) => a - b)[0];
  const pathname = cut !== undefined ? path.slice(0, cut) : path;
  const suffix = cut !== undefined ? path.slice(cut) : '';

  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (p !== '/' && !p.endsWith('/')) p += '/';
  return p + suffix;
}

export function shouldEnforceTrailingSlash(pathname: string): boolean {
  if (!pathname || pathname === '/' || pathname.endsWith('/')) return false;
  if (pathname.includes('.')) return false;
  return !TRAILING_SLASH_SKIP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
