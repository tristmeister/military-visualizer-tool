
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UseAuthReturn {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const hasAuth = sessionStorage.getItem('geo_warrior_auth');
    setIsAuthenticated(!!hasAuth);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - in a real app, this would be a proper authentication check
        if (email && password) {
          // Store auth token in session storage
          sessionStorage.setItem('geo_warrior_auth', 'true');
          sessionStorage.setItem('geo_warrior_user', email);
          setIsAuthenticated(true);
          setIsLoading(false);
          
          toast({
            title: "Login successful",
            description: "Welcome to GEO.WARRIOR dashboard",
          });
          
          resolve(true);
        } else {
          setIsLoading(false);
          
          toast({
            title: "Login failed",
            description: "Please check your credentials and try again",
            variant: "destructive",
          });
          
          resolve(false);
        }
      }, 1200);
    });
  };

  const logout = () => {
    sessionStorage.removeItem('geo_warrior_auth');
    sessionStorage.removeItem('geo_warrior_user');
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/landing');
  };

  return {
    isAuthenticated,
    login,
    logout,
    isLoading
  };
}
