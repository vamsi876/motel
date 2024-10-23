
// backend/src/models/customer.model.js
const db = require('../config/database');

class Customer {
    static async create(customerData) {
        const [result] = await db.execute(
            'INSERT INTO customers (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
            [customerData.first_name, customerData.last_name, customerData.email, customerData.phone, customerData.address]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM customers WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM customers WHERE email = ?', [email]);
        return rows[0];
    }

    static async update(id, customerData) {
        const [result] = await db.execute(
            'UPDATE customers SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?',
            [customerData.first_name, customerData.last_name, customerData.phone, customerData.address, id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Customer;