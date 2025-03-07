
import React from 'react';
import { motion } from 'framer-motion';
import { Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie } from 'recharts';
import { formatNumber, getRadarData, getBudgetData, getPersonnelData, getEquipmentData, getNuclearData } from '@/lib/military-data';
import { StatCategory } from '@/lib/military-data';

interface ChartSectionProps {
  selectedCountries: string[];
  activeStat: StatCategory;
}

const ChartSection: React.FC<ChartSectionProps> = ({ selectedCountries, activeStat }) => {
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
          {renderCardHeader("Military Capability Overview")}
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
                    formatter={(value) => [`$${value}B`, 'Budget']}
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
                    formatter={(value) => [formatNumber(value), 'Personnel']}
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
                  formatter={(value) => [formatNumber(value), 'Personnel']}
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
          {renderCardHeader("Personnel Distribution")}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personnelData}
                  dataKey="active"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label={(entry) => `${entry.flag} ${entry.name}: ${formatNumber(entry.active)}`}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {personnelData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatNumber(value), 'Personnel']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
              </PieChart>
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
                  formatter={(value) => [`$${value}B`, 'Budget']}
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
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={2}
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
              <PieChart>
                <Pie
                  data={budgetData}
                  dataKey="budget"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label={(entry) => `${entry.flag} ${entry.name}: $${entry.budget}B`}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {budgetData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value}B`, 'Budget']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderEquipmentCharts = () => {
    const equipmentData = getEquipmentData(selectedCountries);

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
                    formatter={(value) => [formatNumber(value), 'Aircraft']}
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
                    formatter={(value) => [formatNumber(value), 'Tanks']}
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
                    formatter={(value) => [formatNumber(value), 'Naval Vessels']}
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
                  formatter={(value) => [formatNumber(value), 'Units']}
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
                  formatter={(value) => [formatNumber(value), 'Warheads']}
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
                      stroke={entry.hasMissiles ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}
                      strokeWidth={entry.hasMissiles ? 2 : 1}
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
              <PieChart>
                <Pie
                  data={nuclearData.filter(item => item.nukes > 0)}
                  dataKey="nukes"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label={(entry) => `${entry.flag} ${entry.name}: ${formatNumber(entry.nukes)}`}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {nuclearData.filter(item => item.nukes > 0).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatNumber(value), 'Warheads']}
                  contentStyle={{ borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Legend />
              </PieChart>
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
      default:
        return renderOverviewCharts();
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
};

export default ChartSection;
