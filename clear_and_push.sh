#!/bin/bash

echo "🔧 Clearing Git Credentials..."
echo ""

# Clear credentials
printf "host=github.com\nprotocol=https\n\n" | git credential-osxkeychain erase 2>/dev/null

echo "✅ Credentials cleared!"
echo ""
echo "📋 Next Steps:"
echo "1. Personal Access Token banayein:"
echo "   https://github.com/settings/tokens"
echo ""
echo "2. Push karein:"
echo "   git push -u origin master"
echo ""
echo "3. Authentication:"
echo "   Username: NamraRauf"
echo "   Password: [Your Personal Access Token]"
echo ""
