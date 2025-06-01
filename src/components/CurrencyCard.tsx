import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CurrencyPair } from '../services/currencyService';

interface CurrencyCardProps {
  currency: CurrencyPair;
  isSelected: boolean;
  onClick: () => void;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currency, isSelected, onClick }) => {
  const isPositive = currency.rate > currency.previousAllTimeHigh;
  const isNegative = currency.change24h < 0;
  
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
        hover:shadow-md hover:translate-y-[-2px]
        ${isSelected ? 'border-blue-500' : 'border-transparent'}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">
          {currency.baseCurrency}/{currency.quoteCurrency}
        </h3>
        {isPositive && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            ATH
          </span>
        )}
      </div>

      <div className="flex items-baseline">
        <span className="text-2xl font-bold">
          {currency.quoteCurrency === 'JPY' ? '' : '$'}
          {currency.rate.toFixed(currency.quoteCurrency === 'JPY' ? 2 : 4)}
        </span>
        <span className="text-gray-500 text-sm ml-1">
          {currency.quoteCurrency}
        </span>
      </div>
      
      <div className={`flex items-center mt-2 ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
        {isNegative ? (
          <ArrowDownRight size={16} className="mr-1" />
        ) : (
          <ArrowUpRight size={16} className="mr-1" />
        )}
        <span className="text-sm font-medium">
          {isNegative ? '' : '+'}
          {currency.change24h.toFixed(4)} ({(currency.change24h / (currency.rate - currency.change24h) * 100).toFixed(2)}%)
        </span>
      </div>
      
      <div className="text-xs text-gray-500 mt-3">
        Updated {new Date(currency.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default CurrencyCard;