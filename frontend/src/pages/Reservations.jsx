// src/pages/Reservations.jsx
import React, { useState, useEffect } from 'react';
import { ReservationForm } from '../components/reservations';
import { Card, Table, Button, Alert } from '../components/common';
import { formatDate } from '../utils/formatters';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchReservations();
    fetchRooms();
    fetchCustomers();
  }, []);

  const fetchReservations = async () => {
    try {
      // API call would go here
      const response = await fetch('/api/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      // API call would go here
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError('Failed to load rooms');
    }
  };

  const fetchCustomers = async () => {
    try {
      // API call would go here
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError('Failed to load customers');
    }
  };

  const handleCreateReservation = async (reservationData) => {
    try {
      // API call would go here
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      
      setShowForm(false);
      fetchReservations();
    } catch (err) {
      setError('Failed to create reservation');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reservations</h1>
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      {showForm ? (
        <ReservationForm
          onSubmit={handleCreateReservation}
          onCancel={() => setShowForm(false)}
          rooms={rooms}
          customers={customers}
        />
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">All Reservations</h2>
            <Button onClick={() => setShowForm(true)}>New Reservation</Button>
          </div>
          <Table
            columns={[
              { header: 'Guest', accessor: 'guest_name' },
              { header: 'Room', accessor: 'room_number' },
              { 
                header: 'Check In', 
                accessor: 'check_in',
                render: (row) => formatDate(row.check_in)
              },
              { 
                header: 'Check Out', 
                accessor: 'check_out',
                render: (row) => formatDate(row.check_out)
              },
              { 
                header: 'Status', 
                accessor: 'status',
                render: (row) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${row.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      row.status === 'Checked-in' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {row.status}
                  </span>
                )
              },
              {
                header: 'Actions',
                render: (row) => (
                  <div className="flex space-x-2">
                    <Button 
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewReservation(row.id)}
                    >
                      View
                    </Button>
                  </div>
                )
              }
            ]}
            data={reservations}
          />
        </Card>
      )}
    </div>
  );
};

export default Reservations;