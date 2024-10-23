// src/components/layout/Header.jsx
import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="ml-3 relative">
              <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;