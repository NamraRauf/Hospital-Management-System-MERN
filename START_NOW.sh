#!/bin/bash

echo "🚀 Starting Hospital Management System..."
echo ""

# Check if backend is running
if lsof -ti:6000 > /dev/null 2>&1; then
    echo "✅ Backend already running on port 6000"
else
    echo "📦 Starting Backend Server..."
    cd "$(dirname "$0")/server"
    npm start > /tmp/hms_backend.log 2>&1 &
    echo "✅ Backend starting... (check /tmp/hms_backend.log)"
    sleep 3
fi

# Check if frontend is running
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "✅ Frontend already running on port 3000"
else
    echo "📦 Starting Frontend Server..."
    cd "$(dirname "$0")/client"
    npm start > /tmp/hms_frontend.log 2>&1 &
    echo "✅ Frontend starting... (check /tmp/hms_frontend.log)"
    echo "⏳ Wait 15-20 seconds for browser to open"
fi

echo ""
echo "✅ Both servers starting!"
echo ""
echo "📝 Backend: http://localhost:6000"
echo "📝 Frontend: http://localhost:3000"
echo ""
echo "👑 Admin Login:"
echo "   Email: admin@hospital.com"
echo "   Password: admin123"
echo ""

