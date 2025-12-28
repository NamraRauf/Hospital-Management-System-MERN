#!/bin/bash
echo "🔄 Restarting Frontend..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2
cd /Users/zainrauf/hmsfypnr/Hospital-Management-System/client
echo "📦 Starting React App..."
npm start
