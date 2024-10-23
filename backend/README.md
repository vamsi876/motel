# Motel Management System - Backend

A robust REST API backend for managing multiple motels, built with Node.js, Express, and MySQL.

## Features

- 🏨 Multi-motel management
- 🔐 JWT authentication
- 🏷️ Role-based access control
- 🛏️ Room management
- 📅 Reservation system
- 👥 Customer management
- 💰 Payment processing
- 📧 Email notifications
- 📊 Reporting system

## Prerequisites

- Node.js >=14.0.0
- MySQL >=8.0
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd motel-management-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration values.

5. Create database and run migrations:
```bash
npm run migrate
```

6. Seed the database with initial data:
```bash
npm run seed
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## API Documentation

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### Motels
- GET /api/motels - List all motels
- POST /api/motels - Create new motel
- GET /api/motels/:id - Get motel details
- PUT /api/motels/:id - Update motel
- DELETE /api/motels/:id - Delete motel

### Rooms
- GET /api/rooms/motel/:motelId - List rooms by motel
- POST /api/rooms - Create new room
- GET /api/rooms/available/:motelId - List available rooms
- PATCH /api/rooms/:id/status - Update room status

### Reservations
- POST /api/reservations - Create reservation
- GET /api/reservations/:id - Get reservation details
- PATCH /api/reservations/:id/status - Update reservation status
- GET /api/reservations/active/:motelId - List active reservations

### Customers
- POST /api/customers - Create customer
- GET /api/customers/:id - Get customer details
- PUT /api/customers/:id - Update customer

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── app.js         # Application entry point
```

## Error Handling

The API uses the following error status codes:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- CORS enabled
- Helmet security headers
- Rate limiting
- JWT authentication
- Password hashing
- Input validation
- SQL injection protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@your-domain.com or create an issue in the repository.