import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCurrencyData, CurrencyPair } from '../services/currencyService';
import { sendWhatsAppNotification } from '../services/whatsappService';

interface User {
  phoneNumber: string;
  subscribed: boolean;
  notificationThreshold: number;
}

interface AppContextType {
  currencyData: CurrencyPair[];
  loading: boolean;
  error: string | null;
  user: User | null;
  subscribeUser: (phoneNumber: string) => void;
  unsubscribeUser: () => void;
  updateNotificationThreshold: (threshold: number) => void;
  currentHighest: number;
  isNewHigh: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currencyData, setCurrencyData] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentHighest, setCurrentHighest] = useState<number>(0);
  const [isNewHigh, setIsNewHigh] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrencyData();
        setCurrencyData(data);
        
        // Check for new high
        const gbpUsdRate = data.find(pair => pair.baseCurrency === 'GBP' && pair.quoteCurrency === 'USD')?.rate || 0;
        if (gbpUsdRate > currentHighest) {
          setCurrentHighest(gbpUsdRate);
          setIsNewHigh(true);
          // If user is subscribed, send WhatsApp notification
          if (user?.subscribed && gbpUsdRate >= (user?.notificationThreshold || 0)) {
            const message = `🚀 New All-Time High Alert!\n\nGBP/USD has reached $${gbpUsdRate.toFixed(4)}, breaking the previous record!\n\nTrack more at: ${window.location.origin}`;
            await sendWhatsAppNotification(user.phoneNumber, message);
          }
        } else {
          setIsNewHigh(false);
        }
      } catch (err) {
        setError('Failed to fetch currency data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh data every minute
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [currentHighest, user]);

  const subscribeUser = (phoneNumber: string) => {
    setUser({
      phoneNumber,
      subscribed: true,
      notificationThreshold: currentHighest
    });
  };

  const unsubscribeUser = () => {
    setUser(prev => prev ? { ...prev, subscribed: false } : null);
  };

  const updateNotificationThreshold = (threshold: number) => {
    setUser(prev => prev ? { ...prev, notificationThreshold: threshold } : null);
  };

  return (
    <AppContext.Provider
      value={{
        currencyData,
        loading,
        error,
        user,
        subscribeUser,
        unsubscribeUser,
        updateNotificationThreshold,
        currentHighest,
        isNewHigh
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};