// src/utils/settingsValidation.js
export const validateSettings = {
    general: (settings) => {
      const errors = {};
      
      if (!settings.motelName?.trim()) {
        errors.motelName = 'Motel name is required';
      }
      
      if (!settings.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(settings.email)) {
        errors.email = 'Invalid email format';
      }
      
      if (!settings.phone?.trim()) {
        errors.phone = 'Phone number is required';
      }
      
      if (!settings.address?.trim()) {
        errors.address = 'Address is required';
      }
      
      return errors;
    },
  
    email: (settings) => {
      const errors = {};
      
      if (!settings.smtpHost?.trim()) {
        errors.smtpHost = 'SMTP host is required';
      }
      
      if (!settings.smtpPort) {
        errors.smtpPort = 'SMTP port is required';
      } else if (isNaN(settings.smtpPort)) {
        errors.smtpPort = 'Port must be a number';
      }
      
      if (!settings.smtpUser?.trim()) {
        errors.smtpUser = 'SMTP username is required';
      }
      
      if (!settings.senderEmail) {
        errors.senderEmail = 'Sender email is required';
      } else if (!/\S+@\S+\.\S+/.test(settings.senderEmail)) {
        errors.senderEmail = 'Invalid sender email format';
      }
      
      return errors;
    },
  
    payment: (settings) => {
      const errors = {};
      
      if (settings.acceptCard && !settings.stripeKey?.trim()) {
        errors.stripeKey = 'Stripe key is required when card payments are enabled';
      }
      
      if (settings.acceptPaypal && !settings.paypalEmail?.trim()) {
        errors.paypalEmail = 'PayPal email is required when PayPal is enabled';
      }
      
      return errors;
    }
  };