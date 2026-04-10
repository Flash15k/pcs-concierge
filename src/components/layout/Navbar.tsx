'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-400 ease-out ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-xl border-b border-gold/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={isScrolled ? '/logos/horizontal-logo.png' : '/logos/logo-white.png'}
              alt="PCS Concierge"
              width={160}
              height={40}
              className="h-10 w-auto transition-all duration-400"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${
                  isScrolled
                    ? 'text-navy hover:text-gold'
                    : 'text-white hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Pricing Link - connects to services with anchor */}
            <Link
              href="/services#pricing"
              className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${
                isScrolled
                  ? 'text-navy hover:text-gold'
                  : 'text-white hover:text-gold'
              }`}
            >
              Pricing
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/services"
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                isScrolled
                  ? 'bg-gold text-navy hover:bg-opacity-90'
                  : 'bg-navy text-cream hover:bg-opacity-90'
              }`}
            >
              View Packages
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-50"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu
              size={28}
              className={isScrolled ? 'text-navy' : 'text-white'}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
