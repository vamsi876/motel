const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const errorMiddleware = require('../middleware/error.middleware');

module.exports = (app) => {
    // Basic middleware
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Error handling
    app.use(errorMiddleware);

    return app;
};
