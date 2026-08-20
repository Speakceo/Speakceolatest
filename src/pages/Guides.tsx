import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import { GUIDE_PAGES, GUIDE_LIST, type GuidePageData } from '../data/guides';

function GuideView({ data }: { data: GuidePageData }) {
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
        type="article"
        structuredData={faqSchema}
      />
      <PageHero
        eyebrow={data.eyebrow}
        title={data.h1}
        subtitle={data.intro}
        size="sm"
        align="left"
        actions={[
          { label: 'Book free demo', href: '#guide-demo', primary: true },
          { label: 'All guides', href: '/guides' },
        ]}
      />
      <article className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pb-16">
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
          <h2 className="text-xl font-semibold text-o-0 mb-3">Related</h2>
          <ul className="flex flex-wrap gap-3">
            {data.related.map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href.replace(/\/$/, '') || r.href}
                  className="inline-flex items-center gap-1 text-sm text-[#1876D2] hover:underline"
                >
                  {r.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div id="guide-demo">
          <CTAWithLeadCapture
            source="organic_search"
            ctaType={data.ctaType}
            buttonText="Book free demo"
            title="Ready to try a live cohort?"
            subtitle="Parent details only — we confirm seats within 24 hours."
            fields={['parentName', 'email', 'phone', 'childAge']}
            variant="primary"
            size="sm"
          />
        </div>
      </article>
    </>
  );
}

export const GuidesHub: React.FC = () => (
  <>
    <SEO
      title="Parent Guides | AI, Entrepreneurship & Young CEO | Orbit Student"
      description="Long-form parent guides on AI classes for kids, entrepreneurship programmes, Young CEO paths and scholarship portfolios. Free Orbit demo."
      keywords={[
        'AI classes for kids',
        'entrepreneurship classes for kids',
        'Young CEO programme',
        'scholarship portfolio kids',
      ]}
      url="https://www.orbitstudent.com/guides/"
    />
    <PageHero
      eyebrow="Parent guides"
      title="Guides for choosing the right programme"
      subtitle="Practical checklists for AI classes, entrepreneurship cohorts, Young CEO paths and scholarship portfolios."
      size="sm"
      actions={[{ label: 'Book free demo', href: '#guides-hub-demo', primary: true }]}
    />
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pb-16">
      <ul className="space-y-4 mb-14">
        {GUIDE_LIST.map((g) => (
          <li key={g.slug}>
            <Link
              to={`/guides/${g.slug}`}
              className="block rounded-2xl border border-[var(--o-border-1)] bg-o-1 p-5 hover:border-[#1876D2]/40 transition-colors"
            >
              <span className="text-lg font-semibold text-o-0 flex items-center gap-2">
                {g.h1}
                <ArrowRight className="h-4 w-4 text-[#1876D2]" />
              </span>
              <p className="text-sm text-o-2 mt-1 line-clamp-2">{g.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div id="guides-hub-demo">
        <CTAWithLeadCapture
          source="organic_search"
          ctaType="guides_hub"
          buttonText="Book free demo"
          title="Questions after reading?"
          subtitle="Book a free demo — we map age, goals and timezone."
          fields={['parentName', 'email', 'phone', 'childAge']}
          size="sm"
        />
      </div>
    </div>
  </>
);

const GuideSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !GUIDE_PAGES[slug]) return <Navigate to="/guides" replace />;
  return <GuideView data={GUIDE_PAGES[slug]} />;
};

export default GuideSlugPage;
