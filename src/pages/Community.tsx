import React from 'react';
import { Users, MessageSquare, Globe, Trophy } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import { getActiveCohortLabel } from '../utils/cohortDates';

const stats = [
  { value: '2,500+', label: 'enrolled families' },
  { value: '35+', label: 'countries' },
  { value: '94%', label: 'active monthly' },
  { value: '4.9/5', label: 'community rating' },
];

const features = [
  { icon: Users, title: 'Cohort circles', desc: '18-student groups that meet every week throughout the programme.' },
  { icon: MessageSquare, title: 'Founder office hours', desc: 'Sundays. Open mic with mentors who have shipped real products.' },
  { icon: Globe, title: 'Global builds', desc: 'Cross-cohort projects with kids from 35+ countries.' },
  { icon: Trophy, title: 'Showcase nights', desc: 'Monthly. Live pitches. Real audiences. Real outcomes.' },
];

const Community = () => {
  const cohortLabel = getActiveCohortLabel();

  return (
    <>
      <SEO
        title="Student Community | Orbit Student — Young Entrepreneurs Network"
        description="Join the Orbit Student community of 2,500+ young entrepreneurs aged 8-18. Connect, collaborate, share ideas and grow together."
        keywords={['Orbit Student community', 'young entrepreneurs network', 'kids entrepreneur community', 'student community', 'Orbit Student peers']}
        url="https://www.orbitstudent.com/community"
      />

      <PageHero
        eyebrow={`Community · ${cohortLabel}`}
        title="2,500 young builders, "
        italic="building together."
        typewriterPrefix="A place to "
        typewriterTexts={['showcase builds', 'meet peers', 'join challenges', 'find mentors']}
        subtitle="Cohort circles, founder office hours and monthly showcase nights. Your child is never building alone."
        align="center"
        size="sm"
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        <section className="border-o-t bg-o-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-16">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-display text-[clamp(2.2rem,4.2vw,3rem)] text-o-0 mb-2" style={{ letterSpacing: '-0.04em' }}>{s.value}</p>
                  <p className="eyebrow-o">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-o-t">
              {features.map((f, i) => (
                <div key={i} className="card-o">
                  <f.icon className="h-4 w-4 text-[#00B0FF] mb-5" />
                  <p className="text-[16px] font-medium text-o-0 mb-2" style={{ letterSpacing: '-0.005em' }}>{f.title}</p>
                  <p className="text-[14px] text-o-2 leading-[1.55]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Community;
