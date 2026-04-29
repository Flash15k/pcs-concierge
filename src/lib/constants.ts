// Clean UTF-8 encoding verified
export const COMPANY = {
  name: 'PCS Concierge',
  legal: 'United PCS Group LLC',
  tagline: 'Your PCS Move, Professionally Coordinated.',
  domain: 'https://upcsg.com',
  email: 'info@UPCSG.com',
  phone: '(910) 412-6900',
  phoneTel: '+19104126900',
  hours: {
    weekday: 'Monday – Friday: 9:00 AM – 6:00 PM',
    saturday: 'Saturday: 10:00 AM – 2:00 PM',
    sunday: 'Sunday: Closed',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SERVICE_PACKAGES = [
  {
    id: 'basic',
    tier: 'ESSENTIAL',
    name: 'Basic Coordination',
    price: 497,
    description: 'Administrative support and a professional starting point for your PCS.',
    features: [
      'Utility setup or cancellation assistance',
      'Custom PCS checklist',
      'Move-out inspection prep guide',
      'One coordination call',
      'Portal onboarding',
    ],
    cta: 'Get Started',
    featured: false,
    dark: false,
  },
  {
    id: 'standard',
    tier: 'MOST POPULAR',
    name: 'Standard PCS Support',
    price: 997,
    description: 'Comprehensive support through the most stressful parts of your move.',
    features: [
      'Everything in Basic',
      'Rental housing search assistance',
      'Move-out cleaning coordination',
      'Move-out logistics planning',
      'Arrival preparation checklist',
      'Portal and orientation flow',
    ],
    cta: 'Get Started',
    featured: true,
    dark: false,
  },
  {
    id: 'white-glove',
    tier: 'PREMIUM',
    name: 'White Glove PCS Command',
    price: 1497,
    description: 'The highest-touch concierge support from planning to arrival.',
    features: [
      'Everything in Standard',
      'Storage coordination',
      'Vendor scheduling support',
      'Arrival grocery coordination',
      'Weekly progress updates',
      'Priority concierge communication',
    ],
    cta: 'Request Consultation',
    featured: false,
    dark: true,
  },
] as const;

export const CONCIERGE_STEPS = [
  { letter: 'C', step: 1, title: 'Client Intake', description: 'Within 10 minutes of signing, you receive your welcome package and intake form. Your journey begins immediately.' },
  { letter: 'O', step: 2, title: 'Orientation Call', description: 'A personal 15-minute call to understand your unique PCS timeline, stress points, and priorities.' },
  { letter: 'N', step: 3, title: 'Needs Mapping', description: 'Your custom PCS Action Plan — every deadline, task, and responsibility — delivered within 24 hours.' },
  { letter: 'C', step: 4, title: 'Coordination Setup', description: 'We activate. Utilities, housing search, cleaning, vendors — all based on your package level.' },
  { letter: 'I', step: 5, title: 'Implementation', description: 'Behind the scenes, we execute. You see updates, not stress.' },
  { letter: 'E', step: 6, title: 'Experience Updates', description: 'Proactive communication: Day 1, Day 3, Day 7, then weekly. You never have to ask.' },
  { letter: 'R', step: 7, title: 'Relocation Execution', description: 'Seven days before PCS, every detail confirmed. Your final checklist is delivered.' },
  { letter: 'G', step: 8, title: 'Gratitude & Referral', description: 'Post-move follow-up ensures satisfaction. $100 referral program for fellow military families.' },
  { letter: 'E', step: 9, title: 'Expansion', description: 'Your trusted concierge for future PCS moves and additional services.' },
] as const;

export const TESTIMONIALS = [
  { quote: 'From the moment we got our orders, PCS Concierge made us feel like everything was handled. I could actually focus on our kids during the move instead of drowning in logistics.', name: 'Sarah M.', role: 'Army Spouse', base: 'Fort Liberty' },
  { quote: 'The weekly updates were incredible. I never once had to wonder what was happening. They treated our PCS like a VIP operation.', name: 'Jessica T.', role: 'Air Force Spouse', base: 'Joint Base Lewis-McChord' },
  { quote: "We've done four PCS moves the hard way. This was the first time it actually felt manageable. Worth every penny.", name: 'Amanda R.', role: 'Marine Spouse', base: 'Camp Pendleton' },
] as const;

export const STATS = [
  { value: 500, suffix: '+', label: 'Military Families Served' },
  { value: 300, suffix: '+', label: 'Installations Nationwide' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: 'hr', label: 'Action Plan Turnaround' },
] as const;

export const FAQ_ITEMS = [
  { q: 'What exactly does PCS Concierge handle?', a: 'We coordinate logistics — utilities, cleaning, housing search, vendor scheduling, and arrival planning. Clients pay PCS Concierge for the coordination service; clients pay vendors directly for their services.' },
  { q: 'When should I contact PCS Concierge?', a: 'As soon as you receive your PCS orders. The earlier we start, the smoother your move will be.' },
  { q: 'Are you coming to other bases?', a: 'Yes. We launched at Fort Liberty and are positioning to serve all major CONUS installations, with OCONUS expansion planned by 2027.' },
  { q: 'Do you work with all military branches?', a: 'Yes — Army, Navy, Air Force, Marines, Coast Guard, and Space Force.' },
  { q: 'What happens after I purchase?', a: 'You move directly into intake, then orientation booking, then concierge coordination through our portal and support team.' },
  { q: 'How is PCS Concierge different?', a: "We're exclusively military-focused, operate the proven C.O.N.C.I.E.R.G.E. Method, and deliver a premium experience — not a moving company, a concierge command center for your family's transition." },
] as const;

export const BRANCHES = ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'] as const;
