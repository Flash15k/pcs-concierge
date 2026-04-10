import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  dark?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', featured = false, dark = false }, ref) => {
    const baseClasses =
      'p-10 md:p-16 lg:p-20 rounded-none transition-all duration-300 ease-out';

    const lightClasses = 'bg-cream text-navy shadow-lg shadow-black/5';
    const darkClasses = 'bg-deep-navy text-cream shadow-lg shadow-black/20';

    const featuredClasses = featured
      ? 'border-t-4 border-gold hover:scale-105'
      : 'hover:shadow-xl hover:shadow-black/10';

    const hoverClasses = 'hover:-translate-y-1';

    const combinedClasses = `${baseClasses} ${
      dark ? darkClasses : lightClasses
    } ${featuredClasses} ${hoverClasses} ${className}`;

    return (
      <div ref={ref} className={combinedClasses}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
