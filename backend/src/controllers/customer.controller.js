// backend/src/controllers/customer.controller.js
const Customer = require('../models/customer.model');

class CustomerController {
    static async create(req, res) {
        try {
            const existingCustomer = await Customer.findByEmail(req.body.email);
            if (existingCustomer) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const customerId = await Customer.create(req.body);
            const customer = await Customer.findById(customerId);
            res.status(201).json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const customer = await Customer.findById(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const success = await Customer.update(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            const customer = await Customer.findById(req.params.id);
            res.json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CustomerController;