import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const TankIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <rect x="3" y="10" width="18" height="8" rx="1" />
    <rect x="7" y="8" width="10" height="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <circle cx="7" cy="14" r="1" />
    <circle cx="17" cy="14" r="1" />
  </svg>
);

export const PlaneIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M12 2L4 12l8 3 8-3z" />
    <path d="M4 12v6l8 3v-6" />
    <path d="M20 12v6l-8 3v-6" />
  </svg>
);

export const ShipIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M12 2v5" />
    <path d="M4 10h16" />
    <path d="M3 18h18" />
    <path d="M5 22h14" />
    <path d="M18 10L12 7 6 10" />
    <path d="M18 14l-6-3-6 3" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const HelicopterIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M3 10h18" />
    <path d="M12 4v16" />
    <path d="m12 4-4 4" />
    <path d="m12 4 4 4" />
    <path d="M7 15h10" />
    <path d="M18 20h-8" />
  </svg>
);

export const RadarIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 12v-8" />
    <path d="M12 12 6 8" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export const CrosshairIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);