
import React, { useState } from 'react';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
import { 
  ShieldAlert, Search, X, ChevronRight, RefreshCw, LineChart,
  Share, Download, Maximize2, BarChart3, Briefcase, Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountrySelector from '@/components/CountrySelector';
import ComparisonPanel from '@/components/ComparisonPanel';
import { useDebouncedState } from '@/hooks/use-debounced-state';
import { StatCategory } from '@/lib/military-data';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
}) => {
  // State
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    ['United States', 'China', 'Russia', 'European Union']
  );
  const [activeStat, setActiveStat] = useState<StatCategory>('overview');
  const [searchTerm, useDebouncedSearchTerm, rawSearchTerm] = useDebouncedState('', 300);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [compareYears, setCompareYears] = useState<boolean>(false);
  const [comparisonYear, setComparisonYear] = useState<number>(2020);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'comparison' | 'storytelling' | 'equipment'>('comparison');
  
  // Refresh animation
  const refreshRotation = useState(0)[0];
  
  // Handle data refresh
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={`
          mobile-sidebar
          ${isMobile && !sidebarOpen ? 'mobile-sidebar-hidden' : ''}
          ${isMobile ? 'fixed z-50 h-full' : 'w-72'} 
          bg-sidebar-background text-sidebar-foreground border-r border-border 
          flex flex-col
        `}
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={isMobile ? { x: sidebarOpen ? 0 : "-100%" } : { x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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
              onClick={() => setSidebarOpen(false)} 
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
            >
              <Share className="w-4 h-4" />
              <span className="text-xs">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 flex items-center justify-center gap-1 btn-skeuomorphic"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 flex items-center justify-center gap-1 btn-skeuomorphic"
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
              disabled={isRefreshing}
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs">{isRefreshing ? 'Updating...' : 'Refresh Data'}</span>
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
              onClick={() => setViewMode('comparison')}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Compare</span>
            </Button>
            <Button 
              variant={viewMode === 'equipment' ? 'default' : 'outline'}
              size="sm"
              className={`flex items-center justify-center gap-1 ${viewMode === 'equipment' ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setViewMode('equipment')}
            >
              <Briefcase className="w-3 h-3" />
              <span>Equipment</span>
            </Button>
            <Button 
              variant={viewMode === 'storytelling' ? 'default' : 'outline'}
              size="sm"
              className="flex items-center justify-center gap-1 col-span-2"
              onClick={() => setViewMode('storytelling')}
            >
              <Laptop className="w-3 h-3" />
              <span>Storytelling</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardSidebar;
