// src/services/settings.service.js
import { getHeaders, handleResponse } from './api';

const SETTINGS_URL = `${import.meta.env.VITE_API_URL}/settings`;

export const settingsService = {
  async getSettings() {
    const response = await fetch(SETTINGS_URL, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  async updateSettings(section, data) {
    const response = await fetch(`${SETTINGS_URL}/${section}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async testEmailSettings(emailSettings) {
    const response = await fetch(`${SETTINGS_URL}/email/test`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(emailSettings)
    });
    return handleResponse(response);
  },

  async testSMSSettings(smsSettings) {
    const response = await fetch(`${SETTINGS_URL}/sms/test`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(smsSettings)
    });
    return handleResponse(response);
  }
};