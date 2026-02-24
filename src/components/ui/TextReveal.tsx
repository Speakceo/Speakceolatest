import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
}: TextRevealProps) {
  const words = text.split(' ');

  return (
    <>
      {/* Desktop: word-by-word slide-up reveal */}
      <span className={`hidden sm:inline ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: delay + i * staggerDelay,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>

      {/* Mobile: simple fade-up (no per-word clip to avoid line-break issues) */}
      <motion.span
        className={`sm:hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {text}
      </motion.span>
    </>
  );
}
