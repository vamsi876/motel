
// backend/tests/integration/reservation.test.js
const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');

describe('Reservation Endpoints', () => {
    let authToken;
    let testRoomId;
    let testCustomerId;

    beforeAll(async () => {
        // Create test auth token
        authToken = jwt.sign(
            { id: 1, email: 'test@example.com' },
            process.env.JWT_SECRET
        );

        // Setup test data
        // ... create test room and customer
    });

    describe('POST /api/reservations', () => {
        it('should create a new reservation', async () => {
            const res = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    room_id: testRoomId,
                    customer_id: testCustomerId,
                    check_in: '2024-03-01',
                    check_out: '2024-03-03',
                    total_amount: 200
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.status).toBe('Confirmed');
        });
    });

    describe('GET /api/reservations/:id', () => {
        it('should get reservation details', async () => {
            const res = await request(app)
                .get('/api/reservations/1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('room_number');
            expect(res.body).toHaveProperty('customer_id');
        });
    });
});