#!/bin/bash

echo "🚀 Starting Complete Hospital Management System..."
echo ""

# Kill existing processes
echo "🛑 Stopping existing servers..."
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 3

# Start Backend
echo "📦 Starting Backend (Port 5000)..."
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start > /tmp/hms_backend_complete.log 2>&1 &
sleep 5

# Check backend
if curl -s http://localhost:5000/ > /dev/null 2>&1; then
    echo "✅ Backend Running!"
else
    echo "❌ Backend failed - check /tmp/hms_backend_complete.log"
fi

# Start Frontend
echo "📦 Starting Frontend (Port 3000)..."
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
npm start > /tmp/hms_frontend_complete.log 2>&1 &

echo ""
echo "✅ Both servers starting!"
echo ""
echo "⏳ Wait 20 seconds..."
echo ""
echo "📝 Then open: http://localhost:3000"
echo ""
echo "👑 Admin Login:"
echo "   Email: admin@hospital.com"
echo "   Password: admin123"
echo ""
echo "✅ Everything will work automatically!"
