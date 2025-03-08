
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Search, Menu, X, ChevronRight } from 'lucide-react';
import CountrySelector from './CountrySelector';
import ComparisonPanel from './ComparisonPanel';
import ChartSection from './ChartSection';
import StrengthsWeaknessesPanel from './StrengthsWeaknessesPanel';
import StorytellingArea from './StorytellingArea';
import { StatCategory } from '@/lib/military-data';
import { useIsMobile } from '@/hooks/use-mobile';

const MilitaryDashboard: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    ['United States', 'China', 'Russia', 'European Union']
  );
  const [activeStat, setActiveStat] = useState<StatCategory>('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStrengths, setShowStrengths] = useState(false);
  const [showStorytelling, setShowStorytelling] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate loading for smoother animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Close sidebar when transitioning from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Disable storytelling mode on mobile
  useEffect(() => {
    if (isMobile && showStorytelling) {
      setShowStorytelling(false);
    }
  }, [isMobile, showStorytelling]);

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

  const toggleSidebar = () => {
    console.log("Toggle sidebar called, current state:", sidebarOpen);
    setSidebarOpen(prevState => !prevState);
  };

  // Handle backdrop click to close sidebar on mobile
  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
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
      <div className="flex h-screen relative">
        {/* Mobile Backdrop */}
        {isMobile && sidebarOpen && (
          <div 
            className="mobile-sidebar-backdrop"
            onClick={handleBackdropClick}
          />
        )}

        {/* Sidebar */}
        <AnimatePresence>
          <motion.div 
            className={`
              mobile-sidebar
              ${isMobile && !sidebarOpen ? 'mobile-sidebar-hidden' : ''}
              ${isMobile ? '' : 'w-64'} 
              bg-sidebar-background text-sidebar-foreground border-r border-border 
              flex flex-col
            `}
            initial={isMobile ? { x: "-100%" } : { x: 0 }}
            animate={isMobile ? { x: sidebarOpen ? 0 : "-100%" } : { x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center">
                <ShieldAlert className="w-6 h-6 text-primary mr-2" />
                <span className="font-bold tracking-tight">GEO.WARRIOR</span>
              </div>
              {isMobile && (
                <button 
                  onClick={toggleSidebar} 
                  className="text-muted-foreground p-1 hover:text-primary transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full bg-muted border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <CountrySelector 
                  selectedCountries={selectedCountries} 
                  setSelectedCountries={setSelectedCountries}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                
                <div className="pt-4">
                  <ComparisonPanel 
                    activeStat={activeStat} 
                    setActiveStat={setActiveStat} 
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-auto border-t border-border p-4 space-y-2">
              <motion.button
                onClick={() => setShowStrengths(!showStrengths)}
                className={`w-full flex items-center justify-center p-2 rounded-md text-sm btn-skeuomorphic ${showStrengths ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {showStrengths ? 'Hide Analysis' : 'Show Strengths & Weaknesses'}
              </motion.button>
              
              {!isMobile && (
                <motion.button
                  onClick={() => setShowStorytelling(!showStorytelling)}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm btn-skeuomorphic ${showStorytelling ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Storytelling Mode</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${showStorytelling ? 'rotate-90' : ''}`} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Main display area */}
        <motion.div 
          className="flex-1 overflow-hidden bg-background"
          variants={itemVariants}
        >
          <div className="h-full flex flex-col">
            <header className="bg-card/60 backdrop-blur-sm border-b border-border p-4 md:p-6 flex items-center">
              {isMobile && (
                <button 
                  onClick={toggleSidebar} 
                  className="mr-3 btn-skeuomorphic p-1.5 rounded-md bg-muted"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className={`text-2xl md:text-4xl font-bold leading-none tracking-tight ${isMobile ? 'text-left' : ''}`}>Military Comparison</h1>
                <p className="geo-subheading text-sm md:text-xl">Global powers analysis</p>
              </div>
              <div className="ml-auto hidden md:flex gap-2">
                <div className="px-3 py-1 rounded-md bg-card border border-border text-muted-foreground text-sm">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-3 md:p-6">
              <AnimatePresence mode="wait">
                {!showStorytelling ? (
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
                      className={`${showStrengths ? "w-full md:w-3/4" : "w-full"}`}
                    />
                    
                    {showStrengths && (
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
                ) : (
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
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MilitaryDashboard;
