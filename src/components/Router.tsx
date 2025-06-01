import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Dashboard from '../pages/Dashboard';
import Subscribe from '../pages/Subscribe';
import About from '../pages/About';

type Route = 'dashboard' | 'subscribe' | 'about';

export const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');

  const renderRoute = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'subscribe':
        return <Subscribe />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderRoute()}
      </main>
      <Footer />
    </div>
  );
};