const express = require('express');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const emailService = require('../services/emailService');

const router = express.Router();

// In-memory storage for reset tokens (in production, use database)
const resetTokens = new Map();

// Forgot Password - Send reset link
router.post('/forgot', 
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address')
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors.array() 
        });
      }

      const { email } = req.body;

      // TODO: Check if user exists in database
      // const user = await User.findOne({ email });
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = await bcrypt.hash(resetToken, 10);
      
      // Store token with expiration (1 hour)
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      resetTokens.set(email, {
        token: hashedToken,
        expiresAt
      });

      // Create reset URL
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/password/reset?token=${resetToken}&email=${encodeURIComponent(email)}`;

      // Send email using Gmail
      let emailSent = false;
      
      if (process.env.EMAIL_SERVICE === 'gmail' && process.env.EMAIL_USER) {
        emailSent = await emailService.sendPasswordResetEmail(email, resetUrl);
        console.log('Gmail email attempt:', emailSent ? 'success' : 'failed');
      }
      
      if (!emailSent) {
        // In development mode, return the reset URL directly for testing
        if (process.env.NODE_ENV === 'development') {
          return res.json({ 
            message: 'Password reset link generated successfully (development mode)',
            email: email,
            resetUrl: resetUrl, // Only in development
            note: 'Email service not configured. Use the reset URL above for testing.'
          });
        }
        return res.status(500).json({ error: 'Failed to send reset email' });
      }

      res.json({ 
        message: 'Password reset link sent successfully',
        email: email // For development, remove in production
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Reset Password - Verify token and update password
router.post('/reset',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors.array() 
        });
      }

      const { token, email, password } = req.body;

      // Get stored token data
      const tokenData = resetTokens.get(email);
      if (!tokenData) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      // Check if token is expired
      if (new Date() > tokenData.expiresAt) {
        resetTokens.delete(email);
        return res.status(400).json({ error: 'Reset token has expired' });
      }

      // Verify token
      const isValidToken = await bcrypt.compare(token, tokenData.token);
      if (!isValidToken) {
        return res.status(400).json({ error: 'Invalid reset token' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // TODO: Update user password in database
      // await User.findOneAndUpdate(
      //   { email },
      //   { 
      //     password: hashedPassword,
      //     passwordChangedAt: new Date()
      //   }
      // );

      // Remove used token
      resetTokens.delete(email);

      res.json({ message: 'Password reset successfully' });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Verify reset token (for frontend validation)
router.post('/verify-token',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors.array() 
        });
      }

      const { token, email } = req.body;

      const tokenData = resetTokens.get(email);
      if (!tokenData) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      if (new Date() > tokenData.expiresAt) {
        resetTokens.delete(email);
        return res.status(400).json({ error: 'Reset token has expired' });
      }

      const isValidToken = await bcrypt.compare(token, tokenData.token);
      if (!isValidToken) {
        return res.status(400).json({ error: 'Invalid reset token' });
      }

      res.json({ message: 'Token is valid' });

    } catch (error) {
      console.error('Verify token error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router; 