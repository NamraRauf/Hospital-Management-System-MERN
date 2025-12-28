#!/bin/bash

echo "🔧 FINAL FIX - Backend & Frontend Restart"
echo ""

# Kill all
echo "🛑 Stopping everything..."
lsof -ti:6000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 3

# Start Backend
echo "📦 Starting Backend (Port 6000)..."
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/server
npm start > /tmp/backend_working.log 2>&1 &
BACKEND_PID=$!
sleep 5

# Verify Backend
echo "✅ Checking Backend..."
if curl -s http://localhost:6000/ > /dev/null 2>&1; then
    echo "✅ Backend Running on Port 6000"
else
    echo "❌ Backend Failed - Check /tmp/backend_working.log"
    exit 1
fi

# Test API
echo "✅ Testing API..."
API_TEST=$(curl -s -X POST http://localhost:6000/api/patients/register \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","email":"apitest@test.com","password":"test123"}' 2>&1)

if echo "$API_TEST" | grep -q "successfully\|already exists"; then
    echo "✅ API Working!"
else
    echo "⚠️  API Response: $API_TEST"
fi

# Start Frontend
echo ""
echo "📦 Starting Frontend (Port 3000)..."
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
npm start > /tmp/frontend_working.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers starting!"
echo ""
echo "⏳ Wait 20 seconds for frontend..."
echo ""
echo "📝 Then open: http://localhost:3000"
echo "🔄 Hard Refresh: Cmd+Shift+R"
echo ""
echo "👑 Admin: admin@hospital.com / admin123"
echo ""

# Wait a bit
sleep 3

echo "✅ Done! Check browser in 20 seconds"
