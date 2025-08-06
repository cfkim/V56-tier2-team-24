# Lumo Backend API

This is the backend API for the Lumo authentication system, providing user registration, login, and password reset functionality.

## Features

- 🔐 User authentication (login/register)
- 🔑 Password reset via email
- 📧 Email service integration
- 🛡️ JWT token-based security
- ✅ Input validation
- 🚀 Rate limiting
- 🔒 Security headers

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gmail account (for email service)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure environment variables in `.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## Gmail Setup

To use Gmail for sending emails, you need to:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in your `.env` file

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Password Reset
- `POST /api/password/forgot` - Send password reset email
- `POST /api/password/reset` - Reset password with token
- `POST /api/password/verify-token` - Verify reset token

### Health Check
- `GET /api/health` - Server health status

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

### Forgot Password
```bash
curl -X POST http://localhost:5000/api/password/forgot \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Reset Password
```bash
curl -X POST http://localhost:5000/api/password/reset \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset-token-from-email",
    "email": "user@example.com",
    "password": "NewPassword123"
  }'
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs are validated and sanitized
- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **CORS**: Configured for frontend domain
- **Security Headers**: Helmet.js for security headers

## Development Notes

- Currently uses in-memory storage for users and reset tokens
- In production, integrate with a database (MongoDB, PostgreSQL, etc.)
- Email service is configured for Gmail but can be changed to other providers
- Reset tokens expire after 1 hour
- JWT tokens expire after 24 hours

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper email service credentials
4. Set up a database for persistent storage
5. Use HTTPS in production
6. Configure proper CORS origins

## Testing

```bash
npm test
```

## License

MIT 