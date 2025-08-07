# V56-tier2-team-24 - Forgot Password Feature 🔐

A complete forgot password and reset password functionality for the Lumo application.

## 💬 Purpose
This feature provides a secure and user-friendly way for users to reset their passwords when they forget them. It includes email-based password reset with secure token validation.

## ⚙️ Major Functions
- **Forgot Password**: Users can request a password reset by entering their email
- **Email Notifications**: Secure password reset links are sent via email
- **Password Reset**: Users can set new passwords with strength validation
- **Token Security**: Time-limited, single-use tokens for security
- **Password Strength**: Real-time password strength indicator

## ⚙️ Major Functions
- Surgical Team Members can update the status of ongoing surgeries (i.e. Checked-in, In-progress, etc.)
- Guests can view a status board of all ongoing operations without needing to create an account
- Patient information is protected, to ensure anonymity and HIPAA compliance (guests for the patient will know their patient #, which is displayed on the board)

## 📦 Tech Stack

This project follows a modern full-stack setup:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Email Service**: Nodemailer with Gmail
- **Security**: bcryptjs for password hashing, JWT for tokens

### Key Dependencies

**Frontend:**
- React 19.1.0
- TypeScript
- Vite 7.0.5
- Tailwind CSS 4.1.11
- React Router DOM 7.7.1
- Axios 1.11.0

**Backend:**
- Express 5.1.0
- TypeScript
- bcryptjs 2.4.3
- nodemailer 6.9.7
- express-validator 7.0.1

## 🛠️ How to Run the Project
View the live site [here]
1. Prerequisites
Node.js version **18.17.0** or higher

2. Installation -- within each folder (server and client)
```bash
npm install
# or
yarn install
```

3. Set up your Environment Variables

**Server Environment (`server/.env`):**
```bash
NODE_ENV=development
APP_ORIGIN=http://localhost:5173/
MONGO_URI=mongodb://localhost:27017/test
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
PORT=4004

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
FROM_EMAIL=your-email@gmail.com
```

**Client Environment (`client/.env`):**
```bash
VITE_API_URL=http://localhost:4004
```

**Note:** For Gmail setup, you need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in EMAIL_APP_PASSWORD


4. Start/Run the project locally

**Option 1: Using the start script (Recommended)**
```bash
./start-dev.sh
```

**Option 2: Manual start**
In separate terminals:

`client` folder:
```bash
npm run dev
```

`server` folder:
```bash
npm run devStart
```

View the application at: http://localhost:5173

**Available Routes:**
- `/password/forgot` - Forgot password page
- `/password/reset-link-sent` - Confirmation page
- `/password/reset` - Reset password page (with token)
- `/password/reset-success` - Success page

## 🔌 API Endpoints

### Password Reset Endpoints

**POST** `/password/forgot`
- Request body: `{ "email": "user@example.com" }`
- Response: `{ "message": "Password reset link sent successfully", "email": "user@example.com", "resetUrl": "http://localhost:5173/password/reset?token=...&email=..." }`

**POST** `/password/reset`
- Request body: `{ "token": "reset-token", "email": "user@example.com", "password": "newPassword123" }`
- Response: `{ "message": "Password reset successfully" }`

**POST** `/password/verify-token`
- Request body: `{ "token": "reset-token", "email": "user@example.com" }`
- Response: `{ "message": "Token is valid" }`

**GET** `/health`
- Response: `{ "status": "OK", "message": "Server is running" }`

## 🧪 Testing

Test the API endpoints:
```bash
# Health check
curl http://localhost:4004/health

# Forgot password
curl -X POST http://localhost:4004/password/forgot \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 🚀 Deployment

For production deployment:
1. Update environment variables with production values
2. Use a proper email service (SendGrid, AWS SES, etc.)
3. Set up a production database
4. Configure proper JWT secrets
5. Enable HTTPS

Popular deployment options:
- **Frontend**: Vercel, Netlify, AWS S3
- **Backend**: Railway, Render, Heroku, AWS EC2
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🧑‍💻 Our Team
-   Mikala Franks (Scrum Master):  [GitHub](https://github.com/mikalafranks)  /  [LinkedIn](https://www.linkedin.com/in/mikala-franks-8b21b52a3/)
    
-   Viral Barot (Product Owner):  [LinkedIn](https://www.linkedin.com/in/viral-barot-mba/)
    
-   Khushali Parekh (UX/UI Designer):  [GitHub](https://github.com/Khush413)  /  [LinkedIn](https://www.linkedin.com/in/khushali-parekh/)
    
-   Vartika Patel (UX/UI Designer):  [GitHub](https://github.com/vartika99)  /  [LinkedIn](https://www.linkedin.com/in/vartikapatel/)
    
-   Rel Guzman (Web Developer)  [Github](https://github.com/rgap)  /  [LinkedIn](https://www.linkedin.com/in/relguzman/)
    
-   Christine Kim (Web Developer)  [Github](https://github.com/cfkim)  /  [LinkedIn](https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav)
    
-   Wanying Liu (Web Developer)  [GitHub](https://github.com/TheClaireLiu)  /  [LinkedIn](https://www.linkedin.com/in/wanying--liu/)
    
-   Hyun Woo Kim (Web Developer)  [GitHub](https://github.com/hynwkm)  /  [LinkedIn](https://www.linkedin.com/in/hyunwoo-kim/)
## 🔗 Links/References
-   [Team Project Ideas](https://github.com/chingu-voyages/V56-tier2-team-24/blob/develop/docs/team_project_ideas.md)
-   [Team Decision Log](https://github.com/chingu-voyages/V56-tier2-team-24/blob/develop/docs/team_decision_log.md)
- [Keys to a well written README](https://tinyurl.com/yk3wubft)
