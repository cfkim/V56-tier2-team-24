# Password Reset Functionality Setup Guide

## Overview
This guide explains how to set up and test the password reset functionality for the Lumo application.

## Features Implemented

### Frontend Pages
1. **ForgotPassword** (`/password/forgot`) - User enters email to request password reset
2. **ResetLinkSent** (`/password/reset-link-sent`) - Confirmation page after email is sent
3. **ResetPassword** (`/password/reset`) - User sets new password using reset token
4. **ResetPasswordSuccess** (`/password/reset-success`) - Success confirmation page

### Backend API Endpoints
1. `POST /api/password/forgot` - Send password reset email
2. `POST /api/password/reset` - Reset password with token
3. `POST /api/password/verify-token` - Verify reset token validity

## Setup Instructions

### 1. Backend Environment Configuration

Copy `backend/env.example` to `backend/.env` and configure:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
EMAIL_APP_PASSWORD=your-gmail-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 2. Gmail App Password Setup

For Gmail, you need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Create an App Password for "Mail"
4. Use this App Password in `EMAIL_APP_PASSWORD`

### 3. Frontend Environment Configuration

Create `.env` in the root directory:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Testing the Functionality

### 1. Start the Backend Server
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend Development Server
```bash
npm install
npm run dev
```

### 3. Test Flow

1. **Navigate to Forgot Password**: Go to `http://localhost:5173/password/forgot`
2. **Enter Email**: Enter a valid email address
3. **Check Email**: Check your email for the reset link
4. **Reset Password**: Click the link and set a new password
5. **Verify Success**: Should redirect to success page

### 4. Test Cases

#### Valid Flow
- Enter valid email → Should show "Reset link sent" page
- Click email link → Should show password reset form
- Enter strong password → Should show success page

#### Error Cases
- Invalid email format → Should show validation error
- Expired token → Should show "Invalid or expired token" message
- Weak password → Should show password requirements
- Mismatched passwords → Should show "Passwords do not match"

## Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Visual strength indicator

### Token Security
- Tokens expire after 1 hour
- Tokens are hashed before storage
- Tokens are single-use (deleted after use)
- Email validation required

### Email Security
- Professional HTML email template
- Clear instructions and security warnings
- Fallback text version
- No sensitive information in email

## Current Limitations

### Development Mode
- Uses in-memory token storage (not persistent)
- No actual user database integration
- Email sending requires proper Gmail configuration

### Production Considerations
- Replace in-memory storage with database
- Implement rate limiting
- Add CAPTCHA for spam prevention
- Use production email service (SendGrid, AWS SES, etc.)
- Implement proper logging and monitoring

## Troubleshooting

### Email Not Sending
1. Check Gmail App Password configuration
2. Verify `EMAIL_USER` and `EMAIL_APP_PASSWORD` in `.env`
3. Check Gmail security settings
4. Review server logs for error messages

### Frontend Not Connecting
1. Verify `VITE_API_URL` in frontend `.env`
2. Check backend server is running on correct port
3. Check browser console for CORS errors

### Token Validation Issues
1. Check token expiration (1 hour limit)
2. Verify email encoding in reset URL
3. Check backend logs for validation errors

## API Documentation

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
  "token": "reset-token-from-email",
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

### POST /api/password/verify-token
**Request:**
```json
{
  "token": "reset-token-from-email",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Token is valid"
}
```

## Next Steps

1. **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
2. **User Authentication**: Integrate with login system
3. **Rate Limiting**: Prevent abuse of password reset
4. **Email Templates**: Customize email branding
5. **Analytics**: Track password reset usage
6. **Testing**: Add comprehensive unit and integration tests 