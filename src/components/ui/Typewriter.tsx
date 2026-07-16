import { ElementType, useEffect, useMemo, useState, type HTMLAttributes, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface TypewriterProps extends HTMLAttributes<HTMLElement> {
  text: string | string[];
  as?: ElementType;
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | ReactNode;
  cursorClassName?: string;
  cursorAnimationVariants?: {
    initial: Variants['initial'];
    animate: Variants['animate'];
  };
}

/**
 * Kinetic typewriter (inspired by @danielpetho/typewriter on 21st.dev).
 * Uses framer-motion — adapted for Orbit without the `motion` package.
 */
export default function Typewriter({
  text,
  as: Tag = 'span',
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = '_',
  cursorClassName = 'ml-0.5 text-[#00B0FF]',
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: 'reverse',
      },
    },
  },
  ...props
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textKey = Array.isArray(text) ? text.join('\0') : text;
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [textKey]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = texts[currentTextIndex] ?? '';

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false);
          if (currentTextIndex === texts.length - 1 && !loop) return;
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setCurrentIndex(0);
          timeout = setTimeout(() => {}, waitTime);
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1));
          }, deleteSpeed);
        }
      } else if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);
      } else if (texts.length > 1) {
        timeout = setTimeout(() => setIsDeleting(true), waitTime);
      }
    };

    if (currentIndex === 0 && !isDeleting && displayText === '') {
      timeout = setTimeout(startTyping, initialDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    displayText,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    texts,
    currentTextIndex,
    loop,
    initialDelay,
  ]);

  const hideCursor =
    hideCursorOnType &&
    (currentIndex < (texts[currentTextIndex]?.length ?? 0) || isDeleting);

  return (
    <Tag className={cn('inline whitespace-pre-wrap tracking-tight', className)} {...props}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          variants={cursorAnimationVariants}
          className={cn(cursorClassName, hideCursor ? 'hidden' : '')}
          initial="initial"
          animate="animate"
          aria-hidden
        >
          {cursorChar}
        </motion.span>
      )}
    </Tag>
  );
}
