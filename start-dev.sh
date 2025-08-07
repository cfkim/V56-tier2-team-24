#!/bin/bash

echo "🚀 Starting development servers..."

# Kill any existing processes
echo "🔄 Cleaning up existing processes..."
pkill -f "nodemon.*server.ts" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Start backend server
echo "🔧 Starting backend server (port 4004)..."
cd server && npm run devStart &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server (port 5173)..."
cd client && npm run dev &
FRONTEND_PID=$!

# Wait for both servers to start
sleep 5

# Check if servers are running
echo "📊 Checking server status..."

if curl -s http://localhost:4004/health > /dev/null; then
    echo "✅ Backend server is running on http://localhost:4004"
else
    echo "❌ Backend server failed to start"
fi

if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend server is running on http://localhost:5173"
else
    echo "❌ Frontend server failed to start"
fi

echo ""
echo "🎉 Development servers started!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:4004"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait 