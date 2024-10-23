// src/pages/Rooms.jsx
import React, { useState, useEffect } from 'react';
import { RoomList, RoomForm } from '../components/rooms';
import { Alert } from '../components/common';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      // API call would go here
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (roomData) => {
    try {
      // API call would go here
      await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
      
      setShowForm(false);
      fetchRooms();
    } catch (err) {
      setError('Failed to create room');
    }
  };

  const handleEditRoom = async (roomData) => {
    try {
      // API call would go here
      await fetch(`/api/rooms/${roomData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
      
      setShowForm(false);
      setSelectedRoom(null);
      fetchRooms();
    } catch (err) {
      setError('Failed to update room');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Room Management</h1>
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      {showForm ? (
        <RoomForm
          room={selectedRoom}
          onSubmit={selectedRoom ? handleEditRoom : handleAddRoom}
          onCancel={() => {
            setShowForm(false);
            setSelectedRoom(null);
          }}
        />
      ) : (
        <RoomList
          rooms={rooms}
          onAddRoom={() => setShowForm(true)}
          onEditRoom={(room) => {
            setSelectedRoom(room);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
};

export default Rooms;