#!/bin/bash
set -e

echo "🚀 Starting Bunk Mobile Frontend..."

# Clear any caches
echo "🧹 Clearing caches..."
rm -rf .expo
rm -rf node_modules/.cache
npx expo start --clear

echo "✅ App started!"
