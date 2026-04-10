import React from 'react';

interface EyebrowLabelProps {
  children: React.ReactNode;
  className?: string;
}

const EyebrowLabel: React.FC<EyebrowLabelProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-montserrat text-xs font-semibold uppercase tracking-widest text-gold ${className}`}
    >
      {children}
    </span>
  );
};

export default EyebrowLabel;
