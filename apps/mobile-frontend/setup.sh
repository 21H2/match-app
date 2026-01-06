#!/bin/bash

# Bunk Mobile Frontend Setup Script

echo "🚀 Setting up Bunk Mobile Frontend..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the mobile-frontend directory."
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 20.x or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    npm install
else
    echo "❌ Error: No package manager found. Please install npm or pnpm."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual values before building."
fi

# Check for EAS CLI
if ! command -v eas &> /dev/null; then
    echo "⚠️  EAS CLI is not installed globally."
    echo "   For remote builds, install it with: npm install -g eas-cli"
    echo "   Then login with: eas login"
else
    echo "✅ EAS CLI version: $(eas --version)"
fi

# Check for Expo CLI
if ! command -v expo &> /dev/null; then
    echo "⚠️  Expo CLI is not installed globally."
    echo "   Install it with: npm install -g expo-cli"
else
    echo "✅ Expo CLI installed"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your project configuration"
echo "2. Run 'npm start' to start the development server"
echo "3. For EAS builds:"
echo "   - Install EAS CLI: npm install -g eas-cli"
echo "   - Login: eas login"
echo "   - Configure: eas build:configure"
echo "   - Build: eas build --platform android --profile preview"
echo ""
