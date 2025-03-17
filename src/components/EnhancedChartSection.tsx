
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, BarChart3, PieChart, Activity, 
  Download, Share, Maximize2, Info, FileBarChart,
  ChevronDown, Layers, PanelRight, PanelLeft
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  StatCategory, 
  militaryData, 
  getFilteredData, 
  formatNumber 
} from '@/lib/military-data';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface EnhancedChartSectionProps {
  selectedCountries: string[];
  activeStat: StatCategory;
  className?: string;
  showAnalysis?: boolean;
  toggleAnalysis?: () => void;
}

const EnhancedChartSection: React.FC<EnhancedChartSectionProps> = ({ 
  selectedCountries, 
  activeStat, 
  className,
  showAnalysis = false,
  toggleAnalysis
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [chartType, setChartType] = useState<string>('auto');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  
  // Get filtered data for selected countries
  const filteredData = getFilteredData(selectedCountries);
  
  // Chart section config based on active stat
  const chartConfig = {
    overview: {
      title: "Overall Military Strength",
      description: "Comprehensive comparison across key military dimensions",
      chartTypes: ["radar", "bar", "spider"],
      metrics: [
        { id: "all", name: "All Metrics" },
        { id: "power", name: "Power Index" },
        { id: "personnel", name: "Active Forces" },
        { id: "equipment", name: "Equipment" },
      ]
    },
    personnel: {
      title: "Military Personnel",
      description: "Active duty, reserve forces, and troop distribution",
      chartTypes: ["bar", "pie", "line"],
      metrics: [
        { id: "all", name: "Full Breakdown" },
        { id: "active", name: "Active Personnel" },
        { id: "reserve", name: "Reserve Forces" },
        { id: "ratio", name: "Per Capita Ratio" },
      ]
    },
    budget: {
      title: "Defense Budget",
      description: "Military spending in USD and as percentage of GDP",
      chartTypes: ["bar", "line", "area"],
      metrics: [
        { id: "all", name: "Budget Overview" },
        { id: "absolute", name: "USD (billions)" },
        { id: "gdp", name: "GDP Percentage" },
        { id: "trends", name: "Historical Trends" },
      ]
    },
    equipment: {
      title: "Military Equipment",
      description: "Inventory of military assets across major categories",
      chartTypes: ["bar", "pie", "treemap"],
      metrics: [
        { id: "all", name: "All Equipment" },
        { id: "land", name: "Land Forces" },
        { id: "air", name: "Air Forces" },
        { id: "naval", name: "Naval Forces" },
      ]
    },
    nuclear: {
      title: "Nuclear Arsenal",
      description: "Nuclear warheads, delivery systems, and capabilities",
      chartTypes: ["bar", "line", "scatter"],
      metrics: [
        { id: "all", name: "Full Overview" },
        { id: "warheads", name: "Total Warheads" },
        { id: "delivery", name: "Delivery Systems" },
        { id: "history", name: "Historical Changes" },
      ]
    },
    historical: {
      title: "Historical Trends",
      description: "Budget, force size, and capabilities over time",
      chartTypes: ["line", "area", "composed"],
      metrics: [
        { id: "all", name: "Multi-metric View" },
        { id: "budget", name: "Budget History" },
        { id: "forces", name: "Force Size" },
        { id: "nukes", name: "Nuclear Arsenal" },
      ]
    }
  };
  
  const currentConfig = chartConfig[activeStat];

  // Handle exporting data
  const handleExportData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Export complete",
        description: `${activeStat} data exported successfully.`
      });
    }, 800);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real implementation, this would handle actual fullscreen behavior
    toast({
      title: isFullscreen ? "Exited fullscreen" : "Entered fullscreen",
      description: `Chart view is now ${isFullscreen ? 'normal' : 'fullscreen'}`
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Helper to get color or default
  const getCountryColor = (country: string) => {
    return militaryData[country]?.color || "#888888";
  };

  // Currently displayed chart component based on active stat
  // In a real implementation, this would render actual chart components
  const CurrentChart = () => (
    <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
      <ChartPlaceholder activeStat={activeStat} selectedCountries={selectedCountries} />
    </div>
  );

  return (
    <motion.div 
      key={activeStat}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${className || ''}`}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={`chart-${activeStat}`}
          variants={cardVariants}
          className="h-full flex flex-col"
        >
          <Card className="border border-border bg-card shadow-md h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <Badge variant="outline" className="mb-2 text-xs py-0 px-2.5 bg-primary/5 text-primary">
                    {activeStat.charAt(0).toUpperCase() + activeStat.slice(1)}
                  </Badge>
                  <CardTitle className="text-2xl font-bold">
                    {currentConfig.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    {currentConfig.description}
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isMobile && toggleAnalysis && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleAnalysis}
                      className="gap-1"
                    >
                      {showAnalysis ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
                      <span className="hidden md:inline">{showAnalysis ? "Hide" : "Show"} Analysis</span>
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Layers className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleExportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={toggleFullscreen}>
                        <Maximize2 className="w-4 h-4 mr-2" />
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast({
                          title: "Link copied",
                          description: "Chart URL copied to clipboard"
                        });
                      }}>
                        <Share className="w-4 h-4 mr-2" />
                        Share Chart
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <Tabs defaultValue="chart" className="mt-2">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="chart" className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5" />
                    <span>Chart View</span>
                  </TabsTrigger>
                  <TabsTrigger value="data" className="flex items-center gap-1.5">
                    <FileBarChart className="h-3.5 w-3.5" />
                    <span>Data View</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex flex-wrap gap-2 mt-3 items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Chart:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          {chartType === 'auto' ? 
                            (currentConfig.chartTypes[0] === 'radar' ? <Activity className="h-3.5 w-3.5" /> : 
                             currentConfig.chartTypes[0] === 'bar' ? <BarChart3 className="h-3.5 w-3.5" /> : 
                             <LineChart className="h-3.5 w-3.5" />) :
                            (chartType === 'bar' ? <BarChart3 className="h-3.5 w-3.5" /> :
                             chartType === 'line' ? <LineChart className="h-3.5 w-3.5" /> :
                             chartType === 'pie' ? <PieChart className="h-3.5 w-3.5" /> :
                             <Activity className="h-3.5 w-3.5" />)
                          }
                          <span className="capitalize">{chartType === 'auto' ? currentConfig.chartTypes[0] : chartType}</span>
                          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => setChartType('auto')}>
                          Auto (Recommended)
                        </DropdownMenuItem>
                        {currentConfig.chartTypes.map(type => (
                          <DropdownMenuItem 
                            key={type} 
                            onClick={() => setChartType(type)}
                            className="capitalize"
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Metric:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          {currentConfig.metrics.find(m => m.id === selectedMetric)?.name || "All Metrics"}
                          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {currentConfig.metrics.map(metric => (
                          <DropdownMenuItem 
                            key={metric.id} 
                            onClick={() => setSelectedMetric(metric.id)}
                          >
                            {metric.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <TabsContent value="chart" className="pt-4">
                  <CurrentChart />
                </TabsContent>
                
                <TabsContent value="data" className="pt-4">
                  <div className="relative rounded-md border border-border overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="whitespace-nowrap px-3 py-2.5 text-left font-medium text-muted-foreground">Country</th>
                          {activeStat === 'overview' && (
                            <>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Power Index</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Active Personnel</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Budget ($B)</th>
                            </>
                          )}
                          {activeStat === 'personnel' && (
                            <>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Active</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Reserve</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Per 1000 Citizens</th>
                            </>
                          )}
                          {activeStat === 'budget' && (
                            <>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">USD (billions)</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">% of GDP</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Per Capita ($)</th>
                            </>
                          )}
                          {activeStat === 'equipment' && (
                            <>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Aircraft</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Tanks</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Naval Vessels</th>
                            </>
                          )}
                          {activeStat === 'nuclear' && (
                            <>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Warheads</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Delivery Systems</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">Last Test</th>
                            </>
                          )}
                          {activeStat === 'historical' && (
                            <>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">2010 Budget ($B)</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">2020 Budget ($B)</th>
                              <th className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-muted-foreground">2023 Budget ($B)</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((country, index) => (
                          <tr key={country.name} className={index % 2 === 0 ? '' : 'bg-muted/20'}>
                            <td className="whitespace-nowrap px-3 py-3 font-medium">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: country.color }}
                                ></div>
                                <span>{country.flag} {country.name}</span>
                              </div>
                            </td>
                            
                            {activeStat === 'overview' && (
                              <>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{country.techIndex.toFixed(1)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.personnel)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">${formatNumber(country.budget)}</td>
                              </>
                            )}
                            
                            {activeStat === 'personnel' && (
                              <>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.personnel)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.reserve)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                  {(country.personnel / (country.population * 1000)).toFixed(2)}
                                </td>
                              </>
                            )}
                            
                            {activeStat === 'budget' && (
                              <>
                                <td className="whitespace-nowrap px-3 py-3 text-right">${formatNumber(country.budget)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{country.gdpPercent}%</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                  ${formatNumber(Math.round(country.budget * 1e9 / (country.population * 1e6)))}
                                </td>
                              </>
                            )}
                            
                            {activeStat === 'equipment' && (
                              <>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.aircraft)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.tanks)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.naval)}</td>
                              </>
                            )}
                            
                            {activeStat === 'nuclear' && (
                              <>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{formatNumber(country.nukes)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{country.nukes > 0 ? '3' : '0'}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">{country.nukes > 0 ? '2017' : '-'}</td>
                              </>
                            )}
                            
                            {activeStat === 'historical' && (
                              <>
                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                  ${formatNumber(country.historicalBudget.find(h => h.year === 2010)?.value || 0)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                  ${formatNumber(country.historicalBudget.find(h => h.year === 2020)?.value || 0)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                  ${formatNumber(country.historicalBudget.find(h => h.year === 2022)?.value || 0)}
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent className="flex-1 pb-3">
              <div className="flex flex-col h-full space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  {selectedCountries.map(country => (
                    <TooltipProvider key={country}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className="flex items-center gap-1.5 py-1.5 pl-1.5 pr-2.5 border-border/50"
                          >
                            <span className="text-base">{militaryData[country]?.flag || '🏳️'}</span>
                            <span className="font-medium">{country}</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1 text-xs">
                            {activeStat === 'overview' && (
                              <>
                                <div>Power Index: {militaryData[country]?.techIndex.toFixed(1)}</div>
                                <div>Personnel: {formatNumber(militaryData[country]?.personnel || 0)}</div>
                                <div>Budget: ${formatNumber(militaryData[country]?.budget || 0)}B</div>
                              </>
                            )}
                            {activeStat === 'personnel' && (
                              <>
                                <div>Active: {formatNumber(militaryData[country]?.personnel || 0)}</div>
                                <div>Reserve: {formatNumber(militaryData[country]?.reserve || 0)}</div>
                                <div>Total: {formatNumber((militaryData[country]?.personnel || 0) + (militaryData[country]?.reserve || 0))}</div>
                              </>
                            )}
                            {activeStat === 'budget' && (
                              <>
                                <div>Budget: ${formatNumber(militaryData[country]?.budget || 0)}B</div>
                                <div>% of GDP: {militaryData[country]?.gdpPercent || 0}%</div>
                              </>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 border-t border-border/30">
              <div className="flex items-center text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5 mr-1.5" />
                <span>
                  {activeStat === 'overview' && "Data shown includes aggregated metrics from multiple sources"}
                  {activeStat === 'personnel' && "Personnel figures represent official military disclosures"}
                  {activeStat === 'budget' && "Budget figures based on public defense spending records"}
                  {activeStat === 'equipment' && "Equipment counts represent visible, deployed assets only"}
                  {activeStat === 'nuclear' && "Nuclear data based on estimated warhead counts"}
                  {activeStat === 'historical' && "Historical data adjusted for inflation (2023 USD)"}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={handleExportData}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// Chart placeholder component - in a real implementation this would be actual charts
const ChartPlaceholder = ({ activeStat, selectedCountries }: { activeStat: StatCategory, selectedCountries: string[] }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-muted-foreground mb-3 text-sm">
          {activeStat === 'overview' && <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />}
          {activeStat === 'personnel' && <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />}
          {activeStat === 'budget' && <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-50" />}
          {activeStat === 'equipment' && <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />}
          {activeStat === 'nuclear' && <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />}
          {activeStat === 'historical' && <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />}
          
          <div className="font-medium text-foreground">
            {activeStat === 'overview' && "Radar Chart for Overall Military Strength"}
            {activeStat === 'personnel' && "Bar Chart for Military Personnel"}
            {activeStat === 'budget' && "Combined Chart for Defense Budget"}
            {activeStat === 'equipment' && "Stacked Chart for Military Equipment"}
            {activeStat === 'nuclear' && "Area Chart for Nuclear Arsenal"}
            {activeStat === 'historical' && "Line Chart for Historical Trends"}
          </div>
          
          <div className="mt-3 flex justify-center gap-3">
            {selectedCountries.map(country => (
              <div 
                key={country}
                className="flex items-center gap-1.5"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: militaryData[country]?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChartSection;
