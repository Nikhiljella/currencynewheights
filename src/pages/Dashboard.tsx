import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchHistoricalData } from '../services/currencyService';
import { ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';
import CurrencyCard from '../components/CurrencyCard';
import CurrencyChart from '../components/CurrencyChart';

const Dashboard: React.FC = () => {
  const { currencyData, loading, error, isNewHigh, currentHighest } = useAppContext();
  const [selectedCurrency, setSelectedCurrency] = useState('GBP-USD');
  const [chartData, setChartData] = useState<{ date: string; rate: number }[]>([]);
  const [chartLoading, setChartLoading] = useState(false);
  
  useEffect(() => {
    const loadChartData = async () => {
      setChartLoading(true);
      try {
        const data = await fetchHistoricalData(selectedCurrency);
        setChartData(data);
      } catch (err) {
        console.error('Failed to load chart data', err);
      } finally {
        setChartLoading(false);
      }
    };
    
    loadChartData();
  }, [selectedCurrency]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
        <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
        <div>
          <h3 className="text-red-800 font-medium">Error loading data</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isNewHigh && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center animate-pulse">
          <div className="bg-green-100 rounded-full p-2 mr-4">
            <ArrowUpRight className="text-green-600\" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">New All-Time High!</h3>
            <p className="text-green-700">
              GBP/USD has reached ${currentHighest.toFixed(4)}, breaking the previous record!
            </p>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">GBP Exchange Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currencyData.map(currency => (
            <CurrencyCard 
              key={currency.id}
              currency={currency}
              isSelected={selectedCurrency === currency.id}
              onClick={() => setSelectedCurrency(currency.id)}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {selectedCurrency.replace('-', '/')} Historical Performance
          </h3>
          <div className="flex space-x-2 mt-3 md:mt-0">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md font-medium">30 Days</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">90 Days</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">1 Year</button>
          </div>
        </div>
        
        {chartLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <CurrencyChart data={chartData} currencyPair={selectedCurrency} />
        )}
      </section>
      
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-4">
          Get instant WhatsApp notifications when the pound reaches new all-time highs.
          Never miss an opportunity to make informed decisions.
        </p>
        <button 
          onClick={() => window.location.href = '#subscribe'}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
        >
          Subscribe to Alerts
          <ArrowUpRight size={18} className="ml-2" />
        </button>
      </section>
    </div>
  );
};

export default Dashboard;