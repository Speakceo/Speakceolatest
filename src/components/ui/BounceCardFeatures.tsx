import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export type BounceFeature = {
  title: string;
  description?: string;
  /** Short label shown inside the bouncing gradient panel */
  demoLabel?: string;
  /** Tailwind / CSS gradient classes for the demo zone */
  gradient?: string;
  icon?: ReactNode;
  /** Grid span hints — asymmetric layout */
  span?: 'sm' | 'md' | 'lg' | 'wide';
};

export type BounceCardFeaturesProps = {
  eyebrow?: string;
  headline: ReactNode;
  subcopy?: ReactNode;
  features: BounceFeature[];
  cta?: { label: string; href?: string; onClick?: () => void };
  className?: string;
};

const SPAN: Record<NonNullable<BounceFeature['span']>, string> = {
  sm: 'md:col-span-1 md:row-span-1',
  md: 'md:col-span-1 md:row-span-1',
  lg: 'md:col-span-1 md:row-span-2',
  wide: 'md:col-span-2 md:row-span-1',
};

const DEFAULT_GRADIENTS = [
  'from-[#0a4a7a] via-[#1876D2] to-[#00B0FF]',
  'from-[#0c2a3a] via-[#0e5a7a] to-[#34d399]',
  'from-[#1a1c24] via-[#243048] to-[#1876D2]',
  'from-[#0d2840] via-[#00B0FF]/70 to-[#1876D2]',
  'from-[#122018] via-[#1a4a3a] to-[#00B0FF]',
  'from-[#1c1428] via-[#1a3060] to-[#00B0FF]',
];

function BounceCard({
  feature,
  index,
}: {
  feature: BounceFeature;
  index: number;
}) {
  const span = feature.span ?? (index === 0 ? 'wide' : index === 1 ? 'lg' : 'md');
  const gradient = feature.gradient ?? DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ scale: 0.985, rotate: index % 2 === 0 ? 1.2 : -1.2 }}
      className={cn(
        'group relative overflow-hidden rounded-[1.35rem] border border-[var(--o-border-1)] bg-[var(--o-bg-2)] p-4 sm:p-5',
        'shadow-[var(--o-card-inset),var(--o-card-shadow)]',
        'cursor-default select-none',
        SPAN[span],
      )}
      style={{ transformOrigin: 'center' }}
    >
      <div
        className={cn(
          'relative mb-5 flex h-36 sm:h-44 items-end overflow-hidden rounded-[1.05rem] bg-gradient-to-br p-4',
          gradient,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.35), transparent 50%)',
          }}
        />
        <div
          className={cn(
            'relative z-[1] w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'translate-y-2 rotate-[-2deg] group-hover:-translate-y-2 group-hover:rotate-[2deg]',
            'shadow-[0_18px_40px_-20px_rgba(0,0,0,0.65)]',
          )}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 mb-1">
            Live preview
          </p>
          <p className="font-display text-[15px] sm:text-[16px] text-white leading-snug">
            {feature.demoLabel ?? feature.title}
          </p>
        </div>
        {feature.icon && (
          <div className="absolute top-3 right-3 z-[1] w-9 h-9 rounded-xl flex items-center justify-center bg-black/30 border border-white/10 text-[#00B0FF]">
            {feature.icon}
          </div>
        )}
      </div>

      <h3 className="text-[17px] sm:text-[18px] font-medium text-o-0 mb-1.5 tracking-tight">
        {feature.title}
      </h3>
      {feature.description && (
        <p className="text-[13.5px] text-o-2 leading-[1.55] max-w-[36ch]">{feature.description}</p>
      )}
    </motion.div>
  );
}

/**
 * Asymmetric bounce-card feature grid
 * (inspired by @uniquesonu/bounce-card-features on 21st.dev).
 */
export default function BounceCardFeatures({
  eyebrow,
  headline,
  subcopy,
  features,
  cta,
  className,
}: BounceCardFeaturesProps) {
  return (
    <section className={cn('section-o border-o-t', className)}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow-o mb-5">{eyebrow}</p>}
            <h2
              className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-5"
              style={{ letterSpacing: '-0.04em' }}
            >
              {headline}
            </h2>
            {subcopy && (
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[58ch]">{subcopy}</p>
            )}
          </div>

          {cta && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {cta.href ? (
                <Link to={cta.href} className="btn-o btn-o-primary btn-o-lg">
                  {cta.label}
                  <span className="btn-o-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ) : (
                <button type="button" onClick={cta.onClick} className="btn-o btn-o-primary btn-o-lg">
                  {cta.label}
                  <span className="btn-o-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              )}
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(240px,auto)] gap-4">
          {features.map((feature, i) => (
            <BounceCard key={`${feature.title}-${i}`} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
