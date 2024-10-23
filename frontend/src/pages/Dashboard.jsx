// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { StatCard, RecentBookings } from '../components/dashboard';
import { Alert } from '../components/common';
import { Home, Users, Calendar, DollarSign, Bed, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    todayCheckIns: 0,
    revenue: 0,
    totalGuests: 0,
    occupancyRate: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // API calls would go here
      setStats({
        totalRooms: 50,
        occupiedRooms: 35,
        todayCheckIns: 8,
        revenue: 15000,
        totalGuests: 42,
        occupancyRate: 70
      });
      setRecentBookings([
        {
          id: 1,
          guest_name: 'John Doe',
          room_number: '101',
          check_in: '2024-03-01',
          status: 'Confirmed'
        }
      ]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon={Home}
          color="text-blue-600"
        />
        <StatCard
          title="Occupied Rooms"
          value={stats.occupiedRooms}
          icon={Bed}
          color="text-green-600"
        />
        <StatCard
          title="Today's Check-ins"
          value={stats.todayCheckIns}
          icon={Calendar}
          color="text-purple-600"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          color="text-yellow-600"
        />
        <StatCard
          title="Total Guests"
          value={stats.totalGuests}
          icon={Users}
          color="text-indigo-600"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          icon={TrendingUp}
          color="text-red-600"
        />
      </div>

      <RecentBookings bookings={recentBookings} />
    </div>
  );
};

export default Dashboard;