#!/bin/bash

echo "🧪 Testing Registration with New Email..."
echo ""

# Test with new email
RESPONSE=$(curl -s -X POST http://localhost:5000/api/patients/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"newtest'$(date +%s)'@gmail.com","password":"namra123"}')

if echo "$RESPONSE" | grep -q "successfully"; then
    echo "✅ Registration API Working!"
    echo "Response: $RESPONSE"
else
    echo "❌ Registration Failed"
    echo "Response: $RESPONSE"
fi

echo ""
echo "📝 Test Instructions:"
echo "1. Use NEW email (not namrarauf19@gmail.com)"
echo "2. Password: namra123"
echo "3. Confirm Password: namra123 (SAME)"
echo "4. Browser: Hard Refresh (Cmd+Shift+R)"
