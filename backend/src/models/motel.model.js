// backend/src/models/motel.model.js
const db = require('../config/database');

class Motel {
    static async create(motelData) {
        const [result] = await db.execute(
            'INSERT INTO motels (name, address, contact_number, email) VALUES (?, ?, ?, ?)',
            [motelData.name, motelData.address, motelData.contact_number, motelData.email]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM motels WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM motels');
        return rows;
    }

    static async update(id, motelData) {
        const [result] = await db.execute(
            'UPDATE motels SET name = ?, address = ?, contact_number = ?, email = ? WHERE id = ?',
            [motelData.name, motelData.address, motelData.contact_number, motelData.email, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM motels WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Motel;
