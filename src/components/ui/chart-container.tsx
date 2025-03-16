import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { chartAnimation } from '@/lib/animation-variants';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  height?: string | number;
  isLoading?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className = "",
  height = 300,
  isLoading = false
}) => {
  return (
    <motion.div 
      className={`glassmorphism rounded-2xl p-6 chart-container ${className}`}
      variants={chartAnimation}
    >
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <div className="w-1 h-5 bg-primary mr-2 rounded-full"></div>
        {title}
      </h3>
      
      <div style={{ height: typeof height === 'number' ? `${height}px` : height }} className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
              <span className="text-sm text-muted-foreground">Loading data...</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
};

export default ChartContainer;