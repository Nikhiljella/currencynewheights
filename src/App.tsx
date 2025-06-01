import React from 'react';
import { Router } from './components/Router';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Router />
      </div>
    </AppProvider>
  );
}

export default App;