import React, { useState } from 'react';

export interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className = '', children }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (
          React.isValidElement(child) &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (child.type === TabsTrigger || (child.type as any)?.displayName === 'TabsTrigger')
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child, { value, setValue } as any);
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`flex ${className}`}>{children}</div>
);

export const TabsTrigger: React.FC<{ value: string; setValue?: (v: string) => void; children: React.ReactNode }> = ({ value, setValue, children }) => (
  <button type="button" onClick={() => setValue && setValue(value)} className="px-4 py-2">
    {children}
  </button>
);

export const TabsContent: React.FC<{ value: string; activeValue?: string; className?: string; children: React.ReactNode }> = ({ value, activeValue, className = '', children }) => {
  if (value !== activeValue) return null;
  return <div className={className}>{children}</div>;
};