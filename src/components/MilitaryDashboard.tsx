import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ShieldAlert, Search, Menu, X, ChevronRight, 
  BarChart3, Share, Download, 
  Maximize2, RefreshCw, LineChart, Briefcase, Laptop
} from 'lucide-react';
import { useDebouncedState } from '@/hooks/use-debounced-state';
import CountrySelector from './CountrySelector';
import ComparisonPanel from './ComparisonPanel';
import ChartSection from './ChartSection';
import StrengthsWeaknessesPanel from './StrengthsWeaknessesPanel';
import StorytellingArea from './StorytellingArea';
import EquipmentVisualization from './EquipmentVisualization';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMilitaryData } from '@/contexts/MilitaryDataContext';
import { staggerContainer, slideUp, mobileMenuAnimation } from '@/lib/animation-variants';

type ViewMode = 'comparison' | 'storytelling' | 'equipment';

const MilitaryDashboard: React.FC = () => {
  // Get shared state from context
  const { 
    selectedCountries, setSelectedCountries,
    activeStat, setActiveStat,
    selectedYear, setSelectedYear,
    compareYears, setCompareYears,
    comparisonYear, setComparisonYear,
    isDataLoading, lastUpdated, refreshData
  } = useMilitaryData();
  
  // Local state
  const [viewMode, setViewMode] = useState<ViewMode>('comparison');
  const [searchTerm, useDebouncedSearchTerm, rawSearchTerm] = useDebouncedState('', 300);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  // Refs for DOM interactions
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Animation values
  const refreshRotation = useMotionValue(0);
  const dashboardOpacity = useMotionValue(1);
  const dashboardY = useMotionValue(0);
  const headerHeight = useMotionValue(isMobile ? 70 : 88);
  const headerHeightPx = useTransform(headerHeight, height => `${height}px`);
  const scrollYProgress = useMotionValue(0);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Handle initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Reset sidebar on mobile/desktop switch
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Simulate data refresh with animation
  const handleRefreshData = async () => {
    // Animate refresh icon
    const animateRotation = async () => {
      for (let i = 0; i < 2; i++) {
        await new Promise(resolve => {
          let startValue = i * 360;
          const interval = setInterval(() => {
            startValue += 10;
            refreshRotation.set(startValue);
            if (startValue >= (i + 1) * 360) {
              clearInterval(interval);
              resolve(null);
            }
          }, 16);
        });
      }
    };
    
    animateRotation();
    await refreshData();
    
    toast({
      title: "Data refreshed",
      description: `Military data updated as of ${lastUpdated.toLocaleString()}`,
    });
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      dashboardRef.current?.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive",
        });
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Export data as JSON
  const handleExportData = () => {
    // Prepare export data
    const exportData = {
      timestamp: new Date().toISOString(),
      countries: selectedCountries,
      category: activeStat,
      viewMode: viewMode,
      year: selectedYear,
      comparisonYear: compareYears ? comparisonYear : null
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `military-data-export-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Military data has been exported to JSON"
    });
  };

  // Handle sharing functionality
  const handleShareDashboard = () => {
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied",
      description: "Dashboard URL copied to clipboard"
    });
  };

  // Handle mobile sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  // Close sidebar when backdrop clicked
  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle view mode change
  const handleViewModeChange = (mode: ViewMode) => {
    // Add entrance animation for new view
    dashboardOpacity.set(0);
    dashboardY.set(20);
    
    setTimeout(() => {
      setViewMode(mode);
      setTimeout(() => {
        dashboardOpacity.set(1);
        dashboardY.set(0);
      }, 50);
    }, 300);
  };

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollY = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    scrollYProgress.set(scrollY / (maxScroll || 1));
    // Dynamic header height based on scroll
    const newHeight = isMobile 
      ? Math.max(50, 70 - scrollY * 0.1)
      : Math.max(70, 88 - scrollY * 0.1);
    headerHeight.set(newHeight);
  };

  return (
    <motion.div 
      ref={dashboardRef}
      className="min-h-screen bg-background"
      variants={staggerContainer}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <div className="flex h-screen relative">
        {/* Mobile backdrop when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div 
            className="mobile-sidebar-backdrop"
            onClick={handleBackdropClick}
          />
        )}

        {/* Sidebar / Control Panel */}
        <AnimatePresence>
          <motion.div 
            className={`
              mobile-sidebar
              ${isMobile && !sidebarOpen ? 'mobile-sidebar-hidden' : ''}
              ${isMobile ? '' : 'w-72'} 
              bg-sidebar-background text-sidebar-foreground border-r border-border 
              flex flex-col
            `}
            variants={isMobile ? mobileMenuAnimation : undefined}
            initial={isMobile ? "hidden" : false}
            animate={isMobile ? (sidebarOpen ? "visible" : "hidden") : false}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center">
                <ShieldAlert className="w-6 h-6 text-primary mr-2" />
                <span className="font-bold tracking-tight">GEO.WARRIOR</span>
                <span className="text-xs ml-2 px-1.5 py-0.5 bg-primary/20 text-primary rounded-md">PRO</span>
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
            
            {/* Country Selection & Search */}
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full bg-muted border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) => useDebouncedSearchTerm(e.target.value)}
                  value={rawSearchTerm}
                />
              </div>
              
              <div className="space-y-4">
                <CountrySelector 
                  selectedCountries={selectedCountries} 
                  setSelectedCountries={setSelectedCountries}
                  searchTerm={searchTerm}
                  setSearchTerm={useDebouncedSearchTerm}
                />
                
                {/* Year Selector */}
                <div className="border-t border-border pt-4 mt-4">
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm font-medium">Year</p>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setCompareYears(!compareYears)}
                        className={`text-xs px-2 py-1 rounded ${compareYears ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min="2000"
                      max="2030"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                      className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-muted"
                    />
                    <span className="w-12 text-center text-sm font-bold">{selectedYear}</span>
                  </div>
                  
                  {compareYears && (
                    <div className="mt-2 flex gap-2 items-center">
                      <input
                        type="range"
                        min="2000"
                        max="2030"
                        value={comparisonYear}
                        onChange={(e) => setComparisonYear(parseInt(e.target.value))}
                        className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-muted"
                      />
                      <span className="w-12 text-center text-sm font-bold">{comparisonYear}</span>
                    </div>
                  )}
                </div>
                
                {/* Stat Categories */}
                <div className="pt-2">
                  <ComparisonPanel 
                    activeStat={activeStat} 
                    setActiveStat={setActiveStat} 
                  />
                </div>
              </div>
            </div>
            
            {/* Analysis Toggle */}
            <div className="px-4 py-3">
              <Button
                variant="outline"
                size="sm"
                className={`w-full flex items-center justify-between ${showAnalysis ? 'border-primary text-primary' : ''}`}
                onClick={() => setShowAnalysis(!showAnalysis)}
              >
                <span className="flex items-center gap-1">
                  <LineChart className="w-4 h-4" />
                  <span>Show Analysis</span>
                </span>
                <ChevronRight className={`h-4 w-4 transition-transform ${showAnalysis ? 'rotate-90' : ''}`} />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-auto border-t border-border p-4 space-y-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-1 btn-skeuomorphic"
                  onClick={handleShareDashboard}
                >
                  <Share className="w-4 h-4" />
                  <span className="text-xs">Share</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-1 btn-skeuomorphic"
                  onClick={handleExportData}
                >
                  <Download className="w-4 h-4" />
                  <span className="text-xs">Export</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-1 btn-skeuomorphic"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-xs">Expand</span>
                </Button>
              </div>
              
              <div className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-1 bg-primary/10 border-primary/30 text-primary btn-skeuomorphic"
                  onClick={handleRefreshData}
                  disabled={isDataLoading}
                >
                  <motion.div style={{ rotate: refreshRotation }}>
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                  <span className="text-xs">{isDataLoading ? 'Updating...' : 'Refresh Data'}</span>
                </Button>
              </div>
              
              <div className="text-xs text-center text-muted-foreground pt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
            
            {/* View Mode Selector */}
            <div className="px-4 pt-2 pb-4 border-t border-border">
              <h3 className="text-sm font-medium mb-2">View Modes</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={viewMode === 'comparison' ? 'default' : 'outline'}
                  size="sm"
                  className={`flex items-center justify-center gap-1 ${viewMode === 'comparison' ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => handleViewModeChange('comparison')}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>Compare</span>
                </Button>
                <Button 
                  variant={viewMode === 'equipment' ? 'default' : 'outline'}
                  size="sm"
                  className={`flex items-center justify-center gap-1 ${viewMode === 'equipment' ? 'bg-accent text-accent-foreground' : ''}`}
                  onClick={() => handleViewModeChange('equipment')}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Equipment</span>
                </Button>
                <Button 
                  variant={viewMode === 'storytelling' ? 'default' : 'outline'}
                  size="sm"
                  className="flex items-center justify-center gap-1 col-span-2"
                  onClick={() => handleViewModeChange('storytelling')}
                >
                  <Laptop className="w-3 h-3" />
                  <span>Storytelling</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Main Content Area */}
        <motion.div 
          className="flex-1 overflow-hidden"
          style={{ 
            opacity: dashboardOpacity,
            y: dashboardY
          }}
        >
          <div className="h-full flex flex-col">
            <motion.header 
              className="bg-card/60 backdrop-blur-sm border-b border-border p-4 md:p-6 flex items-center z-10"
              style={{ 
                height: headerHeightPx,
                opacity: headerOpacity
              }}
            >
              {isMobile && (
                <button 
                  onClick={toggleSidebar} 
                  className="mr-3 btn-skeuomorphic p-1.5 rounded-md bg-muted"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <div>
                <motion.h1 
                  className="text-2xl md:text-4xl font-bold leading-none tracking-tight"
                  layoutId="dashboard-title"
                >
                  Military Comparison
                </motion.h1>
                <motion.p 
                  className="geo-subheading text-sm md:text-xl"
                  layoutId="dashboard-subtitle"
                >
                  Global powers analysis
                </motion.p>
              </div>
              <div className="ml-auto hidden md:flex gap-2">
                <div className="px-3 py-1 rounded-md bg-card border border-border text-muted-foreground text-sm">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </motion.header>
            
            <div 
              className="flex-1 overflow-auto p-3 md:p-6"
              onScroll={handleScroll}
            >
              <AnimatePresence mode="wait">
                {viewMode === 'comparison' && (
                  <motion.div
                    key="comparison"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
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
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full"
                  >
                    <StorytellingArea />
                  </motion.div>
                )}
                
                {viewMode === 'equipment' && (
                  <motion.div
                    key="equipment"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full"
                  >
                    <EquipmentVisualization selectedCountries={selectedCountries} />
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