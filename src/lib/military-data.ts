
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
};

export type CountryData = Record<string, MilitaryData>;

export type StatCategory = 'overview' | 'personnel' | 'budget' | 'equipment' | 'nuclear' | 'historical';

export const militaryData: CountryData = {
  'United States': {
    color: '#003f5c',
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
    ]
  },
  'China': {
    color: '#bc5090',
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
    ]
  },
  'Russia': {
    color: '#ff6361',
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
    ]
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
