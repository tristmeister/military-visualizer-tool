
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChartSection from '@/components/ChartSection';
import StrengthsWeaknessesPanel from '@/components/StrengthsWeaknessesPanel';
import StorytellingArea from '@/components/StorytellingArea';
import EquipmentVisualization from '@/components/EquipmentVisualization';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardContentProps {
  viewMode: 'comparison' | 'storytelling' | 'equipment';
  selectedCountries: string[];
  activeStat: string;
  showAnalysis: boolean;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  viewMode,
  selectedCountries,
  activeStat,
  showAnalysis,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <AnimatePresence mode="wait">
      {viewMode === 'comparison' && (
        <motion.div
          key="comparison"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row gap-6 h-full"
        >
          <ChartSection 
            selectedCountries={selectedCountries} 
            activeStat={activeStat} 
            className={`${showAnalysis ? "w-full md:w-3/4" : "w-full"}`}
          />
          
          {showAnalysis && (
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
              className="w-full md:w-1/4 mt-4 md:mt-0"
            >
              <StrengthsWeaknessesPanel selectedCountries={selectedCountries} />
            </motion.div>
          )}
        </motion.div>
      )}
      
      {viewMode === 'storytelling' && (
        <motion.div
          key="storytelling"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <StorytellingArea />
        </motion.div>
      )}
      
      {viewMode === 'equipment' && (
        <motion.div
          key="equipment"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <EquipmentVisualization selectedCountries={selectedCountries} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardContent;
