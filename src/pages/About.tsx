import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Award, Heart, Shield, Trophy, Zap, Globe2, CheckCircle,
  ArrowRight, Mic, Lightbulb, Sparkles, Quote
} from 'lucide-react';
import EnrollmentPopup from '../components/EnrollmentPopup';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import BounceCardFeatures from '../components/ui/BounceCardFeatures';

const About = () => {
  const [showEnrollment, setShowEnrollment] = useState(false);

  const stats = [
    { label: 'Happy Families', value: '2,500+', icon: Heart, gradient: 'from-rose-400 to-pink-500' },
    { label: 'Success Rate', value: '98%', icon: Trophy, gradient: 'from-amber-400 to-orange-500' },
    { label: 'Countries', value: '35+', icon: Globe2, gradient: 'from-[#1876D2] to-[#00B0FF]' },
    { label: 'Expert Mentors', value: '50+', icon: Users, gradient: 'from-emerald-400 to-teal-500' },
  ];

  const achievements = [
    { title: 'Featured in Forbes', desc: '"Revolutionary approach to youth entrepreneurship"', year: '2024' },
    { title: 'EdTech Innovation Award', desc: 'Best Youth Development Platform', year: '2023' },
    { title: 'Parent Choice Gold', desc: 'Highest rated program for character development', year: '2023' },
  ];

  const parentWorries = [
    { worry: 'Will my child be too young?', answer: 'Our curriculum is designed for ages 8-16 with age-appropriate modules that grow with your child.', icon: Users },
    { worry: 'Is this just screen time?', answer: 'No! We focus on real-world application, hands-on projects, and building genuine confidence.', icon: Zap },
    { worry: 'What if my child is shy?', answer: 'Perfect! Many of our most successful students started as shy kids. We specialize in building confidence gradually.', icon: Heart },
    { worry: 'Is it worth the investment?', answer: 'Parents see results within 2 weeks. Plus, we offer a 30-day money-back guarantee.', icon: Shield },
  ];

  return (
    <>
      <SEO
        title="About Orbit Student | Our Mission to Transform Kids into Future Leaders"
        description="Orbit Student: AI-powered edtech platform for kids 8-18. Learn about our mission, team, and why 2,500+ families trust Orbit Student for entrepreneurship & AI education."
        keywords={['about Orbit Student', 'Orbit Student mission', 'Orbit Student team', 'Orbit Student story', 'who is Orbit Student', 'Orbit Student founder', 'Orbit Student review', 'AI edtech for kids', 'best edtech platform for kids', 'Orbit Student about us']}
        url="https://www.orbitstudent.com/about"
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        {/* ═══ HERO — Unified Linear dark ═══ */}
        <PageHero
          eyebrow="About · Our story"
          title="From one child's question to a"
          italic="global movement."
          typewriterPrefix="Built for kids who "
          typewriterTexts={['ask why', 'want to lead', 'build things', 'speak up', 'dream big']}
          subtitle="A curious 12-year-old named Aarav asked: why don't we learn how to speak like leaders or build real businesses in school? That question built Orbit — a programme for kids like Aarav."
          actions={[
            { label: 'Start free trial', onClick: () => setShowEnrollment(true), primary: true },
            { label: 'Read the manifesto', href: '#mission' },
          ]}
          align="center"
          size="md"
        />

        <BounceCardFeatures
          eyebrow="What we stand for"
          headline={
            <>
              Four muscles every <span style={{ color: '#00B0FF' }}>young leader trains.</span>
            </>
          }
          subcopy="Public speaking, entrepreneurship, AI fluency and mentorship — practiced live, not watched."
          cta={{ label: 'Start free trial', onClick: () => setShowEnrollment(true) }}
          features={[
            {
              title: 'Public speaking',
              description: 'Confidence through real games, pitches and showcases — not theory.',
              demoLabel: 'Pitch night live',
              span: 'wide',
              image: '/images/hero/orbit-kids-banner.jpg',
              imageAlt: 'Students practicing public speaking live',
              icon: <Mic className="w-4 h-4" />,
            },
            {
              title: 'Entrepreneurship',
              description: 'Build, ship and sell from day one with founder mentors.',
              demoLabel: 'Ship a product',
              span: 'lg',
              image: '/images/courses/startup-fundamentals.jpg',
              imageAlt: 'Students building startup projects',
              icon: <Lightbulb className="w-4 h-4" />,
            },
            {
              title: 'AI fluency',
              description: 'Command tools — so kids create with AI instead of competing with it.',
              demoLabel: '100+ AI studio tools',
              span: 'md',
              image: '/images/hero/orbit-kids-laptop.jpg',
              imageAlt: 'Student learning AI tools on a laptop',
              icon: <Sparkles className="w-4 h-4" />,
            },
            {
              title: 'Mentorship',
              description: 'Weekly access to founders who have actually shipped ventures.',
              demoLabel: '50+ founder mentors',
              span: 'md',
              image: '/images/hero/success-story.jpg',
              imageAlt: 'Mentor working with a young entrepreneur',
              icon: <Users className="w-4 h-4" />,
            },
          ]}
        />

        {/* ═══ IN THE ROOM — programme photography ═══ */}
        <section className="section-o border-o-t bg-o-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-10 sm:mb-14"
            >
              <p className="eyebrow-o mb-5">In the room</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] mb-4" style={{ letterSpacing: '-0.04em' }}>
                Classrooms that feel like <span style={{ color: '#00B0FF' }}>build studios.</span>
              </h2>
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[56ch]">
                From pitch nights to product launches — this is what Orbit looks like when the cameras are on.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  src: '/images/hero/main-hero.jpg',
                  alt: 'Orbit students collaborating in a live session',
                  caption: 'Live cohort energy',
                },
                {
                  src: '/assets/kids-play-store.jpg',
                  alt: 'A student project live on the app store',
                  caption: 'Projects that ship',
                },
                {
                  src: '/images/courses/marketing-sales.jpg',
                  alt: 'Marketing and storytelling practice',
                  caption: 'Sell & tell drills',
                },
              ].map((shot, i) => (
                <motion.figure
                  key={shot.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="relative overflow-hidden rounded-2xl border border-[var(--o-border-1)] aspect-[4/5] sm:aspect-[3/4]"
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/90">
                      {shot.caption}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ STATS — unified dark ═══ */}
        <section className="border-o-t bg-o-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-16">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <p className="font-display text-[clamp(2.4rem,4.5vw,3.4rem)] text-o-0 mb-2" style={{ letterSpacing: '-0.04em' }}>
                    {s.value}
                  </p>
                  <p className="eyebrow-o">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 border-o-t">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="card-o"
                >
                  <Award className="h-4 w-4 text-[#00B0FF] mb-5" />
                  <p className="text-[15.5px] font-medium text-o-0 mb-1.5" style={{ letterSpacing: '-0.005em' }}>
                    {a.title}
                  </p>
                  <p className="text-[13.5px] text-o-2 mb-4 leading-[1.5]">{a.desc}</p>
                  <span className="font-mono text-[11px] tracking-[0.06em] text-[#00B0FF]">{a.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MISSION — quiet, with mono divider ═══ */}
        <section id="mission" className="section-o border-o-t bg-o-0">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="eyebrow-o mb-6">Manifesto</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-6" style={{ letterSpacing: '-0.045em', lineHeight: 1.05 }}>
                Orbit isn't a class. <span style={{ color: '#00B0FF' }}>It's an adventure in confidence.</span>
              </h2>
              <p className="text-[17px] text-o-2 mb-10 leading-[1.65] max-w-[60ch] mx-auto">
                From Delhi to Dubai, from small towns to big cities, our young CEOs are launching
                bake sales, eco-campaigns, sticker startups and podcasts. We exist to raise the next
                generation of speakers, thinkers, and doers — one confident child at a time.
              </p>
              <div className="card-o text-left max-w-2xl mx-auto">
                <Quote className="h-5 w-5 text-[#00B0FF] mb-5" />
                <p className="text-[18px] text-o-0 leading-[1.55] mb-3" style={{ letterSpacing: '-0.005em' }}>
                  "If your child has a voice, a dream, or just a spark — Orbit is where it begins."
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-o-3">— The Orbit team</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ PARENT CONCERNS — unified dark ═══ */}
        <section className="section-o border-o-t bg-o-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-14 sm:mb-20">
              <p className="eyebrow-o mb-5">Parent concerns</p>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)]" style={{ letterSpacing: '-0.04em' }}>
                We understand <span style={{ color: '#00B0FF' }}>what worries you.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parentWorries.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="card-o"
                >
                  <item.icon className="h-4 w-4 text-[#00B0FF] mb-5" />
                  <p className="text-[16.5px] font-medium text-o-0 mb-2.5" style={{ letterSpacing: '-0.005em' }}>
                    "{item.worry}"
                  </p>
                  <p className="text-[14.5px] text-o-2 leading-[1.6]">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA — unified dark ═══ */}
        <section className="section-o relative overflow-hidden border-o-t bg-o-0">
          <div className="absolute inset-0 glow-o opacity-80" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="eyebrow-o mb-6">Join us</p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] mb-6" style={{ letterSpacing: '-0.045em', lineHeight: 1.0 }}>
                Ready to transform your child's <span style={{ color: '#00B0FF' }}>future?</span>
              </h2>
              <p className="text-[17px] text-o-2 mb-10 leading-[1.6] max-w-xl mx-auto">
                Join 2,500+ families who have already seen the transformation. Your child's journey starts here.
              </p>
              <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary btn-o-lg">
                Start your child's journey
                <span className="btn-o-icon">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[12.5px] text-o-2">
                <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#10b981]" /> 30-day refund</span>
                <span className="font-mono">·</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#00B0FF]" /> 2,500+ families</span>
                <span className="font-mono">·</span>
                <span className="inline-flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-[#00B0FF]" /> Forbes featured</span>
              </div>
            </motion.div>
          </div>
        </section>

        {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
      </div>
    </>
  );
};

export default About;
