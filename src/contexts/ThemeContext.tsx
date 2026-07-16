import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = 'speakceo-theme';

function readInitialDark(): boolean {
  if (typeof document !== 'undefined') {
    // Prefer whatever the FOUC script already put on <html>
    if (document.documentElement.classList.contains('dark')) return true;
    if (document.documentElement.dataset.theme === 'light') return false;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved === 'dark';
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

/** Apply theme to the document immediately (no wait for React paint). */
export function applyDocumentTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.dataset.theme = dark ? 'dark' : 'light';
  root.style.colorScheme = dark ? 'dark' : 'light';
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  } catch {
    /* ignore */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#07080a' : '#f6f7f9');
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(readInitialDark);

  useLayoutEffect(() => {
    applyDocumentTheme(isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyDocumentTheme(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    const next = theme === 'dark';
    applyDocumentTheme(next);
    setIsDark(next);
  }, []);

  const value = useMemo(() => ({ isDark, toggleTheme, setTheme }), [isDark, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
