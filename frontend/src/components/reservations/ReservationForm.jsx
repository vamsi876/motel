// src/components/reservations/ReservationForm.jsx
import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common';
import { Calendar } from 'lucide-react';

const ReservationForm = ({ onSubmit, rooms, customers }) => {
  const [formData, setFormData] = useState({
    room_id: '',
    customer_id: '',
    check_in: '',
    check_out: '',
    adults: 1,
    children: 0,
    special_requests: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.room_id || !formData.customer_id || !formData.check_in || !formData.check_out) {
      setError('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">New Reservation</h2>
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={formData.room_id}
            onChange={(e) => setFormData({ ...formData, room_id: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                Room {room.room_number} - {room.room_type}
              </option>
            ))}
          </select>

          <select
            value={formData.customer_id}
            onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Check In"
            value={formData.check_in}
            onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
            icon={Calendar}
          />

          <Input
            type="date"
            label="Check Out"
            value={formData.check_out}
            onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
            icon={Calendar}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Adults"
            value={formData.adults}
            min="1"
            onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
          />

          <Input
            type="number"
            label="Children"
            value={formData.children}
            min="0"
            onChange={(e) => setFormData({ ...formData, children: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Special Requests</label>
          <textarea
            value={formData.special_requests}
            onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="submit">Create Reservation</Button>
        </div>
      </form>
    </Card>
  );
};

export { ReservationForm };
