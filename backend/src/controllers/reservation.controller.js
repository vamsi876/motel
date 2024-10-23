// backend/src/controllers/reservation.controller.js
const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');

class ReservationController {
    static async create(req, res) {
        try {
            // Check room availability
            const room = await Room.findById(req.body.room_id);
            if (room.status !== 'Available') {
                return res.status(400).json({ message: 'Room is not available' });
            }

            const reservationId = await Reservation.create(req.body);
            await Room.updateStatus(req.body.room_id, 'Occupied');
            
            const reservation = await Reservation.findById(reservationId);
            res.status(201).json(reservation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const reservation = await Reservation.findById(req.params.id);
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.json(reservation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateStatus(req, res) {
        try {
            const { status } = req.body;
            const success = await Reservation.updateStatus(req.params.id, status);
            
            if (!success) {
                return res.status(404).json({ message: 'Reservation not found' });
            }

            // If checking out, update room status
            if (status === 'Checked-out') {
                const reservation = await Reservation.findById(req.params.id);
                await Room.updateStatus(reservation.room_id, 'Available');
            }

            res.json({ message: 'Reservation status updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getActive(req, res) {
        try {
            const reservations = await Reservation.getActiveReservations(req.params.motelId);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ReservationController;
