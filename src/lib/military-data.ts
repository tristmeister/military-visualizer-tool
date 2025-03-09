export type MilitaryData = {
  color: string;
  flag: string;
  personnel: number;
  reserve: number;
  budget: number; // in billions USD
  gdpPercent: number; // defense budget as % of GDP
  aircraft: number;
  tanks: number;
  naval: number;
  nukes: number;
  bases: number;
  techIndex: number;
  population: number; // in millions
  strengths: string[];
  weaknesses: string[];
  historicalBudget: { year: number; value: number }[];
  historicalNukes: { year: number; value: number }[];
  projections?: {
    budget: { year: number; value: number }[];
    personnel: { year: number; value: number }[];
    nukes: { year: number; value: number }[];
  };
};

export type CountryData = Record<string, MilitaryData>;

export type StatCategory = 'overview' | 'personnel' | 'budget' | 'equipment' | 'nuclear' | 'historical';

export type StoryChip = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'economic' | 'geopolitical' | 'technological' | 'conflict';
  impact: {
    country: string;
    metric: 'budget' | 'personnel' | 'nukes' | 'techIndex';
    effect: 'increase' | 'decrease';
    amount: number; // percentage change;
    startYear: number;
  };
};

export const militaryData: CountryData = {
  'United States': {
    color: '#1E88E5',
    flag: '🇺🇸',
    personnel: 1400000,
    reserve: 800000,
    budget: 800.7,
    gdpPercent: 3.5,
    aircraft: 13247,
    tanks: 5500,
    naval: 490,
    nukes: 5550,
    bases: 750,
    techIndex: 10,
    population: 331.9,
    strengths: ['Advanced technology', 'Global force projection', 'Strongest naval force', 'Air superiority'],
    weaknesses: ['High operational costs', 'Political constraints', 'Overextended commitments'],
    historicalBudget: [
      { year: 2018, value: 700 },
      { year: 2019, value: 732 },
      { year: 2020, value: 750 },
      { year: 2021, value: 778 },
      { year: 2022, value: 800.7 }
    ],
    historicalNukes: [
      { year: 1990, value: 10000 },
      { year: 2000, value: 8000 },
      { year: 2010, value: 6700 },
      { year: 2020, value: 5800 },
      { year: 2022, value: 5550 }
    ],
    projections: {
      budget: [
        { year: 2023, value: 820 },
        { year: 2025, value: 850 },
        { year: 2030, value: 900 },
        { year: 2035, value: 950 }
      ],
      personnel: [
        { year: 2023, value: 1400000 },
        { year: 2025, value: 1450000 },
        { year: 2030, value: 1500000 },
        { year: 2035, value: 1550000 }
      ],
      nukes: [
        { year: 2023, value: 5500 },
        { year: 2025, value: 5400 },
        { year: 2030, value: 5200 },
        { year: 2035, value: 5000 }
      ]
    }
  },
  'China': {
    color: '#E53935',
    flag: '🇨🇳',
    personnel: 2035000,
    reserve: 510000,
    budget: 229.0,
    gdpPercent: 1.7,
    aircraft: 3260,
    tanks: 5800,
    naval: 777,
    nukes: 350,
    bases: 12,
    techIndex: 7,
    population: 1412,
    strengths: ['Massive manpower', 'Growing naval capability', 'Missile technology', 'Cyber capabilities'],
    weaknesses: ['Limited combat experience', 'Technology gaps', 'Regional focus'],
    historicalBudget: [
      { year: 2018, value: 175 },
      { year: 2019, value: 185 },
      { year: 2020, value: 196 },
      { year: 2021, value: 209 },
      { year: 2022, value: 229 }
    ],
    historicalNukes: [
      { year: 1990, value: 100 },
      { year: 2000, value: 180 },
      { year: 2010, value: 240 },
      { year: 2020, value: 320 },
      { year: 2022, value: 350 }
    ],
    projections: {
      budget: [
        { year: 2023, value: 250 },
        { year: 2025, value: 280 },
        { year: 2030, value: 350 },
        { year: 2035, value: 420 }
      ],
      personnel: [
        { year: 2023, value: 2050000 },
        { year: 2025, value: 2100000 },
        { year: 2030, value: 2200000 },
        { year: 2035, value: 2300000 }
      ],
      nukes: [
        { year: 2023, value: 380 },
        { year: 2025, value: 450 },
        { year: 2030, value: 600 },
        { year: 2035, value: 750 }
      ]
    }
  },
  'Russia': {
    color: '#5E35B1',
    flag: '🇷🇺',
    personnel: 900000,
    reserve: 2000000,
    budget: 61.7,
    gdpPercent: 4.1,
    aircraft: 4173,
    tanks: 12420,
    naval: 605,
    nukes: 6257,
    bases: 21,
    techIndex: 7.5,
    population: 143.4,
    strengths: ['Nuclear arsenal', 'Land forces', 'Air defense systems', 'Special operations'],
    weaknesses: ['Economic constraints', 'Aging equipment', 'Command structure', 'Logistics issues'],
    historicalBudget: [
      { year: 2018, value: 66 },
      { year: 2019, value: 64 },
      { year: 2020, value: 62 },
      { year: 2021, value: 62 },
      { year: 2022, value: 61.7 }
    ],
    historicalNukes: [
      { year: 1990, value: 12000 },
      { year: 2000, value: 10000 },
      { year: 2010, value: 8000 },
      { year: 2020, value: 6800 },
      { year: 2022, value: 6257 }
    ],
    projections: {
      budget: [
        { year: 2023, value: 65 },
        { year: 2025, value: 70 },
        { year: 2030, value: 85 },
        { year: 2035, value: 100 }
      ],
      personnel: [
        { year: 2023, value: 920000 },
        { year: 2025, value: 950000 },
        { year: 2030, value: 1000000 },
        { year: 2035, value: 1050000 }
      ],
      nukes: [
        { year: 2023, value: 6200 },
        { year: 2025, value: 6100 },
        { year: 2030, value: 6000 },
        { year: 2035, value: 5900 }
      ]
    }
  },
  'European Union': {
    color: '#26A69A',
    flag: '🇪🇺',
    personnel: 1400000,
    reserve: 1500000,
    budget: 280.0,
    gdpPercent: 1.8,
    aircraft: 3450,
    tanks: 5000,
    naval: 550,
    nukes: 515, // France and UK combined
    bases: 200,
    techIndex: 8.5,
    population: 447.7,
    strengths: ['Economic power', 'Technological innovation', 'Diplomatic influence', 'Regional unity'],
    weaknesses: ['Decision-making complexity', 'Varied national interests', 'Defense integration issues'],
    historicalBudget: [
      { year: 2018, value: 240 },
      { year: 2019, value: 250 },
      { year: 2020, value: 255 },
      { year: 2021, value: 270 },
      { year: 2022, value: 280 }
    ],
    historicalNukes: [
      { year: 1990, value: 850 },
      { year: 2000, value: 730 },
      { year: 2010, value: 600 },
      { year: 2020, value: 525 },
      { year: 2022, value: 515 }
    ],
    projections: {
      budget: [
        { year: 2023, value: 295 },
        { year: 2025, value: 320 },
        { year: 2030, value: 380 },
        { year: 2035, value: 420 }
      ],
      personnel: [
        { year: 2023, value: 1420000 },
        { year: 2025, value: 1450000 },
        { year: 2030, value: 1500000 },
        { year: 2035, value: 1550000 }
      ],
      nukes: [
        { year: 2023, value: 515 },
        { year: 2025, value: 515 },
        { year: 2030, value: 515 },
        { year: 2035, value: 515 }
      ]
    }
  },
  'United Kingdom': {
    color: '#58508d',
    flag: '🇬🇧',
    personnel: 150000,
    reserve: 80000,
    budget: 68.4,
    gdpPercent: 2.4,
    aircraft: 733,
    tanks: 227,
    naval: 75,
    nukes: 225,
    bases: 145,
    techIndex: 9,
    population: 67.5,
    strengths: ['Naval tradition', 'Special forces', 'Intelligence capabilities', 'NATO integration'],
    weaknesses: ['Limited force size', 'Reduced global reach', 'Equipment procurement delays'],
    historicalBudget: [
      { year: 2018, value: 60 },
      { year: 2019, value: 62 },
      { year: 2020, value: 64 },
      { year: 2021, value: 66 },
      { year: 2022, value: 68.4 }
    ],
    historicalNukes: [
      { year: 1990, value: 350 },
      { year: 2000, value: 280 },
      { year: 2010, value: 250 },
      { year: 2020, value: 225 },
      { year: 2022, value: 225 }
    ]
  },
  'France': {
    color: '#ffa600',
    flag: '🇫🇷',
    personnel: 205000,
    reserve: 35000,
    budget: 55.0,
    gdpPercent: 2.1,
    aircraft: 1055,
    tanks: 406,
    naval: 180,
    nukes: 290,
    bases: 11,
    techIndex: 8.5,
    population: 65.4,
    strengths: ['Independent nuclear deterrent', 'Aerospace industry', 'Expeditionary capability', 'Force de frappe'],
    weaknesses: ['Limited defense spending', 'Force integration issues', 'Equipment maintenance'],
    historicalBudget: [
      { year: 2018, value: 48 },
      { year: 2019, value: 50 },
      { year: 2020, value: 51 },
      { year: 2021, value: 53 },
      { year: 2022, value: 55 }
    ],
    historicalNukes: [
      { year: 1990, value: 500 },
      { year: 2000, value: 450 },
      { year: 2010, value: 350 },
      { year: 2020, value: 300 },
      { year: 2022, value: 290 }
    ]
  },
  'Germany': {
    color: '#5a5a5a',
    flag: '🇩🇪',
    personnel: 184000,
    reserve: 30000,
    budget: 56.0,
    gdpPercent: 1.5,
    aircraft: 625,
    tanks: 266,
    naval: 80,
    nukes: 0,
    bases: 0,
    techIndex: 8,
    population: 83.2,
    strengths: ['Engineering excellence', 'NATO integration', 'Economic power', 'Leadership position in EU'],
    weaknesses: ['Historical constraints', 'Limited readiness', 'Underfunding', 'Political hesitancy'],
    historicalBudget: [
      { year: 2018, value: 45 },
      { year: 2019, value: 47 },
      { year: 2020, value: 49 },
      { year: 2021, value: 53 },
      { year: 2022, value: 56 }
    ],
    historicalNukes: [
      { year: 1990, value: 0 },
      { year: 2000, value: 0 },
      { year: 2010, value: 0 },
      { year: 2020, value: 0 },
      { year: 2022, value: 0 }
    ]
  },
  'Japan': {
    color: '#d3d3d3',
    flag: '🇯🇵',
    personnel: 247000,
    reserve: 56000,
    budget: 49.1,
    gdpPercent: 1.1,
    aircraft: 1480,
    tanks: 1004,
    naval: 155,
    nukes: 0,
    bases: 0,
    techIndex: 9,
    population: 125.7,
    strengths: ['Advanced technology', 'Maritime defenses', 'US alliance', 'Professional forces'],
    weaknesses: ['Constitutional limitations', 'Regional threats', 'Limited power projection'],
    historicalBudget: [
      { year: 2018, value: 45 },
      { year: 2019, value: 46 },
      { year: 2020, value: 47 },
      { year: 2021, value: 48 },
      { year: 2022, value: 49.1 }
    ],
    historicalNukes: [
      { year: 1990, value: 0 },
      { year: 2000, value: 0 },
      { year: 2010, value: 0 },
      { year: 2020, value: 0 },
      { year: 2022, value: 0 }
    ]
  },
  'India': {
    color: '#ff9900',
    flag: '🇮🇳',
    personnel: 1445000,
    reserve: 1155000,
    budget: 64.0,
    gdpPercent: 2.4,
    aircraft: 2123,
    tanks: 4614,
    naval: 295,
    nukes: 150,
    bases: 7,
    techIndex: 6,
    population: 1393,
    strengths: ['Large conventional forces', 'Indigenous defense industry', 'Nuclear triad', 'Space capabilities'],
    weaknesses: ['Procurement inefficiency', 'Technology gaps', 'Border threats', 'Inter-service rivalry'],
    historicalBudget: [
      { year: 2018, value: 57 },
      { year: 2019, value: 60 },
      { year: 2020, value: 61 },
      { year: 2021, value: 62 },
      { year: 2022, value: 64 }
    ],
    historicalNukes: [
      { year: 1990, value: 10 },
      { year: 2000, value: 50 },
      { year: 2010, value: 80 },
      { year: 2020, value: 130 },
      { year: 2022, value: 150 }
    ]
  }
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const getFilteredData = (selectedCountries: string[]) => {
  return selectedCountries.map(country => ({
    name: country,
    flag: militaryData[country].flag,
    color: militaryData[country].color,
    ...militaryData[country]
  }));
};

export const getRadarData = (selectedCountries: string[]) => {
  const limitedCountries = selectedCountries.slice(0, 3);
  return limitedCountries.map(country => {
    const data = militaryData[country];
    // Normalize values for radar chart
    return {
      name: country,
      displayName: `${data.flag} ${country}`,
      personnel: Math.log10(data.personnel) * 10,
      budget: Math.log10(data.budget) * 15,
      aircraft: Math.log10(data.aircraft) * 20,
      tanks: Math.log10(data.tanks) * 15,
      naval: Math.log10(data.naval) * 20,
      nukes: data.nukes > 0 ? Math.log10(data.nukes) * 20 : 0,
      tech: data.techIndex * 10,
      color: data.color
    };
  });
};

export const getEquipmentData = (selectedCountries: string[]) => {
  return getFilteredData(selectedCountries).map(item => ({
    name: item.name,
    flag: item.flag,
    aircraft: item.aircraft,
    tanks: item.tanks,
    naval: item.naval,
    color: item.color
  }));
};

export const getBudgetData = (selectedCountries: string[]) => {
  return getFilteredData(selectedCountries).map(item => ({
    name: item.name,
    flag: item.flag,
    budget: item.budget,
    gdpPercent: item.gdpPercent,
    color: item.color
  }));
};

export const getPersonnelData = (selectedCountries: string[]) => {
  return getFilteredData(selectedCountries).map(item => ({
    name: item.name,
    flag: item.flag,
    active: item.personnel,
    reserve: item.reserve,
    perCapita: (item.personnel / item.population).toFixed(2),
    population: item.population,
    color: item.color
  }));
};

export const getNuclearData = (selectedCountries: string[]) => {
  return getFilteredData(selectedCountries).map(item => ({
    name: item.name,
    flag: item.flag,
    nukes: item.nukes,
    color: item.color,
    hasMissiles: item.nukes > 0
  }));
};

export const getHistoricalBudgetData = (selectedCountries: string[]) => {
  const budgetData: any[] = [];
  
  selectedCountries.forEach(country => {
    const countryData = militaryData[country];
    countryData.historicalBudget.forEach(item => {
      budgetData.push({
        year: item.year,
        [country]: item.value,
        [`${country}Color`]: countryData.color
      });
    });
  });
  
  // Group by year
  const groupedByYear: Record<number, any> = {};
  budgetData.forEach(item => {
    if (!groupedByYear[item.year]) {
      groupedByYear[item.year] = { year: item.year };
    }
    Object.keys(item).forEach(key => {
      if (key !== 'year') {
        groupedByYear[item.year][key] = item[key];
      }
    });
  });
  
  return Object.values(groupedByYear);
};

export const getHistoricalNukesData = (selectedCountries: string[]) => {
  const nukesData: any[] = [];
  
  selectedCountries.forEach(country => {
    const countryData = militaryData[country];
    countryData.historicalNukes.forEach(item => {
      nukesData.push({
        year: item.year,
        [country]: item.value,
        [`${country}Color`]: countryData.color
      });
    });
  });
  
  // Group by year
  const groupedByYear: Record<number, any> = {};
  nukesData.forEach(item => {
    if (!groupedByYear[item.year]) {
      groupedByYear[item.year] = { year: item.year };
    }
    Object.keys(item).forEach(key => {
      if (key !== 'year') {
        groupedByYear[item.year][key] = item[key];
      }
    });
  });
  
  return Object.values(groupedByYear);
};

export const getStrengthsAndWeaknesses = (selectedCountries: string[]) => {
  return selectedCountries.map(country => ({
    name: country,
    flag: militaryData[country].flag,
    strengths: militaryData[country].strengths,
    weaknesses: militaryData[country].weaknesses,
    color: militaryData[country].color
  }));
};

export const getProjectionData = (selectedCountries: string[]) => {
  const limitedCountries = selectedCountries.filter(country => 
    ['United States', 'China', 'Russia', 'European Union'].includes(country)
  );
  
  const projectionYears = [2023, 2025, 2030, 2035];
  const projectionData: any[] = [];
  
  projectionYears.forEach(year => {
    const yearData: any = { year };
    
    limitedCountries.forEach(country => {
      const countryData = militaryData[country];
      if (countryData.projections) {
        // Budget projections
        const budgetEntry = countryData.projections.budget.find(item => item.year === year);
        if (budgetEntry) {
          yearData[`${country}Budget`] = budgetEntry.value;
          yearData[`${country}Color`] = countryData.color;
        }
        
        // Personnel projections
        const personnelEntry = countryData.projections.personnel.find(item => item.year === year);
        if (personnelEntry) {
          yearData[`${country}Personnel`] = personnelEntry.value;
        }
        
        // Nukes projections
        const nukesEntry = countryData.projections.nukes.find(item => item.year === year);
        if (nukesEntry) {
          yearData[`${country}Nukes`] = nukesEntry.value;
        }
      }
    });
    
    projectionData.push(yearData);
  });
  
  return projectionData;
};

export const getPlaceholderStoryChips = (): StoryChip[] => {
  return [
    {
      id: 'economic-recession',
      title: 'Global Economic Recession',
      description: 'Major economic downturn impacts military budgets worldwide',
      icon: 'trending-down',
      category: 'economic',
      impact: {
        country: 'United States',
        metric: 'budget',
        effect: 'decrease',
        amount: 15,
        startYear: 2025
      }
    },
    {
      id: 'ai-breakthrough',
      title: 'AI Military Breakthrough',
      description: 'Revolutionary AI systems reduce need for personnel',
      icon: 'cpu',
      category: 'technological',
      impact: {
        country: 'China',
        metric: 'personnel',
        effect: 'decrease',
        amount: 10,
        startYear: 2028
      }
    },
    {
      id: 'regional-conflict',
      title: 'Major Regional Conflict',
      description: 'Conflict requires increased military mobilization',
      icon: 'swords',
      category: 'conflict',
      impact: {
        country: 'Russia',
        metric: 'personnel',
        effect: 'increase',
        amount: 20,
        startYear: 2026
      }
    },
    {
      id: 'arms-treaty',
      title: 'New Strategic Arms Treaty',
      description: 'Major powers agree to reduce nuclear arsenals',
      icon: 'file-text',
      category: 'geopolitical',
      impact: {
        country: 'United States',
        metric: 'nukes',
        effect: 'decrease',
        amount: 25,
        startYear: 2027
      }
    },
    {
      id: 'defense-alliance',
      title: 'European Defense Integration',
      description: 'EU establishes unified military command structure',
      icon: 'shield',
      category: 'geopolitical',
      impact: {
        country: 'European Union',
        metric: 'budget',
        effect: 'increase',
        amount: 30,
        startYear: 2025
      }
    }
  ];
};

export const getEnhancedEquipmentData = () => {
  const result: Record<string, any> = {};
  
  Object.keys(militaryData).forEach(country => {
    const countryData = militaryData[country];
    
    // Document how derived values are calculated
    result[country] = {
      tanks: {
        quantity: countryData.tanks || 0,
        // Estimate growth based on historical budget trends
        growth: getEstimatedGrowth(countryData, 'tanks'),
        // Quality rating based on technology index
        qualityRating: Math.min(10, Math.max(1, Math.round(countryData.techIndex))),
        mainModels: getMainEquipmentModels('tanks', country),
        // Estimate modernization percentage based on tech index
        modernPercentage: Math.min(100, Math.round(countryData.techIndex * 10)),
        // Estimate operational rate based on budget/GDP ratio
        operationalRate: 50 + Math.round(countryData.gdpPercent * 10),
        // Estimate yearly budget allocation
        yearlyBudget: Math.round(countryData.budget * 0.1),
      },
      aircraft: {
        quantity: countryData.aircraft || 0,
        growth: getEstimatedGrowth(countryData, 'aircraft'),
        qualityRating: Math.min(10, Math.max(1, Math.round(countryData.techIndex))),
        mainModels: getMainEquipmentModels('aircraft', country),
        modernPercentage: Math.min(100, Math.round(countryData.techIndex * 10)),
        operationalRate: 55 + Math.round(countryData.gdpPercent * 10),
        yearlyBudget: Math.round(countryData.budget * 0.2),
      },
      ships: {
        quantity: countryData.naval || 0,
        growth: getEstimatedGrowth(countryData, 'ships'),
        qualityRating: Math.min(10, Math.max(1, Math.round(countryData.techIndex))),
        mainModels: getMainEquipmentModels('ships', country),
        modernPercentage: Math.min(100, Math.round(countryData.techIndex * 10)),
        operationalRate: 60 + Math.round(countryData.gdpPercent * 8),
        yearlyBudget: Math.round(countryData.budget * 0.15),
      },
      airDefense: {
        // Air defense systems estimated based on budget and technology
        quantity: Math.round((countryData.budget / 10) * (countryData.techIndex / 8)),
        growth: getEstimatedGrowth(countryData, 'airDefense'),
        qualityRating: Math.min(10, Math.max(1, Math.round(countryData.techIndex))),
        mainModels: getMainEquipmentModels('airDefense', country),
        modernPercentage: Math.min(100, Math.round(countryData.techIndex * 10)),
        operationalRate: 65 + Math.round(countryData.gdpPercent * 7),
        yearlyBudget: Math.round(countryData.budget * 0.07),
      },
      missiles: {
        // Missile count estimated based on nukes and technology
        quantity: Math.round(countryData.nukes * 10) + Math.round(countryData.aircraft * 0.2),
        growth: getEstimatedGrowth(countryData, 'missiles'),
        qualityRating: Math.min(10, Math.max(1, Math.round(countryData.techIndex))),
        mainModels: getMainEquipmentModels('missiles', country),
        modernPercentage: Math.min(100, Math.round(countryData.techIndex * 10)),
        operationalRate: 70 + Math.round(countryData.gdpPercent * 6),
        yearlyBudget: Math.round(countryData.budget * 0.08),
      },
      helicopters: {
        // Helicopter count estimated as a portion of aircraft
        quantity: Math.round(countryData.aircraft / 3),
        growth: getEstimatedGrowth(countryData, 'helicopters'),
        qualityRating: Math.min(10, Math.max(1, Math.round(countryData.techIndex))),
        mainModels: getMainEquipmentModels('helicopters', country),
        modernPercentage: Math.min(100, Math.round(countryData.techIndex * 10)),
        operationalRate: 55 + Math.round(countryData.gdpPercent * 9),
        yearlyBudget: Math.round(countryData.budget * 0.06),
      },
      // Generate historical trend data based on actual historical budget data
      historicalData: generateHistoricalEquipmentData(country),
    };
    
    // Calculate and store global rankings
    calculateEquipmentRankings(result);
  });
  
  return result;
};

function getEstimatedGrowth(countryData: MilitaryData, equipmentType: string): number {
  if (!countryData.historicalBudget || countryData.historicalBudget.length < 2) {
    return 0;
  }
  
  // Calculate average budget growth over last 5 years
  const recentBudgets = countryData.historicalBudget.slice(-5);
  if (recentBudgets.length < 2) return 0;
  
  const oldestBudget = recentBudgets[0].value;
  const latestBudget = recentBudgets[recentBudgets.length - 1].value;
  
  const budgetGrowthRate = ((latestBudget / oldestBudget) - 1) * 100;
  
  // Different equipment types grow at different rates relative to budget
  const growthFactors: Record<string, number> = {
    tanks: 0.6,
    aircraft: 0.8,
    ships: 0.5,
    airDefense: 0.9,
    missiles: 0.7,
    helicopters: 0.6
  };
  
  return parseFloat((budgetGrowthRate * (growthFactors[equipmentType] || 0.7)).toFixed(1));
}

function getMainEquipmentModels(category: string, country: string): string[] {
  const modelsByCategory: Record<string, Record<string, string[]>> = {
    tanks: {
      'United States': ['M1A2 Abrams', 'M1A1 Abrams', 'M2 Bradley'],
      'Russia': ['T-90', 'T-72B3', 'T-80U', 'T-14 Armata'],
      'China': ['Type 99A', 'Type 96', 'Type 15'],
      'European Union': ['Leopard 2A7', 'Challenger 2', 'Leclerc'],
      'default': ['MBT-2000', 'T-72', 'AMX-30']
    },
    aircraft: {
      'United States': ['F-35 Lightning II', 'F-22 Raptor', 'F-15 Eagle', 'F-16 Fighting Falcon'],
      'Russia': ['Su-35', 'Su-57', 'MiG-29', 'Tu-160'],
      'China': ['J-20', 'J-16', 'J-10C', 'H-6K'],
      'European Union': ['Eurofighter Typhoon', 'Rafale', 'Gripen E'],
      'default': ['F-16', 'MiG-29', 'Su-30']
    },
    ships: {
      'United States': ['Nimitz-class Carrier', 'Arleigh Burke-class Destroyer', 'Virginia-class Submarine'],
      'Russia': ['Admiral Kuznetsov', 'Kirov-class Battlecruiser', 'Borei-class Submarine'],
      'China': ['Type 055 Destroyer', 'Type 003 Aircraft Carrier', 'Type 095 Submarine'],
      'European Union': ['Queen Elizabeth-class Carrier', 'FREMM Frigate', 'Type 212 Submarine'],
      'default': ['Frigate', 'Corvette', 'Patrol Vessel']
    },
    airDefense: {
      'United States': ['Patriot PAC-3', 'THAAD', 'Avenger'],
      'Russia': ['S-400 Triumf', 'S-350', 'Pantsir-S1'],
      'China': ['HQ-9', 'HQ-19', 'HQ-16'],
      'European Union': ['SAMP/T', 'IRIS-T SL', 'Skyguard'],
      'default': ['SA-8', 'SA-15', 'Portable SAM']
    },
    missiles: {
      'United States': ['Tomahawk', 'Minuteman III ICBM', 'Trident D5'],
      'Russia': ['Iskander', 'Kalibr', 'RS-28 Sarmat'],
      'China': ['DF-41', 'DF-26', 'YJ-18'],
      'European Union': ['Storm Shadow/SCALP', 'Exocet', 'ASMP'],
      'default': ['Short-range ballistic missile', 'Cruise missile']
    },
    helicopters: {
      'United States': ['AH-64 Apache', 'UH-60 Black Hawk', 'CH-47 Chinook'],
      'Russia': ['Ka-52 Alligator', 'Mi-28 Havoc', 'Mi-24 Hind'],
      'China': ['Z-10', 'Z-19', 'Z-8'],
      'European Union': ['Tiger', 'NH90', 'AW101'],
      'default': ['Mi-17', 'AW109', 'UH-1']
    }
  };
  
  // Get models for this country and category
  const models = modelsByCategory[category]?.[country] || modelsByCategory[category]?.['default'] || ['Generic Model'];
  
  // Return subset of models
  const count = Math.min(3, models.length);
  return models.slice(0, count);
}

function generateHistoricalEquipmentData(country: string) {
  const countryData = militaryData[country];
  if (!countryData.historicalBudget) return [];
  
  const years = countryData.historicalBudget.map(item => item.year);
  const budgetValues = countryData.historicalBudget.map(item => item.value);
  
  return years.map((year, index) => {
    // Get budget for this year
    const yearBudget = budgetValues[index];
    // Calculate budget ratio compared to latest year
    const budgetRatio = yearBudget / countryData.budget;
    
    // Scale equipment counts based on budget ratio
    return {
      year,
      tanks: Math.round(countryData.tanks * budgetRatio * 0.9),
      aircraft: Math.round(countryData.aircraft * budgetRatio * 0.95),
      ships: Math.round(countryData.naval * budgetRatio * 0.97),
      airDefense: Math.round((countryData.budget / 10) * (countryData.techIndex / 8) * budgetRatio * 0.92),
      missiles: Math.round(countryData.nukes * 10 * budgetRatio * 0.93),
      helicopters: Math.round(countryData.aircraft / 3 * budgetRatio * 0.91),
    };
  });
}

function calculateEquipmentRankings(equipmentData: Record<string, any>) {
  const categories = ['tanks', 'aircraft', 'ships', 'airDefense', 'missiles', 'helicopters'];
  
  categories.forEach(category => {
    // Get all countries with this equipment type
    const countriesWithEquipment = Object.keys(equipmentData)
      .filter(country => equipmentData[country][category].quantity > 0);
    
    // Sort by quantity
    const sortedByQuantity = [...countriesWithEquipment]
      .sort((a, b) => equipmentData[b][category].quantity - equipmentData[a][category].quantity);
    
    // Assign ranks
    sortedByQuantity.forEach((country, index) => {
      equipmentData[country][category].globalRank = index + 1;
      
      // Power rating combines quantity and quality
      equipmentData[country][category].powerRating = 
        (equipmentData[country][category].quantity * equipmentData[country][category].qualityRating) / 10;
    });
  });
}

export const equipmentCategories = [
  { 
    id: 'tanks', 
    name: 'Tanks', 
    icon: 'TankIcon',
    color: '#f97316', // Orange (brand color)
    description: 'Main battle tanks and armored fighting vehicles',
    capabilities: [
      'Ground warfare dominance',
      'Infantry support',
      'Territorial control'
    ]
  },
  { 
    id: 'aircraft', 
    name: 'Combat Aircraft', 
    icon: 'PlaneIcon',
    color: '#3b82f6', // Blue
    description: 'Fighter jets, bombers, and support aircraft',
    capabilities: [
      'Air superiority',
      'Strategic bombing',
      'Reconnaissance'
    ]
  },
  { 
    id: 'ships', 
    name: 'Naval Vessels', 
    icon: 'ShipIcon',
    color: '#06b6d4', // Cyan
    description: 'Aircraft carriers, destroyers, submarines, and support vessels',
    capabilities: [
      'Maritime dominance',
      'Power projection',
      'Naval blockade capability'
    ]
  },
  { 
    id: 'airDefense', 
    name: 'Air Defense', 
    icon: 'RadarIcon',
    color: '#8b5cf6', // Purple
    description: 'Surface-to-air missile systems and anti-aircraft installations',
    capabilities: [
      'Airspace denial',
      'Critical infrastructure protection',
      'Counter-stealth capability'
    ]
  },
  { 
    id: 'missiles', 
    name: 'Missile Systems', 
    icon: 'RocketIcon',
    color: '#ef4444', // Red
    description: 'Ballistic missiles, cruise missiles, and tactical missile systems',
    capabilities: [
      'Strategic deterrence',
      'Long-range strike capability',
      'Precision targeting'
    ]
  },
  { 
    id: 'helicopters', 
    name: 'Military Helicopters', 
    icon: 'HelicopterIcon',
    color: '#10b981', // Green
    description: 'Attack helicopters, transport helicopters, and utility rotorcraft',
    capabilities: [
      'Close air support',
      'Rapid deployment',
      'Search and rescue'
    ]
  }
];
