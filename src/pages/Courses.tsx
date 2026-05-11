import React from 'react';
import CoursesComponent from '../components/Courses';
import SEO from '../components/SEO';

const Courses = () => {
  return (
    <>
      <SEO
        title="Orbit Student Courses | Young CEO & AI 8–18"
        description="180-day Young CEO programme, AI tools and live mentorship for ages 8–18. Browse modules and enrol at orbitstudent.com."
        keywords={['Orbit Student courses', 'Orbit Student program', 'Orbit Student curriculum', 'AI courses for kids', 'entrepreneurship program for kids', 'young entrepreneur course', 'AI learning course', 'business education for kids', 'kids courses online', 'coding for kids course', 'STEM courses for kids', 'young CEO program', 'Orbit Student classes', 'best online course for kids']}
        url="https://www.orbitstudent.com/courses"
      />
      <div className="pt-16">
        <CoursesComponent />
      </div>
    </>
  );
};

export default Courses;
