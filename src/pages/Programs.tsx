import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import { PROGRAM_PAGES, PROGRAM_LIST, type ProgramPageData } from '../data/programs';

function ProgramView({ data }: { data: ProgramPageData }) {
  const canonical = `https://www.orbitstudent.com${data.path}/`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        url={canonical}
        type="website"
        structuredData={faqSchema}
        courseData={{
          name: data.h1,
          provider: 'Orbit Student',
          description: data.intro,
          duration: 'P180D',
          price: '299',
        }}
      />
      <PageHero
        eyebrow={data.eyebrow}
        title={data.h1}
        subtitle={data.intro}
        size="sm"
        align="left"
        actions={[
          { label: 'Join the next AI cohort', href: '#program-demo', primary: true },
          { label: 'All programmes', href: '/programs/' },
        ]}
      />
      <article className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pb-16">
        {data.syllabus && data.syllabus.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-o-0 mb-3">Programme syllabus overview</h2>
            <ol className="space-y-2 text-sm text-o-1 list-decimal pl-5">
              {data.syllabus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        )}

        {data.outcomes && data.outcomes.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-o-0 mb-4">Outcome metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.outcomes.map((o) => (
                <div
                  key={o.label}
                  className="rounded-xl border border-[var(--o-border-1)] bg-o-1 p-4 text-center"
                >
                  <p className="text-2xl font-semibold text-[#1876D2]">{o.value}</p>
                  <p className="text-xs text-o-2 mt-1">{o.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.portfolioShowcase && data.portfolioShowcase.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-o-0 mb-4">Portfolio showcase</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.portfolioShowcase.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-[var(--o-border-1)] bg-o-1 p-4"
                >
                  <h3 className="font-medium text-o-0 mb-1">{item.title}</h3>
                  <p className="text-sm text-o-2">{item.desc}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {data.sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="text-xl font-semibold text-o-0 mb-3">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-o-1 leading-relaxed mb-3">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 space-y-1.5 text-sm text-o-1 list-disc pl-5">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-o-0 mb-4">FAQ</h2>
          <div className="space-y-4">
            {data.faqs.map((f) => (
              <div key={f.question} className="border-b border-[var(--o-border-0)] pb-4">
                <h3 className="font-medium text-o-0 mb-1">{f.question}</h3>
                <p className="text-sm text-o-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-o-0 mb-3">Related programmes</h2>
          <ul className="flex flex-wrap gap-3">
            {data.related.map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href.endsWith('/') ? r.href.slice(0, -1) : r.href}
                  className="inline-flex items-center gap-1 text-sm text-[#1876D2] hover:underline"
                >
                  {r.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div id="program-demo">
          <CTAWithLeadCapture
            source="organic_search"
            ctaType={data.ctaType}
            buttonText="Join the next AI cohort"
            title="Book a risk-free trial class"
            subtitle="Parent details only — we confirm cohort seats and timezone within 24 hours."
            fields={['parentName', 'phone', 'email', 'childAge']}
            variant="primary"
            size="sm"
          />
        </div>
      </article>
    </>
  );
}

export const ProgramsHub: React.FC = () => (
  <>
    <SEO
      title="Orbit Programmes | AI, Teen Founders & Coding for Kids 8–18"
      description="Dedicated programme pages: AI for kids, teen startup bootcamps and hands-on coding — live mentor cohorts, not passive video libraries."
      keywords={[
        'AI classes for kids',
        'startup bootcamp teens',
        'hands-on coding teens',
        'Orbit Student programmes',
      ]}
      url="https://www.orbitstudent.com/programs/"
    />
    <PageHero
      eyebrow="Programmes"
      title="Live cohorts by age and outcome"
      subtitle="Expand your search footprint without changing the core app — each track links back to the same mentor-led Young CEO journey."
      size="sm"
      actions={[{ label: 'Join the next AI cohort', href: '#programs-hub-demo', primary: true }]}
    />
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pb-16">
      <ul className="space-y-4 mb-14">
        {PROGRAM_LIST.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/programs/${p.slug}`}
              className="block rounded-2xl border border-[var(--o-border-1)] bg-o-1 p-5 hover:border-[#1876D2]/40 transition-colors"
            >
              <span className="text-lg font-semibold text-o-0 flex items-center gap-2">
                {p.h1}
                <ArrowRight className="h-4 w-4 text-[#1876D2]" />
              </span>
              <p className="text-sm text-o-2 mt-1 line-clamp-2">{p.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div id="programs-hub-demo">
        <CTAWithLeadCapture
          source="organic_search"
          ctaType="programs_hub"
          buttonText="Join the next AI cohort"
          title="Not sure which track fits?"
          subtitle="Book a free demo — we map age, goals and timezone in one call."
          fields={['parentName', 'phone', 'email', 'childAge']}
          variant="primary"
          size="sm"
        />
      </div>
    </div>
  </>
);

const ProgramSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !PROGRAM_PAGES[slug]) {
    return <Navigate to="/programs/" replace />;
  }
  return <ProgramView data={PROGRAM_PAGES[slug]} />;
};

export default ProgramSlugPage;
