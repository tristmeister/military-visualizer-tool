
export type MilitaryData = {
  color: string;
  flag: string;
  personnel: number;
  reserve: number;
  budget: number; // in billions USD
  aircraft: number;
  tanks: number;
  naval: number;
  nukes: number;
  bases: number;
  techIndex: number;
};

export type CountryData = Record<string, MilitaryData>;

export const militaryData: CountryData = {
  'United States': {
    color: '#003f5c',
    flag: '🇺🇸',
    personnel: 1400000,
    reserve: 800000,
    budget: 800.7,
    aircraft: 13247,
    tanks: 5500,
    naval: 490,
    nukes: 5550,
    bases: 750,
    techIndex: 10
  },
  'China': {
    color: '#bc5090',
    flag: '🇨🇳',
    personnel: 2035000,
    reserve: 510000,
    budget: 229.0,
    aircraft: 3260,
    tanks: 5800,
    naval: 777,
    nukes: 350,
    bases: 12,
    techIndex: 7
  },
  'Russia': {
    color: '#ff6361',
    flag: '🇷🇺',
    personnel: 900000,
    reserve: 2000000,
    budget: 61.7,
    aircraft: 4173,
    tanks: 12420,
    naval: 605,
    nukes: 6257,
    bases: 21,
    techIndex: 7.5
  },
  'United Kingdom': {
    color: '#58508d',
    flag: '🇬🇧',
    personnel: 150000,
    reserve: 80000,
    budget: 68.4,
    aircraft: 733,
    tanks: 227,
    naval: 75,
    nukes: 225,
    bases: 145,
    techIndex: 9
  },
  'France': {
    color: '#ffa600',
    flag: '🇫🇷',
    personnel: 205000,
    reserve: 35000,
    budget: 55.0,
    aircraft: 1055,
    tanks: 406,
    naval: 180,
    nukes: 290,
    bases: 11,
    techIndex: 8.5
  },
  'Germany': {
    color: '#5a5a5a',
    flag: '🇩🇪',
    personnel: 184000,
    reserve: 30000,
    budget: 56.0,
    aircraft: 625,
    tanks: 266,
    naval: 80,
    nukes: 0,
    bases: 0,
    techIndex: 8
  },
  'Japan': {
    color: '#d3d3d3',
    flag: '🇯🇵',
    personnel: 247000,
    reserve: 56000,
    budget: 49.1,
    aircraft: 1480,
    tanks: 1004,
    naval: 155,
    nukes: 0,
    bases: 0,
    techIndex: 9
  },
  'India': {
    color: '#ff9900',
    flag: '🇮🇳',
    personnel: 1445000,
    reserve: 1155000,
    budget: 64.0,
    aircraft: 2123,
    tanks: 4614,
    naval: 295,
    nukes: 150,
    bases: 7,
    techIndex: 6
  }
};

export type StatCategory = 'overview' | 'personnel' | 'budget' | 'equipment' | 'nuclear';

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
  return selectedCountries.map(country => {
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
    color: item.color
  }));
};

export const getPersonnelData = (selectedCountries: string[]) => {
  return getFilteredData(selectedCountries).map(item => ({
    name: item.name,
    flag: item.flag,
    active: item.personnel,
    reserve: item.reserve,
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
