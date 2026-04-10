import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PCS Tips & Military Moving Guides | PCS Concierge Blog',
  description:
    'Expert PCS tips, installation guides, and military family moving resources from PCS Concierge.',
};

const CATEGORIES = [
  'PCS Tips',
  'Installation Guides',
  'Military Family Resources',
  'Moving Checklists',
];

const PLACEHOLDER_POSTS = [
  {
    title: 'The Ultimate PCS Checklist: Everything You Need Before Your Move',
    category: 'Moving Checklists',
    excerpt: 'A comprehensive timeline and checklist for every stage of your PCS move, from receiving orders to settling into your new home.',
  },
  {
    title: '10 Things Every Military Spouse Should Know About PCS Season',
    category: 'PCS Tips',
    excerpt: 'PCS season can feel overwhelming. Here are the top strategies for staying organized and reducing stress during your family\'s transition.',
  },
  {
    title: 'Fort Liberty Installation Guide: What to Expect When You Arrive',
    category: 'Installation Guides',
    excerpt: 'Everything you need to know about housing, schools, and community resources at Fort Liberty.',
  },
  {
    title: 'How to Coordinate Utilities During a PCS Move',
    category: 'PCS Tips',
    excerpt: 'Setting up and canceling utilities across installations can be confusing. Here\'s a step-by-step guide to keep everything connected.',
  },
  {
    title: 'Supporting Your Children Through a Military Move',
    category: 'Military Family Resources',
    excerpt: 'Moving is hard on kids. Practical advice for helping your children adjust to a new school, new friends, and a new community.',
  },
  {
    title: 'Move-Out Inspection: How to Pass on Your First Try',
    category: 'Moving Checklists',
    excerpt: 'Don\'t leave money on the table. A detailed guide to passing your housing inspection without issues.',
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy pt-44 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            INSIGHTS & RESOURCES
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-6">
            PCS Concierge Blog
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Expert guides, tips, and resources for military families navigating their next PCS.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-cream border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap gap-4 justify-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold border-b-2 border-gold pb-1 cursor-pointer">
            All Posts
          </span>
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="text-xs uppercase tracking-wider font-semibold text-navy/50 hover:text-gold cursor-pointer transition-colors pb-1"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLACEHOLDER_POSTS.map((post, i) => (
              <article key={i} className="bg-white border border-gold/10 group cursor-pointer">
                {/* Image Placeholder */}
                <div className="aspect-[16/10] bg-navy/5 flex items-center justify-center">
                  <span className="text-navy/20 text-sm">Featured Image</span>
                </div>
                <div className="p-8">
                  <span className="text-gold text-xs uppercase tracking-wider font-semibold">
                    {post.category}
                  </span>
                  <h2 className="font-heading text-xl text-navy font-bold mt-3 mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6">
                    <span className="text-gold text-xs uppercase tracking-wider font-semibold">
                      Coming Soon \u2192
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
