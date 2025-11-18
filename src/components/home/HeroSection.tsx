/* HMR Test - This should appear instantly if hot reloading works */
import React from 'react';
import { LucideIcon } from 'lucide-react';
import CTAButton from '../common/CTAButton';

// Updated interface to accept Lucide icons
interface HeroSectionProps {
  title: string;
  subtitle: string;
  features: { name: string; icon: LucideIcon }[];
  ctaText: string;
  heroImage: string;
}

export default function HeroSection({ title, subtitle, features, ctaText, heroImage }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 lg:mt-0 lg:mr-0 lg:right-0">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true" className="text-indigo-200 opacity-20">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-indigo-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-20 items-center">
          {/* Left content with improved spacing and contrast */}
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.1]">
              {title}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-light">
              {subtitle}
            </p>
            
            {/* Feature list with improved contrast and readability */}
            <div className="space-y-5 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center group">
                  <div className="flex-shrink-0 rounded-2xl p-3 text-white bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors duration-300">{feature.name}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-2">
              <CTAButton text={ctaText} size="large" variant="primary" />
              <a href="/learn-more" className="ml-6 text-indigo-700 font-medium hover:text-indigo-800 transition-colors">
                Learn more →
              </a>
            </div>
          </div>
          
          {/* Right content with improved image visibility */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-indigo-300 filter blur-3xl opacity-40"></div>
            </div>
            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-indigo-100">
              <img
                src={heroImage}
                alt="Hero illustration"
                className="max-h-[500px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 