#!/bin/bash

echo "🔧 Fixing Permission Error"
echo "========================="
echo ""
echo "Step 1: Clearing old credentials..."
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
