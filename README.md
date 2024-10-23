# Motel Management System

A comprehensive motel management solution built with React, Node.js, and MySQL. This system allows you to manage multiple motels, handle reservations, track room status, and manage customer information.

## 🌟 Features

### For Motel Management
- 🏨 Multi-motel support
- 🛏️ Room management
- 📊 Real-time availability tracking
- 💰 Rate management
- 🧹 Housekeeping status

### For Reservations
- 📅 Online booking system
- ✅ Check-in/Check-out management
- 💳 Payment processing
- 📧 Automated email confirmations
- 📱 Guest communication

### For Reporting
- 📈 Occupancy reports
- 💹 Revenue analytics
- 📊 Performance metrics
- 🔍 Customer insights
- 📝 Audit logs

## 🏗️ Architecture

### Frontend
- React with Vite
- Tailwind CSS for styling
- Context API for state management
- Axios for API communication

### Backend
- Node.js with Express
- MySQL database
- JWT authentication
- Email integration
- Payment processing

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.0.0
- MySQL >= 8.0
- npm or yarn
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/motel-management-system.git
cd motel-management-system
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend and backend dependencies
npm run install:all
```

3. Set up environment variables
```bash
# Backend environment variables
cp backend/.env.example backend/.env

# Frontend environment variables
cp frontend/.env.example frontend/.env
```

4. Set up the database
```bash
# Run database migrations
cd backend
npm run migrate

# Seed the database (optional)
npm run seed
```

### Running the Application

#### Development Mode
```bash
# Run both frontend and backend
npm run dev

# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend
```

#### Production Mode
```bash
# Build both applications
npm run build

# Start the applications
npm start
```

#### Using Docker
```bash
# Build and start containers
npm run docker:up

# Stop containers
npm run docker:down
```

## 📁 Project Structure
```
motel-management-system/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── context/      # React Context
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
│
├── backend/              # Node.js backend application
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Custom middleware
│   │   └── utils/       # Utility functions
│   └── tests/           # Backend tests
│
└── database/            # Database migrations and seeds
```

## 🔐 Security Features
- JWT authentication
- Password hashing
- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- SQL injection prevention

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend
```

## 📝 API Documentation

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Motels
```
GET    /api/motels
POST   /api/motels
GET    /api/motels/:id
PUT    /api/motels/:id
DELETE /api/motels/:id
```

### Rooms
```
GET    /api/rooms
POST   /api/rooms
GET    /api/rooms/:id
PUT    /api/rooms/:id
PATCH  /api/rooms/:id/status
```

### Reservations
```
GET    /api/reservations
POST   /api/reservations
GET    /api/reservations/:id
PATCH  /api/reservations/:id/status
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please open an issue with:
- Clear bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Your environment details

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - *Initial work* - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc