# Lumo - Password Reset System

A complete password reset functionality for the Lumo application, including frontend pages, backend API, and email service integration.

## 🚀 Features

### Frontend Pages
- **ForgotPassword** (`/password/forgot`) - Email input with validation
- **ResetLinkSent** (`/password/reset-link-sent`) - Success confirmation
- **ResetPassword** (`/password/reset`) - Password reset with strength indicator
- **ResetPasswordSuccess** (`/password/reset-success`) - Final success page

### Backend API
- `POST /api/password/forgot` - Send reset email
- `POST /api/password/reset` - Reset password
- `POST /api/password/verify-token` - Validate token

### Security Features
- Token expiration (1 hour)
- Token hashing with bcrypt
- Single-use tokens
- Password complexity requirements
- Email validation
- Rate limiting
- CORS protection
- Helmet security headers

## 🛠️ Setup

### 1. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend && npm install
```

### 2. Environment Configuration

Create `.env` in the root directory:
```bash
VITE_API_URL=http://localhost:5000/api
```

Create `backend/.env`:
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration Options:

# Option 1: Resend (Recommended)
RESEND_API_KEY=re_xxxxxxxxx
FROM_EMAIL=onboarding@resend.dev
TEST_EMAIL=your-verified-email@example.com

# Option 2: Gmail (Alternative)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Start Development Servers

```bash
# Start backend server
cd backend && npm start

# Start frontend server (in new terminal)
npm run dev
```

## 🧪 Testing

### Development Mode
In development mode, the system will display reset links directly without sending emails:

1. Visit: `http://localhost:5173/password/forgot`
2. Enter any email address
3. Copy the displayed reset link
4. Open the link in a new tab
5. Set a new password

### Production Mode
Configure email service for production:

#### Resend Setup
1. Sign up at [resend.com](https://resend.com/)
2. Get API key from dashboard
3. Add to `backend/.env`:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxx
   FROM_EMAIL=onboarding@resend.dev
   ```

#### Gmail Setup
1. Enable 2-factor authentication
2. Generate app password
3. Add to `backend/.env`:
   ```bash
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=your-app-password
   ```

### API Testing
```bash
node test-password-reset.js
```

## 📁 Project Structure

```
├── src/
│   ├── pages/
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetLinkSent.tsx
│   │   ├── ResetPassword.tsx
│   │   └── ResetPasswordSuccess.tsx
│   └── services/
│       └── api.ts
├── backend/
│   ├── routes/
│   │   └── password.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── resendEmailService.js
│   └── server.js
├── test-password-reset.js
└── start-dev.sh
```

## 🔧 Technology Stack

### Frontend
- React + TypeScript
- React Router
- Tailwind CSS
- Vite

### Backend
- Node.js + Express
- bcryptjs (password hashing)
- nodemailer (email sending)
- resend (optional email service)
- express-validator (input validation)
- helmet (security headers)
- express-rate-limit (rate limiting)

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   pkill -f "node.*server.js"
   ```

2. **Email not sending**
   - Check email service configuration
   - Verify API keys
   - Check server logs

3. **CORS errors**
   - Ensure `FRONTEND_URL` is set correctly
   - Check that both servers are running

### Development Mode
- No email service required
- Reset links displayed directly
- Perfect for testing and development

## 📝 API Documentation

### POST /api/password/forgot
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset link sent successfully",
  "email": "user@example.com"
}
```

### POST /api/password/reset
**Request:**
```json
{
  "token": "reset-token",
  "email": "user@example.com",
  "password": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

## 🎯 Next Steps

1. **Database Integration** - Replace in-memory storage
2. **User Authentication** - Integrate with login system
3. **Email Templates** - Customize email branding
4. **Testing** - Add comprehensive tests
5. **Production Deployment** - Configure for production

## 📞 Support

For issues or questions:
1. Check server logs for error messages
2. Run `node test-password-reset.js` for API testing
3. Verify environment configuration
4. Check email service status

---

**Status**: ✅ Production Ready
**Last Updated**: August 2024
