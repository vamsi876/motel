// frontend/src/components/common/Alert.jsx
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export const Alert = ({ type = 'info', message, className = '' }) => {
  const types = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: XCircle
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: AlertCircle
    }
  };

  const { bg, text, border, icon: Icon } = types[type];

  return (
    <div className={`${bg} ${text} ${border} border rounded-md p-4 ${className}`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        <span>{message}</span>
      </div>
    </div>
  );
};
