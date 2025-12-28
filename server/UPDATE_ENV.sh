#!/bin/bash

echo "🔧 MongoDB Atlas Connection String Setup"
echo ""
echo "Yeh script .env file update karega"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    touch .env
fi

echo "MongoDB Atlas se connection string lo:"
echo "1. Database → Connect → Connect your application"
echo "2. Connection string copy karo"
echo ""
read -p "Connection string paste karo (mongodb+srv://...): " MONGO_URI

# Extract password if needed
if [[ $MONGO_URI == *"<password>"* ]]; then
    echo ""
    read -p "Database user ka password enter karo: " PASSWORD
    MONGO_URI=$(echo $MONGO_URI | sed "s/<password>/$PASSWORD/")
fi

# Add database name if not present
if [[ $MONGO_URI != *"/hospital-management"* ]]; then
    MONGO_URI="${MONGO_URI%/}?retryWrites=true&w=majority"
    MONGO_URI="${MONGO_URI%?retryWrites=true&w=majority}/hospital-management?retryWrites=true&w=majority"
fi

# Update .env file
echo "PORT=6000" > .env
echo "MONGO_URI=$MONGO_URI" >> .env
echo "JWT_SECRET=hospital-management-secret-key-2024" >> .env

echo ""
echo "✅ .env file updated!"
echo ""
echo "Ab server restart karo:"
echo "  npm start"
echo ""

