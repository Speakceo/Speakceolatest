import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * PageHero — shared Linear-grade dark hero primitive.
 *
 * One pattern. Used by every public page (About, Contact, Resources, FAQ,
 * Blog, Demo, Legal, …) so the entire site speaks one language.
 *
 *   • bg uses --o-bg-0 (deep linear black)
 *   • subtle radial accent glow + dot grid
 *   • Inter Variable display headline with optional accent {italic}
 *   • muted lede paragraph (max ~58ch)
 *   • optional CTAs using btn-o-primary / btn-o-ghost
 */

export type PageHeroAction = {
  label: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
};

export interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  italic?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: PageHeroAction[];
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function PageHero({
  eyebrow,
  title,
  italic,
  subtitle,
  actions,
  align = 'center',
  size = 'md',
  className = '',
}: PageHeroProps) {
  const isCenter = align === 'center';

  const padY =
    size === 'sm'
      ? 'pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20'
      : size === 'lg'
      ? 'pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-36'
      : 'pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28';

  const titleSize =
    size === 'sm'
      ? 'clamp(2.2rem, 5vw, 3.6rem)'
      : size === 'lg'
      ? 'clamp(2.8rem, 7.5vw, 5.6rem)'
      : 'clamp(2.4rem, 6.4vw, 4.6rem)';

  return (
    <section className={`relative overflow-hidden bg-o-0 ${padY} ${className}`}>
      {/* Subtle radial accent glow */}
      <div className="absolute inset-x-0 top-0 h-[600px] glow-o opacity-80" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 grid-o opacity-50 pointer-events-none" />

      <div
        className={`relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ${
          isCenter ? 'text-center' : ''
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className={isCenter ? 'max-w-4xl mx-auto' : 'max-w-4xl'}
        >
          {eyebrow && (
            <p className={`eyebrow-o mb-6 ${isCenter ? '' : ''}`}>{eyebrow}</p>
          )}

          <h1
            className="font-display mb-6"
            style={{
              fontSize: titleSize,
              lineHeight: 1.0,
              letterSpacing: '-0.045em',
              color: 'var(--o-text-0)',
            }}
          >
            <span>{title}</span>
            {italic && (
              <>
                {' '}
                <span style={{ color: '#00B0FF' }}>{italic}</span>
              </>
            )}
          </h1>

          {subtitle && (
            <p
              className="text-[16px] sm:text-[18px] leading-[1.6] text-o-2 mb-8 sm:mb-10"
              style={{
                maxWidth: '58ch',
                marginLeft: isCenter ? 'auto' : undefined,
                marginRight: isCenter ? 'auto' : undefined,
              }}
            >
              {subtitle}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div
              className={`flex flex-col xs:flex-row sm:flex-row gap-3 ${
                isCenter ? 'justify-center' : ''
              }`}
            >
              {actions.map((a, i) => {
                const cls = a.primary ? 'btn-o btn-o-primary btn-o-lg' : 'btn-o btn-o-ghost btn-o-lg';
                if (a.href) {
                  return (
                    <a key={i} href={a.href} className={cls}>
                      {a.label}
                      {a.primary && <ArrowRight className="h-4 w-4" />}
                    </a>
                  );
                }
                return (
                  <button key={i} type="button" onClick={a.onClick} className={cls}>
                    {a.label}
                    {a.primary && <ArrowRight className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
