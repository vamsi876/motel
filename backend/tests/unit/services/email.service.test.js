// backend/tests/unit/services/email.service.test.js
const EmailService = require('../../../src/services/email.service');
const nodemailer = require('nodemailer');

jest.mock('nodemailer');

describe('Email Service', () => {
    let mockTransporter;

    beforeEach(() => {
        mockTransporter = {
            sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' })
        };
        nodemailer.createTransport.mockReturnValue(mockTransporter);
    });

    it('should send reservation confirmation email', async () => {
        const reservation = {
            check_in: '2024-03-01',
            check_out: '2024-03-03',
            room_number: '101',
            total_amount: 200
        };

        const customer = {
            first_name: 'John',
            email: 'john@example.com'
        };

        await EmailService.sendReservationConfirmation(reservation, customer);

        expect(mockTransporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                to: customer.email,
                subject: 'Reservation Confirmation'
            })
        );
    });
});