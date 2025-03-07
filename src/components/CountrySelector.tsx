
import React from 'react';
import { motion } from 'framer-motion';
import { militaryData } from '@/lib/military-data';

interface CountrySelectorProps {
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  selectedCountries, 
  setSelectedCountries 
}) => {
  const handleToggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="glassmorphism rounded-2xl p-6">
      <h3 className="text-lg font-medium mb-4">Select Countries</h3>
      <motion.div 
        className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {Object.keys(militaryData).map((country, index) => {
          const isSelected = selectedCountries.includes(country);
          return (
            <motion.div 
              key={country}
              variants={itemVariants}
              className={`
                flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-300
                ${isSelected ? 'bg-primary/10 border-primary/20' : 'hover:bg-secondary'}
                border
              `}
              onClick={() => handleToggleCountry(country)}
            >
              <div className="flex items-center w-full">
                <span className="mr-3 text-xl">{militaryData[country].flag}</span>
                <span className="flex-grow">{country}</span>
                <motion.div 
                  animate={{ scale: isSelected ? 1 : 0.8, opacity: isSelected ? 1 : 0.5 }}
                  className={`w-4 h-4 rounded-full border ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CountrySelector;
