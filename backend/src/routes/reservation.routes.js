// backend/src/routes/reservation.routes.js
const express = require('express');
const ReservationController = require('../controllers/reservation.controller');
const authMiddleware = require('../middleware/auth.middleware');
const motelMiddleware = require('../middleware/motel.middleware');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const router = express.Router();

router.use(authMiddleware);

// Create new reservation
router.post('/',
    [
        body('room_id').isNumeric(),
        body('customer_id').isNumeric(),
        body('check_in').isDate(),
        body('check_out').isDate(),
        body('total_amount').isNumeric(),
        validationMiddleware
    ],
    ReservationController.create
);

// Get reservation by ID
router.get('/:id', ReservationController.getById);

// Update reservation status
router.patch('/:id/status',
    [
        body('status').isIn(['Confirmed', 'Checked-in', 'Checked-out', 'Cancelled']),
        validationMiddleware
    ],
    ReservationController.updateStatus
);

// Get active reservations for a motel
router.get('/active/:motelId',
    motelMiddleware,
    ReservationController.getActive
);

module.exports = router;