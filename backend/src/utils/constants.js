// backend/src/utils/constants.js
module.exports = {
    ROOM_STATUS: {
        AVAILABLE: 'Available',
        OCCUPIED: 'Occupied',
        MAINTENANCE: 'Maintenance'
    },

    RESERVATION_STATUS: {
        CONFIRMED: 'Confirmed',
        CHECKED_IN: 'Checked-in',
        CHECKED_OUT: 'Checked-out',
        CANCELLED: 'Cancelled'
    },

    PAYMENT_STATUS: {
        PENDING: 'Pending',
        PAID: 'Paid',
        REFUNDED: 'Refunded'
    },

    ROOM_TYPES: {
        SINGLE: 'Single',
        DOUBLE: 'Double',
        SUITE: 'Suite'
    },

    USER_ROLES: {
        ADMIN: 'admin',
        MANAGER: 'manager',
        STAFF: 'staff'
    },

    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
        MAX_LIMIT: 100
    },

    TIME: {
        CHECK_IN_TIME: '14:00',  // 2 PM
        CHECK_OUT_TIME: '11:00', // 11 AM
        CANCELLATION_DEADLINE_HOURS: 24,
    }
};