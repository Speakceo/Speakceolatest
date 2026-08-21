import React from 'react';
import CoursesComponent from '../components/Courses';
import SEO from '../components/SEO';

const Courses = () => {
  return (
    <>
      <SEO
        title="Young CEO Programme & AI Courses for Kids 8–18 | Orbit"
        description="180-day Young CEO programme: live mentors, AI tools, entrepreneurship and scholarship prep for ages 8–18. Book a free demo."
        keywords={['Young CEO programme for kids', 'AI entrepreneurship for kids', 'Orbit Student courses', 'entrepreneurship classes for kids online', 'young entrepreneur course']}
        url="https://www.orbitstudent.com/courses/"
      />
      <div>
        <CoursesComponent />
      </div>
    </>
  );
};

export default Courses;
