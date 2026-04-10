import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const branches = [
    'Army',
    'Navy',
    'Air Force',
    'Marines',
    'Coast Guard',
    'Space Force',
  ];

  return (
    <footer className="bg-footer border-t border-gold/30">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Image
                src="/logos/logo-white.png"
                alt="PCS Concierge"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-cream/80 text-sm leading-relaxed mb-4">
              Your PCS Move, Professionally Coordinated.
            </p>
            <p className="text-cream/60 text-xs leading-relaxed">
              United PCS Group LLC specializes in military relocation services,
              making your move seamless and stress-free.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-gold text-xs uppercase font-semibold tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-gold text-xs uppercase font-semibold tracking-widest mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-cream/60 text-xs uppercase tracking-wide mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:(704)649-2609"
                    className="text-cream text-sm hover:text-gold transition-colors"
                  >
                    (704) 649-2609
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-cream/60 text-xs uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@UPCSG.com"
                    className="text-cream text-sm hover:text-gold transition-colors"
                  >
                    info@UPCSG.com
                  </a>
                </div>
              </div>
              <div>
                <p className="text-cream/60 text-xs uppercase tracking-wide mb-2">
                  Hours
                </p>
                <div className="text-cream text-sm space-y-1">
                  <p>Mon-Fri: 9AM - 6PM</p>
                  <p>Sat: 10AM - 2PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Serving */}
          <div>
            <h3 className="text-gold text-xs uppercase font-semibold tracking-widest mb-6">
              Serving
            </h3>
            <p className="text-cream/80 text-sm leading-relaxed mb-6">
              Proudly Serving Military Families Across All U.S. Installations
            </p>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <span
                  key={branch}
                  className="bg-gold/10 text-cream text-xs px-3 py-1 rounded"
                >
                  {branch}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-cream/60 text-xs">
            © {currentYear} United PCS Group LLC. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/privacy" className="text-cream/60 hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <span className="text-cream/30">|</span>
            <Link href="/terms" className="text-cream/60 hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
