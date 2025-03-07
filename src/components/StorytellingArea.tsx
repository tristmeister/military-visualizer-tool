
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { 
  Cpu, TrendingDown, TrendingUp, Shield, ShieldAlert, Swords, 
  FileText, DollarSign, Users, Zap, Rocket, Database
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { militaryData, getProjectionData, getPlaceholderStoryChips, StoryChip } from '@/lib/military-data';

const STORYLINE_COUNTRIES = ['United States', 'China', 'Russia', 'European Union'];

const StorytellingArea: React.FC = () => {
  const [availableChips, setAvailableChips] = useState<StoryChip[]>(getPlaceholderStoryChips());
  const [storyboardChips, setStoryboardChips] = useState<StoryChip[]>([]);
  const [projectionData, setProjectionData] = useState(getProjectionData(STORYLINE_COUNTRIES));
  const storyboardRef = useRef<HTMLDivElement>(null);
  
  // Calculate modified projections when storyboard changes
  useEffect(() => {
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
  }, [storyboardChips]);
  
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

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Storytelling & Future Projections</h2>
          <p className="text-muted-foreground">Craft potential future scenarios by dragging story elements to the timeline</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* Left column - Available story chips */}
        <div className="col-span-1">
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-secondary" />
              Available Story Elements
            </h3>
            <div className="space-y-3">
              {availableChips.map(chip => (
                <motion.div
                  key={chip.id}
                  className={`story-chip ${getCategoryColor(chip.category)} bg-gradient-to-br ${getCategoryColorFill(chip.category)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  draggable
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
        </div>
        
        {/* Middle column - Storyboard timeline */}
        <div className="col-span-1">
          <div className="bg-card rounded-xl border border-border p-4 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Swords className="w-5 h-5 mr-2 text-primary" />
              Scenario Storyboard
            </h3>
            
            <div className="timeline-ruler">
              <div className="flex justify-between text-xs text-muted-foreground absolute w-full">
                <span>2023</span>
                <span>2025</span>
                <span>2030</span>
                <span>2035</span>
              </div>
            </div>
            
            <div 
              className="story-board flex-1 flex flex-col"
              ref={storyboardRef}
            >
              {storyboardChips.length === 0 ? (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  <p>Drag story elements here to create your scenario</p>
                </div>
              ) : (
                <Reorder.Group
                  values={storyboardChips}
                  onReorder={setStoryboardChips}
                  className="space-y-2"
                >
                  {storyboardChips.map(chip => (
                    <Reorder.Item
                      key={chip.id}
                      value={chip}
                      className={`story-chip ${getCategoryColor(chip.category)} bg-gradient-to-br ${getCategoryColorFill(chip.category)}`}
                    >
                      <div className="mr-3 text-secondary">
                        {getIconForChip(chip.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{chip.title}</div>
                        <div className="text-xs text-muted-foreground">{chip.description}</div>
                      </div>
                      <button 
                        className="ml-2 text-xs px-2 py-1 bg-muted/50 hover:bg-muted rounded-md"
                        onClick={() => handleRemoveFromStoryboard(chip.id)}
                      >
                        Remove
                      </button>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Projection charts */}
        <div className="col-span-1">
          <div className="bg-card rounded-xl border border-border p-4 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
              Future Projections
            </h3>
            
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              {/* Budget Projection Chart */}
              <div className="projection-chart">
                <h4 className="text-sm font-medium p-3 border-b border-border">Defense Budget Projection</h4>
                <div className="p-3 h-[180px]">
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
                          dataKey={`${country}Budget`}
                          name={`${militaryData[country].flag} ${country}`}
                          stroke={militaryData[country].color}
                          fill={`${militaryData[country].color}50`}
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Personnel Projection Chart */}
              <div className="projection-chart">
                <h4 className="text-sm font-medium p-3 border-b border-border">Military Personnel Projection</h4>
                <div className="p-3 h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
                        itemStyle={{ color: 'rgba(255,255,255,0.9)' }}
                      />
                      <Legend />
                      {STORYLINE_COUNTRIES.map(country => (
                        <Line 
                          key={country}
                          type="monotone"
                          dataKey={`${country}Personnel`}
                          name={`${militaryData[country].flag} ${country}`}
                          stroke={militaryData[country].color}
                          strokeWidth={2}
                          dot={{ fill: militaryData[country].color, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Nuclear Projection Chart */}
              <div className="projection-chart">
                <h4 className="text-sm font-medium p-3 border-b border-border">Nuclear Arsenal Projection</h4>
                <div className="p-3 h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
                        itemStyle={{ color: 'rgba(255,255,255,0.9)' }}
                      />
                      <Legend />
                      {STORYLINE_COUNTRIES.map(country => (
                        <Line 
                          key={country}
                          type="monotone"
                          dataKey={`${country}Nukes`}
                          name={`${militaryData[country].flag} ${country}`}
                          stroke={militaryData[country].color}
                          strokeWidth={2}
                          dot={{ fill: militaryData[country].color, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorytellingArea;
