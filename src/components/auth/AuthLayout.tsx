import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#00B0FF]/6 rounded-full filter blur-[80px]" />

      <div className="relative max-w-md w-full space-y-8">
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <a href="/" className="inline-block mb-6">
              <img src="/images/hero/orbit-logo.png" alt="Orbit Student" className="h-10 mx-auto" />
            </a>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
