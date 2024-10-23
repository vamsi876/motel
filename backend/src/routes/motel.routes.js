// backend/src/routes/motel.routes.js
const express = require('express');
const MotelController = require('../controllers/motel.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/',
    [
        body('name').notEmpty(),
        body('address').notEmpty(),
        body('contact_number').notEmpty(),
        body('email').isEmail(),
        validationMiddleware
    ],
    MotelController.create
);

router.get('/', MotelController.getAll);
router.get('/:id', MotelController.getById);
router.put('/:id', MotelController.update);
router.delete('/:id', MotelController.delete);

module.exports = router;