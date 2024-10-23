
// src/components/dashboard/RecentBookings.jsx
const RecentBookings = ({ bookings }) => {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
        <Table
          columns={[
            { header: 'Guest', accessor: 'guest_name' },
            { header: 'Room', accessor: 'room_number' },
            { 
              header: 'Check In', 
              accessor: 'check_in',
              render: (row) => new Date(row.check_in).toLocaleDateString()
            },
            { 
              header: 'Status', 
              accessor: 'status',
              render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${row.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {row.status}
                </span>
              )
            }
          ]}
          data={bookings}
        />
      </Card>
    );
  };
  
  export { StatCard, RecentBookings };