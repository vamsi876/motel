// frontend/src/services/auth.service.js
import { getHeaders, handleResponse } from './api';

const AUTH_URL = `${API_URL}/auth`;

export const authService = {
  async login(email, password) {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(userData) {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

