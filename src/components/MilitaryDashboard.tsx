
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Search } from 'lucide-react';
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
      className="min-h-screen bg-background"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Main content */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div 
          className="w-64 bg-sidebar-background text-sidebar-foreground border-r border-border flex flex-col"
          variants={itemVariants}
        >
          <div className="p-4 border-b border-border flex items-center">
            <ShieldAlert className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold tracking-tight">MILITARY.stats</span>
          </div>
          
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full bg-card border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-4">
              <CountrySelector 
                selectedCountries={selectedCountries} 
                setSelectedCountries={setSelectedCountries} 
              />
              
              <div className="pt-4">
                <ComparisonPanel 
                  activeStat={activeStat} 
                  setActiveStat={setActiveStat} 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-auto border-t border-border p-4">
            <motion.button
              onClick={() => setShowStrengths(!showStrengths)}
              className={`w-full flex items-center justify-center p-2 rounded-md text-sm transition-all duration-300 ${showStrengths ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-card/80 text-foreground'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showStrengths ? 'Hide Analysis' : 'Show Strengths & Weaknesses'}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Main display area */}
        <motion.div 
          className="flex-1 overflow-hidden bg-background"
          variants={itemVariants}
        >
          <div className="h-full flex flex-col">
            <header className="bg-card/60 backdrop-blur-sm border-b border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="geo-heading">Military Comparison</h1>
                  <p className="geo-subheading">Global powers analysis</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-md bg-card border border-border text-muted-foreground text-sm">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-6 h-full"
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
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MilitaryDashboard;
