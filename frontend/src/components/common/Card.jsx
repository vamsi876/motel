// frontend/src/components/common/Card.jsx
import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};