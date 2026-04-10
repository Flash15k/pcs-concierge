import React from 'react';

interface GoldDividerProps {
  className?: string;
  width?: number; // in px, default 80
}

const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', width = 80 }) => {
  return (
    <div className={`flex items-center justify-center my-6 ${className}`}>
      <div className="flex-grow max-w-full md:max-w-sm">
        <div className="relative flex items-center justify-center h-1">
          {/* Left line */}
          <div
            className="absolute left-0 h-px bg-gold"
            style={{ width: `calc((100% - ${width}px) / 2)` }}
          ></div>

          {/* Center diamond */}
          <div
            className="relative z-10 bg-gold"
            style={{
              width: '6px',
              height: '6px',
              transform: 'rotate(45deg)',
              margin: '0 20px',
            }}
          ></div>

          {/* Right line */}
          <div
            className="absolute right-0 h-px bg-gold"
            style={{ width: `calc((100% - ${width}px) / 2)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GoldDivider;
