
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldAlert, DollarSign, Users, Shield, Zap, Clock, Map } from 'lucide-react';
import { StatCategory } from '@/lib/military-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface ComparisonPanelProps {
  activeStat: StatCategory;
  setActiveStat: (stat: StatCategory) => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ 
  activeStat, 
  setActiveStat 
}) => {
  const isMobile = useIsMobile();
  
  const categoryButtons = [
    { id: 'overview' as StatCategory, name: 'Overview', icon: <Globe className="w-4 h-4" />, description: 'Overall military capability comparison' },
    { id: 'personnel' as StatCategory, name: 'Personnel', icon: <Users className="w-4 h-4" />, description: 'Military personnel strength and distribution' },
    { id: 'budget' as StatCategory, name: 'Defense Budget', icon: <DollarSign className="w-4 h-4" />, description: 'Military spending and GDP percentage' },
    { id: 'equipment' as StatCategory, name: 'Equipment', icon: <Shield className="w-4 h-4" />, description: 'Military hardware inventory' },
    { id: 'nuclear' as StatCategory, name: 'Nuclear Arsenal', icon: <Zap className="w-4 h-4" />, description: 'Nuclear weapons stockpile' },
    { id: 'historical' as StatCategory, name: 'Historical Trends', icon: <Clock className="w-4 h-4" />, description: 'Budget and force size changes over time' },
  ];

  return (
    <div className="rounded-lg bg-sidebar-background border border-border p-2">
      <div className={`${isMobile ? 'grid grid-cols-3 gap-1.5' : 'space-y-1'}`}>
        {categoryButtons.map((category) => (
          <Tooltip key={category.id}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setActiveStat(category.id)}
                className={`
                  w-full flex items-center ${isMobile ? 'py-2.5 px-2 flex-col justify-center' : 'p-3'} rounded-md text-center btn-skeuomorphic
                  ${activeStat === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                `}
                whileHover={{ x: isMobile ? 0 : 2, y: isMobile ? -2 : 0 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`${isMobile ? 'mb-1' : 'mr-3'} ${activeStat === category.id ? 'text-primary-foreground' : ''}`}>
                  {category.icon}
                </div>
                <span className={`${isMobile ? 'text-[11px]' : 'text-sm'}`}>{category.name}</span>
                {activeStat === category.id && !isMobile && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="ml-auto w-1 h-5 bg-secondary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "bottom" : "right"} className="bg-card border-border text-foreground text-xs">
              <p>{category.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ComparisonPanel;
