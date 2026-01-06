#!/bin/bash

# Bunk Mobile Frontend - Build Validation Script

echo "🔍 Validating Bunk Mobile Frontend Build Configuration..."
echo ""

ERRORS=0
WARNINGS=0

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in mobile-frontend directory"
    exit 1
fi

echo "✅ In correct directory"

# Check required files
echo ""
echo "📁 Checking required files..."

required_files=(
    "package.json"
    "app.config.ts"
    "eas.json"
    "tsconfig.json"
    "babel.config.js"
    "metro.config.js"
    "index.js"
    ".gitignore"
    ".env.example"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ Missing: $file"
        ((ERRORS++))
    fi
done

# Check required directories
echo ""
echo "📂 Checking required directories..."

required_dirs=(
    "src"
    "src/app"
    "assets"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir/"
    else
        echo "  ❌ Missing: $dir/"
        ((ERRORS++))
    fi
done

# Check app files
echo ""
echo "📱 Checking app structure..."

app_files=(
    "src/app/_layout.tsx"
    "src/app/index.tsx"
)

for file in "${app_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ Missing: $file"
        ((ERRORS++))
    fi
done

# Check assets
echo ""
echo "🎨 Checking assets..."

asset_files=(
    "assets/icon.png"
    "assets/splash.png"
    "assets/adaptive-icon.png"
)

for file in "${asset_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ⚠️  Missing: $file (will need real assets for build)"
        ((WARNINGS++))
    fi
done

# Check Node.js
echo ""
echo "🔧 Checking tools..."

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  ✅ Node.js: $NODE_VERSION"
    
    # Check if version is 20.x or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
    if [ "$MAJOR_VERSION" -lt 20 ]; then
        echo "  ⚠️  Warning: Node.js 20.x or higher recommended"
        ((WARNINGS++))
    fi
else
    echo "  ❌ Node.js not found"
    ((ERRORS++))
fi

# Check npm/pnpm
if command -v pnpm &> /dev/null; then
    echo "  ✅ pnpm: $(pnpm --version)"
elif command -v npm &> /dev/null; then
    echo "  ✅ npm: $(npm --version)"
else
    echo "  ❌ No package manager found"
    ((ERRORS++))
fi

# Check EAS CLI
if command -v eas &> /dev/null; then
    echo "  ✅ EAS CLI: $(eas --version)"
else
    echo "  ⚠️  EAS CLI not installed (needed for remote builds)"
    echo "     Install with: npm install -g eas-cli"
    ((WARNINGS++))
fi

# Check .env file
echo ""
echo "⚙️  Checking configuration..."

if [ -f ".env" ]; then
    echo "  ✅ .env file exists"
    if grep -q "your-project-id-here" ".env" 2>/dev/null; then
        echo "  ⚠️  .env still has placeholder values"
        ((WARNINGS++))
    fi
else
    echo "  ⚠️  .env file not found (copy from .env.example)"
    ((WARNINGS++))
fi

# Check package.json for package name
if grep -q '"name": "@bunk/mobile-frontend"' package.json; then
    echo "  ✅ Package name configured"
else
    echo "  ⚠️  Package name might need updating"
    ((WARNINGS++))
fi

# Check app.config.ts for package identifiers
if [ -f "app.config.ts" ]; then
    if grep -q 'package: "app.bunk.frontend"' app.config.ts; then
        echo "  ✅ Android package configured"
    else
        echo "  ⚠️  Android package name might need updating"
        ((WARNINGS++))
    fi
    
    if grep -q 'bundleIdentifier: "app.bunk.frontend"' app.config.ts; then
        echo "  ✅ iOS bundle identifier configured"
    else
        echo "  ⚠️  iOS bundle identifier might need updating"
        ((WARNINGS++))
    fi
fi

# Test TypeScript compilation
echo ""
echo "🔨 Testing TypeScript compilation..."

if npm run typecheck &> /dev/null; then
    echo "  ✅ TypeScript compilation successful"
else
    echo "  ⚠️  TypeScript has some issues (check with: npm run typecheck)"
    ((WARNINGS++))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Validation Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✨ All checks passed! Your app is ready to build."
    echo ""
    echo "Next steps:"
    echo "1. Install dependencies: npm install"
    echo "2. Start development: npm start"
    echo "3. Build for Android: npm run build:preview"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  $WARNINGS warning(s) found"
    echo ""
    echo "Your app can be built, but you may want to address the warnings above."
    echo ""
    exit 0
else
    echo "❌ $ERRORS error(s) and $WARNINGS warning(s) found"
    echo ""
    echo "Please fix the errors above before building."
    echo ""
    exit 1
fi
