import React from 'react';
import SEO from '../components/SEO';

const Tools = () => {
  return (
    <>
      <SEO
        title="AI Tools for Kids | Orbit Student — 100+ AI Learning Tools"
        description="Access 100+ AI-powered learning tools for students aged 8-18. Orbit Student's AI toolkit includes business builders, pitch simulators, brand creators and more."
        keywords={['Orbit Student AI tools', 'AI tools for kids', 'AI learning tools', 'AI tools for students', 'kids AI platform', 'Orbit AI tools', 'student AI toolkit']}
        url="https://www.orbitstudent.com/tools"
      />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-mint-50 relative overflow-hidden py-16">
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-tr from-pink-200 via-yellow-100 to-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-tr from-mint-200 via-purple-100 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-mint-500 mb-6 drop-shadow-lg">Tools</h1>
        <div className="bg-white/80 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700">Explore our tools and resources.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Tools;