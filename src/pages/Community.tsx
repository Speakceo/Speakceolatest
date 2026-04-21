import React from 'react';
import SEO from '../components/SEO';

const Community = () => {
  return (
    <>
      <SEO
        title="Student Community | Orbit Student — Young Entrepreneurs Network"
        description="Join the Orbit Student community of 2,500+ young entrepreneurs aged 8-18. Connect, collaborate, share ideas and grow together."
        keywords={['Orbit Student community', 'young entrepreneurs network', 'kids entrepreneur community', 'student community', 'Orbit Student peers']}
        url="https://www.orbitstudent.com/community"
      />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-mint-50 relative overflow-hidden py-16">
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-tr from-pink-200 via-yellow-100 to-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-tr from-mint-200 via-purple-100 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-mint-500 mb-6 drop-shadow-lg">Community</h1>
        <div className="bg-white/80 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700">Connect with our community.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Community;