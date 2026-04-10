import React from 'react';
import EyebrowLabel from './EyebrowLabel';
import GoldDivider from './GoldDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  dark?: boolean;
  className?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  headline,
  subtitle,
  dark = false,
  className = '',
  centered = true,
}) => {
  const containerClasses = centered ? 'text-center' : 'text-left';
  const headlineColorClasses = dark ? 'text-cream' : 'text-navy';

  return (
    <div className={`${containerClasses} ${className}`}>
      {eyebrow && (
        <div className="mb-4">
          <EyebrowLabel>{eyebrow}</EyebrowLabel>
        </div>
      )}

      <h2 className={`font-playfair text-4xl md:text-5xl font-bold mb-4 ${headlineColorClasses}`}>
        {headline}
      </h2>

      {subtitle && (
        <p className="font-montserrat text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6">
          {subtitle}
        </p>
      )}

      <div className={centered ? 'flex justify-center' : ''}>
        <GoldDivider />
      </div>
    </div>
  );
};

export default SectionHeading;
