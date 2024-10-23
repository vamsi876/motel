// backend/src/services/email.service.js
const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendReservationConfirmation(reservation, customer) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: customer.email,
            subject: 'Reservation Confirmation',
            html: `
                <h1>Reservation Confirmed</h1>
                <p>Dear ${customer.first_name},</p>
                <p>Your reservation has been confirmed:</p>
                <ul>
                    <li>Check-in: ${reservation.check_in}</li>
                    <li>Check-out: ${reservation.check_out}</li>
                    <li>Room: ${reservation.room_number}</li>
                    <li>Total Amount: $${reservation.total_amount}</li>
                </ul>
            `
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendPaymentConfirmation(reservation, customer) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: customer.email,
            subject: 'Payment Confirmation',
            html: `
                <h1>Payment Received</h1>
                <p>Dear ${customer.first_name},</p>
                <p>We have received your payment of $${reservation.total_amount}.</p>
                <p>Reservation Details:</p>
                <ul>
                    <li>Reservation ID: ${reservation.id}</li>
                    <li>Check-in: ${reservation.check_in}</li>
                    <li>Check-out: ${reservation.check_out}</li>
                </ul>
            `
        };

        return this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();

