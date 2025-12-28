#!/bin/bash

# Naya GitHub Repository Setup Script
# Repository Name: Hospital-Management-System-MERN

echo "🚀 Setting up new GitHub repository..."
echo ""

# Purana remote remove karein
echo "📋 Removing old remote..."
git remote remove origin 2>/dev/null || echo "No old remote found"

# Naya remote add karein
echo "📋 Adding new remote..."
git remote add origin https://github.com/NamraRauf/Hospital-Management-System-MERN.git

# Verify
echo ""
echo "✅ Remote configured:"
git remote -v

echo ""
echo "📋 Next Steps:"
echo "1. Make sure you've created the repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: Hospital-Management-System-MERN"
echo ""
echo "2. Then run:"
echo "   git push -u origin master"
echo ""

