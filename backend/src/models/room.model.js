
// backend/src/models/room.model.js
const db = require('../config/database');

class Room {
    static async create(roomData) {
        const [result] = await db.execute(
            'INSERT INTO rooms (motel_id, room_number, room_type, rate, status) VALUES (?, ?, ?, ?, ?)',
            [roomData.motel_id, roomData.room_number, roomData.room_type, roomData.rate, roomData.status || 'Available']
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM rooms WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByMotel(motelId) {
        const [rows] = await db.execute('SELECT * FROM rooms WHERE motel_id = ?', [motelId]);
        return rows;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            'UPDATE rooms SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows > 0;
    }

    static async getAvailable(motelId) {
        const [rows] = await db.execute(
            'SELECT * FROM rooms WHERE motel_id = ? AND status = "Available"',
            [motelId]
        );
        return rows;
    }
}

module.exports = Room;
