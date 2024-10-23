// backend/src/routes/auth.routes.js
const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/login',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
        validationMiddleware
    ],
    AuthController.login
);

router.post('/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
        body('name').notEmpty(),
        validationMiddleware
    ],
    AuthController.register
);

module.exports = router;
