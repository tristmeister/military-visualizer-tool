
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
import { 
  militaryData, 
  getEnhancedEquipmentData, 
  equipmentCategories, 
  formatNumber 
} from '@/lib/military-data';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Cell
} from 'recharts';

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
  const [equipmentData, setEquipmentData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'icons' | 'chart' | 'details' | 'trends'>('icons');
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [normalizeData, setNormalizeData] = useState(false);
  const [showQualityRating, setShowQualityRating] = useState(false);
  
  // We'll show up to three countries at a time for comparison
  const [comparisonCountries, setComparisonCountries] = useState<string[]>([]);
  
  useEffect(() => {
    // Load enhanced equipment data
    setEquipmentData(getEnhancedEquipmentData());
    
    // Set initial comparison countries
    if (selectedCountries.length >= 1) {
      setComparisonCountries(selectedCountries.slice(0, Math.min(3, selectedCountries.length)));
    } else {
      // Default fallback if no countries selected
      setComparisonCountries(['United States', 'China', 'Russia'].slice(0, Math.min(3, selectedCountries.length)));
    }
    
    // Simulate loading
    setTimeout(() => setIsLoaded(true), 500);
  }, [selectedCountries]);
  
  // Get the currently active category object
  const activeCategoryObj = equipmentCategories.find(cat => cat.id === activeCategory);
  
  // Calculate the number of icons to show per country (max of 10 rows with 5 icons each)
  const calculateIconGrid = (country: string, categoryId: string) => {
    if (!equipmentData[country]) return { fullRows: 0, remainder: 0, totalIcons: 0, value: 0, qualityValue: 0 };
    
    // Get the maximum value across all selected countries for this category
    const maxValue = Math.max(
      ...comparisonCountries.map(c => 
        equipmentData[c]?.[categoryId]?.quantity || 0
      )
    );
    
    // Get this country's value and quality
    const value = equipmentData[country]?.[categoryId]?.quantity || 0;
    const qualityValue = equipmentData[country]?.[categoryId]?.qualityRating || 5;
    
    // Calculate total icons (max 50)
    // If normalizeData is true, scale based on percentage of max value
    // If showQualityRating is true, factor in the quality rating
    let totalIcons = 0;
    
    if (normalizeData) {
      // Normalize to percentage of maximum
      const normalizedValue = maxValue > 0 ? (value / maxValue) : 0;
      
      if (showQualityRating) {
        // Factor in quality (quantity * quality / 10)
        totalIcons = Math.min(50, Math.round(normalizedValue * 50 * (qualityValue / 5)));
      } else {
        totalIcons = Math.min(50, Math.round(normalizedValue * 50));
      }
    } else {
      // Use absolute values with some scaling
      const scaleFactor = 50 / (maxValue || 1);
      
      if (showQualityRating) {
        // Factor in quality (quantity * quality / 10)
        totalIcons = Math.min(50, Math.round(value * scaleFactor * (qualityValue / 5)));
      } else {
        totalIcons = Math.min(50, Math.round(value * scaleFactor));
      }
    }
    
    // Calculate rows and remainder for the last row
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
  
  // Format percentage change with + or - sign
  const formatGrowth = (num: number): string => {
    return (num > 0 ? '+' : '') + num.toFixed(1) + '%';
  };
  
  // Generate chart data for the current category
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
  
  // Generate trend data for the selected countries and category
  const generateTrendData = useMemo(() => {
    if (!equipmentData || !activeCategoryObj) return [];
    
    // Convert historical data to format suitable for charts
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
  
  // Add or remove a country from comparison
  const toggleCountryComparison = (country: string) => {
    if (comparisonCountries.includes(country)) {
      // Don't allow removing if it's the last country
      if (comparisonCountries.length > 1) {
        setComparisonCountries(comparisonCountries.filter(c => c !== country));
      }
    } else {
      // Add country if we have less than 3 countries
      if (comparisonCountries.length < 3) {
        setComparisonCountries([...comparisonCountries, country]);
      } else {
        // Replace the last country
        setComparisonCountries([...comparisonCountries.slice(0, 2), country]);
      }
    }
  };
  
  // Loading state
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
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold">Military Equipment Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Comparative analysis of global military capabilities
            </p>
          </div>
          
          {/* View mode selection */}
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
      
      {/* Equipment category selection */}
      <div className="border-b border-border overflow-x-auto no-scrollbar">
        <div className="flex p-1">
          {equipmentCategories.map(category => {
            // Dynamically get the icon component based on the icon name string
            const IconComponent = eval(category.icon);
            
            return (
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
                  <IconComponent className="w-4 h-4" style={{ color: category.color }} />
                  <span>{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Country selection panel */}
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
          
          {/* Settings & options */}
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
                  <p>Enable/disable animations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {/* Visual icon representation view */}
          {viewMode === 'icons' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationEnabled ? 0.3 : 0 }}
              className="space-y-10"
            >
              {comparisonCountries.map(country => {
                const gridData = calculateIconGrid(country, activeCategory);
                const countryColor = militaryData[country]?.color || '#666';
                const IconComponent = eval(activeCategoryObj?.icon || 'PlaneIcon');
                
                return (
                  <motion.div 
                    key={country}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationEnabled ? 0.4 : 0 }}
                    className="border border-border rounded-lg p-4 bg-card/50"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium">
                            <span className="mr-2">{militaryData[country]?.flag}</span>
                            {country}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className="ml-2"
                            style={{ borderColor: countryColor, color: countryColor }}
                          >
                            Rank #{gridData.globalRank}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <strong>{formatNumber(gridData.value)}</strong>
                          <span className="mx-1">{activeCategoryObj?.name}</span>
                          <span 
                            className={`ml-2 ${gridData.growth > 0 ? 'text-emerald-500' : 'text-red-500'}`}
                          >
                            {formatGrowth(gridData.growth)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Quality rating */}
                      <div className="flex-1 ml-auto">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs text-muted-foreground">Quality Rating</span>
                          <Star className="w-3 h-3 text-amber-400" />
                          <span className="text-xs font-semibold">{gridData.qualityValue}/10</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full" 
                            style={{ 
                              width: `${gridData.qualityValue * 10}%`,
                              backgroundColor: countryColor
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Icons grid visualization */}
                    <div className="space-y-1">
                      {Array.from({ length: gridData.fullRows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, iconIndex) => (
                            <div 
                              key={iconIndex}
                              className="w-6 h-6 flex items-center justify-center"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                  delay: animationEnabled ? (rowIndex * 0.03 + iconIndex * 0.01) : 0,
                                  duration: animationEnabled ? 0.3 : 0
                                }}
                              >
                                <IconComponent 
                                  className="w-5 h-5" 
                                  style={{ color: countryColor }} 
                                />
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      ))}
                      
                      {/* Last partial row */}
                      {gridData.remainder > 0 && (
                        <div className="flex gap-1">
                          {Array.from({ length: gridData.remainder }).map((_, iconIndex) => (
                            <div 
                              key={iconIndex}
                              className="w-6 h-6 flex items-center justify-center"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                  delay: animationEnabled ? (gridData.fullRows * 0.03 + iconIndex * 0.01) : 0,
                                  duration: animationEnabled ? 0.3 : 0
                                }}
                              >
                                <IconComponent 
                                  className="w-5 h-5" 
                                  style={{ color: countryColor }} 
                                />
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          
          {/* Chart view */}
          {viewMode === 'chart' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationEnabled ? 0.3 : 0 }}
              className="space-y-8"
            >
              {/* Quantity chart */}
              <div className="border border-border rounded-lg p-4 bg-card/50">
                <h3 className="text-lg font-medium mb-4">
                  {activeCategoryObj?.name} - Quantity Comparison
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={generateChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <RechartsTooltip 
                        formatter={(value: any) => [formatNumber(Number(value)), 'Quantity']}
                        contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                      />
                      <Bar 
                        dataKey="value" 
                        name="Quantity" 
                        animationDuration={animationEnabled ? 1500 : 0}
                      >
                        {generateChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Quality chart */}
              <div className="border border-border rounded-lg p-4 bg-card/50">
                <h3 className="text-lg font-medium mb-4">
                  {activeCategoryObj?.name} - Quality Rating
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={generateChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                        domain={[0, 10]}
                      />
                      <RechartsTooltip 
                        formatter={(value: any) => [`${value}/10`, 'Quality Rating']}
                        contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                      />
                      <Bar 
                        dataKey="quality" 
                        name="Quality" 
                        animationDuration={animationEnabled ? 1500 : 0}
                      >
                        {generateChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Power rating chart (quantity * quality) */}
              <div className="border border-border rounded-lg p-4 bg-card/50">
                <h3 className="text-lg font-medium mb-4">
                  {activeCategoryObj?.name} - Power Rating (Quantity × Quality)
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={generateChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <RechartsTooltip 
                        formatter={(value: any) => [formatNumber(Number(value)), 'Power Rating']}
                        contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                      />
                      <Bar 
                        dataKey="powerRating" 
                        name="Power Rating" 
                        animationDuration={animationEnabled ? 1500 : 0}
                      >
                        {generateChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Details view */}
          {viewMode === 'details' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationEnabled ? 0.3 : 0 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {comparisonCountries.map(country => {
                const gridData = calculateIconGrid(country, activeCategory);
                const countryColor = militaryData[country]?.color || '#666';
                const IconComponent = eval(activeCategoryObj?.icon || 'PlaneIcon');
                
                return (
                  <motion.div 
                    key={country}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationEnabled ? 0.4 : 0 }}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-border" style={{ backgroundColor: `${countryColor}10` }}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium flex items-center">
                          <span className="mr-2 text-lg">{militaryData[country]?.flag}</span>
                          {country}
                        </h3>
                        <IconComponent className="w-5 h-5" style={{ color: countryColor }} />
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      {/* Totals and growth */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Total {activeCategoryObj?.name}
                          </div>
                          <div className="text-xl font-semibold">
                            {formatNumber(gridData.value)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            Annual Growth
                          </div>
                          <div className={`text-xl font-semibold ${gridData.growth > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {formatGrowth(gridData.growth)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Global rank */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Global Rank
                        </div>
                        <Badge className="text-sm">
                          #{gridData.globalRank}
                        </Badge>
                      </div>
                      
                      {/* Main models */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Main Models
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {gridData.mainModels.map((model, index) => (
                            <Badge key={index} variant="outline" style={{ borderColor: countryColor }}>
                              {model}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Modernization */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                          <span>Modernization Level</span>
                          <span>{gridData.modernPercentage}%</span>
                        </div>
                        <Progress value={gridData.modernPercentage} className="h-1.5" />
                      </div>
                      
                      {/* Operational rate */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                          <span>Operational Rate</span>
                          <span>{gridData.operationalRate}%</span>
                        </div>
                        <Progress value={gridData.operationalRate} className="h-1.5" />
                      </div>
                      
                      {/* Budget allocation */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Yearly Budget Allocation
                        </div>
                        <div className="text-base font-medium">
                          ${gridData.yearlyBudget} billion
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ({Math.round(gridData.yearlyBudget / militaryData[country].budget * 100)}% of defense budget)
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          
          {/* Trends view */}
          {viewMode === 'trends' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationEnabled ? 0.3 : 0 }}
              className="space-y-8"
            >
              <div className="border border-border rounded-lg p-4 bg-card/50">
                <h3 className="text-lg font-medium mb-4">
                  {activeCategoryObj?.name} - Historical Trends (2018-2022)
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                      <XAxis 
                        dataKey="year" 
                        type="category"
                        allowDuplicatedCategory={false}
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                        axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                      />
                      <RechartsTooltip 
                        formatter={(value: any) => [formatNumber(Number(value)), 'Units']}
                        contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                      />
                      
                      {/* Create a separate line for each country */}
                      {comparisonCountries.map(country => {
                        // Get this country's historical data
                        const countryData = equipmentData[country]?.historicalData || [];
                        const countryColor = militaryData[country]?.color || '#666';
                      
                        // Format the data for the line chart
                        const lineData = countryData.map(yearData => ({
                          year: yearData.year,
                          value: yearData[activeCategory]
                        }));
                        
                        return (
                          <Line
                            key={country}
                            data={lineData}
                            type="monotone"
                            dataKey="value"
                            name={`${militaryData[country]?.flag || ''} ${country}`}
                            stroke={countryColor}
                            strokeWidth={2}
                            dot={{ fill: countryColor }}
                            activeDot={{ r: 6, fill: countryColor }}
                            isAnimationActive={animationEnabled}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Capabilities overview */}
              <div className="border border-border rounded-lg p-4 bg-card/50">
                <h3 className="text-lg font-medium mb-4">
                  {activeCategoryObj?.name} - Strategic Capabilities
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {activeCategoryObj?.capabilities?.map((capability, index) => (
                    <Card key={index} className="bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-2">
                          <div className="mt-0.5">
                            <CrosshairIcon className="w-4 h-4" style={{ color: activeCategoryObj.color }} />
                          </div>
                          <div>
                            <p className="text-sm">{capability}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EquipmentVisualization;
