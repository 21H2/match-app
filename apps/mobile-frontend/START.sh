#!/bin/bash

echo "🚀 BUNK MOBILE FRONTEND - QUICK START"
echo "===================================="
echo ""

cd "$(dirname "$0")"

echo "📍 Current directory: $(pwd)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🧹 Clearing caches..."
rm -rf .expo 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

echo ""
echo "🎯 Starting Expo development server..."
echo ""
echo "📱 Options:"
echo "  - Press 'a' for Android"
echo "  - Press 'i' for iOS (Mac only)"
echo "  - Press 'w' for web"
echo "  - Scan QR code with Expo Go app"
echo ""
echo "✅ App should load without white screen or crashes"
echo ""

npx expo start --clear

