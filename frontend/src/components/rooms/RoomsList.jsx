// src/components/rooms/RoomList.jsx
import React from 'react';
import { Card, Table, Button, Alert } from '../common';
import { Plus } from 'lucide-react';

const RoomList = ({ rooms, onAddRoom, onEditRoom }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Rooms</h2>
        <Button onClick={onAddRoom}>
          <Plus className="h-5 w-5 mr-2" />
          Add Room
        </Button>
      </div>

      <Table
        columns={[
          { header: 'Room Number', accessor: 'room_number' },
          { header: 'Type', accessor: 'room_type' },
          { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${row.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  row.status === 'Occupied' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {row.status}
              </span>
            )
          },
          { 
            header: 'Rate', 
            accessor: 'rate',
            render: (row) => `$${row.rate.toFixed(2)}`
          },
          {
            header: 'Actions',
            render: (row) => (
              <div className="flex space-x-2">
                <Button 
                  variant="secondary" 
                  className="text-sm"
                  onClick={() => onEditRoom(row)}
                >
                  Edit
                </Button>
              </div>
            )
          }
        ]}
        data={rooms}
      />
    </Card>
  );
};