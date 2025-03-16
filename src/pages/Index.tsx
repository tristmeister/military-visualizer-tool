
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import MilitaryDashboard from '@/components/MilitaryDashboard';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check if user came from landing page (simple auth simulation)
    const hasAuth = sessionStorage.getItem('geo_warrior_auth');
    if (!hasAuth) {
      navigate('/landing');
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [navigate]);

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
