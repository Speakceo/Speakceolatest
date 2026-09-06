import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, ExternalLink } from 'lucide-react';
import SEO from './SEO';
import PageHero from './common/PageHero';
import CTAWithLeadCapture from './CTAWithLeadCapture';
import type { ComparisonPageData } from '../data/comparisons';

type Props = { data: ComparisonPageData };

const ComparisonPageView: React.FC<Props> = ({ data }) => {
  const canonical = `https://www.orbitstudent.com${data.path}/`;
  const isAlternatives = Boolean(data.alternatives?.length);

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const itemListSchema = isAlternatives
    ? {
        '@type': 'ItemList',
        '@id': `${canonical}#list`,
        name: data.h1,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: data.alternatives!.length,
        itemListElement: data.alternatives!.map((alt, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: alt.name,
          url: alt.href || canonical,
        })),
      }
    : null;

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        url={canonical}
        structuredData={
          itemListSchema
            ? { '@context': 'https://schema.org', '@graph': [faqSchema, itemListSchema] }
            : { '@context': 'https://schema.org', ...faqSchema }
        }
        showFAQ={false}
      />

      <PageHero
        eyebrow={data.eyebrow}
        title={data.h1}
        subtitle={data.intro}
        size="sm"
        align="left"
        actions={[
          { label: 'Book free demo', href: '#compare-demo', primary: true },
          { label: 'View courses', href: '/courses' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pb-6">
        <p className="text-sm text-o-2">
          Affiliation disclosure: Orbit Student publishes this page. Competitor details are from
          public marketing sites as of {data.updatedLabel}. Always verify on{' '}
          <a
            href={data.competitorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1876D2] hover:underline inline-flex items-center gap-1"
          >
            {data.competitorName}
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>
      </div>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border border-[var(--o-border-1)] bg-o-1 p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-semibold text-o-0 mb-3">Quick verdict</h2>
          <p className="text-o-1 leading-relaxed mb-6">{data.verdict}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-2">
                Choose Orbit if
              </p>
              <ul className="space-y-2">
                {data.chooseOrbitIf.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-o-1">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-o-3 font-semibold mb-2">
                Choose {data.competitorName} if
              </p>
              <ul className="space-y-2">
                {data.chooseOtherIf.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-o-1">
                    <X className="h-4 w-4 text-o-3 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {!isAlternatives && data.rows.length > 0 && (
          <div className="mb-14 overflow-x-auto">
            <h2 className="text-xl font-semibold text-o-0 mb-4">Feature comparison</h2>
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[var(--o-border-1)]">
                  <th className="py-3 pr-4 font-semibold text-o-0">Factor</th>
                  <th className="py-3 pr-4 font-semibold text-[#1876D2]">Orbit Student</th>
                  <th className="py-3 font-semibold text-o-0">{data.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.factor} className="border-b border-[var(--o-border-0)]">
                    <td className="py-3.5 pr-4 font-medium text-o-0 align-top">{row.factor}</td>
                    <td className="py-3.5 pr-4 text-o-1 align-top">{row.orbit}</td>
                    <td className="py-3.5 text-o-1 align-top">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAlternatives && data.headToHeadRows && data.headToHeadRows.length > 0 && (
          <div className="mb-14 overflow-x-auto">
            <h2 className="text-xl font-semibold text-o-0 mb-4">
              Orbit Student vs {data.competitorName}
            </h2>
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[var(--o-border-1)]">
                  <th className="py-3 pr-4 font-semibold text-o-0">Metric</th>
                  <th className="py-3 pr-4 font-semibold text-[#1876D2]">Orbit Student</th>
                  <th className="py-3 font-semibold text-o-0">{data.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {data.headToHeadRows.map((row) => (
                  <tr key={row.factor} className="border-b border-[var(--o-border-0)]">
                    <td className="py-3.5 pr-4 font-medium text-o-0 align-top">{row.factor}</td>
                    <td className="py-3.5 pr-4 text-o-1 align-top">{row.orbit}</td>
                    <td className="py-3.5 text-o-1 align-top">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.seoSections?.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="text-xl font-semibold text-o-0 mb-3">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="text-o-1 leading-relaxed mb-3">
                {p}
              </p>
            ))}
          </section>
        ))}

        {isAlternatives && (
          <div className="mb-14 space-y-6">
            <h2 className="text-xl font-semibold text-o-0">Alternatives ranked by fit</h2>
            {data.alternatives!.map((alt, i) => (
              <article
                key={alt.name}
                className="rounded-2xl border border-[var(--o-border-1)] p-5 sm:p-6 bg-o-1"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <span className="text-xs font-semibold text-o-3">#{i + 1}</span>
                  <h3 className="text-lg font-semibold text-o-0">{alt.name}</h3>
                </div>
                <p className="text-sm text-[#1876D2] mb-3">{alt.bestFor}</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-o-0 mb-1">Strengths</p>
                    <ul className="space-y-1 text-o-2">
                      {alt.pros.map((p) => (
                        <li key={p}>· {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-o-0 mb-1">Trade-offs</p>
                    <ul className="space-y-1 text-o-2">
                      {alt.cons.map((c) => (
                        <li key={c}>· {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {alt.href && (
                  <a
                    href={alt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#1876D2] mt-4 hover:underline"
                  >
                    Visit site <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mb-14">
          <h2 className="text-xl font-semibold text-o-0 mb-4">FAQ</h2>
          <div className="space-y-4">
            {data.faqs.map((f) => (
              <div key={f.question} className="border-b border-[var(--o-border-0)] pb-4">
                <h3 className="font-medium text-o-0 mb-1.5">{f.question}</h3>
                <p className="text-sm text-o-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="text-xl font-semibold text-o-0 mb-3">Related comparisons</h2>
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
        </div>

        <div id="compare-demo">
          <CTAWithLeadCapture
            source="organic_search"
            ctaType={data.ctaType}
            buttonText="Book free demo"
            title="See if Orbit fits your child"
            subtitle="Parent details only. We confirm seats within 24 hours — no payment to book."
            formTitle="Book your free demo"
            formSubtitle="Tell us age and timezone — we reply within one business day."
            fields={['parentName', 'phone', 'email', 'childAge']}
            variant="primary"
            size="sm"
          />
        </div>
      </section>
    </>
  );
};

export default ComparisonPageView;
