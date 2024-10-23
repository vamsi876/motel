
// backend/src/utils/validators.js
const { body, param, query } = require('express-validator');

const validators = {
    reservation: {
        create: [
            body('room_id').isInt().withMessage('Valid room ID is required'),
            body('customer_id').isInt().withMessage('Valid customer ID is required'),
            body('check_in')
                .isDate()
                .withMessage('Valid check-in date is required')
                .custom((value, { req }) => {
                    if (new Date(value) < new Date()) {
                        throw new Error('Check-in date cannot be in the past');
                    }
                    return true;
                }),
            body('check_out')
                .isDate()
                .withMessage('Valid check-out date is required')
                .custom((value, { req }) => {
                    if (new Date(value) <= new Date(req.body.check_in)) {
                        throw new Error('Check-out date must be after check-in date');
                    }
                    return true;
                }),
            body('total_amount')
                .isFloat({ min: 0 })
                .withMessage('Valid total amount is required')
        ]
    },
    room: {
        create: [
            body('motel_id').isInt().withMessage('Valid motel ID is required'),
            body('room_number').notEmpty().withMessage('Room number is required'),
            body('room_type')
                .isIn(['Single', 'Double', 'Suite'])
                .withMessage('Invalid room type'),
            body('rate')
                .isFloat({ min: 0 })
                .withMessage('Valid rate is required')
        ]
    },
    customer: {
        create: [
            body('first_name').notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email')
                .isEmail()
                .withMessage('Valid email is required'),
            body('phone')
                .optional()
                .matches(/^\+?[\d\s-]+$/)
                .withMessage('Invalid phone number format')
        ]
    }
};

module.exports = validators;
