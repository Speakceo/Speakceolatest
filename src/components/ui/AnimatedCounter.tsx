import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "2,500+" or "98%" or "$2.9B+"
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, className = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const suffix = value.match(/[^0-9]*$/)?.[0] || '';
    const numStr = value.replace(/[^0-9.]/g, '');
    const target = parseFloat(numStr);

    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const hasDecimal = numStr.includes('.');
    const hasComma = value.includes(',');
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      let formatted: string;
      if (hasDecimal) {
        formatted = current.toFixed(1);
      } else {
        const rounded = Math.round(current);
        formatted = hasComma ? rounded.toLocaleString() : rounded.toString();
      }

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
    >
      {display}
    </motion.span>
  );
}
