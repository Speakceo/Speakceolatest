import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

export default function CTAButton({ 
  text, 
  onClick,
  href,
  size = 'large',
  variant = 'primary'
}: CTAButtonProps) {
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  // Variant classes - Light blue theme
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105',
    secondary: 'bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 shadow-sm hover:shadow-md hover:scale-105'
  };
  
  const buttonClasses = `
    inline-flex items-center justify-center
    ${sizeClasses[size]}
    font-semibold rounded-full
    ${variantClasses[variant]}
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    cursor-pointer group
  `;
  
  if (onClick) {
    return (
      <button onClick={onClick} className={buttonClasses}>
        {text}
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    );
  }
  
  return (
    <a href={href} className={buttonClasses}>
      {text}
      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  );
} 