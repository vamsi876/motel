// backend/src/routes/room.routes.js
const express = require('express');
const RoomController = require('../controllers/room.controller');
const authMiddleware = require('../middleware/auth.middleware');
const motelMiddleware = require('../middleware/motel.middleware');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/',
    [
        body('motel_id').isNumeric(),
        body('room_number').notEmpty(),
        body('room_type').isIn(['Single', 'Double', 'Suite']),
        body('rate').isNumeric(),
        validationMiddleware,
        motelMiddleware
    ],
    RoomController.create
);

router.get('/motel/:motelId', motelMiddleware, RoomController.getByMotel);
router.get('/available/:motelId', motelMiddleware, RoomController.getAvailable);
router.patch('/:id/status', RoomController.updateStatus);

module.exports = router;