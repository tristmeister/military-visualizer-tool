
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  scrollYProgress: MotionValue<number>;
  headerHeight: MotionValue<number>;
  headerOpacity: MotionValue<number>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  scrollYProgress,
  headerHeight,
  headerOpacity,
  handleScroll,
}) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const headerHeightPx = useTransform(headerHeight, height => `${height}px`);

  // Handle backdrop click to close sidebar on mobile
  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <motion.div 
      ref={dashboardRef}
      className="min-h-screen bg-background"
    >
      <div className="flex h-screen relative">
        {/* Mobile backdrop when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div 
            className="mobile-sidebar-backdrop fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={handleBackdropClick}
          />
        )}

        {/* Sidebar */}
        <DashboardSidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          isMobile={isMobile} 
        />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
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
                  onClick={() => setSidebarOpen(true)} 
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
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
