import React, { useState, useRef, useEffect } from 'react';
import { Globe2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: t('language.english') },
    { code: 'hi', name: t('language.hindi') },
    { code: 'es', name: t('language.spanish') },
    { code: 'ar', name: t('language.arabic') },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isOpen]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-o-2 hover:text-o-0 hover:bg-[var(--o-ghost-hover)] transition-colors min-h-[40px] w-full md:w-auto justify-start"
        aria-expanded={isOpen}
      >
        <Globe2 className="h-4 w-4 flex-shrink-0" />
        <span className="text-[13px] font-medium truncate">
          {languages.find((lang) => lang.code === language)?.name}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full md:w-48 rounded-xl bg-o-2 border border-[var(--o-border-1)] shadow-[var(--o-card-shadow)] z-50 overflow-hidden">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'hi' | 'es' | 'ar');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors min-h-[44px] ${
                  language === lang.code
                    ? 'text-[var(--o-accent-bright)] bg-[var(--o-accent-soft)]'
                    : 'text-o-1 hover:bg-[var(--o-ghost-hover)] hover:text-o-0'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
