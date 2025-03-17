
import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { StatCategory } from '@/lib/military-data';

export type ViewMode = 'comparison' | 'storytelling' | 'equipment';

export const useDashboardState = () => {
  // Main state
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    ['United States', 'China', 'Russia', 'European Union']
  );
  const [activeStat, setActiveStat] = useState<StatCategory>('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('comparison');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [compareYears, setCompareYears] = useState<boolean>(false);
  const [comparisonYear, setComparisonYear] = useState<number>(2020);
  
  // Refs
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Animation values
  const refreshRotation = useMotionValue(0);
  const dashboardOpacity = useMotionValue(1);
  const dashboardY = useMotionValue(0);
  const headerHeight = useMotionValue(isMobile ? 70 : 88);
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

  // Simulate data refresh
  const handleRefreshData = async () => {
    setIsRefreshing(true);
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
    
    await animateRotation();
    setLastUpdated(new Date());
    setIsRefreshing(false);
    
    toast({
      title: "Data refreshed",
      description: `Military data updated as of ${new Date().toLocaleString()}`,
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
    // Simulate export functionality
    const dummyData = {
      timestamp: new Date().toISOString(),
      countries: selectedCountries,
      category: activeStat,
      viewMode: viewMode
    };
    
    const dataStr = JSON.stringify(dummyData, null, 2);
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
    // In a real app, this would generate a shareable link or open a share dialog
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied",
      description: "Dashboard URL copied to clipboard"
    });
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

  return {
    // State
    selectedCountries,
    setSelectedCountries,
    activeStat,
    setActiveStat,
    viewMode,
    setViewMode,
    sidebarOpen,
    setSidebarOpen,
    isLoaded,
    isFullscreen,
    showAnalysis,
    setShowAnalysis,
    lastUpdated,
    isRefreshing,
    selectedYear,
    setSelectedYear,
    compareYears,
    setCompareYears,
    comparisonYear,
    setComparisonYear,
    
    // Refs
    dashboardRef,
    
    // Animation values
    refreshRotation,
    dashboardOpacity,
    dashboardY,
    headerHeight,
    scrollYProgress,
    headerOpacity,
    
    // Functions
    handleRefreshData,
    toggleFullscreen,
    handleExportData,
    handleShareDashboard,
    handleViewModeChange,
    handleScroll,
  };
};
