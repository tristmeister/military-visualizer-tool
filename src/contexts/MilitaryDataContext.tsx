import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { militaryData, StatCategory } from '@/lib/military-data';

interface MilitaryDataContextType {
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  activeStat: StatCategory;
  setActiveStat: (stat: StatCategory) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  compareYears: boolean;
  setCompareYears: (compare: boolean) => void;
  comparisonYear: number;
  setComparisonYear: (year: number) => void;
  availableCountries: string[];
  isDataLoading: boolean;
  lastUpdated: Date;
  refreshData: () => Promise<void>;
}

const MilitaryDataContext = createContext<MilitaryDataContextType | undefined>(undefined);

export const MilitaryDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    ['United States', 'China', 'Russia', 'European Union']
  );
  const [activeStat, setActiveStat] = useState<StatCategory>('overview');
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [compareYears, setCompareYears] = useState<boolean>(false);
  const [comparisonYear, setComparisonYear] = useState<number>(2020);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Initialize available countries
  useEffect(() => {
    setAvailableCountries(Object.keys(militaryData));
  }, []);

  // Simulate data refresh
  const refreshData = async (): Promise<void> => {
    setIsDataLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastUpdated(new Date());
    setIsDataLoading(false);
  };

  const value = {
    selectedCountries,
    setSelectedCountries,
    activeStat,
    setActiveStat,
    selectedYear,
    setSelectedYear,
    compareYears,
    setCompareYears,
    comparisonYear,
    setComparisonYear,
    availableCountries,
    isDataLoading,
    lastUpdated,
    refreshData
  };

  return (
    <MilitaryDataContext.Provider value={value}>
      {children}
    </MilitaryDataContext.Provider>
  );
};

export const useMilitaryData = (): MilitaryDataContextType => {
  const context = useContext(MilitaryDataContext);
  if (context === undefined) {
    throw new Error('useMilitaryData must be used within a MilitaryDataProvider');
  }
  return context;
};