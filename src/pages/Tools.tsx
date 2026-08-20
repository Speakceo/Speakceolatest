import React from 'react';
import { Brain, Image, FileText, MessageSquare, Code, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import BounceCardFeatures from '../components/ui/BounceCardFeatures';

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
        url="https://www.orbitstudent.com/tools/"
      />

      <PageHero
        eyebrow="AI tools · 100+ toolkit"
        title="An AI toolkit "
        italic="kids actually use."
        typewriterPrefix="Build with "
        typewriterTexts={['Website Builder', 'Pitch Writer', 'Image Generator', 'Study Coach']}
        subtitle="Website builders, pitch writers, image generators, study coaches. Unlimited usage. Built for ages 8-18."
        align="center"
        size="sm"
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        <BounceCardFeatures
          eyebrow="Toolkit"
          headline={<>Tools kids ship with <span style={{ color: '#00B0FF' }}>every week.</span></>}
          subcopy="Not toys — production-feeling builders for websites, pitches, brands and study systems."
          features={tools.map((tool, i) => ({
            title: tool.title,
            description: tool.desc,
            demoLabel: tool.title,
            span: i === 0 ? 'wide' : i === 1 ? 'lg' : 'md',
            icon: <tool.icon className="w-4 h-4" />,
          }))}
        />
      </div>
    </>
  );
};

export default Tools;
