import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative rounded-full
        bg-[var(--o-chip-bg)] border border-[var(--o-border-1)]
        hover:border-[var(--o-border-2)] hover:bg-[var(--o-ghost-hover)]
        transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--o-accent-ring)]
        transform hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="relative block w-full h-full">
        <Sun
          className={`
            ${iconSizes[size]}
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            text-[#d97706] transition-all duration-300
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
        <Moon
          className={`
            ${iconSizes[size]}
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            text-[#00B0FF] transition-all duration-300
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}
        />
      </span>
    </button>
  );
}
