export interface CurrencyPair {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  change24h: number;
  previousAllTimeHigh: number;
  timestamp: number;
}

// Mock data for demonstration purposes
const mockCurrencyData: CurrencyPair[] = [
  {
    id: 'GBP-USD',
    baseCurrency: 'GBP',
    quoteCurrency: 'USD',
    rate: 1.2743,
    change24h: 0.0023,
    previousAllTimeHigh: 1.2740,
    timestamp: Date.now()
  },
  {
    id: 'GBP-EUR',
    baseCurrency: 'GBP',
    quoteCurrency: 'EUR',
    rate: 1.1684,
    change24h: -0.0015,
    previousAllTimeHigh: 1.1699,
    timestamp: Date.now()
  },
  {
    id: 'GBP-JPY',
    baseCurrency: 'GBP',
    quoteCurrency: 'JPY',
    rate: 192.85,
    change24h: 0.75,
    previousAllTimeHigh: 192.10,
    timestamp: Date.now()
  },
  {
    id: 'GBP-CHF',
    baseCurrency: 'GBP',
    quoteCurrency: 'CHF',
    rate: 1.1543,
    change24h: 0.0012,
    previousAllTimeHigh: 1.1531,
    timestamp: Date.now()
  }
];

// In a real application, this would fetch from an API
export const fetchCurrencyData = async (): Promise<CurrencyPair[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate small changes to the rates to make the UI more dynamic
  return mockCurrencyData.map(pair => {
    const change = (Math.random() - 0.48) * 0.01; // Slightly biased toward positive change
    const newRate = +(pair.rate + change).toFixed(4);
    return {
      ...pair,
      rate: newRate,
      change24h: +(Math.random() * 0.01 - 0.005).toFixed(4),
      timestamp: Date.now()
    };
  });
};

// Get historical data for charts (mock)
export const fetchHistoricalData = async (
  currencyPair: string,
  days: number = 30
): Promise<{ date: string; rate: number }[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const baseRate = mockCurrencyData.find(pair => pair.id === currencyPair)?.rate || 1.27;
  const data: { date: string; rate: number }[] = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate slightly random data with an upward trend
    const randomFactor = 0.995 + Math.random() * 0.02;
    const trendFactor = 1 - (i / days) * 0.05; // Creates a slight upward trend
    
    data.push({
      date: date.toISOString().split('T')[0],
      rate: +(baseRate * randomFactor * trendFactor).toFixed(4)
    });
  }
  
  return data;
};