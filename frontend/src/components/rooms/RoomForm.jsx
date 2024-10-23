
// src/components/rooms/RoomForm.jsx
import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common';
import { ROOM_TYPES } from '../../utils/constants';

const RoomForm = ({ room, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    room_number: room?.room_number || '',
    room_type: room?.room_type || ROOM_TYPES.SINGLE,
    rate: room?.rate || '',
    description: room?.description || ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.room_number || !formData.rate) {
      setError('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">
        {room ? 'Edit Room' : 'Add New Room'}
      </h2>

      {error && <Alert type="error" message={error} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Room Number"
          value={formData.room_number}
          onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Room Type</label>
          <select
            value={formData.room_type}
            onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            {Object.values(ROOM_TYPES).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <Input
          label="Rate per Night"
          type="number"
          min="0"
          step="0.01"
          value={formData.rate}
          onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">
            {room ? 'Update Room' : 'Create Room'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export { RoomList, RoomForm };
