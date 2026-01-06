# 🚀 Bunk Mobile Frontend - Complete Guide

A standalone, frontend-only React Native mobile app built with Expo, ready for EAS remote builds.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [What's Included](#whats-included)
3. [Development](#development)
4. [Building with EAS](#building-with-eas)
5. [Project Structure](#project-structure)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Start

### Step 1: Setup

```bash
cd apps/mobile-frontend

# Make setup script executable
chmod +x setup.sh validate.sh

# Run setup
./setup.sh

# Validate configuration
./validate.sh
```

### Step 2: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 3: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and update:
# - EXPO_PUBLIC_EAS_PROJECT_ID
```

### Step 4: Start Development

```bash
npm start
```

---

## 📦 What's Included

### ✅ Core Features
- React Native 0.74.3 with Expo SDK 51
- Expo Router for file-based navigation
- TypeScript configuration
- ESLint & Prettier setup
- EAS Build configuration
- Android & iOS support

### ✅ Development Tools
- Hot reload development server
- TypeScript type checking
- Linting and code formatting
- Build validation scripts

### ✅ Build Profiles
- **Development**: Debug builds with dev tools
- **Preview**: APK for testing
- **Production**: Optimized for app stores

### ✅ Documentation
- `README.md` - Project overview
- `QUICKSTART.md` - Fast setup guide
- `EAS_WORKFLOW.md` - Complete build workflow
- `COMPLETE_GUIDE.md` - This file

---

## 💻 Development

### Local Development

```bash
# Start Expo dev server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Open in web browser
npm run web
```

### Development Workflow

1. **Start the server**: `npm start`
2. **Scan QR code** with Expo Go app
3. **Make changes** - hot reload enabled
4. **Test on device** in real-time

### Code Quality

```bash
# Run TypeScript type checking
npm run typecheck

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

---

## 🏗️ Building with EAS

### Prerequisites

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure project (first time only)
eas build:configure
```

### Build Commands

#### Quick Reference

```bash
# Development build
npm run build:dev

# Preview APK (for testing)
npm run build:preview

# Production build
npm run build:prod

# iOS production build
npm run build:ios:prod
```

#### Detailed Commands

```bash
# Android Preview (APK for direct install)
eas build --platform android --profile preview

# Android Production (AAB for Play Store)
eas build --platform android --profile production

# iOS Production
eas build --platform ios --profile production

# Build for both platforms
eas build --platform all --profile production
```

### Build Monitoring

```bash
# List all builds
eas build:list

# View specific build details
eas build:view [build-id]

# Cancel a running build
eas build:cancel [build-id]
```

### Download Builds

```bash
# Download via CLI
eas build:download [build-id]

# Or visit: https://expo.dev
# Navigate to: Your Project → Builds → Download
```

---

## 📁 Project Structure

```
mobile-frontend/
├── src/
│   └── app/                    # Expo Router pages
│       ├── _layout.tsx        # Root layout
│       └── index.tsx          # Home screen
│
├── assets/                     # Images, fonts, etc.
│   ├── icon.png              # App icon
│   ├── splash.png            # Splash screen
│   └── adaptive-icon.png     # Android adaptive icon
│
├── .env.example               # Environment template
├── .eslintrc.js              # ESLint configuration
├── .gitignore                # Git ignore rules
├── .prettierrc.js            # Prettier configuration
├── app.config.ts             # Expo app configuration
├── app.json                  # Expo app metadata
├── babel.config.js           # Babel configuration
├── eas.json                  # EAS Build configuration
├── index.js                  # App entry point
├── metro.config.js           # Metro bundler config
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
│
├── README.md                 # Overview
├── QUICKSTART.md            # Quick setup
├── EAS_WORKFLOW.md          # Build workflow
├── COMPLETE_GUIDE.md        # This file
│
├── setup.sh                 # Setup script
└── validate.sh              # Validation script
```

---

## ⚙️ Configuration

### App Configuration (app.config.ts)

Key settings to customize:

```typescript
{
  name: "Bunk",                          // App display name
  scheme: "bunk",                        // URL scheme
  slug: "bunk-frontend",                 // Expo slug
  version: "1.0.0",                      // App version
  
  android: {
    package: "app.bunk.frontend"         // Android package name
  },
  
  ios: {
    bundleIdentifier: "app.bunk.frontend" // iOS bundle ID
  }
}
```

### EAS Build Configuration (eas.json)

Build profiles:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Environment Variables

In `.env`:
```bash
# Required for EAS builds
EXPO_PUBLIC_EAS_PROJECT_ID=your-project-id

# Optional: Add your own variables
# EXPO_PUBLIC_API_URL=https://api.example.com
# EXPO_PUBLIC_FEATURE_FLAG=true
```

Access in code:
```typescript
const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
```

---

## 🔧 Customization Guide

### 1. Change App Name

**app.config.ts:**
```typescript
name: "Your App Name",
slug: "your-app-slug",
```

### 2. Update Package Names

**app.config.ts:**
```typescript
android: {
  package: "com.yourcompany.yourapp"
},
ios: {
  bundleIdentifier: "com.yourcompany.yourapp"
}
```

### 3. Replace App Icon

Replace these files in `assets/`:
- `icon.png` - 1024x1024px PNG
- `splash.png` - 1284x2778px PNG  
- `adaptive-icon.png` - 1024x1024px PNG (Android)

### 4. Add New Screens

Create new files in `src/app/`:

```typescript
// src/app/about.tsx
export default function AboutScreen() {
  return <View><Text>About</Text></View>;
}
```

Navigate to `/about` in your app.

### 5. Configure Theme

Edit colors in your components or create a theme file:

```typescript
// src/theme.ts
export const theme = {
  colors: {
    primary: '#EE61A1',
    background: '#FFFFFF',
    text: '#000000',
  }
};
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Cannot find module" errors

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Or with pnpm
rm -rf node_modules
pnpm install
```

#### 2. Metro bundler issues

```bash
# Clear Metro cache
npm start -- --clear

# Or reset completely
watchman watch-del-all
rm -rf node_modules
npm install
npm start -- --reset-cache
```

#### 3. TypeScript errors

```bash
# Check for errors
npm run typecheck

# Common fix: reinstall types
npm install @types/react @types/react-dom
```

#### 4. EAS Build fails

```bash
# Clear cache and rebuild
eas build --platform android --profile preview --clear-cache

# Check build logs in EAS dashboard
# Visit: https://expo.dev → Your Project → Builds
```

#### 5. App crashes on startup

- Check Metro logs for errors
- Verify all dependencies are installed
- Test in Expo Go first
- Check for missing environment variables

### Build Errors

#### "Project not found"

```bash
eas build:configure
```

#### "Invalid bundle identifier"

Update `ios.bundleIdentifier` in `app.config.ts` to a unique value.

#### "Package name already exists"

Update `android.package` in `app.config.ts` to a unique value.

### Development Errors

#### Port already in use

```bash
# Kill process on port 8081
kill -9 $(lsof -ti:8081)

# Or use different port
npm start -- --port 8082
```

#### Expo Go connection issues

1. Ensure device and computer are on same WiFi
2. Try tunnel mode: `npm start -- --tunnel`
3. Use QR code instead of manual URL entry

---

## 📚 Additional Resources

### Official Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)

### Tutorials
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [EAS Build Tutorial](https://docs.expo.dev/build/introduction/)
- [Expo Router Tutorial](https://docs.expo.dev/router/introduction/)

### Community
- [Expo Forums](https://forums.expo.dev/)
- [Discord](https://chat.expo.dev/)
- [GitHub Discussions](https://github.com/expo/expo/discussions)

### Tools
- [Expo Snack](https://snack.expo.dev/) - Online playground
- [EAS Dashboard](https://expo.dev/) - Build management
- [Expo Status](https://status.expo.dev/) - Service status

---

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] Update version in `app.config.ts`
- [ ] Replace placeholder icons and splash screens
- [ ] Update app name and package identifiers
- [ ] Set up proper `.env` configuration
- [ ] Test on physical devices
- [ ] Run `npm run typecheck`
- [ ] Run `npm run lint`
- [ ] Build preview APK and test thoroughly
- [ ] Create production build
- [ ] Test production build on multiple devices
- [ ] Prepare store listings and screenshots
- [ ] Submit to app stores

---

## 📝 License

This project is private and proprietary.

---

## 🤝 Support

For issues or questions:

1. Check this documentation
2. Review [Troubleshooting](#troubleshooting) section
3. Check [Expo Forums](https://forums.expo.dev/)
4. Review EAS Build logs at https://expo.dev

---

## 🎉 Success!

Your frontend-only mobile app is ready to build and deploy!

**Quick Commands:**
```bash
npm install          # Install dependencies
npm start           # Start development
npm run build:preview   # Build Android APK
npm run build:prod     # Build for production
```

Happy coding! 🚀
