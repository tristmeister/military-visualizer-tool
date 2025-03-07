
import React from 'react';
import { motion } from 'framer-motion';
import { getStrengthsAndWeaknesses } from '@/lib/military-data';
import { CheckCircle2, XCircle } from 'lucide-react';

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
      className="glassmorphism rounded-2xl p-6 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-medium mb-6 flex items-center">
        <div className="w-1 h-5 bg-primary mr-2 rounded-full"></div>
        Country Analysis
      </h3>
      
      <div className="space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
        {data.map((country) => (
          <motion.div 
            key={country.name} 
            className="space-y-4"
            variants={itemVariants}
          >
            <h4 className="font-medium text-lg flex items-center border-b pb-2">
              <span className="mr-2">{country.flag}</span> 
              {country.name}
            </h4>
            
            <div>
              <h5 className="text-sm uppercase tracking-wider text-green-600 font-semibold flex items-center mb-2">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Strengths
              </h5>
              <ul className="space-y-2 pl-6 list-disc">
                {country.strengths.map((strength, index) => (
                  <motion.li 
                    key={index}
                    className="text-sm bg-green-50 p-2 rounded-md"
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
              <h5 className="text-sm uppercase tracking-wider text-red-600 font-semibold flex items-center mb-2">
                <XCircle className="w-4 h-4 mr-1" /> Weaknesses
              </h5>
              <ul className="space-y-2 pl-6 list-disc">
                {country.weaknesses.map((weakness, index) => (
                  <motion.li 
                    key={index}
                    className="text-sm bg-red-50 p-2 rounded-md"
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
