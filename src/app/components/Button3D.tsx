"use client";

import React from 'react';
import Link from 'next/link';

export type Button3DVariant = 'green' | 'blue' | 'dark' | 'white';
export type Button3DSize = 'sm' | 'md' | 'lg';

export interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Button3DVariant;
  size?: Button3DSize;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const variantClasses: Record<Button3DVariant, string> = {
  green: 'btn-3d-green',
  blue: 'btn-3d-blue',
  dark: 'btn-3d-dark',
  white: 'btn-3d-white',
};

const sizeClasses: Record<Button3DSize, string> = {
  sm: 'text-xs px-4 py-2 min-h-[36px] rounded-lg',
  md: 'text-xs sm:text-sm px-5 sm:px-6 py-2.5 min-h-[42px] rounded-xl',
  lg: 'text-sm sm:text-base px-7 sm:px-8 py-3.5 min-h-[48px] rounded-2xl',
};

export default function Button3D({
  variant = 'green',
  size = 'md',
  href,
  external,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  target,
  rel,
  ...rest
}: Button3DProps) {
  const combinedClassName = `btn-3d-base ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled ? 'opacity-50 pointer-events-none' : ''
  } ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal =
      external !== undefined
        ? external
        : href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={combinedClassName}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={combinedClassName}
      {...rest}
    >
      {content}
    </button>
  );
}
