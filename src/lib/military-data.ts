// Types
export type StatCategory = 'overview' | 'personnel' | 'budget' | 'equipment' | 'nuclear' | 'historical';

export interface StoryChip {
  id: string;
  title: string;
  description: string;
  category: 'economic' | 'geopolitical' | 'technological' | 'conflict';
  icon: string;
  impact: {
    country: string;
    metric: string;
    effect: 'increase' | 'decrease';
    amount: number;
    startYear: number;
  };
}

// Military data for countries
export const militaryData: Record<string, any> = {
  'United States': {
    flag: '🇺🇸',
    color: '#3C78D8',
    budget: 800,
    gdpPercent: 3.7,
    active: 1400000,
    reserve: 800000,
    population: 331000000,
    aircraft: 13200,
    tanks: 6200,
    naval: 490,
    submarines: 68,
    nukes: 5500,
    internationalBases: 750,
    domesticBases: 440,
    tech: 95,
    strengths: [
      'Largest defense budget globally',
      'Advanced technological capabilities',
      'Global power projection',
      'Superior naval forces',
      'Advanced air superiority'
    ],
    weaknesses: [
      'High operational costs',
      'Political constraints on military action',
      'Overextended global commitments'
    ]
  },
  'China': {
    flag: '🇨🇳',
    color: '#DB4437',
    budget: 229,
    gdpPercent: 1.7,
    active: 2185000,
    reserve: 510000,
    population: 1400000000,
    aircraft: 3260,
    tanks: 5800,
    naval: 350,
    submarines: 79,
    nukes: 350,
    internationalBases: 5,
    domesticBases: 293,
    tech: 80,
    strengths: [
      'Largest standing army',
      'Growing naval capabilities',
      'Rapid military modernization',
      'Strong domestic defense industry',
      'Advanced missile systems'
    ],
    weaknesses: [
      'Limited combat experience',
      'Quality issues with some equipment',
      'Limited power projection capabilities'
    ]
  },
  'Russia': {
    flag: '🇷🇺',
    color: '#4285F4',
    budget: 65,
    gdpPercent: 4.1,
    active: 900000,
    reserve: 2000000,
    population: 144000000,
    aircraft: 4173,
    tanks: 12950,
    naval: 605,
    submarines: 58,
    nukes: 6257,
    internationalBases: 21,
    domesticBases: 187,
    tech: 75,
    strengths: [
      'Largest nuclear arsenal',
      'Strong land forces',
      'Advanced air defense systems',
      'Significant combat experience',
      'Electronic warfare capabilities'
    ],
    weaknesses: [
      'Aging equipment',
      'Economic constraints',
      'Demographic challenges affecting recruitment'
    ]
  },
  'India': {
    flag: '🇮🇳',
    color: '#F4B400',
    budget: 72.9,
    gdpPercent: 2.4,
    active: 1450000,
    reserve: 1155000,
    population: 1380000000,
    aircraft: 2123,
    tanks: 4614,
    naval: 295,
    submarines: 16,
    nukes: 160,
    internationalBases: 1,
    domesticBases: 160,
    tech: 70,
    strengths: [
      'Large manpower',
      'Growing naval capabilities',
      'Developing domestic defense industry',
      'Strategic location in Indian Ocean'
    ],
    weaknesses: [
      'Bureaucratic procurement process',
      'Reliance on foreign military equipment',
      'Border security challenges'
    ]
  },
  'United Kingdom': {
    flag: '🇬🇧',
    color: '#0F52BA',
    budget: 68.4,
    gdpPercent: 2.2,
    active: 150000,
    reserve: 45000,
    population: 67000000,
    aircraft: 693,
    tanks: 227,
    naval: 75,
    submarines: 11,
    nukes: 225,
    internationalBases: 17,
    domesticBases: 50,
    tech: 90,
    strengths: [
      'Advanced naval capabilities',
      'Strong special forces',
      'High-tech equipment',
      'NATO membership',
      'Global intelligence network'
    ],
    weaknesses: [
      'Limited manpower',
      'Reduced force size due to budget cuts',
      'Aging equipment in some areas'
    ]
  },
  'France': {
    flag: '🇫🇷',
    color: '#4B92DB',
    budget: 52.7,
    gdpPercent: 2.1,
    active: 205000,
    reserve: 35000,
    population: 65000000,
    aircraft: 1055,
    tanks: 406,
    naval: 180,
    submarines: 10,
    nukes: 290,
    internationalBases: 11,
    domesticBases: 65,
    tech: 88,
    strengths: [
      'Independent nuclear deterrent',
      'Strong expeditionary capabilities',
      'Advanced aerospace industry',
      'Significant presence in Africa'
    ],
    weaknesses: [
      'Limited defense budget',
      'Stretched forces due to multiple deployments',
      'Aging equipment in some areas'
    ]
  },
  'Japan': {
    flag: '🇯🇵',
    color: '#E03131',
    budget: 49.1,
    gdpPercent: 1.0,
    active: 247000,
    reserve: 56000,
    population: 126000000,
    aircraft: 1480,
    tanks: 1004,
    naval: 155,
    submarines: 22,
    nukes: 0,
    internationalBases: 0,
    domesticBases: 47,
    tech: 92,
    strengths: [
      'Advanced naval capabilities',
      'Modern air force',
      'High-tech equipment',
      'Strong alliance with the US',
      'Advanced missile defense'
    ],
    weaknesses: [
      'Constitutional limitations on military action',
      'Limited offensive capabilities',
      'No nuclear deterrent'
    ]
  },
  'South Korea': {
    flag: '🇰🇷',
    color: '#228BE6',
    budget: 45.7,
    gdpPercent: 2.8,
    active: 599000,
    reserve: 3100000,
    population: 51000000,
    aircraft: 1614,
    tanks: 2614,
    naval: 166,
    submarines: 22,
    nukes: 0,
    internationalBases: 0,
    domesticBases: 76,
    tech: 85,
    strengths: [
      'Large, well-trained military',
      'Modern equipment',
      'Strong domestic defense industry',
      'US military presence and support'
    ],
    weaknesses: [
      'Threat from North Korea',
      'Limited power projection capabilities',
      'Demographic challenges'
    ]
  },
  'Germany': {
    flag: '🇩🇪',
    color: '#5C940D',
    budget: 52.8,
    gdpPercent: 1.4,
    active: 184000,
    reserve: 30000,
    population: 83000000,
    aircraft: 617,
    tanks: 266,
    naval: 80,
    submarines: 6,
    nukes: 0,
    internationalBases: 3,
    domesticBases: 62,
    tech: 87,
    strengths: [
      'Modern equipment',
      'Strong industrial base',
      'NATO membership',
      'Central position in Europe'
    ],
    weaknesses: [
      'Underfunded military',
      'Limited operational readiness',
      'Political constraints on military action'
    ]
  },
  'Israel': {
    flag: '🇮🇱',
    color: '#1971C2',
    budget: 24.3,
    gdpPercent: 5.6,
    active: 170000,
    reserve: 465000,
    population: 9000000,
    aircraft: 601,
    tanks: 1650,
    naval: 65,
    submarines: 5,
    nukes: 90,
    internationalBases: 0,
    domesticBases: 28,
    tech: 93,
    strengths: [
      'Advanced technology',
      'Significant combat experience',
      'Strong intelligence capabilities',
      'Nuclear capability',
      'Advanced missile defense'
    ],
    weaknesses: [
      'Small size relative to regional threats',
      'Limited strategic depth',
      'Surrounded by potential adversaries'
    ]
  },
  'European Union': {
    flag: '🇪🇺',
    color: '#FFD43B',
    budget: 225,
    gdpPercent: 1.8,
    active: 1400000,
    reserve: 1500000,
    population: 447000000,
    aircraft: 2100,
    tanks: 5000,
    naval: 550,
    submarines: 30,
    nukes: 515,
    internationalBases: 40,
    domesticBases: 420,
    tech: 88,
    strengths: [
      'Combined economic power',
      'Technological capabilities',
      'Diplomatic influence',
      'NATO integration'
    ],
    weaknesses: [
      'Lack of unified military command',
      'Varying levels of military investment',
      'Political differences on defense policy'
    ]
  }
};

// Helper functions
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Data generation functions
export const getRadarData = (countries: string[]) => {
  const metrics = ['personnel', 'budget', 'aircraft', 'tanks', 'naval', 'nukes', 'tech'];
  const displayNames = {
    personnel: 'Personnel',
    budget: 'Budget',
    aircraft: 'Aircraft',
    tanks: 'Tanks',
    naval: 'Naval',
    nukes: 'Nuclear',
    tech: 'Technology'
  };
  
  // Get max values for each metric to normalize
  const maxValues: Record<string, number> = {};
  metrics.forEach(metric => {
    maxValues[metric] = Math.max(...countries.map(country => militaryData[country]?.[metric] || 0));
  });
  
  // Generate radar data
  return metrics.map(metric => {
    const data: any = {
      metric,
      displayName: displayNames[metric as keyof typeof displayNames]
    };
    
    // Add normalized values (0-100) for each country
    countries.slice(0, 3).forEach(country => {
      if (militaryData[country]) {
        const value = militaryData[country][metric] || 0;
        const normalizedValue = maxValues[metric] ? (value / maxValues[metric]) * 100 : 0;
        data[country] = normalizedValue;
      }
    });
    
    return data;
  });
};

export const getBudgetData = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      budget: militaryData[country].budget,
      gdpPercent: militaryData[country].gdpPercent,
      color: militaryData[country].color
    };
  }).filter(Boolean);
};

export const getPersonnelData = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      active: militaryData[country].active,
      reserve: militaryData[country].reserve,
      perCapita: Math.round((militaryData[country].active / militaryData[country].population) * 1000000),
      color: militaryData[country].color
    };
  }).filter(Boolean);
};

export const getEquipmentData = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      aircraft: militaryData[country].aircraft,
      tanks: militaryData[country].tanks,
      naval: militaryData[country].naval,
      color: militaryData[country].color
    };
  }).filter(Boolean);
};

export const getSubmarineData = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      submarines: militaryData[country].submarines,
      color: militaryData[country].color
    };
  }).filter(Boolean);
};

export const getInternationalBasesData = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      internationalBases: militaryData[country].internationalBases,
      domesticBases: militaryData[country].domesticBases,
      color: militaryData[country].color
    };
  }).filter(Boolean);
};

export const getNuclearData = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      nukes: militaryData[country].nukes,
      hasMissiles: militaryData[country].nukes > 0,
      color: militaryData[country].color
    };
  }).filter(Boolean);
};

export const getHistoricalBudgetData = (countries: string[]) => {
  // Sample historical data
  const years = [2018, 2019, 2020, 2021, 2022];
  const growthRates: Record<string, number[]> = {
    'United States': [3.2, 4.5, 2.1, 1.8, 3.7],
    'China': [8.1, 7.5, 6.6, 7.1, 7.4],
    'Russia': [3.5, 4.5, -6.6, 2.9, 5.4],
    'India': [3.1, 6.8, 2.1, 0.9, 13.0],
    'United Kingdom': [-0.9, 1.4, 2.7, 3.1, 13.8],
    'France': [1.7, 5.0, 3.9, 4.3, 7.4],
    'Japan': [2.1, 1.3, 0.8, 7.3, 7.9],
    'South Korea': [7.0, 8.2, 5.5, 4.4, 4.1],
    'Germany': [3.5, 6.6, 5.2, 3.2, 10.3],
    'Israel': [0.7, 1.7, 2.7, 11.3, 12.4],
    'European Union': [2.1, 3.9, 3.1, 4.2, 6.0]
  };
  
  return years.map(year => {
    const yearData: Record<string, any> = { year };
    
    countries.forEach(country => {
      if (militaryData[country]) {
        const baseValue = militaryData[country].budget;
        const yearIndex = year - 2018;
        
        // Calculate historical value based on growth rates
        let historicalValue = baseValue;
        for (let i = 4; i >= yearIndex; i--) {
          historicalValue = historicalValue / (1 + (growthRates[country]?.[i] || 3) / 100);
        }
        
        yearData[country] = Math.round(historicalValue);
      }
    });
    
    return yearData;
  });
};

export const getHistoricalNukesData = (countries: string[]) => {
  // Sample historical data for nuclear warheads
  const years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022];
  const historicalData: Record<string, number[]> = {
    'United States': [10500, 8500, 7000, 6000, 5800, 5500, 5500, 5500],
    'Russia': [27000, 22500, 12000, 8000, 7000, 6500, 6300, 6257],
    'China': [150, 180, 200, 235, 260, 290, 320, 350],
    'United Kingdom': [350, 300, 280, 250, 225, 225, 225, 225],
    'France': [500, 450, 350, 350, 300, 300, 290, 290],
    'India': [0, 5, 30, 65, 90, 120, 150, 160],
    'Israel': [50, 60, 70, 80, 80, 85, 90, 90],
    'European Union': [850, 750, 630, 600, 525, 525, 515, 515]
  };
  
  return years.map(year => {
    const yearData: Record<string, any> = { year };
    
    countries.forEach(country => {
      if (historicalData[country]) {
        const yearIndex = Math.floor((year - 1990) / 5);
        const adjustedIndex = Math.min(yearIndex, historicalData[country].length - 1);
        yearData[country] = historicalData[country][adjustedIndex];
      }
    });
    
    return yearData;
  });
};

export const getStrengthsAndWeaknesses = (countries: string[]) => {
  return countries.map(country => {
    if (!militaryData[country]) return null;
    
    return {
      name: country,
      flag: militaryData[country].flag,
      strengths: militaryData[country].strengths || [],
      weaknesses: militaryData[country].weaknesses || []
    };
  }).filter(Boolean);
};

export const getProjectionData = (countries: string[]) => {
  // Generate projection data for 2023-2035
  const years = Array.from({ length: 13 }, (_, i) => 2023 + i);
  
  // Growth rates per country and metric
  const growthRates: Record<string, Record<string, number>> = {
    'United States': { Budget: 2.5, Personnel: -0.5, Nukes: -0.2 },
    'China': { Budget: 6.0, Personnel: 1.0, Nukes: 3.0 },
    'Russia': { Budget: 1.5, Personnel: -1.0, Nukes: -0.5 },
    'India': { Budget: 5.0, Personnel: 1.5, Nukes: 2.0 },
    'United Kingdom': { Budget: 2.0, Personnel: -1.0, Nukes: 0 },
    'France': { Budget: 1.8, Personnel: -0.5, Nukes: 0 },
    'Japan': { Budget: 3.0, Personnel: 0.5, Nukes: 0 },
    'South Korea': { Budget: 4.0, Personnel: 0.0, Nukes: 0 },
    'Germany': { Budget: 3.5, Personnel: 0.5, Nukes: 0 },
    'Israel': { Budget: 3.0, Personnel: 1.0, Nukes: 1.0 },
    'European Union': { Budget: 2.5, Personnel: -0.2, Nukes: 0 }
  };
  
  return years.map(year => {
    const yearData: Record<string, any> = { year };
    
    countries.forEach(country => {
      if (militaryData[country]) {
        // Calculate projections for each metric
        ['Budget', 'Personnel', 'Nukes'].forEach(metric => {
          const baseValue = metric === 'Budget' 
            ? militaryData[country].budget 
            : metric === 'Personnel' 
              ? militaryData[country].active 
              : militaryData[country].nukes;
          
          const growthRate = growthRates[country]?.[metric] || 0;
          const yearsPassed = year - 2023;
          const projectedValue = Math.round(baseValue * Math.pow(1 + growthRate / 100, yearsPassed));
          
          yearData[`${country}${metric}`] = projectedValue;
        });
      }
    });
    
    return yearData;
  });
};

export const getPlaceholderStoryChips = (): StoryChip[] => {
  return [
    {
      id: 'chip1',
      title: 'US-China Trade War Escalation',
      description: 'Increased tariffs and economic sanctions between the US and China',
      category: 'economic',
      icon: 'dollar-sign',
      impact: {
        country: 'China',
        metric: 'budget',
        effect: 'increase',
        amount: 15,
        startYear: 2024
      }
    },
    {
      id: 'chip2',
      title: 'European Defense Initiative',
      description: 'EU increases military cooperation and joint defense spending',
      category: 'geopolitical',
      icon: 'shield',
      impact: {
        country: 'European Union',
        metric: 'budget',
        effect: 'increase',
        amount: 25,
        startYear: 2025
      }
    },
    {
      id: 'chip3',
      title: 'Russian Military Modernization',
      description: 'Russia launches new program to modernize aging equipment',impact: {
        country: 'Russia',
        metric: 'budget',
        effect: 'increase',
        amount: 20,
        startYear: 2024
      }
    },
    {
      id: 'chip4',
      title: 'US Military Drawdown',
      description: 'Reduction in overseas deployments and shift to technological focus',
      category: 'geopolitical',
      icon: 'trending-down',
      impact: {
        country: 'United States',
        metric: 'personnel',
        effect: 'decrease',
        amount: 12,
        startYear: 2026
      }
    },
    {
      id: 'chip5',
      title: 'Chinese Naval Expansion',
      description: 'Accelerated shipbuilding program and blue water navy development',
      category: 'technological',
      icon: 'shield-alert',
      impact: {
        country: 'China',
        metric: 'budget',
        effect: 'increase',
        amount: 18,
        startYear: 2025
      }
    },
    {
      id: 'chip6',
      title: 'Regional Conflict in Asia',
      description: 'Limited military engagement requiring increased readiness',
      category: 'conflict',
      icon: 'swords',
      impact: {
        country: 'China',
        metric: 'personnel',
        effect: 'increase',
        amount: 15,
        startYear: 2027
      }
    },
    {
      id: 'chip7',
      title: 'AI Defense Revolution',
      description: 'Breakthrough in military AI applications changes force structure',
      category: 'technological',
      icon: 'cpu',
      impact: {
        country: 'United States',
        metric: 'personnel',
        effect: 'decrease',
        amount: 20,
        startYear: 2028
      }
    },
    {
      id: 'chip8',
      title: 'Nuclear Arms Reduction Treaty',
      description: 'Major powers agree to reduce nuclear arsenals',
      category: 'geopolitical',
      icon: 'file-text',
      impact: {
        country: 'Russia',
        metric: 'nukes',
        effect: 'decrease',
        amount: 30,
        startYear: 2026
      }
    },
    {
      id: 'chip9',
      title: 'Global Economic Recession',
      description: 'Severe economic downturn affects military spending worldwide',
      category: 'economic',
      icon: 'trending-down',
      impact: {
        country: 'European Union',
        metric: 'budget',
        effect: 'decrease',
        amount: 15,
        startYear: 2025
      }
    },
    {
      id: 'chip10',
      title: 'Hypersonic Weapons Deployment',
      description: 'New generation of unstoppable missiles changes strategic balance',
      category: 'technological',
      icon: 'rocket',
      impact: {
        country: 'Russia',
        metric: 'budget',
        effect: 'increase',
        amount: 25,
        startYear: 2027
      }
    }
  ];
};

// Equipment data
export const equipmentCategories = [
  {
    id: 'tanks',
    name: 'Tanks',
    icon: 'TankIcon',
    color: '#4CAF50',
    capabilities: [
      'Ground warfare dominance',
      'Infantry support',
      'Breakthrough operations',
      'Territorial control',
      'Defensive fortification',
      'Urban combat (with limitations)'
    ]
  },
  {
    id: 'aircraft',
    name: 'Aircraft',
    icon: 'PlaneIcon',
    color: '#2196F3',
    capabilities: [
      'Air superiority',
      'Strategic bombing',
      'Close air support',
      'Reconnaissance',
      'Electronic warfare',
      'Rapid deployment'
    ]
  },
  {
    id: 'ships',
    name: 'Naval Vessels',
    icon: 'ShipIcon',
    color: '#3F51B5',
    capabilities: [
      'Sea control',
      'Power projection',
      'Amphibious operations',
      'Maritime security',
      'Carrier strike groups',
      'Naval blockades'
    ]
  },
  {
    id: 'submarines',
    name: 'Submarines',
    icon: 'ShipIcon',
    color: '#1A237E',
    capabilities: [
      'Stealth operations',
      'Anti-ship warfare',
      'Nuclear deterrence',
      'Intelligence gathering',
      'Special forces deployment',
      'Strategic strike capability'
    ]
  },
  {
    id: 'missiles',
    name: 'Missiles',
    icon: 'RocketIcon',
    color: '#F44336',
    capabilities: [
      'Strategic deterrence',
      'Precision strikes',
      'Air defense',
      'Anti-ship capabilities',
      'Tactical battlefield support',
      'Stand-off attack capability'
    ]
  },
  {
    id: 'helicopters',
    name: 'Helicopters',
    icon: 'HelicopterIcon',
    color: '#FF9800',
    capabilities: [
      'Troop transport',
      'Close air support',
      'Medical evacuation',
      'Anti-tank operations',
      'Special operations',
      'Naval operations'
    ]
  }
];

export const getEnhancedEquipmentData = () => {
  // This function would normally fetch data from an API
  // For demo purposes, we'll generate some enhanced data
  
  const enhancedData: Record<string, any> = {};
  
  Object.keys(militaryData).forEach(country => {
    enhancedData[country] = {
      // Tanks data
      tanks: {
        quantity: militaryData[country].tanks,
        qualityRating: Math.min(10, Math.round((Math.random() * 3) + (militaryData[country].tech / 15))),
        powerRating: Math.round(militaryData[country].tanks * (Math.random() * 0.3 + 0.7)),
        growth: (Math.random() * 10 - 5).toFixed(1),
        mainModels: generateMainModels(country, 'tanks'),
        globalRank: Math.floor(Math.random() * 20) + 1,
        modernPercentage: Math.floor(Math.random() * 40) + 60,
        operationalRate: Math.floor(Math.random() * 20) + 80,
        yearlyBudget: Math.round(militaryData[country].budget * (0.15 + Math.random() * 0.1))
      },
      
      // Aircraft data
      aircraft: {
        quantity: militaryData[country].aircraft,
        qualityRating: Math.min(10, Math.round((Math.random() * 3) + (militaryData[country].tech / 15))),
        powerRating: Math.round(militaryData[country].aircraft * (Math.random() * 0.3 + 0.7)),
        growth: (Math.random() * 8 - 3).toFixed(1),
        mainModels: generateMainModels(country, 'aircraft'),
        globalRank: Math.floor(Math.random() * 20) + 1,
        modernPercentage: Math.floor(Math.random() * 40) + 60,
        operationalRate: Math.floor(Math.random() * 15) + 85,
        yearlyBudget: Math.round(militaryData[country].budget * (0.25 + Math.random() * 0.15))
      },
      
      // Ships data
      ships: {
        quantity: militaryData[country].naval,
        qualityRating: Math.min(10, Math.round((Math.random() * 3) + (militaryData[country].tech / 15))),
        powerRating: Math.round(militaryData[country].naval * (Math.random() * 0.3 + 0.7) * 3),
        growth: (Math.random() * 6 - 2).toFixed(1),
        mainModels: generateMainModels(country, 'ships'),
        globalRank: Math.floor(Math.random() * 20) + 1,
        modernPercentage: Math.floor(Math.random() * 40) + 60,
        operationalRate: Math.floor(Math.random() * 10) + 90,
        yearlyBudget: Math.round(militaryData[country].budget * (0.2 + Math.random() * 0.1))
      },
      
      // Submarines data
      submarines: {
        quantity: militaryData[country].submarines || Math.floor(militaryData[country].naval / 10),
        qualityRating: Math.min(10, Math.round((Math.random() * 3) + (militaryData[country].tech / 15))),
        powerRating: Math.round((militaryData[country].submarines || Math.floor(militaryData[country].naval / 10)) * (Math.random() * 0.3 + 0.7) * 5),
        growth: (Math.random() * 4 - 1).toFixed(1),
        mainModels: generateMainModels(country, 'submarines'),
        globalRank: Math.floor(Math.random() * 20) + 1,
        modernPercentage: Math.floor(Math.random() * 40) + 60,
        operationalRate: Math.floor(Math.random() * 10) + 90,
        yearlyBudget: Math.round(militaryData[country].budget * (0.1 + Math.random() * 0.05))
      },
      
      // Missiles data
      missiles: {
        quantity: Math.round(militaryData[country].aircraft * 0.8 + militaryData[country].naval * 5),
        qualityRating: Math.min(10, Math.round((Math.random() * 3) + (militaryData[country].tech / 15))),
        powerRating: Math.round((militaryData[country].aircraft * 0.8 + militaryData[country].naval * 5) * (Math.random() * 0.3 + 0.7)),
        growth: (Math.random() * 12 - 2).toFixed(1),
        mainModels: generateMainModels(country, 'missiles'),
        globalRank: Math.floor(Math.random() * 20) + 1,
        modernPercentage: Math.floor(Math.random() * 40) + 60,
        operationalRate: Math.floor(Math.random() * 5) + 95,
        yearlyBudget: Math.round(militaryData[country].budget * (0.15 + Math.random() * 0.1))
      },
      
      // Helicopters data
      helicopters: {
        quantity: Math.round(militaryData[country].aircraft * 0.4),
        qualityRating: Math.min(10, Math.round((Math.random() * 3) + (militaryData[country].tech / 15))),
        powerRating: Math.round(militaryData[country].aircraft * 0.4 * (Math.random() * 0.3 + 0.7)),
        growth: (Math.random() * 8 - 3).toFixed(1),
        mainModels: generateMainModels(country, 'helicopters'),
        globalRank: Math.floor(Math.random() * 20) + 1,
        modernPercentage: Math.floor(Math.random() * 40) + 60,
        operationalRate: Math.floor(Math.random() * 15) + 85,
        yearlyBudget: Math.round(militaryData[country].budget * (0.1 + Math.random() * 0.05))
      },
      
      // Historical data (simplified)
      historicalData: [
        { year: 2018, tanks: Math.round(militaryData[country].tanks * 0.85), aircraft: Math.round(militaryData[country].aircraft * 0.9) },
        { year: 2019, tanks: Math.round(militaryData[country].tanks * 0.9), aircraft: Math.round(militaryData[country].aircraft * 0.92) },
        { year: 2020, tanks: Math.round(militaryData[country].tanks * 0.95), aircraft: Math.round(militaryData[country].aircraft * 0.95) },
        { year: 2021, tanks: Math.round(militaryData[country].tanks * 0.98), aircraft: Math.round(militaryData[country].aircraft * 0.98) },
        { year: 2022, tanks: militaryData[country].tanks, aircraft: militaryData[country].aircraft }
      ]
    };
  });
  
  return enhancedData;
};

// Helper function to generate realistic equipment model names
function generateMainModels(country: string, equipmentType: string): string[] {
  const models: Record<string, Record<string, string[]>> = {
    'United States': {
      tanks: ['M1A2 Abrams', 'M1A2C SEPv3', 'M1A2D SEPv4'],
      aircraft: ['F-35 Lightning II', 'F-22 Raptor', 'F-15EX Eagle II'],
      ships: ['Arleigh Burke-class', 'Nimitz-class', 'Gerald R. Ford-class'],
      submarines: ['Virginia-class', 'Ohio-class', 'Columbia-class'],
      missiles: ['Tomahawk', 'SM-6', 'JASSM-ER'],
      helicopters: ['AH-64E Apache', 'UH-60M Black Hawk', 'CH-47F Chinook']
    },
    'Russia': {
      tanks: ['T-90M', 'T-14 Armata', 'T-72B3M'],
      aircraft: ['Su-57', 'Su-35S', 'MiG-35'],
      ships: ['Admiral Gorshkov-class', 'Slava-class', 'Kirov-class'],
      submarines: ['Borei-class', 'Yasen-class', 'Kilo-class'],
      missiles: ['Kalibr', 'Iskander', 'Avangard'],
      helicopters: ['Ka-52 Alligator', 'Mi-28NM', 'Mi-26']
    },
    'China': {
      tanks: ['Type 99A', 'Type 15', 'VT-4'],
      aircraft: ['J-20', 'J-16', 'J-10C'],
      ships: ['Type 055', 'Type 052D', 'Liaoning-class'],
      submarines: ['Type 096', 'Type 095', 'Type 094A'],
      missiles: ['DF-17', 'DF-21D', 'YJ-18'],
      helicopters: ['Z-20', 'Z-10', 'Z-19']
    }
  };
  
  // Default models for countries not specifically defined
  const defaultModels: Record<string, string[]> = {
    tanks: ['Main Battle Tank', 'Light Tank', 'Heavy Tank'],
    aircraft: ['Multirole Fighter', 'Strike Aircraft', 'Interceptor'],
    ships: ['Destroyer', 'Frigate', 'Aircraft Carrier'],
    submarines: ['Attack Submarine', 'Ballistic Missile Submarine', 'Diesel-Electric Submarine'],
    missiles: ['Cruise Missile', 'Ballistic Missile', 'Anti-Ship Missile'],
    helicopters: ['Attack Helicopter', 'Transport Helicopter', 'Utility Helicopter']
  };
  
  // Return country-specific models if available, otherwise use default
  return models[country]?.[equipmentType] || defaultModels[equipmentType] || ['Unknown Model'];
}