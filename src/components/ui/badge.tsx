import React from 'react';

export interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export interface BadgeProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className = '', children, variant = 'default' }) => {
  const variants: Record<string, string> = {
    default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-red-500 text-white',
    outline: 'border border-gray-400 text-gray-800',
  };
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
