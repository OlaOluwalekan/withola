import * as LucideIcons from 'lucide-react';
import React from 'react';

interface DynamicIconProps {
  icon: string;
  className?: string;
}

export function DynamicIcon({ icon, className = "w-6 h-6" }: DynamicIconProps) {
  if (!icon) return null;

  if (icon.startsWith('lucide:')) {
    const iconName = icon.replace('lucide:', '');
    const IconComponent = (LucideIcons as Record<string, any>)[iconName];
    
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
  }

  // Render as emoji or text
  return <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>;
}
