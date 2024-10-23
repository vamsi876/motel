
// backend/src/models/reservation.model.js
const db = require('../config/database');

class Reservation {
    static async create(reservationData) {
        const [result] = await db.execute(
            `INSERT INTO reservations 
            (room_id, customer_id, check_in, check_out, total_amount, status, payment_status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                reservationData.room_id,
                reservationData.customer_id,
                reservationData.check_in,
                reservationData.check_out,
                reservationData.total_amount,
                'Confirmed',
                'Pending'
            ]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.execute(
            `SELECT r.*, c.first_name, c.last_name, rm.room_number 
            FROM reservations r 
            JOIN customers c ON r.customer_id = c.id 
            JOIN rooms rm ON r.room_id = rm.id 
            WHERE r.id = ?`,
            [id]
        );
        return rows[0];
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            'UPDATE reservations SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows > 0;
    }

    static async getActiveReservations(motelId) {
        const [rows] = await db.execute(
            `SELECT r.*, c.first_name, c.last_name, rm.room_number 
            FROM reservations r 
            JOIN customers c ON r.customer_id = c.id 
            JOIN rooms rm ON r.room_id = rm.id 
            WHERE rm.motel_id = ? AND r.status IN ('Confirmed', 'Checked-in')`,
            [motelId]
        );
        return rows;
    }
}

module.exports = Reservation;
