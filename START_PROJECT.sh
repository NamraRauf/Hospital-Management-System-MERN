#!/bin/bash

echo "🚀 Starting Hospital Management System..."
echo ""

# Kill existing processes
echo "🛑 Stopping existing servers..."
lsof -ti:6000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

# Start Backend
echo "📦 Starting Backend Server (Port 6000)..."
cd "$(dirname "$0")/server"
npm start > /tmp/hms_backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

# Check backend
if curl -s http://localhost:6000/ > /dev/null 2>&1; then
    echo "✅ Backend Server Running!"
    echo "   MongoDB: Connected ✅"
else
    echo "❌ Backend failed to start. Check /tmp/hms_backend.log"
fi

# Start Frontend
echo ""
echo "📦 Starting Frontend Server (Port 3000)..."
cd "$(dirname "$0")/client"
npm start > /tmp/hms_frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers starting..."
echo ""
echo "📝 Backend: http://localhost:6000"
echo "📝 Frontend: http://localhost:3000"
echo ""
echo "⏳ Wait 10-15 seconds for frontend to open in browser..."
echo ""
echo "🛑 To stop: Press Ctrl+C or run 'lsof -ti:6000,3000 | xargs kill -9'"

wait
