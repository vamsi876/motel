// backend/src/services/payment.service.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentService {
    async createPaymentIntent(amount, currency = 'usd') {
        return stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency
        });
    }

    async processPayment(paymentIntentId) {
        return stripe.paymentIntents.confirm(paymentIntentId);
    }

    async createRefund(paymentIntentId, amount) {
        return stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: Math.round(amount * 100)
        });
    }
}

module.exports = new PaymentService();