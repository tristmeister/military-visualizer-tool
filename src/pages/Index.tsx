
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import MilitaryDashboard from '@/components/MilitaryDashboard';

const Index: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <MilitaryDashboard />
    </motion.div>
  );
};

export default Index;
