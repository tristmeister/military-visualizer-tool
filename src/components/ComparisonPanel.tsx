
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, ShieldAlert, DollarSign, Users, Shield, 
  Zap, Clock, Map, ChevronRight, BarChart3, Radar
} from 'lucide-react';
import { StatCategory } from '@/lib/military-data';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';

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
    { 
      id: 'overview' as StatCategory, 
      name: 'Overview', 
      icon: <Globe className="w-4 h-4" />, 
      description: 'Overall military capability comparison',
      chartType: 'Radar chart showing overall capabilities'
    },
    { 
      id: 'personnel' as StatCategory, 
      name: 'Personnel', 
      icon: <Users className="w-4 h-4" />, 
      description: 'Military personnel strength and distribution',
      chartType: 'Bar chart comparing active & reserve forces'
    },
    { 
      id: 'budget' as StatCategory, 
      name: 'Defense Budget', 
      icon: <DollarSign className="w-4 h-4" />, 
      description: 'Military spending and GDP percentage',
      chartType: 'Combined bar & line chart showing budget & GDP %'
    },
    { 
      id: 'equipment' as StatCategory, 
      name: 'Equipment', 
      icon: <Shield className="w-4 h-4" />, 
      description: 'Military hardware inventory breakdown',
      chartType: 'Stacked bar chart of equipment categories'
    },
    { 
      id: 'nuclear' as StatCategory, 
      name: 'Nuclear Arsenal', 
      icon: <Zap className="w-4 h-4" />, 
      description: 'Nuclear weapons stockpile and delivery systems',
      chartType: 'Area chart showing warhead counts over time'
    },
    { 
      id: 'historical' as StatCategory, 
      name: 'Historical Trends', 
      icon: <Clock className="w-4 h-4" />, 
      description: 'Budget and force size changes over time',
      chartType: 'Line chart showing historical progression'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const activeIndicatorVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <Card className="overflow-hidden bg-sidebar-background border border-border p-3 shadow-md">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`${isMobile ? 'grid grid-cols-3 gap-2' : 'space-y-2'}`}
      >
        {categoryButtons.map((category) => (
          <Tooltip key={category.id}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setActiveStat(category.id)}
                variants={itemVariants}
                className={`
                  relative w-full flex items-center ${isMobile ? 'py-3 px-2 flex-col justify-center' : 'p-3'} 
                  rounded-md text-center transition-all duration-200 
                  ${activeStat === category.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                `}
                whileHover={{ 
                  x: isMobile ? 0 : 2, 
                  y: isMobile ? -2 : 0,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`
                  ${isMobile ? 'mb-1' : 'mr-3'} 
                  ${activeStat === category.id ? 'text-primary-foreground' : ''}
                  transition-all duration-200 ease-in-out
                `}>
                  {category.icon}
                </div>
                <span className={`${isMobile ? 'text-[11px]' : 'text-sm'} font-medium`}>
                  {category.name}
                </span>
                
                {activeStat === category.id && (
                  <>
                    {!isMobile && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="ml-auto w-1 h-5 bg-secondary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <motion.div
                      variants={activeIndicatorVariants}
                      initial="initial"
                      animate="animate"
                      className={`
                        absolute inset-0 border-2 border-primary/20 rounded-md pointer-events-none
                        ${isMobile ? 'opacity-50' : 'opacity-30'}
                      `}
                    />
                  </>
                )}
                
                {!isMobile && (
                  <ChevronRight className={`
                    ml-auto h-4 w-4 opacity-50 transition-transform duration-200
                    ${activeStat === category.id ? 'rotate-90 text-primary-foreground' : ''}
                  `} />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent 
              side={isMobile ? "bottom" : "right"} 
              className="bg-card border-border text-foreground"
            >
              <div className="space-y-2 p-1">
                <p className="font-medium text-sm">{category.description}</p>
                <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                  {category.id === 'overview' ? <Radar className="w-3 h-3" /> : <BarChart3 className="w-3 h-3" />}
                  <span>{category.chartType}</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </Card>
  );
};

export default ComparisonPanel;
