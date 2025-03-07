
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
    <MilitaryDashboard />
  );
};

export default Index;
