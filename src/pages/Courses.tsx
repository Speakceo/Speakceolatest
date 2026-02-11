import React from 'react';
import CoursesComponent from '../components/Courses';
import SEO from '../components/SEO';

const Courses = () => {
  return (
    <>
      <SEO
        title="Courses | Orbit Student - Young Entrepreneur Program"
        description="Explore our comprehensive program designed to develop young entrepreneurs ages 10-18 with hands-on learning, AI tools, and real projects."
        keywords={['courses', 'entrepreneurship program', 'young entrepreneur', 'AI learning', 'business education', 'kids courses']}
      />
      <div className="pt-16">
        <CoursesComponent />
      </div>
    </>
  );
};

export default Courses;
