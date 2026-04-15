'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { UserCheck, Building2, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'top 40%',
          scrub: false,
          markers: false
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const solutions = [
    {
      icon: <UserCheck size={22} strokeWidth={1.5} />,
      title: 'Dedicated Coordination',
      description: 'One point of contact. One streamlined plan. Every task tracked and executed.'
    },
    {
      icon: <Building2 size={22} strokeWidth={1.5} />,
      title: 'Vendor Management',
      description:
        'Cleaning, storage, housing \u2014 we coordinate the vendors, you approve the plan.'
    },
    {
      icon: <Bell size={22} strokeWidth={1.5} />,
      title: 'White-Glove Updates',
      description: 'Proactive communication so you never have to ask what\'s happening with your move?'
    }
  ];

  return (
    <section
      ref={containerRef}
      className="w-full bg-deep-navy py-24 md:py-32 lg:py-40 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          backgroundImage: 'url(/logos/emblem-circle.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          opacity: 0.04,
          width: '700px',
          height: '700px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-4">
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-gold font-body">
            The PCS Concierge Difference
          </span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-8">
          Military Precision.
          <br />
          Concierge Grace.
        </h2>
        <div className="w-16 h-[1px] bg-gold mx-auto my-8"></div>
        <p className="text-cream/70 text-lg max-w-3xl mx-auto mb-16 font-body">
          PCS Concierge by United PCS Group delivers a premium relocation experience built
          exclusively for military families. We handle the complexity so you can focus on what
          matters most.
        </p>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {solutions.map((solution, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 border border-gold/30 mx-auto mb-4 flex items-center justify-center text-gold">
                {solution.icon}
              </div>
              <h3 className="text-cream font-heading text-xl font-semibold mb-3">
                {solution.title}
              </h3>
              <p className="text-cream/60 text-sm font-body">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
