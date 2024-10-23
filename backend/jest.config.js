// backend/jest.config.js
module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/app.js',
        '!src/config/*.js'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    setupFilesAfterEnv: ['./tests/setup.js']
};

// backend/tests/setup.js
const db = require('../src/config/database');

beforeAll(async () => {
    // Setup test database or connections
});

afterAll(async () => {
    await db.end();
});