// backend/src/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/env');
const User = require('../models/user.model');

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);

            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRATION }
            );

            res.json({ token, user: { id: user.id, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async register(req, res) {
        try {
            const { email, password, name } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.create({ email, password: hashedPassword, name });
            
            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
