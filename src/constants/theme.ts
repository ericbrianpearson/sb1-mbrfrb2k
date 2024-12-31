import { BRANDING } from './branding';

export const THEME = {
  light: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white',
    border: 'border-gray-200',
    primary: `bg-[${BRANDING.colors.primary}]`,
    secondary: `bg-[${BRANDING.colors.secondary}]`,
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-gray-100',
    card: 'bg-gray-800',
    border: 'border-gray-700',
    primary: `bg-[${BRANDING.colors.primary}]`,
    secondary: `bg-[${BRANDING.colors.secondary}]`,
  },
  backgroundImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
} as const;