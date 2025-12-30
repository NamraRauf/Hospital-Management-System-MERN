#!/bin/bash

echo "🌐 Offline Setup Script - Internet Ke Bina Project Chalane Ke Liye"
echo ""

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB not found!"
    echo ""
    echo "📦 Installing MongoDB..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew not found. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Install MongoDB
    echo "📦 Installing MongoDB..."
    brew tap mongodb/brew
    brew install mongodb-community
    
    echo "✅ MongoDB installed!"
else
    echo "✅ MongoDB already installed!"
fi

# Start MongoDB service
echo ""
echo "🚀 Starting MongoDB service..."
brew services start mongodb-community

# Wait for MongoDB to start
sleep 3

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running!"
else
    echo "⚠️  MongoDB might not be running. Please check manually."
fi

# Update .env file
echo ""
echo "📝 Updating .env file for local MongoDB..."
if [ -f "server/.env" ]; then
    # Backup existing .env
    cp server/.env server/.env.backup
    echo "✅ Backup created: server/.env.backup"
    
    # Update MONGO_URI to local
    sed -i '' 's|MONGO_URI=.*|MONGO_URI=mongodb://localhost:27017/hospital|' server/.env
    echo "✅ .env file updated to use local MongoDB"
else
    echo "⚠️  .env file not found. Creating new one..."
    cat > server/.env << EOF
MONGO_URI=mongodb://localhost:27017/hospital
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
EOF
    echo "✅ .env file created"
fi

# Create test accounts
echo ""
echo "👥 Creating test accounts..."
cd server
node scripts/createAllTestAccounts.js
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start backend: cd server && npm start"
echo "2. Start frontend: cd client && npm start"
echo "3. Open browser: http://localhost:3001"
echo ""
echo "🎉 Ab project internet ke bina chalega!"

