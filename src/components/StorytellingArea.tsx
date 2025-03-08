
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  Cpu, TrendingDown, TrendingUp, Shield, ShieldAlert, Swords, 
  FileText, DollarSign, Users, Zap, Rocket, Database,
  BarChart2, PieChart, LineChart as LineChartIcon, Calendar
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';
import { militaryData, getProjectionData, getPlaceholderStoryChips, StoryChip } from '@/lib/military-data';
import { useToast } from "@/hooks/use-toast";

const STORYLINE_COUNTRIES = ['United States', 'China', 'Russia', 'European Union'];
const CHART_TYPES = ['line', 'bar', 'pie'];
const SNAPSHOT_YEARS = [2025, 2030, 2035];

const StorytellingArea: React.FC = () => {
  const [availableChips, setAvailableChips] = useState<StoryChip[]>(getPlaceholderStoryChips());
  const [storyboardChips, setStoryboardChips] = useState<StoryChip[]>([]);
  const [projectionData, setProjectionData] = useState(getProjectionData(STORYLINE_COUNTRIES));
  const [activeMetric, setActiveMetric] = useState('Budget');
  const [chartType, setChartType] = useState('line');
  const [snapshotYear, setSnapshotYear] = useState(2030);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const storyboardRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  
  // Calculate modified projections when storyboard changes
  useEffect(() => {
    try {
      setIsLoading(true);
      
      if (storyboardChips.length === 0) {
        // Reset to original projections
        setProjectionData(getProjectionData(STORYLINE_COUNTRIES));
        return;
      }
      
      // Start with the original data
      const baseData = getProjectionData(STORYLINE_COUNTRIES);
      const modifiedData = JSON.parse(JSON.stringify(baseData));
      
      // Apply each story chip's effect
      storyboardChips.forEach(chip => {
        const { country, metric, effect, amount, startYear } = chip.impact;
        const multiplier = effect === 'increase' ? 1 + (amount / 100) : 1 - (amount / 100);
        
        // Find data points from the start year onwards
        modifiedData.forEach((yearData: any) => {
          if (yearData.year >= startYear) {
            const metricKey = `${country}${metric.charAt(0).toUpperCase() + metric.slice(1)}`;
            if (yearData[metricKey]) {
              yearData[metricKey] = Math.round(yearData[metricKey] * multiplier);
            }
          }
        });
      });
      
      setProjectionData(modifiedData);
      
      if (storyboardChips.length > 0) {
        toast({
          title: "Scenario updated",
          description: `Applied ${storyboardChips.length} scenario element${storyboardChips.length > 1 ? 's' : ''}`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error updating projections:", error);
      toast({
        title: "Error updating scenario",
        description: "There was a problem applying your scenario elements",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [storyboardChips, toast]);
  
  const handleDragChip = (chip: StoryChip) => {
    // Remove from available and add to storyboard
    setAvailableChips(availableChips.filter(c => c.id !== chip.id));
    setStoryboardChips([...storyboardChips, chip]);
  };
  
  const handleRemoveFromStoryboard = (chipId: string) => {
    const chip = storyboardChips.find(c => c.id === chipId);
    if (chip) {
      setStoryboardChips(storyboardChips.filter(c => c.id !== chipId));
      setAvailableChips([...availableChips, chip]);
    }
  };
  
  const getIconForChip = (iconName: string) => {
    const iconProps = { className: "h-5 w-5" };
    switch (iconName) {
      case 'cpu': return <Cpu {...iconProps} />;
      case 'trending-down': return <TrendingDown {...iconProps} />;
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      case 'shield-alert': return <ShieldAlert {...iconProps} />;
      case 'swords': return <Swords {...iconProps} />;
      case 'file-text': return <FileText {...iconProps} />;
      case 'dollar-sign': return <DollarSign {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'rocket': return <Rocket {...iconProps} />;
      case 'database': return <Database {...iconProps} />;
      default: return <Database {...iconProps} />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economic': return 'border-yellow-500/70';
      case 'geopolitical': return 'border-blue-500/70';
      case 'technological': return 'border-purple-500/70';
      case 'conflict': return 'border-red-500/70';
      default: return 'border-gray-500/70';
    }
  };
  
  const getCategoryColorFill = (category: string) => {
    switch (category) {
      case 'economic': return 'from-yellow-500/20 to-yellow-600/10';
      case 'geopolitical': return 'from-blue-500/20 to-blue-600/10';
      case 'technological': return 'from-purple-500/20 to-purple-600/10';
      case 'conflict': return 'from-red-500/20 to-red-600/10';
      default: return 'from-gray-500/20 to-gray-600/10';
    }
  };
  
  const getCategoryColorSolid = (category: string) => {
    switch (category) {
      case 'economic': return 'bg-yellow-500/70';
      case 'geopolitical': return 'bg-blue-500/70';
      case 'technological': return 'bg-purple-500/70';
      case 'conflict': return 'bg-red-500/70';
      default: return 'bg-gray-500/70';
    }
  };
  
  // Get data for snapshot year
  const getSnapshotData = () => {
    return projectionData.find(d => d.year === snapshotYear) || {};
  };
  
  const snapshotData = getSnapshotData();
  
  // Format data for pie chart
  const getPieData = () => {
    const data = [];
    STORYLINE_COUNTRIES.forEach(country => {
      const value = snapshotData[`${country}${activeMetric}`] || 0;
      data.push({
        name: country,
        value,
        color: militaryData[country].color
      });
    });
    return data;
  };
  
  // Format data for bar chart
  const getBarData = () => {
    const data = [];
    STORYLINE_COUNTRIES.forEach(country => {
      data.push({
        name: country,
        value: snapshotData[`${country}${activeMetric}`] || 0,
        color: militaryData[country].color
      });
    });
    return data;
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Storytelling & Future Projections</h2>
          <p className="text-muted-foreground">Craft potential future scenarios by dragging story elements to the timeline</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2 bg-card rounded-lg p-2 border border-border">
            <span className="text-sm font-medium text-muted-foreground">Metric:</span>
            <select 
              className="bg-transparent text-sm"
              value={activeMetric}
              onChange={e => setActiveMetric(e.target.value)}
            >
              <option value="Budget">Defense Budget</option>
              <option value="Personnel">Military Personnel</option>
              <option value="Nukes">Nuclear Arsenal</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 bg-card rounded-lg p-2 border border-border">
            <span className="text-sm font-medium text-muted-foreground">View:</span>
            <button 
              className={`p-1 rounded ${chartType === 'line' ? 'bg-muted' : ''}`}
              onClick={() => setChartType('line')}
              title="Line Chart (Full Timeline)"
            >
              <LineChartIcon className="h-4 w-4" />
            </button>
            <button 
              className={`p-1 rounded ${chartType === 'bar' ? 'bg-muted' : ''}`}
              onClick={() => setChartType('bar')}
              title="Bar Chart (Snapshot)"
            >
              <BarChart2 className="h-4 w-4" />
            </button>
            <button 
              className={`p-1 rounded ${chartType === 'pie' ? 'bg-muted' : ''}`}
              onClick={() => setChartType('pie')}
              title="Pie Chart (Snapshot)"
            >
              <PieChart className="h-4 w-4" />
            </button>
          </div>
          {chartType !== 'line' && (
            <div className="flex items-center space-x-2 bg-card rounded-lg p-2 border border-border">
              <span className="text-sm font-medium text-muted-foreground">Year:</span>
              <select 
                className="bg-transparent text-sm"
                value={snapshotYear}
                onChange={e => setSnapshotYear(parseInt(e.target.value))}
              >
                {SNAPSHOT_YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      
      {/* Available chips at the top */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-secondary" />
          Available Story Elements
        </h3>
        <div className="flex flex-wrap gap-3">
          {availableChips.map(chip => (
            <motion.div
              key={chip.id}
              className={`story-chip flex cursor-grab max-w-xs border-l-4 ${getCategoryColor(chip.category)} bg-gradient-to-br ${getCategoryColorFill(chip.category)} bg-card/50 p-3 rounded-lg shadow-sm`}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              drag
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              dragSnapToOrigin
              onDragEnd={() => handleDragChip(chip)}
            >
              <div className="mr-3 text-secondary">
                {getIconForChip(chip.icon)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{chip.title}</div>
                <div className="text-xs text-muted-foreground">{chip.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 gap-6 flex-1">
        <div className="bg-card rounded-xl border border-border p-4 h-full relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 mb-2"></div>
                <div className="text-sm text-muted-foreground">Updating projections...</div>
              </div>
            </div>
          )}
          
          {/* Chart area */}
          <div className="h-64 mb-6">
            {chartType === 'line' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: 'rgba(255,255,255,0.9)' }}
                  />
                  <Legend />
                  {STORYLINE_COUNTRIES.map(country => (
                    <Area 
                      key={country}
                      type="monotone"
                      dataKey={`${country}${activeMetric}`}
                      name={`${militaryData[country].flag} ${country}`}
                      stroke={militaryData[country].color}
                      fill={`${militaryData[country].color}50`}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            )}
            
            {chartType === 'bar' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getBarData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: 'rgba(255,255,255,0.9)' }}
                  />
                  <Legend />
                  <Bar dataKey="value" name={activeMetric}>
                    {getBarData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {chartType === 'pie' && (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={getPieData()}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {getPieData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: 'rgba(255,255,255,0.9)' }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* Horizontal storyboard */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Swords className="w-5 h-5 mr-2 text-primary" />
              Scenario Timeline
            </h3>
            
            <div 
              className="story-board bg-muted/30 rounded-lg min-h-32 p-4 mb-1 overflow-x-auto"
              ref={storyboardRef}
            >
              {storyboardChips.length === 0 ? (
                <div className="flex items-center justify-center h-28 text-sm text-muted-foreground">
                  <p>Drag story elements here to create your scenario</p>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <AnimatePresence>
                    {storyboardChips.map((chip, index) => (
                      <motion.div
                        key={chip.id}
                        className={`relative flex-shrink-0 w-64 story-chip flex flex-col border-l-4 ${getCategoryColor(chip.category)} bg-gradient-to-br ${getCategoryColorFill(chip.category)} bg-card p-3 rounded-lg shadow-sm`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute -top-2 -left-2 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center bg-background border border-border">
                          {index + 1}
                        </div>
                        <div className="flex items-start mb-2">
                          <div className="mr-3 text-secondary mt-1">
                            {getIconForChip(chip.icon)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{chip.title}</div>
                            <div className="text-xs text-muted-foreground">{chip.description}</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/40">
                          <div className="text-xs font-medium">
                            {chip.impact.startYear} → 
                            <span className={chip.impact.effect === 'increase' ? 'text-green-500' : 'text-red-500'}>
                              {chip.impact.effect === 'increase' ? '+' : '-'}{chip.impact.amount}%
                            </span>
                          </div>
                          <button 
                            className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted rounded-md"
                            onClick={() => handleRemoveFromStoryboard(chip.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            {/* Timeline ruler at the bottom */}
            <div className="timeline-ruler relative h-6 pt-1">
              <div className="h-1 bg-muted-foreground/30 w-full relative">
                {[2023, 2025, 2027, 2029, 2031, 2033, 2035].map(year => (
                  <div key={year} className="absolute top-0 w-px h-3 bg-muted-foreground/70" style={{ left: `${((year - 2023) / 12) * 100}%` }}>
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      {year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorytellingArea;
