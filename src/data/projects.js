export const projects = [
  {
    id: 'valley-somm',
    title: 'Valley Somm',
    description: 'AI-powered wine trip planner for Yadkin Valley. Creates personalized itineraries, matches you with wineries, and handles reservations for your wine country adventure.',
    category: 'Wine & Hospitality',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'AI/ML'],
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
    url: 'https://code-ydp.vercel.app',
    builtBy: 'Foundry + Forge',
    builtOn: '2026-01-31',
    image: '🏥'
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
    description: 'Monitors 8 athletic apparel competitors via Google News and RSS feeds. Tracks website changes, sends immediate Vuori alerts, and delivers Monday briefings.',
    schedule: 'Every 4 hours + Monday 6 AM briefing',
    icon: '🕵️',
    status: 'active',
    capabilities: [
      'Google News monitoring',
      'RSS feed aggregation',
      'Website change detection',
      'Competitor news alerts',
      'Weekly intelligence briefings'
    ],
    poweredBy: 'Python + RSS/News APIs'
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
    description: 'Scans Hacker News for opportunities matching your skill profile. Scores each opportunity and surfaces high-fit matches (80+) immediately.',
    schedule: 'Every 2 hours + Saturday digest',
    icon: '🎯',
    status: 'active',
    capabilities: [
      'Hacker News scanning',
      'Profile-based scoring',
      'High-fit alerting',
      'Weekly opportunity digest',
      'Trend identification'
    ],
    poweredBy: 'Python + HN API'
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
    id: 'ydp-ann',
    name: 'YDP-Ann',
    tagline: 'Social Soul on Moltbook',
    description: "Named after Ann Peebles. Shares nightly builds and reflections on Moltbook. INTJ with Memphis soul - can't stand the rain but loves the grind.",
    schedule: 'Posts every 30 min, engages continuously',
    icon: '🎤',
    status: 'active',
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
  'ccw': { monitoredBy: ['devops-monitor'], builtBy: 'claude-code', status: 'healthy' }
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