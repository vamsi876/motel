// backend/src/controllers/motel.controller.js
const Motel = require('../models/motel.model');

class MotelController {
    static async create(req, res) {
        try {
            const motelId = await Motel.create(req.body);
            const motel = await Motel.findById(motelId);
            res.status(201).json(motel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const motels = await Motel.findAll();
            res.json(motels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const motel = await Motel.findById(req.params.id);
            if (!motel) {
                return res.status(404).json({ message: 'Motel not found' });
            }
            res.json(motel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const success = await Motel.update(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ message: 'Motel not found' });
            }
            const motel = await Motel.findById(req.params.id);
            res.json(motel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const success = await Motel.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ message: 'Motel not found' });
            }
            res.json({ message: 'Motel deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MotelController;
