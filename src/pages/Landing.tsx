import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, Shield, Star, Users } from 'lucide-react';
import SEO from '../components/SEO';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import LeadCaptureForm from '../components/forms/LeadCaptureForm';
import { LANDING_PAGES, LANDING_LIST, type LeadLandingData } from '../data/landingPages';

function LandingView({ data }: { data: LeadLandingData }) {
  const canonical = `https://www.orbitstudent.com${data.path}/`;

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        url={canonical}
      />
      <div className="min-h-[70vh] bg-o-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#00B0FF] mb-3">
                {data.eyebrow}
              </p>
              <h1
                className="font-display text-[clamp(2rem,4.5vw,3.25rem)] text-o-0 mb-4"
                style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
              >
                {data.h1}
              </h1>
              <p className="text-o-2 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                {data.subhead}
              </p>
              <ul className="space-y-2.5 mb-8">
                {data.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-o-1">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 text-[12px] text-o-3 mb-6">
                {data.proof.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5">
                    {p.includes('4.9') ? (
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                    ) : p.toLowerCase().includes('famil') ? (
                      <Users className="h-3.5 w-3.5 text-[#00B0FF]" />
                    ) : (
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                    )}
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-sm text-o-3">
                Prefer browsing?{' '}
                <Link to="/compare" className="text-[#1876D2] hover:underline">
                  Compare programmes
                </Link>
                {' · '}
                <Link to="/courses" className="text-[#1876D2] hover:underline">
                  Courses
                </Link>
              </p>
            </div>

            <div className="lg:sticky lg:top-28">
              <LeadCaptureForm
                source={data.source}
                ctaType={data.ctaType}
                title={data.formTitle}
                subtitle={data.formSubtitle}
                fields={['parentName', 'email', 'phone', 'childAge']}
                buttonText="Book free demo"
                compact
                className="w-full shadow-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const LandingHub: React.FC = () => (
  <>
    <SEO
      title="Orbit Student Landing Pages | Free Demo & Programme Offers"
      description="Campaign landing pages for Orbit Student free demos — AI classes, Young CEO and entrepreneurship for kids 8–18."
      keywords={['Orbit Student demo', 'AI classes for kids', 'Young CEO']}
      url="https://www.orbitstudent.com/lp/"
      noIndex
    />
    <div className="max-w-3xl mx-auto px-5 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-o-0 mb-6">Campaign landers</h1>
      <ul className="space-y-3">
        {LANDING_LIST.map((l) => (
          <li key={l.slug}>
            <Link to={`/lp/${l.slug}`} className="text-[#1876D2] hover:underline">
              {l.h1}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <CTAWithLeadCapture
          source="paid_ads"
          ctaType="lp_hub"
          buttonText="Book free demo"
          title="Book a free demo"
          fields={['parentName', 'email', 'phone', 'childAge']}
          size="sm"
        />
      </div>
    </div>
  </>
);

const LandingSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !LANDING_PAGES[slug]) return <Navigate to="/lp/free-demo" replace />;
  return <LandingView data={LANDING_PAGES[slug]} />;
};

export default LandingSlugPage;
