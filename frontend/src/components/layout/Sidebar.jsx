// src/components/layout/Sidebar.jsx
import React from 'react';
import { Home, Calendar, Users, Settings, LogOut, Hotel } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Hotel, label: 'Rooms', path: '/rooms' },
    { icon: Calendar, label: 'Reservations', path: '/reservations' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Motel Manager</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {}} // Will be implemented with navigation
            className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;