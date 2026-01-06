# Bunk Mobile Frontend

A standalone, frontend-only mobile application built with Expo and React Native.

## Features

- ✨ Built with Expo SDK 51
- 📱 Configured for EAS remote builds
- 🎨 Standalone frontend (no backend dependencies)
- 🚀 Ready for Android and iOS deployment

## Prerequisites

- Node.js 20.x or higher
- npm or pnpm
- Expo CLI
- EAS CLI (for remote builds)

## Installation

```bash
cd apps/mobile-frontend
npm install
```

## Development

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## EAS Remote Builds

### Setup

1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Login to your Expo account:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

### Building

```bash
# Build for Android (APK for testing)
eas build --platform android --profile preview

# Build for Android (AAB for Play Store)
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production
```

### Build Profiles

- **development**: Creates a development build with debug tools
- **preview**: Creates an APK for internal testing
- **production**: Creates optimized builds for app stores

## Project Structure

```
mobile-frontend/
├── src/
│   └── app/           # Expo Router pages
│       ├── _layout.tsx
│       └── index.tsx
├── assets/            # Images, fonts, etc.
├── app.config.ts      # Expo configuration
├── eas.json          # EAS Build configuration
├── package.json
└── tsconfig.json
```

## Configuration

### App Config (app.config.ts)

Update the following in `app.config.ts`:
- `name`: Your app display name
- `scheme`: Your app URL scheme
- `android.package`: Your Android package name
- `ios.bundleIdentifier`: Your iOS bundle identifier
- `extra.eas.projectId`: Your EAS project ID

### EAS Config (eas.json)

The build profiles are pre-configured for:
- Development builds with debug tools
- Preview builds (APK) for testing
- Production builds for app stores

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
EXPO_PUBLIC_EAS_PROJECT_ID=your-project-id-here
```

## Deployment

### Android

1. Build the app:
```bash
eas build --platform android --profile production
```

2. Download the AAB file from EAS dashboard
3. Upload to Google Play Console

### iOS

1. Build the app:
```bash
eas build --platform ios --profile production
```

2. Submit to App Store:
```bash
eas submit --platform ios
```

## Troubleshooting

### Common Issues

**Build fails with "Project ID not found"**
- Set your project ID in `app.config.ts` under `extra.eas.projectId`
- Or run `eas build:configure` to set it up

**Android build fails**
- Make sure your `android.package` in `app.config.ts` is unique
- Check that all required permissions are declared

**iOS build fails**
- Ensure your `ios.bundleIdentifier` is unique
- Verify your Apple Developer account is set up correctly

## Support

For more information:
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
