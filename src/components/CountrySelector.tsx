
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { militaryData } from '@/lib/military-data';

interface CountrySelectorProps {
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  selectedCountries, 
  setSelectedCountries,
  searchTerm,
  setSearchTerm
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

  const filteredCountries = Object.keys(militaryData).filter(country => 
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Countries</h3>
      <motion.div 
        className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredCountries.map((country, index) => {
          const isSelected = selectedCountries.includes(country);
          return (
            <motion.div 
              key={country}
              variants={itemVariants}
              className={`
                flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-all duration-300
                ${isSelected ? 'bg-muted/60 border-primary/20' : 'hover:bg-card/50'}
                border border-border
              `}
              onClick={() => handleToggleCountry(country)}
            >
              <div className="flex items-center w-full">
                <span className="mr-2 text-base">{militaryData[country].flag}</span>
                <span className="flex-grow text-sm">{country}</span>
                <motion.div 
                  animate={{ scale: isSelected ? 1 : 0.8, opacity: isSelected ? 1 : 0.5 }}
                  className={`w-3 h-3 rounded-full ${isSelected ? 'bg-primary border-primary' : 'border border-muted-foreground'}`}
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
