import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TankIcon, 
  PlaneIcon, 
  ShipIcon, 
  ShieldIcon, 
  RocketIcon, 
  HelicopterIcon,
  RadarIcon,
  CrosshairIcon,
  ChevronRight,
  ChevronDown,
  Info,
  BarChart3,
  Grid2x2,
  Share2,
  Download,
  Zap,
  Star,
  TrendingUp
} from '@/components/ui/custom-icons';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from '@/hooks/use-mobile';
import { militaryData } from '@/lib/military-data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const getEnhancedEquipmentData = () => {
  const result = {};
  
  Object.keys(militaryData).forEach(country => {
    result[country] = {
      tanks: {
        quantity: militaryData[country].tanks || 0,
        growth: Math.random() * 10 - 5,
        qualityRating: Math.min(10, Math.max(1, Math.round(Math.random() * 5) + 5)),
        mainModels: generateMainModels('tanks', country),
        modernPercentage: Math.round(Math.random() * 100),
        operationalRate: 50 + Math.round(Math.random() * 50),
        yearlyBudget: Math.round((militaryData[country].budget || 100) * (Math.random() * 0.1 + 0.05)),
      },
      aircraft: {
        quantity: militaryData[country].aircraft || 0,
        growth: Math.random() * 10 - 5,
        qualityRating: Math.min(10, Math.max(1, Math.round(Math.random() * 5) + 5)),
        mainModels: generateMainModels('aircraft', country),
        modernPercentage: Math.round(Math.random() * 100),
        operationalRate: 50 + Math.round(Math.random() * 50),
        yearlyBudget: Math.round((militaryData[country].budget || 100) * (Math.random() * 0.2 + 0.1)),
      },
      ships: {
        quantity: militaryData[country].naval || 0,
        growth: Math.random() * 10 - 5,
        qualityRating: Math.min(10, Math.max(1, Math.round(Math.random() * 5) + 5)),
        mainModels: generateMainModels('ships', country),
        modernPercentage: Math.round(Math.random() * 100),
        operationalRate: 50 + Math.round(Math.random() * 50),
        yearlyBudget: Math.round((militaryData[country].budget || 100) * (Math.random() * 0.15 + 0.1)),
      },
      airDefense: {
        quantity: Math.round(militaryData[country].budget / 10) || 0,
        growth: Math.random() * 10 - 5,
        qualityRating: Math.min(10, Math.max(1, Math.round(Math.random() * 5) + 5)),
        mainModels: generateMainModels('airDefense', country),
        modernPercentage: Math.round(Math.random() * 100),
        operationalRate: 50 + Math.round(Math.random() * 50),
        yearlyBudget: Math.round((militaryData[country].budget || 100) * (Math.random() * 0.1 + 0.05)),
      },
      missiles: {
        quantity: Math.round(militaryData[country].nukes * 10) || 0,
        growth: Math.random() * 10 - 5,
        qualityRating: Math.min(10, Math.max(1, Math.round(Math.random() * 5) + 5)),
        mainModels: generateMainModels('missiles', country),
        modernPercentage: Math.round(Math.random() * 100),
        operationalRate: 50 + Math.round(Math.random() * 50),
        yearlyBudget: Math.round((militaryData[country].budget || 100) * (Math.random() * 0.1 + 0.05)),
      },
      helicopters: {
        quantity: Math.round(militaryData[country].aircraft / 3) || 0,
        growth: Math.random() * 10 - 5,
        qualityRating: Math.min(10, Math.max(1, Math.round(Math.random() * 5) + 5)),
        mainModels: generateMainModels('helicopters', country),
        modernPercentage: Math.round(Math.random() * 100),
        operationalRate: 50 + Math.round(Math.random() * 50),
        yearlyBudget: Math.round((militaryData[country].budget || 100) * (Math.random() * 0.1 + 0.05)),
      },
      historicalData: generateHistoricalData(country),
    };
  });
  
  const categories = ['tanks', 'aircraft', 'ships', 'airDefense', 'missiles', 'helicopters'];
  
  categories.forEach(category => {
    const sortedByQuantity = Object.keys(result)
      .filter(country => result[country][category].quantity > 0)
      .sort((a, b) => result[b][category].quantity - result[a][category].quantity);
    
    sortedByQuantity.forEach((country, index) => {
      result[country][category].globalRank = index + 1;
    });
    
    Object.keys(result).forEach(country => {
      if (result[country][category]) {
        result[country][category].powerRating = 
          result[country][category].quantity * result[country][category].qualityRating / 10;
      }
    });
  });
  
  return result;
};

function generateMainModels(category: string, country: string): string[] {
  const modelsByCategory: Record<string, Record<string, string[]>> = {
    tanks: {
      'United States': ['M1A2 Abrams', 'M1A1 Abrams', 'M2 Bradley'],
      'Russia': ['T-90', 'T-72B3', 'T-80U', 'T-14 Armata'],
      'China': ['Type 99A', 'Type 96', 'Type 15'],
      'European Union': ['Leopard 2A7', 'Challenger 2', 'Leclerc'],
      'default': ['MBT-2000', 'T-72', 'AMX-30']
    },
    aircraft: {
      'United States': ['F-35 Lightning II', 'F-22 Raptor', 'F-15 Eagle', 'F-16 Fighting Falcon'],
      'Russia': ['Su-35', 'Su-57', 'MiG-29', 'Tu-160'],
      'China': ['J-20', 'J-16', 'J-10C', 'H-6K'],
      'European Union': ['Eurofighter Typhoon', 'Rafale', 'Gripen E'],
      'default': ['F-16', 'MiG-29', 'Su-30']
    },
    ships: {
      'United States': ['Nimitz-class Carrier', 'Arleigh Burke-class Destroyer', 'Virginia-class Submarine'],
      'Russia': ['Admiral Kuznetsov', 'Kirov-class Battlecruiser', 'Borei-class Submarine'],
      'China': ['Type 055 Destroyer', 'Type 003 Aircraft Carrier', 'Type 095 Submarine'],
      'European Union': ['Queen Elizabeth-class Carrier', 'FREMM Frigate', 'Type 212 Submarine'],
      'default': ['Frigate', 'Corvette', 'Patrol Vessel']
    },
    airDefense: {
      'United States': ['Patriot PAC-3', 'THAAD', 'Avenger'],
      'Russia': ['S-400 Triumf', 'S-350', 'Pantsir-S1'],
      'China': ['HQ-9', 'HQ-19', 'HQ-16'],
      'European Union': ['SAMP/T', 'IRIS-T SL', 'Skyguard'],
      'default': ['SA-8', 'SA-15', 'Portable SAM']
    },
    missiles: {
      'United States': ['Tomahawk', 'Minuteman III ICBM', 'Trident D5'],
      'Russia': ['Iskander', 'Kalibr', 'RS-28 Sarmat'],
      'China': ['DF-41', 'DF-26', 'YJ-18'],
      'European Union': ['Storm Shadow/SCALP', 'Exocet', 'ASMP'],
      'default': ['Short-range ballistic missile', 'Cruise missile']
    },
    helicopters: {
      'United States': ['AH-64 Apache', 'UH-60 Black Hawk', 'CH-47 Chinook'],
      'Russia': ['Ka-52 Alligator', 'Mi-28 Havoc', 'Mi-24 Hind'],
      'China': ['Z-10', 'Z-19', 'Z-8'],
      'European Union': ['Tiger', 'NH90', 'AW101'],
      'default': ['Mi-17', 'AW109', 'UH-1']
    }
  };
  
  const models = modelsByCategory[category]?.[country] || modelsByCategory[category]?.['default'] || [];
  
  const count = Math.floor(Math.random() * 3) + 1;
  return models.slice(0, count);
}

function generateHistoricalData(country: string) {
  const years = [2020, 2021, 2022, 2023, 2024];
  return years.map(year => {
    const baseTanks = militaryData[country]?.tanks || 100;
    const baseAircraft = militaryData[country]?.aircraft || 100;
    const baseShips = militaryData[country]?.naval || 50;
    
    const randomFactor = 0.8 + (Math.random() * 0.4);
    const yearFactor = (year - 2020) / (2024 - 2020);
    
    return {
      year,
      tanks: Math.round(baseTanks * (0.9 + (yearFactor * 0.2)) * randomFactor),
      aircraft: Math.round(baseAircraft * (0.9 + (yearFactor * 0.2)) * randomFactor),
      ships: Math.round(baseShips * (0.9 + (yearFactor * 0.2)) * randomFactor),
      airDefense: Math.round((militaryData[country]?.budget / 10 || 50) * (0.9 + (yearFactor * 0.2)) * randomFactor),
      missiles: Math.round((militaryData[country]?.nukes * 10 || 50) * (0.9 + (yearFactor * 0.2)) * randomFactor),
      helicopters: Math.round((militaryData[country]?.aircraft / 3 || 50) * (0.9 + (yearFactor * 0.2)) * randomFactor),
    };
  });
}

const equipmentCategories = [
  { 
    id: 'tanks', 
    name: 'Tanks', 
    icon: TankIcon,
    color: '#f97316',
    description: 'Main battle tanks and armored fighting vehicles',
    capabilities: [
      'Ground warfare dominance',
      'Infantry support',
      'Territorial control'
    ]
  },
  { 
    id: 'aircraft', 
    name: 'Combat Aircraft', 
    icon: PlaneIcon,
    color: '#3b82f6',
    description: 'Fighter jets, bombers, and support aircraft',
    capabilities: [
      'Air superiority',
      'Strategic bombing',
      'Reconnaissance'
    ]
  },
  { 
    id: 'ships', 
    name: 'Naval Vessels', 
    icon: ShipIcon,
    color: '#06b6d4',
    description: 'Aircraft carriers, destroyers, submarines, and support vessels',
    capabilities: [
      'Maritime dominance',
      'Power projection',
      'Naval blockade capability'
    ]
  },
  { 
    id: 'airDefense', 
    name: 'Air Defense', 
    icon: RadarIcon,
    color: '#8b5cf6',
    description: 'Surface-to-air missile systems and anti-aircraft installations',
    capabilities: [
      'Airspace denial',
      'Critical infrastructure protection',
      'Counter-stealth capability'
    ]
  },
  { 
    id: 'missiles', 
    name: 'Missile Systems', 
    icon: RocketIcon,
    color: '#ef4444',
    description: 'Ballistic missiles, cruise missiles, and tactical missile systems',
    capabilities: [
      'Strategic deterrence',
      'Long-range strike capability',
      'Precision targeting'
    ]
  },
  { 
    id: 'helicopters', 
    name: 'Military Helicopters', 
    icon: HelicopterIcon,
    color: '#10b981',
    description: 'Attack helicopters, transport helicopters, and utility rotorcraft',
    capabilities: [
      'Close air support',
      'Rapid deployment',
      'Search and rescue'
    ]
  }
];

interface EquipmentVisualizationProps {
  selectedCountries: string[];
  className?: string;
  onCountryFocus?: (country: string) => void;
}

const EquipmentVisualization: React.FC<EquipmentVisualizationProps> = ({ 
  selectedCountries,
  className = "",
  onCountryFocus
}) => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('tanks');
  const [equipmentData, setEquipmentData] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'icons' | 'chart' | 'details' | 'trends'>('icons');
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [normalizeData, setNormalizeData] = useState(false);
  const [showQualityRating, setShowQualityRating] = useState(false);
  
  const [comparisonCountries, setComparisonCountries] = useState<string[]>([]);
  
  useEffect(() => {
    setEquipmentData(getEnhancedEquipmentData());
    
    if (selectedCountries.length >= 1) {
      setComparisonCountries(selectedCountries.slice(0, Math.min(3, selectedCountries.length)));
    } else {
      setComparisonCountries(['United States', 'China', 'Russia'].slice(0, Math.min(3, selectedCountries.length)));
    }
    
    setTimeout(() => setIsLoaded(true), 500);
  }, [selectedCountries]);
  
  const activeCategoryObj = equipmentCategories.find(cat => cat.id === activeCategory);
  
  const calculateIconGrid = (country: string, categoryId: string) => {
    if (!equipmentData[country]) return { fullRows: 0, remainder: 0, totalIcons: 0, value: 0, qualityValue: 0 };
    
    const maxValue = Math.max(
      ...comparisonCountries.map(c => 
        equipmentData[c]?.[categoryId]?.quantity || 0
      )
    );
    
    const value = equipmentData[country]?.[categoryId]?.quantity || 0;
    const qualityValue = equipmentData[country]?.[categoryId]?.qualityRating || 5;
    
    let totalIcons = 0;
    
    if (normalizeData) {
      const normalizedValue = maxValue > 0 ? (value / maxValue) : 0;
      
      if (showQualityRating) {
        totalIcons = Math.min(50, Math.round(normalizedValue * 50 * (qualityValue / 5)));
      } else {
        totalIcons = Math.min(50, Math.round(normalizedValue * 50));
      }
    } else {
      const scaleFactor = 50 / (maxValue || 1);
      
      if (showQualityRating) {
        totalIcons = Math.min(50, Math.round(value * scaleFactor * (qualityValue / 5)));
      } else {
        totalIcons = Math.min(50, Math.round(value * scaleFactor));
      }
    }
    
    const fullRows = Math.floor(totalIcons / 5);
    const remainder = totalIcons % 5;
    
    return { 
      fullRows, 
      remainder, 
      totalIcons, 
      value, 
      qualityValue,
      maxValue,
      powerRating: equipmentData[country]?.[categoryId]?.powerRating || 0,
      growth: equipmentData[country]?.[categoryId]?.growth || 0,
      mainModels: equipmentData[country]?.[categoryId]?.mainModels || [],
      globalRank: equipmentData[country]?.[categoryId]?.globalRank || 'N/A',
      modernPercentage: equipmentData[country]?.[categoryId]?.modernPercentage || 0,
      operationalRate: equipmentData[country]?.[categoryId]?.operationalRate || 0,
      yearlyBudget: equipmentData[country]?.[categoryId]?.yearlyBudget || 0
    };
  };
  
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const formatGrowth = (num: number): string => {
    return (num > 0 ? '+' : '') + num.toFixed(1) + '%';
  };
  
  const generateChartData = useMemo(() => {
    if (!equipmentData || !activeCategoryObj) return [];
    
    return comparisonCountries.map(country => {
      const countryData = equipmentData[country];
      if (!countryData) return null;
      
      const categoryData = countryData[activeCategory];
      const countryColor = militaryData[country]?.color || activeCategoryObj.color;
      
      return {
        name: country,
        value: categoryData?.quantity || 0,
        quality: categoryData?.qualityRating || 5,
        powerRating: categoryData?.powerRating || 0,
        color: countryColor
      };
    }).filter(Boolean);
  }, [equipmentData, comparisonCountries, activeCategory, activeCategoryObj]);
  
  const generateTrendData = useMemo(() => {
    if (!equipmentData || !activeCategoryObj) return [];
    
    const result = [];
    
    comparisonCountries.forEach(country => {
      const countryData = equipmentData[country];
      if (!countryData || !countryData.historicalData) return;
      
      const countryColor = militaryData[country]?.color || activeCategoryObj.color;
      
      countryData.historicalData.forEach(yearData => {
        result.push({
          country,
          year: yearData.year,
          value: yearData[activeCategory] || 0,
          color: countryColor
        });
      });
    });
    
    return result;
  }, [equipmentData, comparisonCountries, activeCategory, activeCategoryObj]);
  
  const toggleCountryComparison = (country: string) => {
    if (comparisonCountries.includes(country)) {
      if (comparisonCountries.length > 1) {
        setComparisonCountries(comparisonCountries.filter(c => c !== country));
      }
    } else {
      if (comparisonCountries.length < 3) {
        setComparisonCountries([...comparisonCountries, country]);
      } else {
        setComparisonCountries([...comparisonCountries.slice(0, 2), country]);
      }
    }
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
              <ShieldIcon className="w-8 h-8 text-muted-foreground" />
            </motion.div>
          </div>
          <p className="text-muted-foreground">Loading military equipment data...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className={`bg-card rounded-lg border border-border h-full flex flex-col ${className}`}>
      <div className="border-b border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold">Military Equipment Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Comparative analysis of global military capabilities
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant={viewMode === 'icons' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('icons')}
              className="h-8"
            >
              <Grid2x2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Visual</span>
            </Button>
            <Button 
              variant={viewMode === 'chart' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('chart')}
              className="h-8"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Chart</span>
            </Button>
            <Button 
              variant={viewMode === 'details' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('details')}
              className="h-8"
            >
              <Info className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Details</span>
            </Button>
            <Button 
              variant={viewMode === 'trends' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('trends')}
              className="h-8"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Trends</span>
            </Button>
          </div>
        </div>
      </div>
      
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
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}
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
      
      <div className="border-b border-border p-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium mr-1">Comparing:</span>
          {comparisonCountries.map(country => (
            <Badge 
              key={country} 
              variant="secondary"
              className="flex items-center gap-1"
              style={{ 
                backgroundColor: `${militaryData[country]?.color || activeCategoryObj?.color}20`,
                color: militaryData[country]?.color || activeCategoryObj?.color
              }}
            >
              {country}
              <button 
                onClick={() => toggleCountryComparison(country)}
                className="ml-1 w-4 h-4 inline-flex items-center justify-center rounded-full hover:bg-muted"
              >
                ×
              </button>
            </Badge>
          ))}
          
          {selectedCountries.length > comparisonCountries.length && (
            <Select 
              onValueChange={(value) => {
                if (value && !comparisonCountries.includes(value)) {
                  toggleCountryComparison(value);
                }
              }}
            >
              <SelectTrigger className="h-7 w-auto border-dashed">
                <SelectValue placeholder="+ Add country" />
              </SelectTrigger>
              <SelectContent>
                {selectedCountries
                  .filter(country => !comparisonCountries.includes(country))
                  .map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          )}
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Normalize</span>
                    <Switch 
                      checked={normalizeData}
                      onCheckedChange={setNormalizeData}
                      size="sm"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Normalize values relative to the largest in the comparison</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Quality</span>
                    <Switch 
                      checked={showQualityRating}
                      onCheckedChange={setShowQualityRating}
                      size="sm"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Factor in equipment quality ratings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Animation</span>
                    <Switch 
                      checked={animationEnabled}
                      onCheckedChange={setAnimationEnabled}
                      size="sm"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enable or disable animations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${activeCategory}`}
            initial={animationEnabled ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={animationEnabled ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <div className="flex items-start space-x-3 p-3 bg-muted/40 rounded-lg mb-4">
              <div className="p-2 rounded-md" style={{ backgroundColor: activeCategoryObj?.color + '20' }}>
                {activeCategoryObj && <activeCategoryObj.icon
                  className="w-5 h-5"
                  style={{ color: activeCategoryObj?.color }}
                />}
              </div>
              <div>
                <h3 className="font-medium">{activeCategoryObj?.name}</h3>
                <p className="text-sm text-muted-foreground">{activeCategoryObj?.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {activeCategoryObj?.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          
            {viewMode === 'icons' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {comparisonCountries.map(country => {
                  if (!equipmentData[country]) return null;
                  
                  const { 
                    fullRows, 
                    remainder, 
                    totalIcons, 
                    value, 
                    qualityValue,
                    globalRank, 
                    growth
                  } = calculateIconGrid(country, activeCategory);
                  
                  const countryColor = militaryData[country]?.color || activeCategoryObj?.color;
                  
                  return (
                    <div key={country} className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg flex items-center">
                            {country}
                            <Badge 
                              variant="outline" 
                              className="ml-2"
                              style={{ color: countryColor }}
                            >
                              Rank #{globalRank}
                            </Badge>
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-2xl font-mono" style={{ color: countryColor }}>
                              {formatNumber(value)}
                            </span>
                            <Badge 
                              variant={growth >= 0 ? "default" : "destructive"}
                              className="ml-2 text-xs"
                            >
                              {formatGrowth(growth)}
                            </Badge>
                          </div>
                        </div>
                        
                        {showQualityRating && (
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-muted-foreground mb-1">Quality</div>
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                              style={{ 
                                backgroundColor: `${countryColor}20`,
                                color: countryColor
                              }}
                            >
                              {qualityValue}/10
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {Array.from({ length: fullRows }).map((_, rowIndex) => (
                          <div key={`row-${rowIndex}`} className="flex justify-between">
                            {Array.from({ length: 5 }).map((_, iconIndex) => (
                              <motion.div
                                key={`icon-${rowIndex}-${iconIndex}`}
                                initial={animationEnabled ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: animationEnabled ? (rowIndex * 5 + iconIndex) * 0.01 : 0,
                                  type: 'spring',
                                  stiffness: 200
                                }}
                              >
                                {activeCategoryObj && <activeCategoryObj.icon
                                  className="w-6 h-6"
                                  style={{ color: countryColor }}
                                />}
                              </motion.div>
                            ))}
                          </div>
                        ))}
                        
                        {remainder > 0 && (
                          <div className="flex">
                            {Array.from({ length: remainder }).map((_, iconIndex) => (
                              <motion.div
                                key={`remainder-${iconIndex}`}
                                className="mr-4"
                                initial={animationEnabled ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: animationEnabled ? (fullRows * 5 + iconIndex) * 0.01 : 0,
                                  type: 'spring',
                                  stiffness: 200
                                }}
                              >
                                {activeCategoryObj && <activeCategoryObj.icon
                                  className="w-6 h-6"
                                  style={{ color: countryColor }}
                                />}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full"
                          style={{ backgroundColor: countryColor }}
                          initial={animationEnabled ? { width: 0 } : { width: `${(totalIcons / 50) * 100}%` }}
                          animate={{ width: `${(totalIcons / 50) * 100}%` }}
                          transition={{ duration: animationEnabled ? 0.5 : 0 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {viewMode === 'chart' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Equipment Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={generateChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip
                            formatter={(value, name) => {
                              if (name === 'value') return [formatNumber(value as number), 'Quantity'];
                              if (name === 'quality') return [value, 'Quality Rating'];
                              if (name === 'powerRating') return [formatNumber(value as number), 'Combat Power'];
                              return [value, name];
                            }}
                          />
                          <Legend />
                          <Bar 
                            dataKey="value" 
                            name="Quantity" 
                            fill={activeCategoryObj?.color} 
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                          />
                          {showQualityRating && (
                            <Bar 
                              dataKey="quality" 
                              name="Quality Rating" 
                              fill="#8884d8" 
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                            />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {showQualityRating && (
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">Combat Power Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={generateChartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip
                              formatter={(value, name) => {
                                if (name === 'powerRating') return [formatNumber(value as number), 'Combat Power'];
                                return [value, name];
                              }}
                            />
                            <Bar 
                              dataKey="powerRating" 
                              name="Combat Power" 
                              fill="#10b981" 
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                            >
                              {generateChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {viewMode === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comparisonCountries.map(country => {
                  if (!equipmentData[country]) return null;
                  
                  const {
                    value,
                    qualityValue,
                    globalRank,
                    mainModels,
                    modernPercentage,
                    operationalRate,
                    yearlyBudget
                  } = calculateIconGrid(country, activeCategory);
                  
                  const countryColor = militaryData[country]?.color || activeCategoryObj?.color;
                  
                  return (
                    <Card key={country}>
                      <CardHeader className="pb-2">
                        <CardTitle style={{ color: countryColor }}>{country}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Units</div>
                              <div className="text-2xl font-bold">{formatNumber(value)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Global Rank</div>
                              <div className="text-2xl font-bold">#{globalRank}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Quality Rating</div>
                              <div className="text-2xl font-bold">{qualityValue}/10</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Main Models</div>
                            <div className="flex flex-wrap gap-2">
                              {mainModels.map((model, idx) => (
                                <Badge key={idx} variant="outline">
                                  {model}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-muted-foreground">Modern Equipment</span>
                                <span className="text-sm font-medium">{modernPercentage}%</span>
                              </div>
                              <Progress value={modernPercentage} className="h-2" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-muted-foreground">Operational Rate</span>
                                <span className="text-sm font-medium">{operationalRate}%</span>
                              </div>
                              <Progress value={operationalRate} className="h-2" />
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Annual Budget</div>
                            <div className="text-xl font-bold">${formatNumber(yearlyBudget)} million</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {(yearlyBudget / militaryData[country]?.budget * 100).toFixed(1)}% of total defense budget
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            
            {viewMode === 'trends' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Historical Trends (2020-2024)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={generateTrendData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="year" 
                            type="category"
                            allowDuplicatedCategory={false}
                          />
                          <YAxis />
                          <RechartsTooltip
                            formatter={(value, name, props) => {
                              return [formatNumber(value as number), props?.payload?.country || name];
                            }}
                          />
                          <Legend />
                          
                          {comparisonCountries.map(country => {
                            const countryColor = militaryData[country]?.color || activeCategoryObj?.color;
                            return (
                              <Line
                                key={country}
                                type="monotone"
                                dataKey="value"
                                data={generateTrendData.filter(d => d.country === country)}
                                name={country}
                                stroke={countryColor}
                                activeDot={{ r: 8 }}
                                strokeWidth={2}
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {comparisonCountries.map(country => {
                    if (!equipmentData[country] || !equipmentData[country].historicalData) return null;
                    
                    const countryColor = militaryData[country]?.color || activeCategoryObj?.color;
                    const histData = equipmentData[country].historicalData;
                    
                    const firstYearValue = histData[0][activeCategory] || 0;
                    const lastYearValue = histData[histData.length - 1][activeCategory] || 0;
                    const growthPercent = firstYearValue > 0 
                      ? ((lastYearValue - firstYearValue) / firstYearValue * 100).toFixed(1) 
                      : '0.0';
                    
                    return (
                      <Card key={country}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base" style={{ color: countryColor }}>{country}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <div className="text-sm text-muted-foreground">5-Year Change</div>
                              <div className={`text-xl font-bold ${
                                Number(growthPercent) > 0 ? 'text-green-500' : 
                                Number(growthPercent) < 0 ? 'text-red-500' : ''
                              }`}>
                                {Number(growthPercent) > 0 ? '+' : ''}{growthPercent}%
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Current</div>
                              <div className="text-xl font-bold">
                                {formatNumber(lastYearValue)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="h-36">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={histData.map(item => ({
                                  year: item.year,
                                  value: item[activeCategory] || 0
                                }))}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                              >
                                <XAxis 
                                  dataKey="year" 
                                  tick={{ fontSize: 12 }}
                                  tickLine={false}
                                  axisLine={false}
                                />
                                <YAxis 
                                  tick={{ fontSize: 12 }}
                                  tickLine={false}
                                  axisLine={false}
                                  tickFormatter={(value) => value === 0 ? '0' : `${Math.floor(value / 1000)}k`}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke={countryColor}
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EquipmentVisualization;
