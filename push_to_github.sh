#!/bin/bash

echo "🚀 GitHub Push Helper Script"
echo "============================"
echo ""

# Check if token is provided as argument
if [ -z "$1" ]; then
    echo "📋 Token generate karein:"
    echo "   1. https://github.com/settings/tokens"
    echo "   2. 'Generate new token (classic)'"
    echo "   3. Scopes: ✅ repo"
    echo "   4. Token copy karein"
    echo ""
    echo "💡 Usage: ./push_to_github.sh YOUR_TOKEN"
    echo ""
    read -p "Ya abhi token enter karein: " TOKEN
else
    TOKEN=$1
fi

if [ -z "$TOKEN" ]; then
    echo "❌ Token required!"
    exit 1
fi

echo ""
echo "🔄 Remote URL update kar raha hoon..."
git remote set-url origin https://${TOKEN}@github.com/NamraRauf/Hospital-Management-System-MERN.git

echo "✅ Remote updated!"
echo ""
echo "📤 Push kar raha hoon..."
git push origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Project GitHub par push ho gaya!"
    echo "🌐 Repository: https://github.com/NamraRauf/Hospital-Management-System-MERN"
else
    echo ""
    echo "❌ Push failed. Token check karein."
fi

