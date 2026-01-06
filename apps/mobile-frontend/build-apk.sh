#!/bin/bash

echo "🏗️  Building Android APK..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this from the mobile-frontend directory"
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm not found"
    exit 1
fi

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    echo "Installing globally with npm..."
    npm install -g eas-cli
    
    if [ $? -ne 0 ]; then
        echo "⚠️  Global install failed, trying local install..."
        npm install eas-cli
        # Use npx for local install
        alias eas='npx eas-cli'
    fi
    echo "✅ EAS CLI installed"
    echo ""
fi

# Check if logged in
echo "🔐 Checking Expo login status..."
if ! eas whoami &> /dev/null; then
    echo "⚠️  Not logged in to Expo"
    echo "Please login with your Expo account:"
    eas login
    
    if [ $? -ne 0 ]; then
        echo "❌ Login failed"
        exit 1
    fi
    echo "✅ Login successful"
    echo ""
fi

# Configure project if needed
echo "⚙️  Checking project configuration..."
if ! grep -q "projectId" app.config.ts 2>/dev/null || grep -q "your-project-id" app.config.ts 2>/dev/null; then
    echo "📝 Configuring EAS project..."
    eas build:configure
    
    if [ $? -ne 0 ]; then
        echo "❌ Configuration failed"
        exit 1
    fi
    echo "✅ Project configured"
    echo ""
fi

# Start the build
echo "🚀 Starting Android APK build (preview profile)..."
echo "This will take 5-15 minutes..."
echo ""
echo "You can:"
echo "  - Monitor progress in the terminal"
echo "  - Visit https://expo.dev to see build status"
echo "  - Press Ctrl+C to return to terminal (build continues remotely)"
echo ""

eas build --platform android --profile preview

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build complete!"
    echo ""
    echo "📥 Download your APK:"
    echo "  1. Visit: https://expo.dev"
    echo "  2. Go to your project → Builds"
    echo "  3. Download the APK"
    echo ""
    echo "Or use CLI: eas build:list"
else
    echo ""
    echo "❌ Build failed"
    echo ""
    echo "Troubleshooting:"
    echo "  - Check build logs at: https://expo.dev"
    echo "  - Try: eas build --clear-cache"
    echo "  - See COMPLETE_GUIDE.md for help"
fi
