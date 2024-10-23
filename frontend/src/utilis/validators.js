// src/utils/validators.js
export const validators = {
    email: (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    
    password: (password) => {
      return password.length >= 6;
    },
  
    required: (value) => {
      return value !== null && value !== undefined && value !== '';
    }
  };
  