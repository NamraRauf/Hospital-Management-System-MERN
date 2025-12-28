#!/bin/bash

echo "🔧 Fixing Everything..."
echo ""

# Kill existing processes
echo "🛑 Stopping existing servers..."
lsof -ti:6000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

# Start Backend
echo "📦 Starting Backend..."
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start > /tmp/hms_backend_fix.log 2>&1 &
sleep 4

# Check backend
if curl -s http://localhost:6000/ > /dev/null 2>&1; then
    echo "✅ Backend Running!"
else
    echo "❌ Backend failed"
fi

# Start Frontend
echo "📦 Starting Frontend..."
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
npm start > /tmp/hms_frontend_fix.log 2>&1 &

echo ""
echo "✅ Both servers starting!"
echo "⏳ Wait 15-20 seconds"
echo ""
echo "📝 Open: http://localhost:3000"
echo "👑 Admin: admin@hospital.com / admin123"
echo ""
