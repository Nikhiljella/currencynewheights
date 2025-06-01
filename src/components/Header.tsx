import React from 'react';
import { PoundSterling, Bell, HelpCircle, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
  currentRoute: string;
  setCurrentRoute: (route: 'dashboard' | 'subscribe' | 'about' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, setCurrentRoute }) => {
  const { isNewHigh, currentHighest } = useAppContext();

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2" onClick={() => setCurrentRoute('dashboard')} style={{ cursor: 'pointer' }}>
            <PoundSterling size={28} className="text-green-400" />
            <div>
              <h1 className="text-xl font-bold">GBP Tracker</h1>
              <p className="text-xs text-blue-200">Real-time updates</p>
            </div>
          </div>

          {isNewHigh && (
            <div className="hidden md:flex items-center px-3 py-1 bg-green-600 rounded-full animate-pulse">
              <Bell size={16} className="mr-2" />
              <span className="text-sm font-semibold">New all-time high: ${currentHighest.toFixed(4)}</span>
            </div>
          )}

          <nav className="flex items-center space-x-1 md:space-x-4">
            <button
              onClick={() => setCurrentRoute('dashboard')}
              className={`px-3 py-2 rounded-md text-sm ${
                currentRoute === 'dashboard' ? 'bg-blue-800 font-medium' : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentRoute('subscribe')}
              className={`px-3 py-2 rounded-md text-sm flex items-center ${
                currentRoute === 'subscribe' ? 'bg-blue-800 font-medium' : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Bell size={16} className="mr-1 hidden md:inline" />
              Subscribe
            </button>
            <button
              onClick={() => setCurrentRoute('about')}
              className={`px-3 py-2 rounded-md text-sm ${
                currentRoute === 'about' ? 'bg-blue-800 font-medium' : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <HelpCircle size={16} className="md:hidden" />
              <span className="hidden md:inline">About</span>
            </button>
            <button
              onClick={() => setCurrentRoute('admin')}
              className={`px-3 py-2 rounded-md text-sm flex items-center ${
                currentRoute === 'admin' ? 'bg-blue-800 font-medium' : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Users size={16} className="mr-1 hidden md:inline" />
              Admin
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;