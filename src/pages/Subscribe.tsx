import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Bell, CheckCircle, AlertCircle, X } from 'lucide-react';

const Subscribe: React.FC = () => {
  const { user, subscribeUser, unsubscribeUser, currentHighest } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number (simple validation for demo)
    if (!phoneNumber || phoneNumber.length < 10) {
      setFormError('Please enter a valid phone number');
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');
    
    // Simulate API call delay
    setTimeout(() => {
      subscribeUser(phoneNumber);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  const handleUnsubscribe = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      unsubscribeUser();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">WhatsApp Notifications</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Get instant alerts on your phone whenever the British Pound reaches a new all-time high against major currencies.
        </p>
      </div>
      
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start mb-8 animate-fade-in">
          <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
          <div className="flex-grow">
            <h3 className="text-green-800 font-medium">Successfully Subscribed!</h3>
            <p className="text-green-700 text-sm mt-1">
              You'll receive WhatsApp notifications when the pound reaches new highs.
            </p>
          </div>
          <button 
            onClick={() => setShowSuccess(false)} 
            className="text-green-500 hover:text-green-700"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-900 px-6 py-4 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <Bell className="mr-2" size={20} />
            {user?.subscribed ? 'Manage Your Subscription' : 'Subscribe to Alerts'}
          </h2>
        </div>
        
        <div className="p-6">
          {!user?.subscribed ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">+</span>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className={`block w-full pl-7 pr-12 py-3 border ${
                      formError ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                {formError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formError}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Include country code. Example: 1XXXXXXXXXX for US numbers.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-md p-4 mb-6">
                <h3 className="text-sm font-medium text-blue-800 mb-2">How it works:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-600 text-xs mr-2 mt-0.5">1</span>
                    Enter your WhatsApp phone number with country code
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-600 text-xs mr-2 mt-0.5">2</span>
                    You'll receive a confirmation message on WhatsApp
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-600 text-xs mr-2 mt-0.5">3</span>
                    Get instant alerts when GBP hits new all-time highs
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to receive WhatsApp notifications about GBP exchange rates
                </label>
              </div>
              
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Processing...
                  </>
                ) : (
                  'Subscribe to Alerts'
                )}
              </button>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-center bg-green-50 rounded-md p-4 mb-6">
                <CheckCircle className="text-green-500 mr-2" size={20} />
                <span className="text-green-800 font-medium">
                  Your subscription is active
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Subscription Details:</h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Phone Number:</span>
                    <span className="font-medium">+{user.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Current GBP/USD:</span>
                    <span className="font-medium">${currentHighest.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Notification Threshold:</span>
                    <span className="font-medium">${user.notificationThreshold.toFixed(4)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleUnsubscribe}
                  className={`w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500 mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Unsubscribe from Alerts'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-medium text-blue-900 mb-3">Privacy Information</h3>
        <p className="text-blue-800 text-sm mb-4">
          We take your privacy seriously. Here's how we handle your data:
        </p>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            Your phone number is used only for sending GBP exchange rate alerts
          </li>
          <li className="flex items-start">
            <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            We never share your contact information with third parties
          </li>
          <li className="flex items-start">
            <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            You can unsubscribe at any time with a single click
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Subscribe;