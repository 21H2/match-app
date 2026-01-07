#!/bin/bash

echo "🔍 VALIDATING MOBILE FRONTEND"
echo "=============================="
echo ""

cd "$(dirname "$0")"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check files exist
echo "📂 Checking critical files..."
FILES=(
    "index.js"
    "package.json"
    "app.config.ts"
    "app.json"
    "tsconfig.json"
    "metro.config.js"
    "babel.config.js"
    "src/app/_layout.tsx"
    "src/app/index.tsx"
)

ALL_GOOD=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file exists"
    else
        echo -e "${RED}❌${NC} $file MISSING!"
        ALL_GOOD=false
    fi
done

echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅${NC} node_modules exists"
else
    echo -e "${RED}⚠️${NC} node_modules not found - run 'pnpm install'"
fi

echo ""
echo "🔧 Checking configuration..."

# Check package.json main field
if grep -q '"main": "index.js"' package.json; then
    echo -e "${GREEN}✅${NC} package.json main field correct"
else
    echo -e "${RED}❌${NC} package.json main field incorrect"
    ALL_GOOD=false
fi

# Check index.js
if grep -q "expo-router/entry" index.js; then
    echo -e "${GREEN}✅${NC} index.js entry point correct"
else
    echo -e "${RED}❌${NC} index.js entry point incorrect"
    ALL_GOOD=false
fi

# Check tsconfig moduleResolution
if grep -q '"moduleResolution": "bundler"' tsconfig.json; then
    echo -e "${GREEN}✅${NC} tsconfig.json moduleResolution correct"
else
    echo -e "${RED}❌${NC} tsconfig.json moduleResolution incorrect"
    ALL_GOOD=false
fi

echo ""
echo "=============================="
if [ "$ALL_GOOD" = true ]; then
    echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
    echo ""
    echo "Ready to start:"
    echo "  bash START.sh"
    echo "  or"
    echo "  pnpm start"
    exit 0
else
    echo -e "${RED}❌ SOME CHECKS FAILED${NC}"
    echo ""
    echo "Please fix the issues above"
    exit 1
fi
