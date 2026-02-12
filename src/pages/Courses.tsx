import React from 'react';
import CoursesComponent from '../components/Courses';
import SEO from '../components/SEO';

const Courses = () => {
  return (
    <>
      <SEO
        title="Orbit Student Courses | AI Learning & Entrepreneurship for Kids 8-18"
        description="Orbit Student courses: 180-day Young CEO Program, AI tools training, business skills, public speaking & leadership for kids 8-18. Enroll now."
        keywords={['Orbit Student courses', 'Orbit Student program', 'Orbit Student curriculum', 'AI courses for kids', 'entrepreneurship program for kids', 'young entrepreneur course', 'AI learning course', 'business education for kids', 'kids courses online', 'coding for kids course', 'STEM courses for kids', 'young CEO program', 'Orbit Student classes', 'best online course for kids']}
      />
      <div className="pt-16">
        <CoursesComponent />
      </div>
    </>
  );
};

export default Courses;
