// src/components/dashboard/StatCard.jsx
import React from 'react';
import { Card } from '../common';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </Card>
  );
};