import React from 'react';
import Image from 'next/image';

interface CompassWatermarkProps {
  className?: string;
  opacity?: number; // 0-1, default 0.04
  size?: number; // in px, default 700
  src?: string; // default to emblem-circle.png
}

const CompassWatermark: React.FC<CompassWatermarkProps> = ({
  className = '',
  opacity = 0.04,
  size = 700,
  src = '/images/emblem-circle.png',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ opacity }}
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          priority={false}
          quality={60}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default CompassWatermark;
