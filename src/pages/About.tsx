import React from 'react';
import { DollarSign, AlertCircle, MessageCircle, Clock, Globe, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About GBP Tracker</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          The ultimate tool for tracking the British Pound and receiving instant notifications when it reaches new heights.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We created GBP Tracker to help individuals and businesses stay informed about 
            significant movements in the British Pound exchange rates. By providing real-time 
            updates and instant notifications, we enable our users to make timely and informed 
            decisions regarding their finances, investments, and international transactions.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <DollarSign size={20} className="text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">Real-time Tracking</h3>
              </div>
              <p className="text-sm text-gray-600">
                We monitor GBP exchange rates against major currencies 24/7, updating every minute 
                to provide you with the most current information.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <AlertCircle size={20} className="text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">All-Time High Detection</h3>
              </div>
              <p className="text-sm text-gray-600">
                Our algorithms automatically detect when the pound reaches a new all-time high 
                against any of the tracked currencies.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <MessageCircle size={20} className="text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">WhatsApp Notifications</h3>
              </div>
              <p className="text-sm text-gray-600">
                Once a new high is detected, we instantly send a WhatsApp message to all subscribed 
                users with the details of the new record.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">Historical Analysis</h3>
              </div>
              <p className="text-sm text-gray-600">
                View historical data and trends to understand the pound's performance over time
                and make more informed decisions.
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                <Shield size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Privacy-Focused</h4>
                <p className="text-sm text-gray-600">
                  We only collect the minimum information needed to provide our service, and we never share your data with third parties.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                <Globe size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Global Coverage</h4>
                <p className="text-sm text-gray-600">
                  We track GBP against all major world currencies, providing comprehensive coverage for users worldwide.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                <Clock size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Always Up-to-Date</h4>
                <p className="text-sm text-gray-600">
                  Our minute-by-minute updates ensure you're always getting the latest information about the pound's performance.
                </p>
              </div>
            </li>
          </ul>
          
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-3">Disclaimer</h3>
            <p className="text-sm text-blue-700">
              The information provided by GBP Tracker is for informational purposes only and should 
              not be considered financial advice. Exchange rates may vary slightly from official sources. 
              Always consult with a qualified financial advisor before making important financial decisions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions, feedback, or need support? We'd love to hear from you!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="block bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800 mb-1">Email Support</h3>
              <p className="text-sm text-blue-600">support@gbptracker.com</p>
            </a>
            
            <a href="#" className="block bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800 mb-1">Twitter</h3>
              <p className="text-sm text-blue-600">@GBPTracker</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;