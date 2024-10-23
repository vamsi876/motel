
// backend/src/utils/formatters.js
const formatters = {
    currency: (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    date: (date) => {
        return new Date(date).toISOString().split('T')[0];
    },

    datetime: (date) => {
        return new Date(date).toISOString();
    },

    phone: (phoneNumber) => {
        // Format phone number to (XXX) XXX-XXXX
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    },

    name: (firstName, lastName) => {
        return `${firstName} ${lastName}`.trim();
    }
};

module.exports = formatters;

