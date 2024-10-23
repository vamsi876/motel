
// src/components/customers/CustomerDetails.jsx
import React from 'react';
import { Card, Button } from '../common';
import { 
  User, Phone, Mail, MapPin, Calendar, 
  DollarSign, Clock, Edit, ArrowLeft 
} from 'lucide-react';

const CustomerDetails = ({ customer, onEdit, onBack, onNewReservation }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="secondary" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Customer Details</h2>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={onEdit}>
            <Edit className="h-5 w-5 mr-2" />
            Edit
          </Button>
          <Button onClick={onNewReservation}>
            <Calendar className="h-5 w-5 mr-2" />
            New Reservation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-3" />
                <span>{`${customer.first_name} ${customer.last_name}`}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-3" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-3" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3" />
                <span>
                  {customer.address}
                  {customer.city && `, ${customer.city}`}
                  {customer.state && `, ${customer.state}`}
                  {customer.zip_code && ` ${customer.zip_code}`}
                </span>
              </div>
            </div>
          </div>

          {customer.notes && (
            <div>
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <p className="text-gray-600">{customer.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-sm">Total Stays</span>
                </div>
                <span className="text-2xl font-semibold">
                  {customer.total_stays || 0}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span className="text-sm">Total Spent</span>
                </div>
                <span className="text-2xl font-semibold">
                  ${customer.total_spent?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">Last Stay</span>
                </div>
                <span className="text-xl font-semibold">
                  {customer.last_stay 
                    ? new Date(customer.last_stay).toLocaleDateString() 
                    : 'Never'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Recent Reservations</h3>
            {customer.recent_reservations?.length > 0 ? (
              <div className="space-y-3">
                {customer.recent_reservations.map(reservation => (
                  <div 
                    key={reservation.id} 
                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">Room {reservation.room_number}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(reservation.check_in).toLocaleDateString()} - 
                        {new Date(reservation.check_out).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${reservation.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'}`}>
                        {reservation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-4">
                No recent reservations
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export { CustomerList, CustomerForm, CustomerDetails };
