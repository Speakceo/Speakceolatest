import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Typewriter from '../ui/Typewriter';

/**
 * PageHero — shared marketing hero.
 * Optional kinetic typewriter line (21st.dev inspired).
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
  /** Prefix before typewriter phrases — e.g. "Built for " */
  typewriterPrefix?: string;
  typewriterTexts?: string[];
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
  typewriterPrefix,
  typewriterTexts,
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
      <div className="absolute inset-x-0 top-0 h-[600px] glow-o opacity-80" />
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
          {eyebrow && <p className="eyebrow-o mb-6">{eyebrow}</p>}

          <h1
            className="font-display mb-5"
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

          {typewriterTexts && typewriterTexts.length > 0 && (
            <p
              className={`font-display text-[clamp(1.15rem,2.4vw,1.65rem)] text-o-2 mb-6 leading-snug ${
                isCenter ? 'mx-auto' : ''
              }`}
              style={{ maxWidth: '36ch', letterSpacing: '-0.02em' }}
            >
              {typewriterPrefix}
              <Typewriter
                as="span"
                className="text-[#00B0FF]"
                text={typewriterTexts}
                speed={50}
                deleteSpeed={28}
                waitTime={1500}
                initialDelay={300}
                cursorChar="_"
              />
            </p>
          )}

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
              className={`flex flex-col sm:flex-row gap-3 ${
                isCenter ? 'justify-center' : ''
              }`}
            >
              {actions.map((a, i) => {
                const cls = a.primary
                  ? 'btn-o btn-o-primary btn-o-lg'
                  : 'btn-o btn-o-ghost btn-o-lg';
                const icon = a.primary ? (
                  <span className="btn-o-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : null;
                if (a.href) {
                  return (
                    <a key={i} href={a.href} className={cls}>
                      {a.label}
                      {icon}
                    </a>
                  );
                }
                return (
                  <button key={i} type="button" onClick={a.onClick} className={cls}>
                    {a.label}
                    {icon}
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
