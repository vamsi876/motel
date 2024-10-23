// src/pages/Customers.jsx
import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Alert } from '../components/common';
import { formatDate } from '../utils/formatters';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // API call would go here
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = (customerId) => {
    // Navigate to customer details or show modal
    setSelectedCustomer(customerId);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">All Customers</h2>
          <Button onClick={() => setSelectedCustomer('new')}>Add Customer</Button>
        </div>
        <Table
          columns={[
            { 
              header: 'Name', 
              accessor: 'name',
              render: (row) => `${row.first_name} ${row.last_name}`
            },
            { header: 'Email', accessor: 'email' },
            { header: 'Phone', accessor: 'phone' },
            { 
              header: 'Last Stay', 
              accessor: 'last_stay',
              render: (row) => row.last_stay ? formatDate(row.last_stay) : 'Never'
            },
            { header: 'Total Stays', accessor: 'total_stays' },
            {
              header: 'Actions',
              render: (row) => (
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewCustomer(row.id)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewCustomer(row.id)}
                  >
                    Edit
                  </Button>
                </div>
              )
            }
          ]}
          data={customers}
        />
      </Card>
    </div>
  );
};

export default Customers;