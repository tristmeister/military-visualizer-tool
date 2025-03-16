import React from 'react';
import { motion } from 'framer-motion';
import { Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Treemap, LineChart, Line } from 'recharts';
import { formatNumber, getRadarData, getBudgetData, getPersonnelData, getEquipmentData, getNuclearData, getHistoricalBudgetData, getHistoricalNukesData, militaryData, getSubmarineData, getInternationalBasesData } from '@/lib/military-data';
import { StatCategory } from '@/lib/military-data';
import { Plane, Shield, Anchor, AlertTriangle, Globe } from 'lucide-react';
import { ShipIcon } from './ui/custom-icons';

interface ChartSectionProps {
  selectedCountries: string[];
  activeStat: StatCategory;
  className?: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({ selectedCountries, activeStat, className = "w-full" }) => {
  const renderCardHeader = (title: string) => (
    <h3 className="text-lg font-medium mb-4 flex items-center">
      <div className="w-1 h-5 bg-primary mr-2 rounded-full"></div>
      {title}
    </h3>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const renderOverviewCharts = () => {
    const radarData = getRadarData(selectedCountries);
    const budgetData = getBudgetData(selectedCountries);
    const personnelData = getPersonnelData(selectedCountries);

    return (
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader(`Military Capability Overview (Limited to top 3 countries${selectedCountries.length > 3 ? ' for clarity' : ''})`)}
          {selectedCountries.length > 3 && (
            <div className="mb-4 p-2 bg-amber-50 rounded-lg flex items-center text-sm">
              <AlertTriangle className="text-amber-500 w-4 h-4 mr-2" />
              <span>Showing only the first 3 countries to reduce clutter. You can change your selection in the sidebar.</span>
            </div>
          )}
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={150} data={radarData}>
                <PolarGrid stroke="rgba(120, 120, 120, 0.2)" />
                <PolarAngleAxis dataKey="displayName" tick={{ fill: 'rgba(80, 80, 80, 0.8)' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(120, 120, 120, 0.4)" />
                {radarData.map((entry) => (
                  <Radar
                    key={entry.name}
                    name={entry.name}
                    dataKey="value"
                    stroke={entry.color}
                    fill={entry.color}
                    fillOpacity={0.3}
                  />
                ))}
                <Radar
                  name="Personnel"
                  dataKey="personnel"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Budget"
                  dataKey="budget"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Aircraft"
                  dataKey="aircraft"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Tanks"
                  dataKey="tanks"
                  stroke="#ff8042"
                  fill="#ff8042"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Naval"
                  dataKey="naval"
                  stroke="#0088fe"
                  fill="#0088fe"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Nukes"
                  dataKey="nukes"
                  stroke="#ff0000"
                  fill="#ff0000"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Technology"
                  dataKey="tech"
                  stroke="#00C49F"
                  fill="#00C49F"
                  fillOpacity={0.1}
                />
                <Legend />
                <Tooltip contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("Defense Budget Comparison (Billions USD)")}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
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
                  <Tooltip 
                    formatter={(value: any) => [`$${value}B`, 'Budget']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="budget" 
                    name="Defense Budget (Billions USD)" 
                    animationDuration={1500}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("Active Military Personnel")}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personnelData}>
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
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), 'Personnel']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar dataKey="active" name="Active Personnel" fill="#8884d8" animationDuration={1500}>
                    {personnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Bar dataKey="reserve" name="Reserve Personnel" fill="#82ca9d" animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const renderPersonnelCharts = () => {
    const personnelData = getPersonnelData(selectedCountries);

    return (
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Active & Reserve Forces")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={personnelData}>
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
                <Tooltip 
                  formatter={(value: any) => [formatNumber(Number(value)), 'Personnel']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                <Bar 
                  dataKey="active" 
                  name="Active Personnel" 
                  fill="#8884d8" 
                  animationDuration={1500}
                >
                  {personnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="reserve" name="Reserve Forces" fill="#82ca9d" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Personnel Per Million Population")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={personnelData}>
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
                <Tooltip 
                  formatter={(value: any) => [`${value} per million`, 'Personnel Ratio']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                <Bar 
                  dataKey="perCapita" 
                  name="Personnel per Million Citizens" 
                  fill="#8884d8" 
                  animationDuration={1500}
                >
                  {personnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Personnel Distribution")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={personnelData}
                dataKey="active"
                nameKey="name"
                stroke="#fff"
                fill="#8884d8"
                animationDuration={1500}
              >
                {personnelData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Treemap>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderBudgetCharts = () => {
    const budgetData = getBudgetData(selectedCountries);

    return (
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Defense Spending (Billions USD)")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
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
                <Tooltip 
                  formatter={(value: any) => [`$${value}B`, 'Budget']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                <Bar 
                  dataKey="budget" 
                  name="Defense Budget (Billions USD)" 
                  animationDuration={1500}
                >
                  {budgetData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Defense Budget as % of GDP")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
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
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, '% of GDP']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                <Bar 
                  dataKey="gdpPercent" 
                  name="Defense Budget (% of GDP)" 
                  animationDuration={1500}
                >
                  {budgetData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Budget Distribution")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={budgetData}
                dataKey="budget"
                nameKey="name"
                stroke="#fff"
                fill="#8884d8"
                animationDuration={1500}
              >
                {budgetData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Treemap>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderEquipmentCharts = () => {
    const equipmentData = getEquipmentData(selectedCountries);
    const submarineData = getSubmarineData(selectedCountries);
    const basesData = getInternationalBasesData(selectedCountries);

    return (
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("Aircraft")}
            <div className="flex items-center justify-center mb-3">
              <Plane className="w-10 h-10 text-blue-600" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), 'Aircraft']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="aircraft" 
                    name="Combat & Support Aircraft" 
                    animationDuration={1500}
                  >
                    {equipmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("Tanks & Armored Vehicles")}
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), 'Tanks']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="tanks" 
                    name="Tanks & APCs" 
                    fill="#82ca9d"
                    animationDuration={1500}
                  >
                    {equipmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("Naval Vessels")}
            <div className="flex items-center justify-center mb-3">
              <Anchor className="w-10 h-10 text-blue-800" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), 'Naval Vessels']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="naval" 
                    name="Combat & Support Ships" 
                    fill="#ffc658"
                    animationDuration={1500}
                  >
                    {equipmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("Submarine Fleet")}
            <div className="flex items-center justify-center mb-3">
              <ShipIcon className="w-10 h-10 text-blue-500" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={submarineData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                    axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), 'Submarines']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="submarines" 
                    name="Submarine Fleet" 
                    fill="#0088fe"
                    animationDuration={1500}
                  >
                    {submarineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6 chart-container">
            {renderCardHeader("International Military Bases")}
            <div className="flex items-center justify-center mb-3">
              <Globe className="w-10 h-10 text-blue-500" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={basesData}>
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
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), 'Bases']}
                    contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="internationalBases" 
                    name="International Bases" 
                    fill="#8884d8"
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="domesticBases" 
                    name="Domestic Bases" 
                    fill="#82ca9d"
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Equipment Comparison")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentData}>
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
                <Tooltip 
                  formatter={(value: any) => [formatNumber(Number(value)), 'Units']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                <Bar dataKey="aircraft" name="Aircraft" fill="#8884d8" animationDuration={1500} />
                <Bar dataKey="tanks" name="Tanks" fill="#82ca9d" animationDuration={1500} />
                <Bar dataKey="naval" name="Naval Vessels" fill="#ffc658" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderNuclearCharts = () => {
    const nuclearData = getNuclearData(selectedCountries);

    return (
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Nuclear Warhead Inventory")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nuclearData}>
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
                <Tooltip 
                  formatter={(value: any) => [formatNumber(Number(value)), 'Warheads']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                <Bar 
                  dataKey="nukes" 
                  name="Nuclear Warheads" 
                  fill="#ff6361"
                  animationDuration={1500}
                >
                  {nuclearData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.hasMissiles ? entry.color : '#ccc'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Nuclear Powers Distribution")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={nuclearData.filter(item => item.nukes > 0)}
                dataKey="nukes"
                nameKey="name"
                stroke="#fff"
                animationDuration={1500}
              >
                {nuclearData.filter(item => item.nukes > 0).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Treemap>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderHistoricalCharts = () => {
    const historicalBudgetData = getHistoricalBudgetData(selectedCountries);
    const historicalNukesData = getHistoricalNukesData(selectedCountries);

    const generateLines = (data: any, dataKey: string) => {
      if (!data || data.length === 0 || !data[0]) return null;
      
      const firstDataPoint = data[0];
      const countries = selectedCountries.filter(country => 
        firstDataPoint[country] !== undefined
      );
      
      return countries.map(country => (
        <Line
          key={country}
          type="monotone"
          dataKey={country}
          stroke={militaryData[country].color}
          strokeWidth={2}
          dot={{ r: 4, fill: militaryData[country].color }}
          activeDot={{ r: 6 }}
          name={`${militaryData[country].flag} ${country}`}
        />
      ));
    };

    return (
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Defense Budget Trends 2018-2022 (Billions USD)")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalBudgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                  axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                  axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                />
                <Tooltip 
                  formatter={(value: any) => [`$${value}B`, 'Budget']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                {generateLines(historicalBudgetData, 'budget')}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glassmorphism rounded-2xl p-6">
          {renderCardHeader("Nuclear Stockpile Trends 1990-2022")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalNukesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                  axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(80, 80, 80, 0.8)' }}
                  axisLine={{ stroke: 'rgba(120, 120, 120, 0.3)' }}
                />
                <Tooltip 
                  formatter={(value: any) => [formatNumber(Number(value)), 'Warheads']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
                {generateLines(historicalNukesData, 'nukes')}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderContent = () => {
    if (selectedCountries.length === 0) {
      return (
        <div className="h-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 glassmorphism rounded-2xl max-w-md"
          >
            <h3 className="text-xl font-medium mb-4">No Countries Selected</h3>
            <p className="text-muted-foreground">
              Please select at least one country from the sidebar to view comparison data.
            </p>
          </motion.div>
        </div>
      );
    }

    switch (activeStat) {
      case 'overview':
        return renderOverviewCharts();
      case 'personnel':
        return renderPersonnelCharts();
      case 'budget':
        return renderBudgetCharts();
      case 'equipment':
        return renderEquipmentCharts();
      case 'nuclear':
        return renderNuclearCharts();
      case 'historical':
        return renderHistoricalCharts();
      default:
        return renderOverviewCharts();
    }
  };

  return (
    <div className={className}>
      {renderContent()}
    </div>
  );
};

export default ChartSection;

