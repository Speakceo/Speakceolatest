import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import ComparisonPageView from '../components/ComparisonPageView';
import { COMPARISONS, COMPARISON_LIST } from '../data/comparisons';

/** Hub: /compare */
export const CompareHub: React.FC = () => (
  <>
    <SEO
      title="Compare Orbit Student | vs PlanetSpark, BrightCHAMPS & Alternatives"
      description="Parent-facing comparisons: Orbit Student vs PlanetSpark, vs BrightCHAMPS, plus BrightCHAMPS and PlanetSpark alternatives. Book a free demo."
      keywords={[
        'Orbit Student vs PlanetSpark',
        'Orbit Student vs BrightCHAMPS',
        'BrightCHAMPS alternatives',
        'PlanetSpark alternatives',
        'AI entrepreneurship for kids',
      ]}
      url="https://www.orbitstudent.com/compare/"
    />
    <PageHero
      eyebrow="Compare programmes"
      title="Orbit vs other kids’ skill platforms"
      subtitle="Fair, parent-focused comparisons so you can match the outcome — speaking, coding, or young-founder AI — before you book a demo."
      size="sm"
      actions={[{ label: 'Book free demo', href: '#compare-hub-demo', primary: true }]}
    />
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pb-16">
      <ul className="space-y-4 mb-14">
        {COMPARISON_LIST.map((c) => (
          <li key={c.slug}>
            <Link
              to={`/compare/${c.slug}`}
              className="block rounded-2xl border border-[var(--o-border-1)] bg-o-1 p-5 hover:border-[#1876D2]/40 transition-colors"
            >
              <span className="text-lg font-semibold text-o-0 flex items-center gap-2">
                {c.h1}
                <ArrowRight className="h-4 w-4 text-[#1876D2]" />
              </span>
              <p className="text-sm text-o-2 mt-1 line-clamp-2">{c.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div id="compare-hub-demo">
        <CTAWithLeadCapture
          source="organic_search"
          ctaType="compare_hub"
          buttonText="Book free demo"
          title="Still deciding?"
          subtitle="Book a free Orbit demo — we map age, goals and timezone in one call."
          fields={['parentName', 'phone', 'email', 'childAge']}
          variant="primary"
          size="sm"
        />
      </div>
    </div>
  </>
);

/** Dynamic: /compare/:slug */
const CompareSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !COMPARISONS[slug]) {
    return <Navigate to="/compare" replace />;
  }
  return <ComparisonPageView data={COMPARISONS[slug]} />;
};

export default CompareSlugPage;
