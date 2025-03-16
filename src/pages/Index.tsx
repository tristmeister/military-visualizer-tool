import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MilitaryDashboard from '@/components/MilitaryDashboard';
import { useAuth } from '@/hooks/use-auth';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to landing page if not authenticated
    if (!isAuthenticated) {
      navigate('/landing');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <MilitaryDashboard />
    </div>
  );
};

export default Index;