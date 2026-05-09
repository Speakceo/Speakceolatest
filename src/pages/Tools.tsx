import React from 'react';
import { Brain, Image, FileText, MessageSquare, Code, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';

const tools = [
  { icon: Code, title: 'AI Website Builder', desc: 'Generate working websites from a single prompt.' },
  { icon: FileText, title: 'Pitch Writer', desc: 'Pitch decks and one-pagers in your child\'s voice.' },
  { icon: Image, title: 'Image Generator', desc: 'Brand assets, posters, mockups in seconds.' },
  { icon: MessageSquare, title: 'Speak Smart', desc: 'Practise speeches with real-time AI feedback.' },
  { icon: Brain, title: 'Math Mentor', desc: 'Patient, step-by-step problem walking.' },
  { icon: Sparkles, title: '+ 95 more', desc: 'Unlimited use across the entire toolkit.' },
];

const Tools = () => {
  return (
    <>
      <SEO
        title="AI Tools for Kids | Orbit Student — 100+ AI Learning Tools"
        description="Access 100+ AI-powered learning tools for students aged 8-18. Orbit Student's AI toolkit includes business builders, pitch simulators, brand creators and more."
        keywords={['Orbit Student AI tools', 'AI tools for kids', 'AI learning tools', 'AI tools for students', 'kids AI platform', 'Orbit AI tools', 'student AI toolkit']}
        url="https://www.orbitstudent.com/tools"
      />

      <PageHero
        eyebrow="§ AI tools · 100+ toolkit"
        title="An AI toolkit "
        italic="kids actually use."
        subtitle="Website builders, pitch writers, image generators, study coaches. Unlimited usage. Built for ages 8-18."
        align="center"
        size="sm"
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        <section className="border-o-t bg-o-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, i) => (
                <div key={i} className="card-o">
                  <tool.icon className="h-4 w-4 text-[#00B0FF] mb-7" />
                  <p className="text-[16px] font-medium text-o-0 mb-1.5" style={{ letterSpacing: '-0.01em' }}>
                    {tool.title}
                  </p>
                  <p className="text-[13.5px] text-o-2 leading-[1.55]">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tools;
