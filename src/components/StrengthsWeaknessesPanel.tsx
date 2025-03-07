
import React from 'react';
import { motion } from 'framer-motion';
import { getStrengthsAndWeaknesses } from '@/lib/military-data';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface StrengthsWeaknessesPanelProps {
  selectedCountries: string[];
}

const StrengthsWeaknessesPanel: React.FC<StrengthsWeaknessesPanelProps> = ({ selectedCountries }) => {
  const data = getStrengthsAndWeaknesses(selectedCountries);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="bg-card rounded-lg border border-border h-full overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-4 border-b border-border">
        <h3 className="font-bold flex items-center">
          <AlertTriangle className="w-4 h-4 text-primary mr-2" />
          Analysis Report
        </h3>
      </div>
      
      <div className="p-4 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {data.map((country) => (
          <motion.div 
            key={country.name} 
            className="space-y-4"
            variants={itemVariants}
          >
            <h4 className="font-medium text-base flex items-center p-2 rounded bg-card/60 border border-border">
              <span className="mr-2 text-lg">{country.flag}</span> 
              {country.name}
            </h4>
            
            <div>
              <h5 className="text-xs uppercase tracking-wider text-emerald-500 font-semibold flex items-center mb-2 px-1">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Strengths
              </h5>
              <ul className="space-y-1.5 list-none">
                {country.strengths.map((strength, index) => (
                  <motion.li 
                    key={index}
                    className="text-xs p-2 rounded bg-emerald-500/10 border border-emerald-500/20"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {strength}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-xs uppercase tracking-wider text-destructive font-semibold flex items-center mb-2 px-1">
                <XCircle className="w-3 h-3 mr-1" /> Weaknesses
              </h5>
              <ul className="space-y-1.5 list-none">
                {country.weaknesses.map((weakness, index) => (
                  <motion.li 
                    key={index}
                    className="text-xs p-2 rounded bg-destructive/10 border border-destructive/20"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {weakness}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StrengthsWeaknessesPanel;
