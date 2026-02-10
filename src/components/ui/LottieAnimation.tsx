import React, { lazy, Suspense } from 'react';

const Player = lazy(() =>
  import('@lottiefiles/react-lottie-player').then((mod) => ({ default: mod.Player }))
);

interface LottieAnimationProps {
  src: string;
  className?: string;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

/**
 * Premium Lottie animation wrapper with lazy loading + graceful fallback.
 * Use local paths like "/animations/rocket.json" for reliable loading.
 */
export default function LottieAnimation({
  src,
  className = '',
  speed = 1,
  loop = true,
  autoplay = true,
  style,
}: LottieAnimationProps) {
  return (
    <Suspense
      fallback={
        <div className={`flex items-center justify-center ${className}`} style={style}>
          <div className="w-6 h-6 border-2 border-[#1876D2]/30 border-t-[#1876D2] rounded-full animate-spin" />
        </div>
      }
    >
      <div className={className} style={style}>
        <Player
          autoplay={autoplay}
          loop={loop}
          src={src}
          speed={speed}
          style={{ width: '100%', height: '100%' }}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
        />
      </div>
    </Suspense>
  );
}
