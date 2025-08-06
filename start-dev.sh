#!/bin/bash

echo "🚀 Starting Lumo Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "🔧 Checking environment files..."

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. Please copy backend/env.example to backend/.env and configure it."
    echo "   Required variables: EMAIL_USER, EMAIL_APP_PASSWORD, FRONTEND_URL"
fi

# Check if frontend .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env not found. Please copy env.example to .env"
    cp env.example .env
    echo "✅ Created .env from env.example"
fi

echo ""
echo "🎯 To start the development servers:"
echo ""
echo "1. Start backend server:"
echo "   cd backend && npm start"
echo ""
echo "2. In another terminal, start frontend:"
echo "   npm run dev"
echo ""
echo "3. Test the password reset flow:"
echo "   http://localhost:5173/password/forgot"
echo ""
echo "📝 Don't forget to configure your email service in backend/.env!" 