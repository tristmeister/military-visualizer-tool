
import React from 'react';
import { 
  Truck, 
  Plane, 
  Ship, 
  Shield, 
  Rocket, 
  Target,
  Radar,
  Crosshair,
  ChevronRight,
  ChevronDown,
  Info,
  BarChart3,
  Grid2x2,
  Share2,
  Download,
  Zap,
  Star,
  TrendingUp,
  LucideProps
} from 'lucide-react';

// Re-export the icons with our custom naming to match the design
export const TankIcon = (props: LucideProps) => <Truck {...props} />;
export const PlaneIcon = (props: LucideProps) => <Plane {...props} />;
export const ShipIcon = (props: LucideProps) => <Ship {...props} />;
export const SubmarineIcon = (props: LucideProps) => <Ship {...props} />; // Using Ship as fallback for Submarine
export const ShieldIcon = (props: LucideProps) => <Shield {...props} />;
export const RocketIcon = (props: LucideProps) => <Rocket {...props} />;
export const HelicopterIcon = (props: LucideProps) => <Target {...props} />;
export const RadarIcon = (props: LucideProps) => <Radar {...props} />;
export const CrosshairIcon = (props: LucideProps) => <Crosshair {...props} />;

// Re-export other icons directly
export { 
  ChevronRight,
  ChevronDown,
  Info,
  BarChart3,
  Grid2x2,
  Share2,
  Download,
  Zap,
  Star,
  TrendingUp
};
