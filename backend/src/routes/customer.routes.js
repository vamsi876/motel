
// backend/src/routes/customer.routes.js
const express = require('express');
const CustomerController = require('../controllers/customer.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const router = express.Router();

router.use(authMiddleware);

// Create new customer
router.post('/',
    [
        body('first_name').notEmpty(),
        body('last_name').notEmpty(),
        body('email').isEmail(),
        body('phone').optional().isMobilePhone('any'),
        body('address').optional(),
        validationMiddleware
    ],
    CustomerController.create
);

// Get customer by ID
router.get('/:id', CustomerController.getById);

// Update customer
router.put('/:id',
    [
        body('first_name').optional().notEmpty(),
        body('last_name').optional().notEmpty(),
        body('phone').optional().isMobilePhone('any'),
        body('address').optional(),
        validationMiddleware
    ],
    CustomerController.update
);

module.exports = router;
