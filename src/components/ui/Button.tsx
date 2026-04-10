import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      children,
      href,
      className = '',
      onClick,
      disabled = false,
      type = 'button',
    },
    ref
  ) => {
    const baseClasses =
      'font-montserrat text-sm font-semibold uppercase tracking-widest py-4 px-8 transition-all duration-300 ease-out transform hover:scale-105 inline-block';

    const primaryClasses =
      'bg-gold text-navy hover:bg-yellow-600 shadow-md hover:shadow-lg hover:shadow-gold/40';

    const secondaryClasses =
      'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-navy';

    const combinedClasses = `${baseClasses} ${
      variant === 'primary' ? primaryClasses : secondaryClasses
    } ${className}`;

    // Render as link if href is provided
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClasses}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    // Otherwise render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
