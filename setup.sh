#!/bin/bash

echo "🏥 Hospital Management System - Setup Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
echo ""

# Step 1: Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd server
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed."
fi
cd ..

echo ""

# Step 2: Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd client
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed."
fi
cd ..

echo ""

# Step 3: Create Test Accounts
echo -e "${BLUE}👥 Creating Test Accounts...${NC}"
cd server
node scripts/createAllTestAccounts.js
cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo "1. Start Backend Server (Terminal 1):"
echo "   cd server && npm start"
echo ""
echo "2. Start Frontend Server (Terminal 2):"
echo "   cd client && npm start"
echo ""
echo "3. Open Browser:"
echo "   http://localhost:3001"
echo ""
echo -e "${GREEN}🎉 Project ready for teacher demo!${NC}"

