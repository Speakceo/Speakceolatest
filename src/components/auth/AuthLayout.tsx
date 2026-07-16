import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-o-0 text-o-0 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 glow-o opacity-70 pointer-events-none" />
      <div className="absolute inset-0 grid-o opacity-40 pointer-events-none" />

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle size="sm" />
      </div>

      <div className="relative max-w-md w-full space-y-8">
        <div className="card-o p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/hero/orbit-logo.png"
                alt="Orbit Student"
                className="orbit-logo-mark h-10 mx-auto opacity-90"
              />
            </Link>
            <h1 className="font-display text-[1.65rem] text-o-0 tracking-tight">{title}</h1>
            <p className="mt-2 text-[14px] text-o-2">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
