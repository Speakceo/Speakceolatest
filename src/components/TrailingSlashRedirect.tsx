import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shouldEnforceTrailingSlash, withTrailingSlash } from '../lib/publicPaths';

/** Keeps the address bar on canonical trailing-slash URLs (matches sitemap + Netlify). */
export default function TrailingSlashRedirect() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldEnforceTrailingSlash(pathname)) return;
    navigate(withTrailingSlash(`${pathname}${search}${hash}`), { replace: true });
  }, [pathname, search, hash, navigate]);

  return null;
}
