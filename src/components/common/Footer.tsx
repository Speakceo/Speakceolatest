import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActiveCohortLabel } from '../../utils/cohortDates';
import { submitMarketingLeadToSupabase } from '../../lib/marketingLeads';

/**
 * Footer — Linear-grade dark.
 * Single design language with the rest of the site.
 *   • bg uses --o-bg-0 (deepest), divider hairlines via --o-border-0
 *   • Inter Variable, weight 510 for emphasis
 *   • mono uppercase section labels (eyebrow-o)
 *   • single Orbit blue accent on hover and the subscribe button
 */

const linkCls =
  'block text-[14px] text-o-2 hover:text-o-0 transition-colors duration-150 leading-[2]';

export default function Footer() {
  const cohortLabel = getActiveCohortLabel();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [subMsg, setSubMsg] = useState('');

  const onSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setSubStatus('err');
      setSubMsg('Enter a valid email.');
      return;
    }
    setSubStatus('loading');
    const out = await submitMarketingLeadToSupabase({
      name: 'Newsletter',
      email: trimmed,
      source: 'newsletter',
      notes: 'Footer Sunday email subscribe',
    });
    if (out.ok) {
      setSubStatus('ok');
      setSubMsg('You’re on the list — thanks.');
      setEmail('');
    } else {
      setSubStatus('err');
      setSubMsg(out.error || 'Could not subscribe. Try again.');
    }
  };

  return (
    <footer className="relative bg-o-0">
      {/* Hairline top divider */}
      <div className="h-px" style={{ background: 'var(--o-border-0)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10">
        {/* Big mast — Linear-style restrained statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 sm:mb-20 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow-o mb-5">Orbit Student · {year}</p>
            <h2
              className="font-display text-[clamp(2.2rem,5vw,4rem)] text-o-0"
              style={{ letterSpacing: '-0.045em', lineHeight: 1.02 }}
            >
              Where young minds <span style={{ color: '#00B0FF' }}>become leaders.</span>
            </h2>
          </div>

          {/* Subscribe — minimal hairline form */}
          <div className="lg:col-span-5">
            <p className="eyebrow-o mb-3">Subscribe</p>
            <p className="text-[14px] text-o-2 leading-[1.6] mb-6 max-w-[44ch]">
              One Sunday email. New essays, scholarship deadlines, and projects our students are
              shipping. No filler.
            </p>
            <form className="flex items-center gap-2" onSubmit={onSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                required
                className="flex-1 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-lg px-3.5 h-10 text-[14px] text-o-0 placeholder:text-o-3 transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={subStatus === 'loading'}
                className="btn-o btn-o-primary"
                style={{ height: 40 }}
              >
                <ArrowRight size={16} />
              </button>
            </form>
            <p className="meta-line mt-3">
              {subStatus === 'ok' || subStatus === 'err' ? subMsg : 'We respect your inbox. Unsubscribe anytime.'}
            </p>
          </div>
        </div>

        {/* Hairline */}
        <div className="h-px mb-12 sm:mb-16" style={{ background: 'var(--o-border-0)' }} />

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/images/hero/orbit-logo.png"
                alt="Orbit Student"
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1) opacity(0.92)' }}
              />
            </Link>
            <div className="flex gap-1.5">
              {[
                { Icon: Facebook, href: 'https://facebook.com/orbitstudent', label: 'Facebook' },
                { Icon: Twitter, href: 'https://twitter.com/orbitstudent', label: 'Twitter' },
                { Icon: Instagram, href: 'https://instagram.com/orbitstudent', label: 'Instagram' },
                { Icon: Youtube, href: 'https://www.youtube.com/@orbitstudent', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={label}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-o-2 hover:text-o-0 hover:border-[var(--o-border-2)] transition-all duration-200 border border-[var(--o-border-1)]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow-o mb-5">Programme</p>
            <Link to="/courses" className={linkCls}>Courses</Link>
            <Link to="/demo" className={linkCls}>Live Demo</Link>
            <Link to="/live-classes" className={linkCls}>Live Classes</Link>
            <Link to="/events" className={linkCls}>Events</Link>
            <Link to="/community" className={linkCls}>Community</Link>
          </div>

          <div>
            <p className="eyebrow-o mb-5">Library</p>
            <Link to="/blog" className={linkCls}>Blog</Link>
            <Link to="/compare" className={linkCls}>Compare programmes</Link>
            <Link to="/resources" className={linkCls}>Resources</Link>
            <Link to="/testimonials" className={linkCls}>Stories</Link>
            <Link to="/faq" className={linkCls}>FAQ</Link>
            <Link to="/tools" className={linkCls}>AI Tools</Link>
          </div>

          <div>
            <p className="eyebrow-o mb-5">Studio</p>
            <Link to="/about" className={linkCls}>About</Link>
            <Link to="/partnerships" className={linkCls}>Partnerships</Link>
            <Link to="/contact" className={linkCls}>Contact</Link>
            <a href="/llms.txt" className={linkCls}>LLMs.txt</a>
            <a href="mailto:contact@orbitstudent.com" className={linkCls}>Press</a>
            <a href="mailto:careers@orbitstudent.com" className={linkCls}>Careers</a>
          </div>

          <div>
            <p className="eyebrow-o mb-5">Account</p>
            <Link to="/login" className={linkCls}>Sign in</Link>
            <Link to="/dashboard" className={linkCls}>Dashboard</Link>
            <Link to="/privacy" className={linkCls}>Privacy</Link>
            <Link to="/terms" className={linkCls}>Terms</Link>
            <Link to="/cookies" className={linkCls}>Cookies</Link>
          </div>
        </div>

        {/* Hairline */}
        <div className="h-px mt-14 mb-6" style={{ background: 'var(--o-border-0)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="meta-line">
            &copy; {new Date().getFullYear()} Orbit Student. Made with care for young minds.
          </p>
          <p className="meta-line">
            {cohortLabel} · {year} · Mumbai · Remote
          </p>
        </div>
      </div>
    </footer>
  );
}
