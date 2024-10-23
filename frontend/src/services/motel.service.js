
// frontend/src/services/motel.service.js
import { getHeaders, handleResponse } from './api';

const MOTEL_URL = `${API_URL}/motels`;

export const motelService = {
  async getAll() {
    const response = await fetch(MOTEL_URL, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  async getById(id) {
    const response = await fetch(`${MOTEL_URL}/${id}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  async create(motelData) {
    const response = await fetch(MOTEL_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(motelData)
    });
    return handleResponse(response);
  },

  async update(id, motelData) {
    const response = await fetch(`${MOTEL_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(motelData)
    });
    return handleResponse(response);
  }
};
