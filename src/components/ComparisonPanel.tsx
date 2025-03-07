
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldAlert, DollarSign, Users, Anchor, Plane, Shield, Zap, Clock } from 'lucide-react';
import { StatCategory } from '@/lib/military-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ComparisonPanelProps {
  activeStat: StatCategory;
  setActiveStat: (stat: StatCategory) => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ 
  activeStat, 
  setActiveStat 
}) => {
  const categoryButtons = [
    { id: 'overview' as StatCategory, name: 'Overview', icon: <Globe className="w-4 h-4" />, description: 'Overall military capability comparison' },
    { id: 'personnel' as StatCategory, name: 'Personnel', icon: <Users className="w-4 h-4" />, description: 'Military personnel strength and distribution' },
    { id: 'budget' as StatCategory, name: 'Defense Budget', icon: <DollarSign className="w-4 h-4" />, description: 'Military spending and GDP percentage' },
    { id: 'equipment' as StatCategory, name: 'Equipment', icon: <Shield className="w-4 h-4" />, description: 'Military hardware inventory' },
    { id: 'nuclear' as StatCategory, name: 'Nuclear Arsenal', icon: <Zap className="w-4 h-4" />, description: 'Nuclear weapons stockpile' },
    { id: 'historical' as StatCategory, name: 'Historical Trends', icon: <Clock className="w-4 h-4" />, description: 'Budget and force size changes over time' },
  ];

  return (
    <div className="glassmorphism rounded-2xl p-6">
      <h3 className="text-lg font-medium mb-4">Comparison Categories</h3>
      <div className="space-y-2">
        {categoryButtons.map((category) => (
          <Tooltip key={category.id}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setActiveStat(category.id)}
                className={`
                  w-full flex items-center p-3 rounded-lg text-left transition-all duration-300
                  ${activeStat === category.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'}
                `}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mr-3">
                  {category.icon}
                </div>
                <span>{category.name}</span>
                {activeStat === category.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-5 bg-white rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{category.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ComparisonPanel;
