
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  Plane, 
  Ship, 
  Users, 
  Shield, 
  Rocket, 
  Radar,
  Target,
  ChevronDown,
  ChevronRight,
  Info
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { militaryData } from '@/lib/military-data';

// Equipment data extracted directly from militaryData
const getEquipmentData = () => {
  const result = {};
  
  Object.keys(militaryData).forEach(country => {
    result[country] = {
      tanks: militaryData[country].tanks || 0,
      aircraft: militaryData[country].aircraft || 0,
      ships: militaryData[country].naval || 0,
      airDefense: Math.round(militaryData[country].budget / 10) || 0, // Estimate based on budget
      missiles: Math.round(militaryData[country].nukes * 10) || 0, // Estimate based on nukes
      helicopters: Math.round(militaryData[country].aircraft / 3) || 0 // Estimate based on aircraft
    };
  });
  
  // If data is missing for some countries, use sample data as fallback
  const sampleEquipmentData = {
    'United States': {
      tanks: 5800,
      aircraft: 13200,
      ships: 490,
      airDefense: 1250,
      missiles: 1550,
      helicopters: 5500
    },
    'China': {
      tanks: 5800,
      aircraft: 3200,
      ships: 750,
      airDefense: 1800,
      missiles: 2000,
      helicopters: 1500
    },
    'Russia': {
      tanks: 12500,
      aircraft: 4100,
      ships: 310,
      airDefense: 1500,
      missiles: 1700,
      helicopters: 1500
    },
    'European Union': {
      tanks: 5000,
      aircraft: 2200,
      ships: 510,
      airDefense: 950,
      missiles: 1100,
      helicopters: 1200
    }
  };
  
  // Merge with sample data for any missing countries
  Object.keys(sampleEquipmentData).forEach(country => {
    if (!result[country]) {
      result[country] = sampleEquipmentData[country];
    }
  });
  
  return result;
};

// Define the equipment categories with their visualization details
const equipmentCategories = [
  { 
    id: 'tanks', 
    name: 'Tanks', 
    icon: (props) => <Truck {...props} />,
    color: '#f97316', // Orange (brand color)
    description: 'Main battle tanks and heavy armored combat vehicles'
  },
  { 
    id: 'aircraft', 
    name: 'Aircraft', 
    icon: (props) => <Plane {...props} />,
    color: '#3b82f6', // Blue
    description: 'Military fixed-wing aircraft including fighters, bombers, and transport'
  },
  { 
    id: 'ships', 
    name: 'Naval Vessels', 
    icon: (props) => <Ship {...props} />,
    color: '#06b6d4', // Cyan
    description: 'Combat and support naval vessels including carriers, destroyers, and submarines'
  },
  { 
    id: 'airDefense', 
    name: 'Air Defense Systems', 
    icon: (props) => <Radar {...props} />,
    color: '#8b5cf6', // Purple
    description: 'Anti-aircraft systems including SAMs and radar installations'
  },
  { 
    id: 'missiles', 
    name: 'Missiles', 
    icon: (props) => <Rocket {...props} />,
    color: '#ef4444', // Red
    description: 'Ballistic, cruise, and tactical missiles' 
  },
  { 
    id: 'helicopters', 
    name: 'Helicopters', 
    icon: (props) => <Target {...props} />,
    color: '#10b981', // Green
    description: 'Attack and utility helicopters'
  }
];

interface EquipmentVisualizationProps {
  selectedCountries: string[];
  className?: string;
}

const EquipmentVisualization: React.FC<EquipmentVisualizationProps> = ({ 
  selectedCountries,
  className = "" 
}) => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('tanks');
  const [equipmentData, setEquipmentData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  // We'll show two countries at a time for comparison
  const [comparisonPair, setComparisonPair] = useState<string[]>([]);
  
  useEffect(() => {
    // Load equipment data
    setEquipmentData(getEquipmentData());
    
    // Set initial comparison pair
    if (selectedCountries.length >= 2) {
      setComparisonPair(selectedCountries.slice(0, 2));
    } else if (selectedCountries.length === 1) {
      // If only one country, duplicate it to avoid issues
      setComparisonPair([selectedCountries[0], selectedCountries[0]]);
    } else {
      // Default fallback if no countries selected
      setComparisonPair(['United States', 'China']);
    }
    
    // Simulate loading
    setTimeout(() => setIsLoaded(true), 300);
  }, [selectedCountries]);
  
  // Calculate the number of icons to show per country (max of 10 rows with 5 icons each)
  const calculateIconGrid = (country: string, categoryId: string) => {
    if (!equipmentData || !equipmentData[country]) return { fullRows: 0, remainder: 0, totalIcons: 0, value: 0 };
    
    // Get the maximum value across all selected countries for this category
    const maxValue = Math.max(
      ...comparisonPair.map(c => 
        equipmentData[c]?.[categoryId] || 0
      )
    );
    
    // Get this country's value
    const value = equipmentData[country]?.[categoryId] || 0;
    
    // Calculate total icons (max 50)
    const totalIcons = Math.min(50, Math.round((value / maxValue) * 50) || 0);
    
    // Calculate rows and remainder for the last row
    const fullRows = Math.floor(totalIcons / 5);
    const remainder = totalIcons % 5;
    
    return { fullRows, remainder, totalIcons, value, maxValue };
  };
  
  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Find the currently active category object
  const activeCategoryObj = equipmentCategories.find(cat => cat.id === activeCategory);
  
  // Find the next pair of countries to compare
  const handleNextComparison = () => {
    const currentIndex = selectedCountries.indexOf(comparisonPair[1]);
    const nextIndex = (currentIndex + 1) % selectedCountries.length;
    const nextNextIndex = (nextIndex + 1) % selectedCountries.length;
    
    setComparisonPair([selectedCountries[nextIndex], selectedCountries[nextNextIndex]]);
  };
  
  if (!isLoaded) {
    return (
      <div className={`bg-card rounded-lg border border-border h-full flex items-center justify-center ${className}`}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-8"
        >
          <div className="inline-block mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-8 h-8 text-muted-foreground" />
            </motion.div>
          </div>
          <p className="text-muted-foreground">Loading equipment data...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className={`bg-card rounded-lg border border-border h-full flex flex-col ${className}`}>
      <div className="border-b border-border p-4">
        <h2 className="text-xl font-bold">Military Equipment Visualization</h2>
        <p className="text-sm text-muted-foreground">
          Visual comparison of military equipment quantities
        </p>
      </div>
      
      {/* Equipment category selection */}
      <div className="border-b border-border overflow-x-auto no-scrollbar">
        <div className="flex p-1">
          {equipmentCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors
                ${activeCategory === category.id 
                  ? 'bg-brand-orange/10 text-brand-orange shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <div className="flex items-center space-x-1">
                <category.icon className="w-4 h-4" style={{ color: category.color }} />
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Country comparison selection */}
      {selectedCountries.length > 2 && (
        <div className="border-b border-border p-3 flex justify-between items-center">
          <span className="text-sm font-medium">
            Comparing: <span className="text-brand-orange">{comparisonPair.join(' vs ')}</span>
          </span>
          <button 
            onClick={handleNextComparison}
            className="px-3 py-1 text-xs rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            Compare Next Pair
          </button>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Category description */}
            <div className="flex items-start space-x-3 p-3 bg-muted/40 rounded-lg">
              <div className="p-2 rounded-md" style={{ backgroundColor: activeCategoryObj?.color + '20' }}>
                {activeCategoryObj?.icon({
                  className: "w-5 h-5",
                  style: { color: activeCategoryObj?.color }
                })}
              </div>
              <div>
                <h3 className="font-medium">{activeCategoryObj?.name}</h3>
                <p className="text-sm text-muted-foreground">{activeCategoryObj?.description}</p>
              </div>
            </div>
          
            {/* Comparison grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comparisonPair.map(country => {
                if (!equipmentData[country]) return null;
                
                const { fullRows, remainder, totalIcons, value, maxValue } = calculateIconGrid(country, activeCategory);
                const countryColor = militaryData[country]?.color || activeCategoryObj?.color;
                
                return (
                  <div key={country} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{country}</h3>
                      <div className="flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="mr-2 opacity-60">
                                <Info className="h-4 w-4" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Each icon represents approximately {Math.round(maxValue / 50)} units</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span className="text-2xl font-mono" style={{ color: countryColor }}>
                          {formatNumber(value)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Icon grid */}
                    <div className="space-y-2">
                      {/* Full rows (5 icons each) */}
                      {Array.from({ length: fullRows }).map((_, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="flex justify-between">
                          {Array.from({ length: 5 }).map((_, iconIndex) => (
                            <motion.div
                              key={`icon-${rowIndex}-${iconIndex}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: (rowIndex * 5 + iconIndex) * 0.01,
                                type: 'spring',
                                stiffness: 200
                              }}
                            >
                              {activeCategoryObj?.icon({
                                className: "w-6 h-6",
                                style: { color: countryColor }
                              })}
                            </motion.div>
                          ))}
                        </div>
                      ))}
                      
                      {/* Remainder row */}
                      {remainder > 0 && (
                        <div className="flex">
                          {Array.from({ length: remainder }).map((_, iconIndex) => (
                            <motion.div
                              key={`remainder-${iconIndex}`}
                              className="mr-4"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: (fullRows * 5 + iconIndex) * 0.01,
                                type: 'spring',
                                stiffness: 200
                              }}
                            >
                              {activeCategoryObj?.icon({
                                className: "w-6 h-6",
                                style: { color: countryColor }
                              })}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: countryColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(totalIcons / 50) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EquipmentVisualization;
