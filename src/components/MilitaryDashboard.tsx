
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import CountrySelector from './CountrySelector';
import ComparisonPanel from './ComparisonPanel';
import ChartSection from './ChartSection';
import StrengthsWeaknessesPanel from './StrengthsWeaknessesPanel';
import { StatCategory } from '@/lib/military-data';

const MilitaryDashboard: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    ['United States', 'China', 'Russia']
  );
  const [activeStat, setActiveStat] = useState<StatCategory>('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStrengths, setShowStrengths] = useState(false);

  useEffect(() => {
    // Simulate loading for smoother animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background to-secondary/30"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Header */}
      <motion.header 
        className="bg-background/90 backdrop-blur-md border-b z-10 sticky top-0"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-semibold flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShieldAlert className="mr-2 text-primary" /> 
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Global Military Comparison
            </span>
          </motion.h1>
          
          <div className="flex items-center">
            <motion.button
              onClick={() => setShowStrengths(!showStrengths)}
              className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showStrengths ? 'Hide Analysis' : 'Show Strengths & Weaknesses'}
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.div 
            className="lg:w-72 space-y-6"
            variants={itemVariants}
          >
            <CountrySelector 
              selectedCountries={selectedCountries} 
              setSelectedCountries={setSelectedCountries} 
            />
            <ComparisonPanel 
              activeStat={activeStat} 
              setActiveStat={setActiveStat} 
            />
          </motion.div>
          
          {/* Main display area */}
          <motion.div 
            className="flex-1 overflow-hidden"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex gap-6"
              >
                <ChartSection 
                  selectedCountries={selectedCountries} 
                  activeStat={activeStat} 
                  className={showStrengths ? "w-3/4" : "w-full"}
                />
                
                {showStrengths && (
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="w-1/4"
                  >
                    <StrengthsWeaknessesPanel selectedCountries={selectedCountries} />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MilitaryDashboard;
