import React from 'react';
import { BrainCircuit, DollarSign, TrendingUp, Terminal } from 'lucide-react';

export default function SkillsSection() {
  const skills = [
    {
      name: 'AI & Technology',
      description: 'Learn to use AI tools, coding basics, and understand technology trends.',
      icon: BrainCircuit,
      color: 'bg-[#1876D2]',
      iconColor: 'text-white'
    },
    {
      name: 'Financial Literacy',
      description: 'Master personal finance, business economics, and investment fundamentals.',
      icon: DollarSign,
      color: 'bg-[#1876D2]',
      iconColor: 'text-white'
    },
    {
      name: 'Marketing & Communication',
      description: 'Develop skills in storytelling, digital marketing, and persuasive communication.',
      icon: TrendingUp,
      color: 'bg-blue-600',
      iconColor: 'text-white'
    },
    {
      name: 'Problem Solving',
      description: 'Build frameworks for critical thinking, innovation, and decision making.',
      icon: Terminal,
      color: 'bg-violet-600',
      iconColor: 'text-white'
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden -mt-1">
      {/* Add subtle pattern background */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', 
        backgroundSize: '30px 30px',
        opacity: 0.3
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Section header with improved contrast and hierarchy */}
          <div className="lg:col-span-5">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold mb-6 border border-indigo-200">
              Future-proof skills
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Skills That Last a Lifetime
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 font-light">
              Master AI, money, and marketing — skills for life, not just for school.
            </p>
            <div>
              <a 
                href="/skills" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-2xl shadow-lg text-white bg-gradient-to-r from-[#1876D2] to-[#00B0FF] hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Explore all skills
              </a>
            </div>
          </div>
          
          {/* Skills grid with improved visual hierarchy and contrast */}
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="group flex flex-col h-full overflow-hidden rounded-3xl shadow-lg border border-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <div className={`p-6 bg-gradient-to-br ${skill.color.replace('bg-', 'from-')} to-slate-800 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <skill.icon className={`h-10 w-10 ${skill.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">{skill.name}</h3>
                    <p className="text-slate-600 leading-relaxed font-light">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 