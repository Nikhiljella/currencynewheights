import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} GBP Tracker. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Data refreshes every minute. Not financial advice.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            GBP Tracker is not affiliated with any financial institution. 
            Exchange rates may vary from official sources.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;