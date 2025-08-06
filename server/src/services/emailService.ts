import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_APP_PASSWORD
    }
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Lumo Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Lumo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #082368; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Lumo</h1>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #3A3A3A; margin-bottom: 20px;">Reset Your Password</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              You requested to reset your password. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #082368; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            
            <p style="background-color: #e9ecef; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 14px; color: #495057;">
              ${resetUrl}
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
                <strong>Important:</strong>
              </p>
              <ul style="color: #666; font-size: 14px; line-height: 1.5;">
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this password reset, please ignore this email</li>
                <li>For security, this link can only be used once</li>
              </ul>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>This email was sent by Lumo. Please do not reply to this email.</p>
          </div>
        </div>
      `,
      text: `
Reset Your Password - Lumo

You requested to reset your password. Click the link below to create a new password:

${resetUrl}

If the link doesn't work, copy and paste it into your browser.

Important:
- This link will expire in 1 hour
- If you didn't request this password reset, please ignore this email
- For security, this link can only be used once

This email was sent by Lumo. Please do not reply to this email.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;

  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

export { sendPasswordResetEmail }; 