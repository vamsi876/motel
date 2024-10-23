// backend/src/middleware/motel.middleware.js
const Motel = require('../models/motel.model');

module.exports = async (req, res, next) => {
    try {
        const motelId = req.params.motelId || req.body.motelId;
        const motel = await Motel.findById(motelId);
        
        if (!motel) {
            return res.status(404).json({ message: 'Motel not found' });
        }

        // Check if user has access to this motel
        if (req.user.role !== 'admin' && !req.user.motels.includes(motelId)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.motel = motel;
        next();
    } catch (error) {
        next(error);
    }
};