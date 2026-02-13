import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket, Lightbulb, Palette, Code, Megaphone, DollarSign,
  Trophy, Star, Zap, ArrowRight, ArrowLeft, Check, Lock,
  Users, TrendingUp, Target, BarChart, Gift, Crown,
  Sparkles, Play, ChevronRight, RefreshCw, Heart,
  Building, Globe, Briefcase, Award, ShoppingBag,
  PenTool, Mic, Brain, Shield, Coins, Gem, Map
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// STARTUP EMPIRE — Build Your Company From Zero to IPO
// A complete roleplay game with 6 stages and 24 missions
// ═══════════════════════════════════════════════════════════

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'action' | 'creative' | 'challenge';
  xpReward: number;
  coinReward: number;
  timeMinutes: number;
  content: MissionContent;
}

interface MissionContent {
  scenario: string;
  question?: string;
  options?: { id: string; text: string; correct?: boolean; impact?: string }[];
  task?: string;
  hint?: string;
}

interface Stage {
  id: number;
  name: string;
  tagline: string;
  icon: any;
  color: string;
  gradient: string;
  bgPattern: string;
  missions: Mission[];
  unlockRequirement: number; // missions completed in previous stage
}

interface CompanyState {
  name: string;
  industry: string;
  logo: string;
  revenue: number;
  customers: number;
  employees: number;
  valuation: number;
  reputation: number;
  level: number;
}

interface GameState {
  currentStage: number;
  completedMissions: string[];
  totalXP: number;
  totalCoins: number;
  streak: number;
  company: CompanyState;
  achievements: string[];
  startedAt: string;
}

const INDUSTRIES = [
  { name: 'Tech & Apps', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Food & Beverage', icon: '🍕', color: 'from-orange-500 to-red-500' },
  { name: 'Fashion & Style', icon: '👗', color: 'from-pink-500 to-purple-500' },
  { name: 'Gaming & Entertainment', icon: '🎮', color: 'from-violet-500 to-indigo-500' },
  { name: 'Education & Learning', icon: '📚', color: 'from-emerald-500 to-teal-500' },
  { name: 'Social Impact', icon: '🌍', color: 'from-green-500 to-lime-500' },
];

const STAGES: Stage[] = [
  {
    id: 1,
    name: 'The Idea Lab',
    tagline: 'Every Empire Starts With a Spark',
    icon: Lightbulb,
    color: '#FBBF24',
    gradient: 'from-amber-500 to-yellow-500',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(251,191,36,0.15) 0%, transparent 50%)',
    unlockRequirement: 0,
    missions: [
      {
        id: 's1m1', title: 'Find Your Problem', description: 'Every great business solves a real problem',
        type: 'creative', xpReward: 50, coinReward: 100, timeMinutes: 5,
        content: {
          scenario: 'You\'re walking through your neighborhood and notice that kids are always bored after school. There are no fun activities nearby. You think: "What if I could solve this?"',
          question: 'What\'s the FIRST thing a real entrepreneur does when they spot a problem?',
          options: [
            { id: 'a', text: 'Immediately build a product', impact: 'Too fast! You might build something nobody wants.' },
            { id: 'b', text: 'Talk to 10 people who have this problem', correct: true, impact: '🎯 Perfect! Customer discovery is the #1 skill. You learn that 8 out of 10 kids want creative workshops after school.' },
            { id: 'c', text: 'Google if someone else solved it', impact: 'Good instinct, but talking to real people gives you insights Google can\'t.' },
            { id: 'd', text: 'Write a business plan', impact: 'Plans are important, but they mean nothing without understanding the customer first.' },
          ],
        }
      },
      {
        id: 's1m2', title: 'Validate Your Idea', description: 'Test before you invest',
        type: 'challenge', xpReward: 75, coinReward: 150, timeMinutes: 5,
        content: {
          scenario: 'You\'ve talked to people and found a real problem. Now you have 3 business ideas. But which one should you pursue? A real founder tests ideas FAST and CHEAP.',
          question: 'You have $50 to test your idea. What\'s the smartest move?',
          options: [
            { id: 'a', text: 'Spend it all on a professional logo and website', impact: 'Looks nice, but you still don\'t know if people will pay.' },
            { id: 'b', text: 'Create a simple landing page and run $50 in ads', correct: true, impact: '🚀 Brilliant! You spend $50 on Instagram ads for a simple page. 47 people sign up for early access. That\'s REAL validation!' },
            { id: 'c', text: 'Buy materials and build the full product', impact: 'Too risky. What if nobody wants it? Test first, build later.' },
            { id: 'd', text: 'Save the money and just tell friends about it', impact: 'Friends will say "great idea!" to be nice. You need real market data.' },
          ],
        }
      },
      {
        id: 's1m3', title: 'Know Your Customer', description: 'Build a Customer Avatar',
        type: 'creative', xpReward: 100, coinReward: 200, timeMinutes: 8,
        content: {
          scenario: 'Great founders know their customer better than anyone. You need to build a "Customer Avatar" — a detailed profile of your perfect customer.',
          task: 'Answer these questions about your ideal customer:\n\n🎯 How old are they? (e.g., 12-16 year olds)\n🏠 Where do they live? (urban, suburban, rural)\n💰 How much can they spend? (allowance, parents\' budget)\n😤 What frustrates them most?\n🌟 What would make them say "TAKE MY MONEY"?',
          hint: 'The more specific you are, the easier it is to sell. "Everyone" is not a customer.',
        }
      },
      {
        id: 's1m4', title: 'Competitive Recon', description: 'Study your competition',
        type: 'quiz', xpReward: 75, coinReward: 150, timeMinutes: 5,
        content: {
          scenario: 'You discover 3 competitors already exist in your space. Some founders panic. Smart founders see opportunity.',
          question: 'Your competitor has 10,000 customers but terrible reviews about customer service. What do you do?',
          options: [
            { id: 'a', text: 'Give up — they\'re too big to compete with', impact: 'Never give up! Big companies with bad service are the EASIEST to beat.' },
            { id: 'b', text: 'Copy everything they do but make it cheaper', impact: 'Racing to the bottom on price is a losing strategy.' },
            { id: 'c', text: 'Focus on amazing customer service as your competitive advantage', correct: true, impact: '💎 Genius! You build a company known for incredible service. Their unhappy customers start switching to you. Within 6 months, you steal 15% of their market.' },
            { id: 'd', text: 'Ignore them and do your own thing', impact: 'Ignoring competitors is dangerous. Learn from their mistakes.' },
          ],
        }
      },
    ]
  },
  {
    id: 2,
    name: 'Brand HQ',
    tagline: 'Create an Identity That Sticks',
    icon: Palette,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(236,72,153,0.15) 0%, transparent 50%)',
    unlockRequirement: 3,
    missions: [
      {
        id: 's2m1', title: 'Name Your Startup', description: 'A name that people remember',
        type: 'creative', xpReward: 75, coinReward: 200, timeMinutes: 8,
        content: {
          scenario: 'Your company needs a name that\'s memorable, easy to spell, and tells people what you do. Think: Google, Nike, Tesla — short, powerful, iconic.',
          question: 'Which naming strategy do MOST successful startups use?',
          options: [
            { id: 'a', text: 'Long descriptive names (e.g., "The Best After-School Creative Workshop Company")', impact: 'Nobody can remember or type that!' },
            { id: 'b', text: 'Short, unique, easy-to-say names (max 2-3 syllables)', correct: true, impact: '🔥 Yes! Short names stick. Think: Uber, Airbnb, Stripe. Your company name should be something a 5-year-old can pronounce.' },
            { id: 'c', text: 'Use your own name (e.g., "Sarah\'s Business")', impact: 'Works for personal brands, but makes it harder to scale.' },
            { id: 'd', text: 'Just use random letters and numbers', impact: 'No emotional connection. Names should evoke a feeling.' },
          ],
        }
      },
      {
        id: 's2m2', title: 'Design Your Logo', description: 'Visual identity matters',
        type: 'creative', xpReward: 100, coinReward: 250, timeMinutes: 10,
        content: {
          scenario: 'Your logo is the face of your company. It appears on everything — website, business cards, t-shirts, product packaging.',
          task: 'Design your logo concept! Describe:\n\n🎨 What colors represent your brand? (max 2-3)\n✏️ What shape or symbol would you use?\n📝 What font style? (bold, playful, elegant, modern)\n💡 What feeling should people get when they see it?\n\nPro tip: The best logos are SIMPLE. Think Apple\'s apple, Nike\'s swoosh, Target\'s bullseye.',
          hint: 'Test your logo by showing it to 5 people for 3 seconds, then asking what they remember.',
        }
      },
      {
        id: 's2m3', title: 'Craft Your Pitch', description: 'Explain your business in 30 seconds',
        type: 'challenge', xpReward: 100, coinReward: 200, timeMinutes: 5,
        content: {
          scenario: 'You\'re in an elevator with a famous investor. You have 30 seconds. Go!',
          question: 'Which elevator pitch formula works best?',
          options: [
            { id: 'a', text: '"We do a lot of things for a lot of people..."', impact: 'Too vague. The investor falls asleep.' },
            { id: 'b', text: '"We help [WHO] do [WHAT] so they can [BENEFIT]"', correct: true, impact: '🎤 The investor\'s eyes light up! "We help kids aged 10-16 build real businesses so they can earn their first $1,000 before turning 18." Clear, specific, compelling. They hand you their card!' },
            { id: 'c', text: 'Start with all the technical details', impact: 'Investors care about the problem and market first, not tech.' },
            { id: 'd', text: '"Our app is like Uber but for..."', impact: 'The "X for Y" formula is overused. Be original.' },
          ],
        }
      },
      {
        id: 's2m4', title: 'Brand Story', description: 'People buy stories, not products',
        type: 'creative', xpReward: 75, coinReward: 200, timeMinutes: 8,
        content: {
          scenario: 'Nike doesn\'t sell shoes. They sell the feeling of being an athlete. Apple doesn\'t sell phones. They sell creativity and innovation. What does YOUR company sell?',
          task: 'Write your brand story using this framework:\n\n📖 THE ORIGIN: "I started [company] because..."\n😤 THE PROBLEM: "I saw that [target customers] were struggling with..."\n💡 THE SOLUTION: "So I built [product] that..."\n🌟 THE VISION: "Our dream is to..."\n\nMake it emotional. Make it real. Make it YOU.',
          hint: 'The best brand stories make people feel something. What emotion do you want to create?',
        }
      },
    ]
  },
  {
    id: 3,
    name: 'The Build',
    tagline: 'Ship Your MVP in Record Time',
    icon: Code,
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-500',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)',
    unlockRequirement: 3,
    missions: [
      {
        id: 's3m1', title: 'MVP Mindset', description: 'Build the simplest version first',
        type: 'quiz', xpReward: 75, coinReward: 150, timeMinutes: 5,
        content: {
          scenario: 'MVP = Minimum Viable Product. It\'s the simplest version of your product that lets you test if people will actually pay for it. Facebook started as a simple directory. Amazon started selling only books.',
          question: 'Your homework app idea has 50 features. How many should your MVP have?',
          options: [
            { id: 'a', text: 'All 50 — go big or go home!', impact: 'You\'d spend 2 years building and run out of money. 90% of startups fail this way.' },
            { id: 'b', text: '1-3 core features that solve the main problem', correct: true, impact: '🚀 Smart! You pick the ONE killer feature: AI homework help. You build it in 2 weeks. 200 students sign up. NOW you know what to build next based on real feedback.' },
            { id: 'c', text: 'Whatever is easiest to build', impact: 'Easy ≠ valuable. Build what customers need most, not what\'s easiest.' },
            { id: 'd', text: '10-15 features to show you\'re serious', impact: 'Still too many. Focus beats features every time.' },
          ],
        }
      },
      {
        id: 's3m2', title: 'Price It Right', description: 'What should you charge?',
        type: 'challenge', xpReward: 100, coinReward: 300, timeMinutes: 5,
        content: {
          scenario: 'Your product costs $5 to make. Your competitor charges $20. You need to set your price.',
          question: 'What\'s the smartest pricing strategy?',
          options: [
            { id: 'a', text: 'Charge $6 (just above cost) to undercut everyone', impact: 'Low prices signal low quality. You also can\'t afford marketing or growth.' },
            { id: 'b', text: 'Charge $25 with premium features and amazing service', correct: true, impact: '💰 Warren Buffett approved! You charge MORE because your service is BETTER. Customers perceive higher value. You make $20 profit per sale instead of $1. With 100 sales, that\'s $2,000 vs $100. Which founder are you?' },
            { id: 'c', text: 'Make it free and figure out money later', impact: 'Free is hard. You need revenue to survive. Even the best free apps have monetization plans.' },
            { id: 'd', text: 'Copy the competitor\'s exact price', impact: 'If you\'re the same price, why would anyone switch? Differentiate.' },
          ],
        }
      },
      {
        id: 's3m3', title: 'First Sale', description: 'Get your first paying customer',
        type: 'challenge', xpReward: 150, coinReward: 500, timeMinutes: 5,
        content: {
          scenario: 'Your MVP is ready. Now comes the hardest part — getting someone to actually PAY for it. Your first sale is the most important one.',
          question: 'How do you get your FIRST paying customer?',
          options: [
            { id: 'a', text: 'Post on social media and wait', impact: 'Waiting is not a strategy. You\'ll be waiting a long time.' },
            { id: 'b', text: 'Ask family and friends to buy it', impact: 'They\'ll buy to support you, but that\'s not real validation.' },
            { id: 'c', text: 'Directly message 50 people who have the problem and offer a beta deal', correct: true, impact: '🎉 YOU GOT YOUR FIRST SALE! You DM 50 people on Instagram. 12 respond. 5 want to learn more. 2 pay for your beta. Your first $50! You literally jump out of your chair. This feeling NEVER gets old.' },
            { id: 'd', text: 'Run expensive Facebook ads', impact: 'Don\'t burn money on ads until you know your message converts.' },
          ],
        }
      },
      {
        id: 's3m4', title: 'Customer Feedback Loop', description: 'Listen, iterate, improve',
        type: 'quiz', xpReward: 75, coinReward: 200, timeMinutes: 5,
        content: {
          scenario: 'Your first 10 customers give you feedback. 7 love Feature A. 3 want Feature B (which doesn\'t exist yet). 2 found a bug. 1 wants a refund.',
          question: 'What do you prioritize?',
          options: [
            { id: 'a', text: 'Build Feature B immediately since customers asked for it', impact: '3 out of 10 isn\'t strong enough demand. Get more data first.' },
            { id: 'b', text: 'Fix the bug, improve Feature A, then survey 50 more users about Feature B', correct: true, impact: '📊 Data-driven founder alert! You fix the bug (keeps existing customers happy), improve what\'s working (Feature A), and gather more data before building new things. Your retention rate hits 90%.' },
            { id: 'c', text: 'Ignore the feedback and build what you want', impact: 'The graveyard of startups is filled with founders who didn\'t listen.' },
            { id: 'd', text: 'Give the refund and panic', impact: 'One refund is normal. Don\'t let it shake your confidence.' },
          ],
        }
      },
    ]
  },
  {
    id: 4,
    name: 'Marketing Blitz',
    tagline: 'Get the World Talking About You',
    icon: Megaphone,
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-500',
    bgPattern: 'radial-gradient(circle at 80% 80%, rgba(139,92,246,0.15) 0%, transparent 50%)',
    unlockRequirement: 3,
    missions: [
      {
        id: 's4m1', title: 'Go Viral', description: 'Create content that spreads',
        type: 'challenge', xpReward: 100, coinReward: 300, timeMinutes: 5,
        content: {
          scenario: 'You have $0 marketing budget. But you have creativity and a phone. The biggest brands started with $0 marketing: Dropbox used referrals, Hotmail put "PS I love you" in emails.',
          question: 'Which $0 marketing strategy could get you 1,000 followers this month?',
          options: [
            { id: 'a', text: 'Post your product photo once a week', impact: 'Too boring, too infrequent. Nobody will notice.' },
            { id: 'b', text: 'Create a 30-day challenge on TikTok showing you building your startup from $0', correct: true, impact: '📱 VIRAL! Day 1: 50 views. Day 7: 500 views. Day 15: 5,000 views. Day 30: Your video showing the first $1,000 in sales gets 100K views. People LOVE following a real founder journey. You gain 3,200 followers and 47 paying customers — all for FREE.' },
            { id: 'c', text: 'Buy followers to look popular', impact: 'Fake followers don\'t buy anything. It actually hurts your algorithm.' },
            { id: 'd', text: 'Print flyers and hand them out at school', impact: 'Good hustle, but hard to scale beyond your school.' },
          ],
        }
      },
      {
        id: 's4m2', title: 'Build Your Army', description: 'Turn customers into ambassadors',
        type: 'quiz', xpReward: 100, coinReward: 250, timeMinutes: 5,
        content: {
          scenario: 'You have 50 happy customers. Each one knows at least 20 potential customers. That\'s 1,000 people you could reach — if your customers refer you.',
          question: 'What\'s the best referral program?',
          options: [
            { id: 'a', text: '"Tell your friends about us!" (no incentive)', impact: 'People need a reason to refer. Even good products need a push.' },
            { id: 'b', text: 'Give BOTH the referrer AND new customer $10 off', correct: true, impact: '🔥 Dropbox grew 3900% with this exact strategy! Your 50 customers each refer 2 friends. That\'s 100 new customers. Those 100 refer 2 more. 200 new customers. Your growth curve goes exponential.' },
            { id: 'c', text: 'Pay influencers $500 each to promote you', impact: 'Expensive and often low ROI. Genuine word-of-mouth beats paid promotion.' },
            { id: 'd', text: 'Spam everyone\'s DMs', impact: 'This will get you blocked and destroy your reputation.' },
          ],
        }
      },
      {
        id: 's4m3', title: 'Content Empire', description: 'Become the expert in your field',
        type: 'creative', xpReward: 75, coinReward: 200, timeMinutes: 8,
        content: {
          scenario: 'The biggest personal brands all have one thing in common: they create content consistently. Gary Vee, MrBeast, and every successful young entrepreneur post regularly.',
          task: 'Plan your content strategy for 1 week:\n\n📅 Monday: [What type of content?]\n📅 Tuesday: [What topic?]\n📅 Wednesday: [What format?]\n📅 Thursday: [Behind-the-scenes?]\n📅 Friday: [Customer story?]\n📅 Saturday: [Fun/personal?]\n📅 Sunday: [Reflection/tips?]\n\nUse this formula: 40% educational, 30% entertaining, 20% behind-the-scenes, 10% promotional',
          hint: 'Consistency beats quality. Post every day for 90 days and you\'ll see results.',
        }
      },
      {
        id: 's4m4', title: 'Partnership Power', description: 'Grow together with strategic partners',
        type: 'challenge', xpReward: 100, coinReward: 300, timeMinutes: 5,
        content: {
          scenario: 'A popular YouTuber with 50K subscribers in your niche offers to promote your product. They want either: A) $500 upfront, B) 20% of sales they generate, or C) Free products + affiliate link.',
          question: 'Which deal is best for a startup with limited cash?',
          options: [
            { id: 'a', text: 'Pay $500 upfront — get it done', impact: 'Risky. If the video flops, you lose $500 and get nothing.' },
            { id: 'b', text: '20% of sales — performance-based', impact: 'Better, but 20% of every sale forever is expensive as you scale.' },
            { id: 'c', text: 'Free products + affiliate link with 15% commission for 6 months', correct: true, impact: '🤝 Perfect deal! They\'re incentivized to promote well (commission), you don\'t pay upfront (zero risk), and the deal expires in 6 months. Their video drives 200 sales. You pay them $450 total — but ONLY because it worked.' },
            { id: 'd', text: 'Decline — you don\'t need influencers', impact: 'Influencer marketing is one of the highest-ROI channels. Don\'t dismiss it.' },
          ],
        }
      },
    ]
  },
  {
    id: 5,
    name: 'Investor Pitch',
    tagline: 'Raise Money Like a Pro',
    icon: DollarSign,
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-500',
    bgPattern: 'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.15) 0%, transparent 50%)',
    unlockRequirement: 3,
    missions: [
      {
        id: 's5m1', title: 'Pitch Deck Mastery', description: 'Build a deck that makes investors say YES',
        type: 'creative', xpReward: 150, coinReward: 400, timeMinutes: 10,
        content: {
          scenario: 'You\'ve been invited to pitch at a local startup competition. The judges include real investors. You need a 10-slide pitch deck.',
          task: 'Create your pitch deck outline:\n\n1️⃣ PROBLEM — What pain are you solving?\n2️⃣ SOLUTION — How do you solve it?\n3️⃣ MARKET SIZE — How big is the opportunity?\n4️⃣ PRODUCT — Show/demo your product\n5️⃣ TRACTION — What have you achieved so far?\n6️⃣ BUSINESS MODEL — How do you make money?\n7️⃣ COMPETITION — Why are you better?\n8️⃣ TEAM — Why can YOU win?\n9️⃣ FINANCIALS — Revenue, projections\n🔟 THE ASK — How much do you need and why?',
          hint: 'Investors see 100+ pitches a month. Make yours unforgettable. Start with a STORY, not data.',
        }
      },
      {
        id: 's5m2', title: 'Shark Tank Moment', description: 'Face tough investor questions',
        type: 'challenge', xpReward: 150, coinReward: 500, timeMinutes: 5,
        content: {
          scenario: 'You\'re on stage. Your pitch went great. Now the investors fire questions:\n\nInvestor: "Your competitor just raised $5 million. Why should I bet on YOU instead of them?"',
          question: 'How do you respond?',
          options: [
            { id: 'a', text: '"We\'re better because we work harder"', impact: 'That\'s not a competitive advantage. Everyone works hard.' },
            { id: 'b', text: '"Our unique advantage is [specific thing competitors can\'t copy] and we already have [traction metric]"', correct: true, impact: '🦈 The investors lean forward! You say: "While they raised $5M to sell to enterprises, we built the only product designed for teens — with 500 paying users and 90% retention. They can\'t copy our community culture." Offer: $100K for 10%!' },
            { id: 'c', text: '"I don\'t really follow the competition"', impact: 'Red flag! Investors want founders who know the landscape.' },
            { id: 'd', text: '"We just need more money to beat them"', impact: 'Money alone doesn\'t win. Strategy wins.' },
          ],
        }
      },
      {
        id: 's5m3', title: 'The Numbers Game', description: 'Master your financial metrics',
        type: 'quiz', xpReward: 100, coinReward: 300, timeMinutes: 5,
        content: {
          scenario: 'Investors LOVE numbers. They want to know your Unit Economics:\n• CAC (Customer Acquisition Cost) = How much to get 1 customer\n• LTV (Lifetime Value) = How much 1 customer pays total\n• MRR (Monthly Recurring Revenue) = Monthly income\n\nYour numbers: CAC = $10, LTV = $120, MRR = $3,000',
          question: 'An investor asks: "Is this a good business?" What\'s your answer?',
          options: [
            { id: 'a', text: '"I think so, we\'re making money"', impact: 'Too vague. Show them the math!' },
            { id: 'b', text: '"Our LTV:CAC ratio is 12:1 — meaning every $1 we spend on marketing returns $12 in revenue"', correct: true, impact: '📈 The investor\'s eyes go wide. An LTV:CAC ratio above 3:1 is considered excellent. Yours is 12:1. They say: "This is one of the best unit economics I\'ve seen from a student founder." Deal closes!' },
            { id: 'c', text: '"We\'ll figure out the numbers once we raise money"', impact: 'Instant rejection. Investors fund founders who understand their numbers.' },
            { id: 'd', text: '"Revenue isn\'t important right now, we\'re focused on growth"', impact: 'In 2024+, investors want profitable growth, not just growth.' },
          ],
        }
      },
      {
        id: 's5m4', title: 'Term Sheet Tactics', description: 'Negotiate like a CEO',
        type: 'challenge', xpReward: 125, coinReward: 400, timeMinutes: 5,
        content: {
          scenario: 'You get TWO offers:\n\n🅰️ Investor A: $100K for 30% of your company (values your company at $333K)\n🅱️ Investor B: $50K for 5% + free mentorship + connections (values your company at $1M)',
          question: 'Which deal do you take?',
          options: [
            { id: 'a', text: 'Investor A — more money is always better', impact: 'More money, but giving up 30% is massive. At exit, you\'d regret it.' },
            { id: 'b', text: 'Investor B — higher valuation + strategic value', correct: true, impact: '🏆 Master negotiator! Investor B believes in a $1M valuation (3x higher). Plus, their mentorship and connections are worth more than the extra $50K. They introduce you to 3 enterprise clients worth $200K in revenue. Best decision ever.' },
            { id: 'c', text: 'Counter Investor A: $100K for 10%', impact: 'Good instinct to negotiate! But Investor B\'s strategic value still wins.' },
            { id: 'd', text: 'Reject both and bootstrap', impact: 'Valid strategy, but smart money (with mentorship) can 10x your speed.' },
          ],
        }
      },
    ]
  },
  {
    id: 6,
    name: 'Empire Mode',
    tagline: 'Scale to Millions and Beyond',
    icon: Crown,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-amber-500',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)',
    unlockRequirement: 3,
    missions: [
      {
        id: 's6m1', title: 'Hire Your Dream Team', description: 'You can\'t scale alone',
        type: 'challenge', xpReward: 125, coinReward: 400, timeMinutes: 5,
        content: {
          scenario: 'Your company is growing fast. You need to hire. You can only afford ONE person right now. Who do you hire?',
          question: 'Your sales are good but you\'re drowning in work. First hire?',
          options: [
            { id: 'a', text: 'A CEO to run the company', impact: 'You ARE the CEO. Don\'t outsource your own job!' },
            { id: 'b', text: 'Someone to handle the task you\'re worst at and that takes the most time', correct: true, impact: '🎯 Smart! You hire a customer support person because you spend 4 hours/day on support. Now those 4 hours go to sales and product. Revenue jumps 40% in the first month. Your first employee becomes employee #1 — they\'ll tell this story forever.' },
            { id: 'c', text: 'An intern because they\'re cheap', impact: 'Interns need training and management. You need someone who can hit the ground running.' },
            { id: 'd', text: 'Nobody — keep doing everything yourself', impact: 'Burnout incoming. Every successful CEO learned to delegate.' },
          ],
        }
      },
      {
        id: 's6m2', title: 'Go Global', description: 'Expand to new markets',
        type: 'quiz', xpReward: 150, coinReward: 500, timeMinutes: 5,
        content: {
          scenario: 'You\'re crushing it in your home city. 500 customers, $10K/month revenue. A partner in another country wants to bring your product there.',
          question: 'How do you approach international expansion?',
          options: [
            { id: 'a', text: 'Launch in 10 countries at once — go big!', impact: 'Too fast. You\'ll spread too thin and fail everywhere.' },
            { id: 'b', text: 'Start with 1 new market, learn, then expand to others', correct: true, impact: '🌍 You pick one market and dominate it. You learn that customers there prefer subscription pricing (not one-time). You adapt. Revenue in the new market hits $5K/month in 3 months. Then you expand to 2 more countries using the same playbook.' },
            { id: 'c', text: 'Wait until you have $1M in revenue before going global', impact: 'Don\'t wait for perfection. Test and learn.' },
            { id: 'd', text: 'Let the partner handle everything', impact: 'You need skin in the game. Stay involved in strategy.' },
          ],
        }
      },
      {
        id: 's6m3', title: 'Crisis Management', description: 'When things go wrong — and they will',
        type: 'challenge', xpReward: 150, coinReward: 400, timeMinutes: 5,
        content: {
          scenario: '⚠️ CRISIS ALERT: Your website goes down for 6 hours. 200 customers complain on social media. A news outlet picks up the story. Your reputation is on the line.',
          question: 'What do you do FIRST?',
          options: [
            { id: 'a', text: 'Delete the negative comments', impact: 'NEVER delete criticism. It makes things 10x worse.' },
            { id: 'b', text: 'Ignore it — it\'ll blow over', impact: 'Silence is the worst response during a crisis.' },
            { id: 'c', text: 'Post a transparent apology, explain what happened, and offer compensation', correct: true, impact: '🛡️ Leadership moment! You post: "We messed up. Here\'s exactly what happened, what we\'re doing to fix it, and every affected customer gets a free month." The response is overwhelming: "THIS is how companies should handle problems." Your reputation actually IMPROVES. Crisis becomes your best marketing moment.' },
            { id: 'd', text: 'Blame the hosting company', impact: 'Customers don\'t care whose fault it is. They care how YOU handle it.' },
          ],
        }
      },
      {
        id: 's6m4', title: 'The Exit', description: 'Your empire, your choice',
        type: 'challenge', xpReward: 200, coinReward: 1000, timeMinutes: 5,
        content: {
          scenario: '🎊 CONGRATULATIONS! Your company is now worth $10 MILLION. You have 50,000 customers, 25 employees, and offices in 3 countries. A big corporation offers to buy your company.\n\nOffer: $15 Million cash.',
          question: 'What do you do?',
          options: [
            { id: 'a', text: 'Sell immediately — $15M is life-changing', impact: 'Valid choice! You walk away with $15M at age 18. Not bad at all. But the company could be worth $100M in 5 years...' },
            { id: 'b', text: 'Counter with $25M and negotiate', correct: true, impact: '🏆 EMPIRE BUILDER! You counter at $25M. They come back at $20M. You settle at $22M with a clause that keeps you as CEO for 2 years. At 18, you have $22M AND a job running your own company inside a bigger one. Five years later, you start your NEXT company. Because real entrepreneurs never stop.' },
            { id: 'c', text: 'Reject the offer and IPO instead', impact: 'Bold! IPOs are complex and risky. But if your growth continues, it could be worth $100M+. High risk, high reward.' },
            { id: 'd', text: 'Take the meeting but don\'t decide yet', impact: 'Smart to listen, but don\'t play games. Deals have windows.' },
          ],
        }
      },
    ]
  },
];

// ═══ HELPER: Get saved game state from localStorage ═══
function loadGameState(): GameState | null {
  try {
    const saved = localStorage.getItem('orbit_startup_empire');
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveGameState(state: GameState) {
  try {
    localStorage.setItem('orbit_startup_empire', JSON.stringify(state));
  } catch {}
}

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function StartupEmpire() {
  const [gamePhase, setGamePhase] = useState<'intro' | 'setup' | 'map' | 'mission' | 'result' | 'stage-complete'>('intro');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [creativeInput, setCreativeInput] = useState('');
  const [setupName, setSetupName] = useState('');
  const [setupIndustry, setSetupIndustry] = useState('');

  // Load saved game
  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      setGameState(saved);
      setGamePhase('map');
    }
  }, []);

  // Save game on state change
  useEffect(() => {
    if (gameState) saveGameState(gameState);
  }, [gameState]);

  // ═══ START NEW GAME ═══
  const startNewGame = () => setGamePhase('setup');

  const confirmSetup = () => {
    if (!setupName.trim() || !setupIndustry) return;
    const industry = INDUSTRIES.find(i => i.name === setupIndustry);
    const newState: GameState = {
      currentStage: 1,
      completedMissions: [],
      totalXP: 0,
      totalCoins: 500,
      streak: 0,
      company: {
        name: setupName.trim(),
        industry: setupIndustry,
        logo: industry?.icon || '🚀',
        revenue: 0,
        customers: 0,
        employees: 1,
        valuation: 0,
        reputation: 50,
        level: 1,
      },
      achievements: ['first_startup'],
      startedAt: new Date().toISOString(),
    };
    setGameState(newState);
    setGamePhase('map');
  };

  // ═══ MISSION LOGIC ═══
  const openMission = (mission: Mission) => {
    setActiveMission(mission);
    setSelectedAnswer(null);
    setShowResult(false);
    setCreativeInput('');
    setGamePhase('mission');
  };

  const submitAnswer = () => {
    if (!activeMission || !gameState) return;
    setShowResult(true);
  };

  const submitCreative = () => {
    if (!activeMission || !gameState || creativeInput.trim().length < 20) return;
    setShowResult(true);
  };

  const claimReward = () => {
    if (!activeMission || !gameState) return;
    const isCorrect = activeMission.content.options
      ? activeMission.content.options.find(o => o.id === selectedAnswer)?.correct
      : creativeInput.trim().length >= 20;
    
    const xpEarned = isCorrect ? activeMission.xpReward : Math.floor(activeMission.xpReward * 0.3);
    const coinsEarned = isCorrect ? activeMission.coinReward : Math.floor(activeMission.coinReward * 0.2);

    const updatedState: GameState = {
      ...gameState,
      completedMissions: [...gameState.completedMissions, activeMission.id],
      totalXP: gameState.totalXP + xpEarned,
      totalCoins: gameState.totalCoins + coinsEarned,
      streak: gameState.streak + 1,
      company: {
        ...gameState.company,
        revenue: gameState.company.revenue + (isCorrect ? coinsEarned * 10 : coinsEarned * 2),
        customers: gameState.company.customers + (isCorrect ? Math.floor(Math.random() * 50) + 10 : 5),
        reputation: Math.min(100, gameState.company.reputation + (isCorrect ? 5 : 1)),
        valuation: gameState.company.valuation + (isCorrect ? coinsEarned * 100 : coinsEarned * 20),
      }
    };

    // Check stage completion
    const currentStageMissions = STAGES[selectedStage - 1].missions;
    const completedInStage = currentStageMissions.filter(m => 
      updatedState.completedMissions.includes(m.id)
    ).length;

    if (completedInStage >= currentStageMissions.length && selectedStage < STAGES.length) {
      updatedState.currentStage = Math.max(updatedState.currentStage, selectedStage + 1);
      updatedState.company.level = updatedState.currentStage;
      updatedState.company.employees = updatedState.currentStage * 3;
    }

    setGameState(updatedState);
    setActiveMission(null);
    setGamePhase('map');
  };

  const resetGame = () => {
    localStorage.removeItem('orbit_startup_empire');
    setGameState(null);
    setGamePhase('intro');
  };

  const isMissionCompleted = (missionId: string) => gameState?.completedMissions.includes(missionId) || false;
  const isStageUnlocked = (stageId: number) => {
    if (stageId === 1) return true;
    if (!gameState) return false;
    return gameState.currentStage >= stageId;
  };

  const getStageProgress = (stageId: number) => {
    if (!gameState) return 0;
    const stage = STAGES[stageId - 1];
    const completed = stage.missions.filter(m => gameState.completedMissions.includes(m.id)).length;
    return (completed / stage.missions.length) * 100;
  };

  // ═══════════════════════════════════════════
  // RENDER: INTRO SCREEN
  // ═══════════════════════════════════════════
  if (gamePhase === 'intro') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Animated Logo */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-2xl shadow-orange-500/30">
              <Rocket className="w-14 h-14 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Startup <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Empire</span>
          </h1>
          <p className="text-gray-400 text-lg mb-2">Build Your Company From Zero to IPO</p>
          <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto">
            6 stages • 24 real-world missions • Make decisions that shape your empire
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-3 mb-10 max-w-lg mx-auto">
            {[
              { icon: Lightbulb, label: 'Real Scenarios', color: 'text-amber-400' },
              { icon: Target, label: 'Business Skills', color: 'text-blue-400' },
              { icon: Trophy, label: 'Earn XP & Coins', color: 'text-emerald-400' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 text-center"
              >
                <f.icon className={`w-6 h-6 mx-auto mb-1.5 ${f.color}`} />
                <span className="text-xs text-gray-400">{f.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewGame}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-shadow text-lg"
            >
              <Play className="w-5 h-5 inline mr-2" />
              Start Your Empire
            </motion.button>
            {loadGameState() && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setGameState(loadGameState()!); setGamePhase('map'); }}
                className="px-8 py-4 bg-white/[0.06] border border-white/[0.1] text-white font-semibold rounded-2xl hover:bg-white/[0.1] transition-colors"
              >
                Continue Empire
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // RENDER: COMPANY SETUP
  // ═══════════════════════════════════════════
  if (gamePhase === 'setup') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1876D2] to-[#00B0FF] mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Name Your Company</h2>
            <p className="text-gray-400">Choose wisely — this is the start of your legend</p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
              placeholder="e.g., NexGen, Sparkify, ZenByte..."
              maxLength={24}
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-lg"
            />
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-8">
            <label className="block text-sm font-semibold text-gray-300 mb-3">Choose Your Industry</label>
            <div className="grid grid-cols-2 gap-3">
              {INDUSTRIES.map(ind => (
                <motion.button
                  key={ind.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSetupIndustry(ind.name)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    setupIndustry === ind.name
                      ? 'bg-amber-500/20 border-amber-500/40 ring-2 ring-amber-500/30'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="text-2xl">{ind.icon}</span>
                  <span className="text-sm font-medium text-gray-200">{ind.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setGamePhase('intro')}
              className="px-6 py-3 bg-white/[0.06] border border-white/[0.1] text-gray-400 rounded-xl hover:bg-white/[0.1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={confirmSetup}
              disabled={!setupName.trim() || !setupIndustry}
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
            >
              Launch {setupName || 'My Company'} 🚀
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // RENDER: MISSION SCREEN
  // ═══════════════════════════════════════════
  if (gamePhase === 'mission' && activeMission && gameState) {
    const isQuiz = !!activeMission.content.options;
    const selectedOption = activeMission.content.options?.find(o => o.id === selectedAnswer);
    const isCorrect = selectedOption?.correct;

    return (
      <div className="max-w-3xl mx-auto p-4">
        {/* Back Button */}
        <button
          onClick={() => setGamePhase('map')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Map
        </button>

        {/* Mission Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${STAGES[selectedStage - 1].gradient} flex items-center justify-center`}>
              {activeMission.type === 'quiz' ? <Brain className="w-5 h-5 text-white" /> :
               activeMission.type === 'challenge' ? <Target className="w-5 h-5 text-white" /> :
               <PenTool className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{activeMission.title}</h2>
              <p className="text-gray-400 text-sm">{activeMission.description}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-lg">+{activeMission.xpReward} XP</span>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg">+{activeMission.coinReward} 🪙</span>
            </div>
          </div>

          {/* Scenario */}
          <div className="bg-slate-900/50 rounded-xl p-5 border border-white/[0.05]">
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">{activeMission.content.scenario}</p>
          </div>
        </motion.div>

        {/* Question or Task */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6"
        >
          {isQuiz ? (
            <>
              <h3 className="text-lg font-bold text-white mb-4">{activeMission.content.question}</h3>
              <div className="space-y-3">
                {activeMission.content.options?.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    whileHover={!showResult ? { scale: 1.01 } : undefined}
                    whileTap={!showResult ? { scale: 0.99 } : undefined}
                    onClick={() => !showResult && setSelectedAnswer(opt.id)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      showResult
                        ? opt.correct
                          ? 'bg-emerald-500/20 border-emerald-500/40'
                          : selectedAnswer === opt.id
                            ? 'bg-red-500/20 border-red-500/40'
                            : 'bg-white/[0.02] border-white/[0.05] opacity-50'
                        : selectedAnswer === opt.id
                          ? 'bg-amber-500/20 border-amber-500/40 ring-2 ring-amber-500/30'
                          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        showResult
                          ? opt.correct ? 'bg-emerald-500 text-white' : selectedAnswer === opt.id ? 'bg-red-500 text-white' : 'bg-white/[0.1] text-gray-500'
                          : selectedAnswer === opt.id ? 'bg-amber-500 text-white' : 'bg-white/[0.1] text-gray-400'
                      }`}>
                        {showResult ? (opt.correct ? '✓' : selectedAnswer === opt.id ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                      </span>
                      <div>
                        <p className="text-gray-200 font-medium">{opt.text}</p>
                        {showResult && (selectedAnswer === opt.id || opt.correct) && opt.impact && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`text-sm mt-2 ${opt.correct ? 'text-emerald-400' : 'text-red-400'}`}
                          >
                            {opt.impact}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white mb-2">✍️ Your Turn</h3>
              <p className="text-gray-300 mb-4 whitespace-pre-line">{activeMission.content.task}</p>
              {activeMission.content.hint && (
                <p className="text-amber-400/80 text-sm mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Pro Tip: {activeMission.content.hint}
                </p>
              )}
              <textarea
                value={creativeInput}
                onChange={(e) => setCreativeInput(e.target.value)}
                placeholder="Write your answer here... (minimum 20 characters)"
                rows={6}
                disabled={showResult}
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${creativeInput.length >= 20 ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {creativeInput.length}/20 minimum
                </span>
              </div>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl"
                >
                  <p className="text-emerald-400 font-medium">🎉 Great work! Your creative response has been recorded.</p>
                  <p className="text-emerald-400/70 text-sm mt-1">Real entrepreneurs constantly practice articulating their ideas — you're building that muscle right now!</p>
                </motion.div>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {!showResult ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={isQuiz ? submitAnswer : submitCreative}
                disabled={isQuiz ? !selectedAnswer : creativeInput.trim().length < 20}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
              >
                Submit Answer
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={claimReward}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Claim Reward & Continue →
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // RENDER: STAGE MAP (Main View)
  // ═══════════════════════════════════════════
  if (!gameState) return null;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Company Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
              {gameState.company.logo}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{gameState.company.name}</h2>
              <p className="text-gray-400 text-xs">{gameState.company.industry} • Level {gameState.company.level} CEO</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-center px-3">
              <p className="text-amber-400 font-bold text-sm">{gameState.totalXP.toLocaleString()}</p>
              <p className="text-gray-500 text-[10px]">XP</p>
            </div>
            <div className="text-center px-3 border-l border-white/[0.08]">
              <p className="text-yellow-400 font-bold text-sm">{gameState.totalCoins.toLocaleString()} 🪙</p>
              <p className="text-gray-500 text-[10px]">COINS</p>
            </div>
            <div className="text-center px-3 border-l border-white/[0.08]">
              <p className="text-emerald-400 font-bold text-sm">${(gameState.company.revenue).toLocaleString()}</p>
              <p className="text-gray-500 text-[10px]">REVENUE</p>
            </div>
            <div className="text-center px-3 border-l border-white/[0.08]">
              <p className="text-blue-400 font-bold text-sm">{gameState.company.customers.toLocaleString()}</p>
              <p className="text-gray-500 text-[10px]">CUSTOMERS</p>
            </div>
            <div className="text-center px-3 border-l border-white/[0.08]">
              <p className="text-purple-400 font-bold text-sm">${(gameState.company.valuation).toLocaleString()}</p>
              <p className="text-gray-500 text-[10px]">VALUATION</p>
            </div>
            <button
              onClick={resetGame}
              className="p-2 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
              title="Reset Game"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stage Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {STAGES.map(stage => {
          const unlocked = isStageUnlocked(stage.id);
          const progress = getStageProgress(stage.id);
          const StageIcon = stage.icon;
          return (
            <motion.button
              key={stage.id}
              whileHover={unlocked ? { scale: 1.03 } : undefined}
              whileTap={unlocked ? { scale: 0.97 } : undefined}
              onClick={() => unlocked && setSelectedStage(stage.id)}
              disabled={!unlocked}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border shrink-0 transition-all ${
                selectedStage === stage.id
                  ? `bg-gradient-to-r ${stage.gradient} border-transparent text-white shadow-lg`
                  : unlocked
                    ? 'bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08]'
                    : 'bg-white/[0.02] border-white/[0.04] text-gray-600 cursor-not-allowed'
              }`}
            >
              {!unlocked ? <Lock className="w-4 h-4" /> : <StageIcon className="w-4 h-4" />}
              <span className="text-sm font-semibold whitespace-nowrap">{stage.name}</span>
              {unlocked && progress > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  progress >= 100 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-white/20 text-white/70'
                }`}>
                  {Math.round(progress)}%
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Stage Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Stage Header */}
          <div className="relative rounded-2xl overflow-hidden mb-6" style={{ background: STAGES[selectedStage - 1].bgPattern }}>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${STAGES[selectedStage - 1].gradient} flex items-center justify-center shadow-lg`}>
                  {React.createElement(STAGES[selectedStage - 1].icon, { className: 'w-7 h-7 text-white' })}
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase">Stage {selectedStage} of 6</p>
                  <h3 className="text-2xl font-black text-white">{STAGES[selectedStage - 1].name}</h3>
                  <p className="text-gray-400 text-sm">{STAGES[selectedStage - 1].tagline}</p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getStageProgress(selectedStage)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${STAGES[selectedStage - 1].gradient}`}
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">
                {STAGES[selectedStage - 1].missions.filter(m => isMissionCompleted(m.id)).length} / {STAGES[selectedStage - 1].missions.length} missions complete
              </p>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STAGES[selectedStage - 1].missions.map((mission, idx) => {
              const completed = isMissionCompleted(mission.id);
              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={!completed ? { scale: 1.02, y: -2 } : undefined}
                  onClick={() => !completed && openMission(mission)}
                  className={`relative rounded-2xl p-5 border cursor-pointer transition-all ${
                    completed
                      ? 'bg-emerald-500/10 border-emerald-500/20 cursor-default'
                      : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]'
                  }`}
                >
                  {/* Mission Number Badge */}
                  <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    completed
                      ? 'bg-emerald-500 text-white'
                      : `bg-gradient-to-br ${STAGES[selectedStage - 1].gradient} text-white`
                  }`}>
                    {completed ? <Check className="w-4 h-4" /> : `${idx + 1}`}
                  </div>

                  <div className="ml-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        mission.type === 'quiz' ? 'bg-blue-500/20 text-blue-400' :
                        mission.type === 'challenge' ? 'bg-red-500/20 text-red-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {mission.type}
                      </span>
                      <span className="text-gray-500 text-[10px]">{mission.timeMinutes} min</span>
                    </div>
                    <h4 className={`font-bold mb-1 ${completed ? 'text-emerald-300' : 'text-white'}`}>{mission.title}</h4>
                    <p className="text-gray-400 text-sm">{mission.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-amber-400 text-xs font-semibold">+{mission.xpReward} XP</span>
                      <span className="text-yellow-400 text-xs font-semibold">+{mission.coinReward} 🪙</span>
                    </div>
                  </div>

                  {!completed && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Unlock Next Stage Message */}
          {getStageProgress(selectedStage) >= 100 && selectedStage < STAGES.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl text-center"
            >
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-amber-300 font-bold text-lg">Stage Complete! 🎉</p>
              <p className="text-amber-400/70 text-sm mt-1">You've unlocked Stage {selectedStage + 1}: {STAGES[selectedStage].name}</p>
              <button
                onClick={() => setSelectedStage(selectedStage + 1)}
                className="mt-3 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl text-sm"
              >
                Go to Next Stage →
              </button>
            </motion.div>
          )}

          {/* All Complete */}
          {gameState.completedMissions.length >= 24 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30 rounded-3xl text-center"
            >
              <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-black text-white mb-2">🏆 EMPIRE COMPLETE 🏆</h3>
              <p className="text-amber-300 text-lg mb-4">You built {gameState.company.name} from an idea to a ${gameState.company.valuation.toLocaleString()} empire!</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/[0.06] rounded-xl p-3">
                  <p className="text-2xl font-black text-amber-400">{gameState.totalXP.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Total XP</p>
                </div>
                <div className="bg-white/[0.06] rounded-xl p-3">
                  <p className="text-2xl font-black text-yellow-400">{gameState.totalCoins.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Coins Earned</p>
                </div>
                <div className="bg-white/[0.06] rounded-xl p-3">
                  <p className="text-2xl font-black text-emerald-400">${gameState.company.revenue.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Revenue</p>
                </div>
                <div className="bg-white/[0.06] rounded-xl p-3">
                  <p className="text-2xl font-black text-purple-400">{gameState.company.customers.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Customers</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
