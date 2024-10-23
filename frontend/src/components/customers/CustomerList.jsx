// src/components/customers/CustomerList.jsx
import React from 'react';
import { Card, Table, Button, Input } from '../common';
import { Plus, Search, Filter } from 'lucide-react';

const CustomerList = ({ 
  customers, 
  onAddCustomer, 
  onEditCustomer, 
  onViewCustomer,
  onSearch,
  searchQuery,
  loading
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Customers</h2>
        <Button onClick={onAddCustomer}>
          <Plus className="h-5 w-5 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            icon={Search}
            className="w-full"
          />
        </div>
        <Button variant="secondary">
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </Button>
      </div>

      <Table
        columns={[
          { 
            header: 'Name', 
            accessor: 'name',
            render: (row) => (
              <div>
                <div className="font-medium">{`${row.first_name} ${row.last_name}`}</div>
                <div className="text-sm text-gray-500">{row.email}</div>
              </div>
            )
          },
          { 
            header: 'Contact', 
            accessor: 'contact',
            render: (row) => (
              <div>
                <div>{row.phone}</div>
                <div className="text-sm text-gray-500">{row.address}</div>
              </div>
            )
          },
          { 
            header: 'Total Stays', 
            accessor: 'total_stays',
            render: (row) => (
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {row.total_stays || 0}
                </span>
              </div>
            )
          },
          { 
            header: 'Total Spent', 
            accessor: 'total_spent',
            render: (row) => (
              <div className="text-right">
                ${row.total_spent?.toFixed(2) || '0.00'}
              </div>
            )
          },
          { 
            header: 'Last Stay', 
            accessor: 'last_stay',
            render: (row) => (
              <div>
                {row.last_stay ? new Date(row.last_stay).toLocaleDateString() : 'Never'}
              </div>
            )
          },
          {
            header: 'Actions',
            render: (row) => (
              <div className="flex space-x-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onViewCustomer(row)}
                >
                  View
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onEditCustomer(row)}
                >
                  Edit
                </Button>
              </div>
            )
          }
        ]}
        data={customers}
        loading={loading}
      />
    </Card>
  );
};
