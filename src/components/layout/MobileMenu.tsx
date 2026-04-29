'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Phone, Mail } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/services#pricing' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed right-0 top-0 h-full w-full bg-deep-navy/98 backdrop-blur z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gold z-50"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {/* Logo */}
        <div className="pt-12 pb-8 flex justify-center">
          <Image
            src="/logos/logo-white.png"
            alt="PCS Concierge"
            width={160}
            height={40}
            className="h-12 w-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="text-cream text-2xl font-serif hover:text-gold transition-colors duration-300"
              style={{ fontFamily: 'Playfair Display' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pb-12 px-6 flex justify-center">
          <Link
            href="/services"
            onClick={onClose}
            className="px-8 py-3 bg-gold text-navy font-semibold text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300"
          >
            View Packages
          </Link>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gold/20 px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-2 text-cream text-sm mb-4">
            <Phone size={16} />
            <a href="tel:(910)412-6900" className="hover:text-gold transition-colors">
              (910) 412-6900
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-cream text-sm">
            <Mail size={16} />
            <a href="mailto:info@UPCSG.com" className="hover:text-gold transition-colors">
              info@UPCSG.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
