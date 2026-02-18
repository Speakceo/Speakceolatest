import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for one full loop
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className={`flex gap-8 whitespace-nowrap w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection,
        }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
