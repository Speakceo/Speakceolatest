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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className={`
        ${sizeClasses[size]}
        relative z-10 shrink-0 rounded-full
        inline-flex items-center justify-center
        bg-[var(--o-chip-bg)] border border-[var(--o-border-1)]
        hover:border-[var(--o-border-2)] hover:bg-[var(--o-ghost-hover)]
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--o-accent-ring)]
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Moon className={`${iconSizes[size]} text-[#00B0FF]`} aria-hidden />
      ) : (
        <Sun className={`${iconSizes[size]} text-[#d97706]`} aria-hidden />
      )}
    </button>
  );
}
