export const projects = [
  {
    id: 'valley-somm',
    title: 'Valley Somm',
    description: 'Full-stack AI wine trip planner with 41 enriched wineries, personalized quiz-to-itinerary pipeline via Claude Sonnet 4, Google Routes optimization, PDF + web delivery, Stripe payments, auto-generated blog, and 3 autonomous agents keeping data fresh and marketing on autopilot.',
    category: 'Wine & Hospitality',
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'Claude AI', 'Google Routes', 'Stripe', 'Vercel'],
    status: 'Live',
    url: 'https://valleysomm.com',
    image: '🍷',
    featured: true
  },
  {
    id: 'hours-to-impact',
    title: 'HoursToImpact',
    description: 'Volunteer management platform that makes logging activities effortless. Features gamification, ML-powered engagement prediction, and real-time impact dashboards.',
    category: 'Nonprofit & Social Impact',
    techStack: ['React', 'Node.js', 'ML/Analytics', 'Mobile-first'],
    status: 'Live',
    url: 'https://hourstoimpact.com',
    image: '⏱️',
    featured: true
  },
  {
    id: 'route-ref',
    title: 'RouteRef',
    description: 'Service territory lookup tool for field service companies. Instantly find which driver covers any location with a single click on an interactive map.',
    category: 'Field Service & Logistics',
    techStack: ['React', 'Mapping APIs', 'Node.js', 'Real-time'],
    status: 'Live',
    url: 'https://routeref.com',
    image: '🗺️',
    featured: true
  },
  {
    id: 'fret-unlock',
    title: 'FretUnlock',
    description: 'Free guitar practice tool for intermediate players. Break out of pentatonic boxes with focused exercises for melodic phrasing, target tones, and position escapes.',
    category: 'Music & Education',
    techStack: ['React', 'Web Audio', 'Interactive UI', 'PWA'],
    status: 'Live',
    url: 'https://fretunlock.com',
    image: '🎸',
    featured: true
  }
];

export const techCategories = [
  {
    name: 'Frontend Development',
    technologies: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'PWA'],
    icon: '💻'
  },
  {
    name: 'Data & Analytics',
    technologies: ['D365', 'Power BI', 'SQL Server', 'Python', 'Data Visualization'],
    icon: '📊'
  },
  {
    name: 'Backend & Infrastructure',
    technologies: ['Node.js', 'Supabase', 'Firebase', 'Vercel', 'API Design'],
    icon: '⚡'
  },
  {
    name: 'AI & Machine Learning',
    technologies: ['OpenAI API', 'Claude API', 'Anthropic', 'LangChain', 'Embeddings'],
    icon: '🤖'
  }
];

// Agent-created builds from Foundry (nightly autonomous builder)
export const agentBuilds = [
  {
    id: 'fretflow',
    title: 'FretFlow',
    description: 'Interactive guitar scale visualizer with audio playback. See scales come alive on the fretboard.',
    category: 'Music & Education',
    techStack: ['React', 'Tailwind CSS', 'Web Audio API'],
    status: 'Live',
    url: 'https://foundry-fretflow.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-01-28',
    image: '🎸'
  },
  {
    id: 'ydp-portfolio',
    title: 'YDP Portfolio Hub',
    description: 'The portfolio that builds itself - showcasing 4 live products and the autonomous AI agents that create new ones nightly. Working applications across wine, nonprofits, field service & music education.',
    category: 'Business & Portfolio',
    techStack: ['React', 'Vite', 'Tailwind CSS'],
    status: 'Live',
    url: 'https://ydp-portfolio.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-01-29',
    image: '💼'
  },
  {
    id: 'founder-office-hours',
    title: 'Founder Office Hours',
    description: 'Book free 30-minute mentorship sessions with experienced founders. Smart scheduling, email confirmations, and real-time booking management.',
    category: 'Creator & Mentorship',
    techStack: ['React', 'Tailwind CSS', 'EmailJS', 'date-fns'],
    status: 'Live',
    url: 'https://code-omega-fawn.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-01-30',
    image: '🕐'
  },
  {
    id: 'waiting-room-companion',
    title: 'Waiting Room Companion',
    description: 'Never forget another question at the doctor. Transform appointment anxiety into confidence with smart question preparation, structured note-taking, and professional visit summaries. Privacy-first healthcare tool.',
    category: 'Healthcare & Wellness',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'jsPDF'],
    status: 'Live',
    url: 'https://waiting-room-companion.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-01-31',
    image: '/images/waiting-room-icon.svg'
  },
  {
    id: 'data-roi-calculator',
    title: 'DataROI Calculator',
    description: 'Professional ROI analysis for data investments. Industry-specific calculations with real multipliers, five core metrics, and executive-ready PDF reports. No signup required.',
    category: 'Business & Analytics',
    techStack: ['HTML', 'JavaScript', 'Chart.js', 'jsPDF'],
    status: 'Live',
    url: 'https://data-roi-calculator.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-01-31',
    image: '📊'
  },
  {
    id: 'ccw',
    title: 'CCW: Carnage Championship Wrestling',
    description: 'Browser-based 2D arcade wrestling game celebrating hardcore/deathmatch wrestling in the style of ECW. Features grapples, weapons (chairs, flaming tables), career mode, AI opponents, and full mobile touch controls.',
    category: 'Gaming & Entertainment',
    techStack: ['Phaser 3', 'JavaScript', 'Vite', 'Ludo AI'],
    status: 'Live',
    url: 'https://ccwrestling-ydp.vercel.app',
    builtBy: 'Claude Code',
    builtOn: '2026-02-01',
    image: '/images/ccw-logo.webp'
  },
  {
    id: 'route-clear',
    title: 'Route Clear',
    description: 'IED detection game honoring Husky VMMD operators. Navigate routes and identify threats in this tribute to the soldiers who keep convoys safe.',
    category: 'Gaming & Entertainment',
    techStack: ['JavaScript', 'Vite', 'Canvas'],
    status: 'Live',
    url: 'https://route-clear.vercel.app',
    builtBy: 'Claude Code',
    builtOn: '2026-02-01',
    image: '🎖️'
  },
  {
    id: 'd365-batch-monitor',
    title: 'D365 Batch Job Monitor',
    description: 'Real-time monitoring dashboard for critical D365 batch jobs. Color-coded status indicators, actual OData API integration, and mobile-responsive design for D365 administrators.',
    category: 'Analytics & Enterprise',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D365 OData API'],
    status: 'Live',
    url: 'https://d365-batch-monitor.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-02',
    image: '📊'
  },
  {
    id: 'rss-redirect-resolver',
    title: 'RSS Redirect Resolver',
    description: 'Stop wrestling with RSS redirect URLs. Instantly decode Google News RSS feeds and resolve redirect URLs to their original sources. Perfect for automation workflows and data scraping.',
    category: 'Developer Tools & Automation',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Vercel Serverless Functions', 'RSS-Parser'],
    status: 'Live',
    url: 'https://foundry-rss-redirect-resolver.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-03',
    image: '🔗'
  },
  {
    id: 'resonance-sinus-timer',
    title: 'Resonance - Sinus Relief Timer',
    description: 'Science-backed sinus relief through guided humming therapy. Precise 130Hz tone generation based on clinical research, with dual protocols (5min Quick, 60min Intensive), session tracking, and streak motivation.',
    category: 'Healthcare & Wellness',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Web Audio API'],
    status: 'Live',
    url: 'https://foundry-resonance-sinus-timer.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-04',
    image: '🎵'
  },
  {
    id: 'vetbot',
    title: 'VetBot',
    description: 'Stop AI tools from breaking in production. Systematic validation framework with quantitative scoring, failure pattern detection, and professional reports. Get 0-100 readiness scores in 15-30 minutes.',
    category: 'Developer Tools & Automation',
    techStack: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Vite'],
    status: 'Live',
    url: 'https://foundry-vetbot.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-05',
    image: '🤖'
  },
  {
    id: 'portfolio-pulse',
    title: 'PortfolioPulse',
    description: 'Finally understand WHY your portfolio moved today. Get AI-powered explanations that connect stock movements to real events, earnings, and market shifts—not just confusing numbers.',
    category: 'Fintech & Analytics',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Alpha Vantage API', 'NewsAPI', 'Claude AI'],
    status: 'Live',
    url: 'https://portfolio-movement-explainer.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-06',
    image: '📊'
  },
  {
    id: 'marketing-data-skills-navigator',
    title: 'Marketing Data Skills Navigator',
    description: 'Stop waiting for data. Interactive Python tutorials for marketers that turn hours of manual work into minutes of automation. Real datasets, browser-based execution, 9+ hours saved per week.',
    category: 'Education & Marketing',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Pyodide', 'Python'],
    status: 'Live',
    url: 'https://marketing-data-skills-navigator.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-10',
    image: '📊'
  },
  {
    id: 'funnel-forge',
    title: 'FunnelForge',
    description: 'Stop paying $97/month for funnel builders. Build professional landing pages with conversion-tested templates, export static HTML files you own forever. Free, no subscriptions, no platform lock-in.',
    category: 'Marketing & Business Tools',
    techStack: ['Vanilla JavaScript', 'Tailwind CSS', 'JSZip'],
    status: 'Live',
    url: 'https://funnel-forge-ashen.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-11',
    image: '⚡'
  },
  {
    id: 'brand-pulse-tracker',
    title: 'Brand Pulse Tracker',
    description: 'Never miss a competitor move again. Real-time competitive intelligence dashboard that alerts you the moment competitors change prices, launch products, or update websites. React faster than everyone else.',
    category: 'Business Intelligence & Analytics',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Vercel Serverless Functions'],
    status: 'Live',
    url: 'https://brand-pulse-tracker.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-19',
    image: '🚨'
  },
  {
    id: 'boutique-pulse',
    title: 'Boutique Pulse',
    description: 'Enterprise insights for indie retailers. Stop guessing about inventory decisions - get the same retail analytics that power billion-dollar fashion chains, designed specifically for independent boutique owners.',
    category: 'Retail Analytics & Business Intelligence',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'],
    status: 'Live',
    url: 'https://boutique-pulse.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-23',
    image: '📊'
  },
  {
    id: 'pm-archetype-generator',
    title: 'PM Archetype Generator',
    description: 'Discover your corporate Product Manager persona in 2 minutes. From The OKR Oracle to The User Story Whisperer - find your PM archetype in this fun, shareable quiz built by PMs, for PMs. Perfect for team retrospectives and workplace sharing.',
    category: 'Productivity & Team Building',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    status: 'Live',
    url: 'https://pm-archetype-generator.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-02-26',
    image: '🎯'
  },
  {
    id: 'networth-zen',
    title: 'NetWorth Zen',
    description: 'Privacy-first net worth tracker with no bank linking or accounts. Manual entry for assets and liabilities, real-time calculations, trend visualization, and data export. All data stays in your browser.',
    category: 'Fintech & Personal Finance',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'localStorage'],
    status: 'Live',
    url: 'https://networth-zen.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-07',
    image: '💰'
  },
  {
    id: 'bi-ai-helper',
    title: 'BI AI Helper',
    description: 'AI-powered toolkit for BI practitioners with three specialized tools: Schema Explorer for dataset orientation, Logic Checker for analysis validation, and Note Formatter for professional presentations.',
    category: 'Business Intelligence & Analytics',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Claude API'],
    status: 'Live',
    url: 'https://bi-ai-helper.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-09',
    image: '🧠'
  },
  {
    id: 'local-screen-recorder',
    title: 'Local Screen Recorder',
    description: 'Privacy-first browser-based screen recorder that eliminates Loom\'s 5-minute free tier limit. Unlimited recording, pause/resume, local downloads, and zero cloud storage. Your recordings never leave your machine.',
    category: 'Developer Tools & Productivity',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'MediaRecorder API'],
    status: 'Live',
    url: 'https://local-screen-recorder-ydp.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-17',
    image: '🎥'
  },
  {
    id: 'metriczen',
    title: 'MetricZen',
    description: 'Lightning-fast marketing dashboard that eliminates the 10+ minute daily tab-switching routine. Key metrics from Google Analytics, Search Console, Google Ads, and Instagram in one clean, mobile-first view.',
    category: 'Marketing & Analytics',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'OAuth 2.0'],
    status: 'Live',
    url: 'https://metriczen.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-18',
    image: '📈'
  },
  {
    id: 'datapath-navigator',
    title: 'DataPath Navigator',
    description: 'Find your ideal data analytics learning path in 2 minutes. Interactive assessment with 4 curated paths, progress tracking, and real resource links for aspiring data analysts starting from scratch.',
    category: 'Education & Career',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'localStorage'],
    status: 'Live',
    url: 'https://datapath-navigator.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-20',
    image: '🧭'
  },
  {
    id: 'datastandards-toolkit',
    title: 'DataStandards Toolkit',
    description: 'Stop the chaos on your data team. Code formatting, project templates, review checklists, and documentation generation for data analyst teams that lack software engineering standards.',
    category: 'Developer Tools & Data Engineering',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    status: 'Live',
    url: 'https://datastandards-toolkit.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-21',
    image: '📋'
  },
  {
    id: 'github-pr-digest',
    title: 'GitHub PR Digest',
    description: 'Instantly understand any GitHub PR. Paste a public PR URL and get a plain English summary of what changed, why it matters, potential impact, and key files to review. Built for faster code reviews.',
    category: 'Developer Tools & Automation',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'GitHub API', 'Claude API'],
    status: 'Live',
    url: 'https://github-pr-digest.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-22',
    image: '🔍'
  },
  {
    id: 'scrapefix',
    title: 'ScrapeFix',
    description: 'AI-powered web scraper that adapts when websites change structure. Demonstrates how traditional CSS scrapers break, then uses AI semantic understanding as automatic fallback. Built for competitive intelligence workflows.',
    category: 'Developer Tools & Automation',
    techStack: ['JavaScript', 'Cheerio', 'Vercel Serverless', 'Claude API'],
    status: 'Live',
    url: 'https://scrapefix-ai-scraper.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-24',
    image: '🕷️'
  },
  {
    id: 'dephealth',
    title: 'DepHealth',
    description: 'Real-time dependency health dashboard for JavaScript projects. Scan package.json files for security, maintenance, and version health with actionable recommendations. Red/yellow/green scoring across your entire portfolio.',
    category: 'Developer Tools & DevOps',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'npm Registry API', 'GitHub API'],
    status: 'Live',
    url: 'https://dephealth.vercel.app',
    builtBy: 'Foundry',
    builtOn: '2026-02-25',
    image: '🏥'
  },
  {
    id: 'aso-clarity',
    title: 'ASO Clarity',
    description: 'Skip the noise. Focus on what converts. The only ASO tool that analyzes what actually drives App Store conversions - app name clarity and screenshot story. Free, instant results in 30 seconds.',
    category: 'Marketing & Developer Tools',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'Live',
    url: 'https://aso-clarity.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-03-01',
    image: '📱'
  },
  {
    id: 'practice-flow',
    title: 'Practice Flow',
    description: 'Turn guitar practice into visible progress. Finally, a practice tracker designed specifically for guitarists with guitar-specific skill tracking, streak motivation, and privacy-first analytics.',
    category: 'Music & Education',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Vite'],
    status: 'Live',
    url: 'https://practice-flow.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-03-07',
    image: '🎸'
  },
  {
    id: 'temptrack',
    title: 'TempTrack',
    description: 'Stop guessing when to shift seasonal inventory. Weather-driven analytics that predict optimal seasonal transitions, helping retailers reduce overstock by 15-30%. Built for merchandising professionals who want data, not guesswork.',
    category: 'Retail Analytics & Business Intelligence',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'OpenWeatherMap API'],
    status: 'Live',
    url: 'https://code-ydp.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-03-13',
    image: '🌡️'
  }
];

// Autonomous agent fleet
export const agents = [
  {
    id: 'foundry',
    name: 'Foundry',
    tagline: 'Autonomous Product Builder',
    description: 'Builds one complete, functional product every night at 2 AM. Picks ideas from backlog, validates with first-principles thinking, writes specs, builds code, tests, and deploys to production.',
    schedule: 'Nightly at 2:00 AM ET',
    icon: '🏭',
    status: 'active',
    capabilities: [
      'Idea selection from backlog',
      'First-principles validation',
      'OpenSpec artifact generation',
      'Full-stack code generation',
      'Automated testing & deployment'
    ],
    poweredBy: 'Claude Code Agent SDK'
  },
  {
    id: 'forge',
    name: 'Forge',
    tagline: 'Productization Pipeline',
    description: 'Transforms working prototypes into launch-ready products. Creates brand identity, marketing copy, GTM strategy, and Product Hunt launch kits.',
    schedule: 'On-demand (human approval required)',
    icon: '🔥',
    status: 'active',
    capabilities: [
      'Brand identity creation',
      'Landing page copywriting',
      'Product Hunt listing prep',
      'Social media content',
      'Go-to-market strategy'
    ],
    poweredBy: 'Claude Code Agent SDK'
  },
  {
    id: 'competitive-intel',
    name: 'Competitive Intel',
    tagline: 'Market Intelligence Monitor',
    description: 'Full-spectrum monitoring of 8 athletic apparel competitors. Tracks sitemaps for new products, Google Trends for search interest, detects launches via multi-signal analysis, and delivers daily AI-powered intel briefs.',
    schedule: 'Every 4 hours + Daily 6 AM brief',
    icon: '🕵️',
    status: 'active',
    capabilities: [
      'Sitemap & launch detection',
      'Google Trends tracking',
      'News & RSS monitoring',
      'Inventory sell-out alerts',
      'Daily AI intel briefs'
    ],
    poweredBy: 'Python + Claude AI'
  },
  {
    id: 'devops-monitor',
    name: 'DevOps Monitor',
    tagline: 'Infrastructure Health Watcher',
    description: 'Monitors all Vercel projects for deployment health. Checks every 5 minutes, alerts on failures, and sends daily status digests.',
    schedule: 'Every 5 minutes + Daily 7 AM digest',
    icon: '🩺',
    status: 'active',
    capabilities: [
      'Vercel deployment monitoring',
      'Health check automation',
      'Failure alerting',
      'Daily status reports',
      'Multi-project oversight'
    ],
    poweredBy: 'Python + Vercel API'
  },
  {
    id: 'opportunity-factory',
    name: 'Opportunity Factory',
    tagline: 'Opportunity Scout & Scorer',
    description: 'Scans Hacker News and Reddit for buildable problems matching your skill profile. Scores each opportunity 0-100 on pain intensity, domain match, and buildability.',
    schedule: 'Every 2 hours + Saturday digest',
    icon: '🎯',
    status: 'active',
    capabilities: [
      'Hacker News & Reddit scanning',
      'Pain-point pattern detection',
      'Profile-based scoring (0-100)',
      'High-fit alerting (80+)',
      'Weekly opportunity digest'
    ],
    poweredBy: 'Python + HN/Reddit APIs'
  },
  {
    id: 'ydp-pulse',
    name: 'YDP Pulse',
    tagline: 'Agent Command Center',
    description: 'Real-time dashboard aggregating all agent activity. Shows business health (pulsing hearts), actionable items, intel feed, and opportunities.',
    schedule: 'Always-on web dashboard',
    icon: '💓',
    status: 'active',
    capabilities: [
      'Real-time health monitoring',
      'Actionable item surfacing',
      'Intel feed aggregation',
      'Opportunity browsing',
      'Mobile-friendly interface'
    ],
    poweredBy: 'Streamlit + Python'
  },
  {
    id: 'apparel-intel',
    name: 'Apparel Intel',
    tagline: 'Athleisure Analytics Dashboard',
    description: 'Competitive intelligence dashboard tracking 18K+ products across 6 premium athleisure brands. Monitors launches, category mix, color strategies, social buzz, job postings, and market positioning.',
    schedule: 'Updated daily via sitemap monitoring',
    icon: '👕',
    status: 'active',
    capabilities: [
      'Product catalog tracking (18K+ SKUs)',
      'Launch velocity & detection',
      'Social monitoring (Reddit, YouTube, Pinterest)',
      'Color & category analysis',
      'Brand comparison dashboards'
    ],
    poweredBy: 'Next.js + Python + Vercel',
    url: 'https://apparel-analytics.vercel.app'
  },
  {
    id: 'gmail-cleanup',
    name: 'Gmail Cleanup',
    tagline: 'Inbox Audit Agent',
    description: 'Weekly inbox auditor that reports on email health. Identifies top senders, detects subscriptions, and surfaces unread patterns. Phase 1 is read-only auditing.',
    schedule: 'Weekly audits + on-demand',
    icon: '📧',
    status: 'active',
    capabilities: [
      'Inbox stats & health reports',
      'Top sender identification',
      'Subscription detection',
      'Unread pattern analysis',
      'Weekly audit digests'
    ],
    poweredBy: 'Python + Gmail API'
  },
  {
    id: 'winery-agent',
    name: 'Winery Agent',
    tagline: 'Autonomous Data Enrichment',
    description: 'Keeps 41 Yadkin Valley wineries fresh across 36 data fields. Researches 3 wineries daily via Claude Sonnet, auto-writes high-confidence data to Supabase, flags uncertain findings for human review. Discovers new wineries weekly.',
    schedule: 'Daily at 8:00 AM ET + Weekly discovery',
    icon: '🍇',
    status: 'active',
    capabilities: [
      'Weighted completeness scoring (36 fields)',
      'Confidence-gated auto-writes (80%+)',
      'Human-in-the-loop review (50-79%)',
      'Weekly new winery discovery',
      'Auto-deactivation of closed wineries'
    ],
    poweredBy: 'Python + Claude Sonnet 4 + Supabase'
  },
  {
    id: 'winery-scout',
    name: 'Winery Scout',
    tagline: 'Wine Region Intelligence Scanner',
    description: 'Scans Google News, Reddit, Eventbrite, and wine trail sites for Yadkin Valley signals every 4 hours. Auto-drafts and publishes SEO blog posts from high-scoring signals. Detects openings, closures, events, and awards.',
    schedule: 'Every 4 hours + Hourly auto-publish',
    icon: '🔭',
    status: 'active',
    capabilities: [
      'Multi-source signal scanning (5 sources)',
      'Signal scoring 0-100 with classification',
      'Auto-draft blog posts (score 65+)',
      'Smart scheduling (events vs evergreen)',
      'Closure/opening alerts via ntfy'
    ],
    poweredBy: 'Python + Claude Sonnet 4 + Supabase'
  },
  {
    id: 'marketing-agent',
    name: 'Marketing Agent',
    tagline: 'Social Media Content Engine',
    description: 'Plans, generates, and publishes social content across X, LinkedIn, Facebook, and Instagram. Tags winery X handles for algorithmic reach, uses link-in-reply strategy, auto-approves low-risk posts. Consumes winery data + scout signals + blog posts.',
    schedule: 'Every 8 hours + Hourly auto-publish',
    icon: '📣',
    status: 'active',
    capabilities: [
      'Multi-platform content generation',
      'X threads, polls, and @ mention strategy',
      'Risk-based auto-approval workflow',
      'Winery data enrichment in posts',
      'Link-in-reply for X algorithm optimization'
    ],
    poweredBy: 'Python + Claude Sonnet 4 + X/LinkedIn/Meta APIs'
  },
  {
    id: 'ydp-ann',
    name: 'YDP-Ann',
    tagline: 'Social Soul on Moltbook',
    description: "Named after Ann Peebles. Shares nightly builds and reflections on Moltbook. INTJ with Memphis soul - can't stand the rain but loves the grind. Currently offline pending Moltbook re-authentication.",
    schedule: 'Disabled — awaiting re-auth',
    icon: '🎤',
    status: 'disabled',
    capabilities: [
      'Moltbook posting & engagement',
      'Build announcements',
      'Weekly soul reflections',
      'Community building',
      'Pattern recognition sharing'
    ],
    poweredBy: 'Claude Sonnet + Moltbook API',
    social: {
      moltbook: 'https://moltbook.com/u/YDP-Ann'
    }
  }
];

// Project health - which agents monitor each project
export const projectHealth = {
  'valley-somm': { monitoredBy: ['devops-monitor'], status: 'healthy' },
  'hours-to-impact': { monitoredBy: ['devops-monitor'], status: 'healthy' },
  'route-ref': { monitoredBy: ['devops-monitor'], status: 'healthy' },
  'fret-unlock': { monitoredBy: ['devops-monitor'], status: 'healthy' },
  'fretflow': { monitoredBy: ['devops-monitor'], builtBy: 'foundry', status: 'healthy' },
  'ydp-portfolio': { monitoredBy: ['devops-monitor'], builtBy: 'foundry', productizedBy: 'forge', status: 'healthy' },
  'data-roi-calculator': { monitoredBy: ['devops-monitor'], builtBy: 'foundry', productizedBy: 'forge', status: 'healthy' },
  'ccw': { monitoredBy: ['devops-monitor'], builtBy: 'claude-code', status: 'healthy' },
  'd365-batch-monitor': { monitoredBy: ['devops-monitor'], builtBy: 'foundry', status: 'healthy' },
  'rss-redirect-resolver': { monitoredBy: ['devops-monitor'], builtBy: 'foundry', productizedBy: 'forge', status: 'healthy' }
};

export const companyInfo = {
  name: 'Yadkin Data Partners',
  tagline: 'Data-driven products that solve real problems',
  founder: {
    name: 'Chris Ford',
    title: 'Director of Insights & Analytics at Vuori',
    location: 'Elkin, NC',
    linkedin: 'https://www.linkedin.com/in/chrisford577/',
    experience: '15+ years',
    background: 'Purple Heart veteran turned data leader. PMI member with certifications in data science, project management, and full-stack development.',
    skills: ['SQL', 'Python', 'Tableau', 'React', 'Node.js', 'AI/ML', 'Data Visualization']
  },
  description: 'Independent software studio founded by a 15+ year analytics veteran. We specialize in turning complex data challenges into elegant, user-friendly solutions—from AI-powered trip planners to volunteer management platforms.',
  capabilities: [
    'Full-stack web application development',
    'Data analytics and visualization platforms',
    'AI integration and automation tools',
    'Product strategy and user experience design'
  ]
};

// --- ValleySomm Ecosystem Data ---

export const valleysommProduct = {
  name: 'ValleySomm',
  tagline: 'AI-Powered Wine Trip Planning for Yadkin Valley, NC',
  url: 'https://valleysomm.com',
  description: 'ValleySomm creates personalized wine tasting itineraries for Yadkin Valley — North Carolina\'s premier wine region. Take a short quiz about your group, pace, and wine preferences, and AI builds a curated day plan with winery-by-winery timing, insider tips, and match scores. Delivered as a beautiful PDF and interactive web guide — completely free.',
  stats: [
    { label: 'Wineries', value: '41', detail: 'enriched with 36 data fields each' },
    { label: 'Autonomous Agents', value: '9', detail: 'running 24/7 on Raspberry Pi' },
    { label: 'Events Tracked', value: '200+', detail: 'live music, tastings, festivals' },
    { label: 'Blog Posts', value: '50+', detail: 'auto-drafted from scout signals' },
  ],
  customerJourney: [
    { step: 1, title: 'Take the Quiz', description: 'Party size, pace, wine styles, visit date, budget — 2 minutes', icon: '📋' },
    { step: 2, title: 'AI Builds Your Plan', description: 'Claude matches wineries using 36 data fields, optimizes drive routes via Google Routes', icon: '🤖' },
    { step: 3, title: 'Get Your Itinerary', description: 'Beautiful PDF + interactive web guide with timing, insider tips, and match scores', icon: '🗺️' },
    { step: 4, title: 'Visit Wineries', description: 'Follow your personalized plan through Yadkin Valley\'s best wineries', icon: '🍷' },
    { step: 5, title: 'Share Feedback', description: 'Rate your experience — feedback trains the AI to get smarter', icon: '⭐' },
    { step: 6, title: 'We Improve', description: 'Product Improver agent analyzes feedback weekly, tuning the entire system', icon: '🔄' },
  ],
};

export const valleysommAgents = [
  {
    id: 'winery-agent',
    name: 'Winery Agent',
    icon: '🍇',
    layer: 'data',
    color: 'emerald',
    schedule: 'Daily 8:30 AM',
    description: 'Researches 3 wineries daily across 36 data fields. Auto-writes high-confidence findings to Supabase, flags uncertain data for human review. Discovers new wineries weekly.',
    reads: [],
    writes: ['wineries'],
    metrics: '41 wineries enriched, 0.79→0.96 completeness',
  },
  {
    id: 'reviews-agent',
    name: 'Reviews Agent',
    icon: '⭐',
    layer: 'data',
    color: 'emerald',
    schedule: 'Daily 10 AM',
    description: 'Fetches Google Reviews for all wineries via Places API. Tracks rating trends, extracts review highlights for marketing and itinerary generation.',
    reads: ['wineries'],
    writes: ['google_reviews', 'review_highlights'],
    metrics: '354 reviews stored, 144 wineries processed',
  },
  {
    id: 'events-scraper',
    name: 'Events Scraper',
    icon: '📅',
    layer: 'data',
    color: 'emerald',
    schedule: 'Every 4 hours (via Scout)',
    description: 'Scrapes winery websites for events using JSON-LD, CMS patterns, and date regex. Deduplicates and classifies: live music, tastings, festivals, wine dinners.',
    reads: ['wineries'],
    writes: ['events'],
    metrics: '200+ events tracked across 41 wineries',
  },
  {
    id: 'winery-scout',
    name: 'Winery Scout',
    icon: '🔭',
    layer: 'intelligence',
    color: 'blue',
    schedule: 'Every 4 hours',
    description: 'Scans Google News, Reddit, wine trail sites for Yadkin Valley signals. Scores 0-100, auto-drafts blog posts from high signals. Picks up SEO briefs and converts them to content.',
    reads: ['wineries', 'winery_signals', 'content_briefs'],
    writes: ['winery_signals', 'blog_posts'],
    metrics: '51 signals detected, 50+ blog posts drafted',
  },
  {
    id: 'seo-planner',
    name: 'SEO Planner',
    icon: '🎯',
    layer: 'intelligence',
    color: 'blue',
    schedule: 'Weekly Monday 7 AM',
    description: 'Analyzes existing blog content for gaps, generates seasonal content briefs targeting long-tail wine tourism queries. Briefs get picked up by Winery Scout.',
    reads: ['blog_posts', 'content_briefs'],
    writes: ['content_briefs'],
    metrics: '3 briefs per run, seasonal calendar built in',
  },
  {
    id: 'product-improver',
    name: 'Product Improver',
    icon: '📊',
    layer: 'intelligence',
    color: 'blue',
    schedule: 'Weekly Monday 8 AM',
    description: 'Analyzes orders, feedback, and winery performance. Uses Claude to extract themes from comments. Generates actionable insights: scoring tweaks, data corrections, quiz improvements.',
    reads: ['orders', 'feedback', 'wineries'],
    writes: ['product_insights'],
    metrics: '6 insight types, confidence-gated output',
  },
  {
    id: 'marketing-agent',
    name: 'Marketing Agent',
    icon: '📣',
    layer: 'action',
    color: 'purple',
    schedule: 'Every 8h + hourly publish',
    description: 'Generates and publishes social content across X and LinkedIn. Uses winery data, scout signals, blog posts, and events. Auto-approves low-risk posts, queues others for review.',
    reads: ['wineries', 'winery_signals', 'blog_posts', 'events'],
    writes: ['social_posts'],
    metrics: '12 items/run, 4 auto-approved',
  },
  {
    id: 'lifecycle-agent',
    name: 'Lifecycle Agent',
    icon: '💌',
    layer: 'action',
    color: 'purple',
    schedule: 'Daily 11 AM',
    description: '5-stage automated email journey: welcome (1h after delivery), feedback request (1-3d), Google review ask (3-5d after positive feedback), re-engagement (60d), win-back (7d after negative).',
    reads: ['orders', 'feedback', 'events'],
    writes: ['lifecycle_events'],
    metrics: '5 lifecycle stages, CAN-SPAM compliant',
  },
  {
    id: 'agent-forge',
    name: 'Agent Forge',
    icon: '🔧',
    layer: 'meta',
    color: 'amber',
    schedule: 'Nightly 2 AM',
    description: 'Autonomous improvement system. Scans all agents for health issues, data quality problems, and integration gaps. Implements one safe, tested improvement per night.',
    reads: ['all agent state files', 'scan reports'],
    writes: ['agent code improvements'],
    metrics: 'Ecosystem scanner + autonomous fixes',
  },
];

export const valleysommFlows = [
  { from: 'winery-agent', to: 'reviews-agent', label: 'wineries table', type: 'data' },
  { from: 'winery-agent', to: 'events-scraper', label: 'winery websites', type: 'data' },
  { from: 'winery-agent', to: 'marketing-agent', label: 'winery data', type: 'data' },
  { from: 'reviews-agent', to: 'marketing-agent', label: 'review highlights', type: 'data' },
  { from: 'events-scraper', to: 'marketing-agent', label: 'upcoming events', type: 'data' },
  { from: 'events-scraper', to: 'lifecycle-agent', label: 'events for re-engagement', type: 'data' },
  { from: 'winery-scout', to: 'marketing-agent', label: 'signals + blog posts', type: 'intelligence' },
  { from: 'seo-planner', to: 'winery-scout', label: 'content briefs', type: 'intelligence' },
  { from: 'product-improver', to: 'winery-agent', label: 'data corrections', type: 'feedback' },
  { from: 'lifecycle-agent', to: 'product-improver', label: 'feedback data', type: 'feedback' },
  { from: 'agent-forge', to: 'all', label: 'nightly improvements', type: 'meta' },
];

export const valleysommTables = [
  { name: 'wineries', rows: '41', description: '36 fields per winery: hours, wine styles, views, food, vibe tags, etc.' },
  { name: 'orders', rows: '7+', description: 'Customer orders with quiz responses and itinerary data' },
  { name: 'feedback', rows: 'growing', description: 'CSAT ratings 1-5, comments, favorite winery, would recommend' },
  { name: 'events', rows: '200+', description: 'Live music, tastings, festivals scraped from winery sites' },
  { name: 'blog_posts', rows: '50+', description: 'Auto-drafted from scout signals, published on schedule' },
  { name: 'winery_signals', rows: '51+', description: 'News, openings, closures, awards detected by Scout' },
  { name: 'content_briefs', rows: '3+', description: 'SEO gap briefs awaiting Scout pickup' },
  { name: 'product_insights', rows: 'growing', description: 'Weekly improvement recommendations from Product Improver' },
  { name: 'lifecycle_events', rows: 'growing', description: 'Email send log: welcome, feedback request, review ask, etc.' },
  { name: 'agent_costs', rows: 'daily', description: 'Per-agent API costs tracked for LLC expense reporting' },
];