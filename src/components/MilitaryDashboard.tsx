
import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardContent from './dashboard/DashboardContent';
import { useDashboardState } from '@/hooks/use-dashboard-state';

const MilitaryDashboard: React.FC = () => {
  const {
    selectedCountries,
    activeStat,
    viewMode,
    sidebarOpen,
    setSidebarOpen,
    isLoaded,
    showAnalysis,
    dashboardOpacity,
    dashboardY,
    headerHeight,
    scrollYProgress,
    headerOpacity,
    handleScroll,
  } = useDashboardState();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <DashboardLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        scrollYProgress={scrollYProgress}
        headerHeight={headerHeight}
        headerOpacity={headerOpacity}
        handleScroll={handleScroll}
      >
        <motion.div 
          style={{ 
            opacity: dashboardOpacity,
            y: dashboardY
          }}
        >
          <DashboardContent
            viewMode={viewMode}
            selectedCountries={selectedCountries}
            activeStat={activeStat}
            showAnalysis={showAnalysis}
          />
        </motion.div>
      </DashboardLayout>
    </motion.div>
  );
};

export default MilitaryDashboard;
