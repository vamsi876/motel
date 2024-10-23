// backend/src/controllers/room.controller.js
const Room = require('../models/room.model');

class RoomController {
    static async create(req, res) {
        try {
            const roomId = await Room.create(req.body);
            const room = await Room.findById(roomId);
            res.status(201).json(room);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getByMotel(req, res) {
        try {
            const rooms = await Room.findByMotel(req.params.motelId);
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateStatus(req, res) {
        try {
            const { status } = req.body;
            const success = await Room.updateStatus(req.params.id, status);
            if (!success) {
                return res.status(404).json({ message: 'Room not found' });
            }
            const room = await Room.findById(req.params.id);
            res.json(room);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAvailable(req, res) {
        try {
            const rooms = await Room.getAvailable(req.params.motelId);
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = RoomController;
