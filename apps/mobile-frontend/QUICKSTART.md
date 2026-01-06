# Bunk Mobile Frontend - Quick Start Guide

## Initial Setup

1. **Run the setup script:**
   ```bash
   cd apps/mobile-frontend
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update `EXPO_PUBLIC_EAS_PROJECT_ID` with your project ID

## Development

```bash
# Start development server
npm start

# Run on Android emulator/device
npm run android

# Run on iOS simulator (macOS only)
npm run ios
```

## EAS Remote Builds (Production)

### First Time Setup

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure your project:**
   ```bash
   eas build:configure
   ```
   This will:
   - Create/update your EAS project
   - Generate a project ID
   - Update your `app.config.ts`

### Building

#### Android APK (for testing)
```bash
eas build --platform android --profile preview
```
This creates an APK file you can install directly on Android devices.

#### Android AAB (for Play Store)
```bash
eas build --platform android --profile production
```
This creates an Android App Bundle for Google Play Store submission.

#### iOS (for App Store)
```bash
eas build --platform ios --profile production
```

### Checking Build Status

```bash
# View all builds
eas build:list

# View specific build
eas build:view [build-id]
```

### Downloading Builds

After a successful build:
1. Go to https://expo.dev
2. Navigate to your project
3. Click on "Builds"
4. Download the APK/AAB/IPA file

Or use CLI:
```bash
eas build:download [build-id]
```

## Build Profiles

The app is configured with three build profiles in `eas.json`:

### `development`
- Creates a development client with debugging tools
- Use for testing with Expo Go-like experience
- Includes developer menu

```bash
eas build --platform android --profile development
```

### `preview`
- Creates an APK for internal testing
- Smaller file size, easy to share
- No app store required

```bash
eas build --platform android --profile preview
```

### `production`
- Creates optimized builds for app stores
- AAB for Google Play Store
- Includes all release optimizations

```bash
eas build --platform android --profile production
```

## Troubleshooting

### "Project not found" error
- Run `eas build:configure` to set up your project
- Make sure you're logged in with `eas login`
- Check that your project ID is set in `app.config.ts`

### Build fails
- Check build logs in EAS dashboard
- Verify all dependencies are compatible
- Make sure your package name is unique

### APK won't install
- Enable "Install from Unknown Sources" on Android
- Check that the APK is for the correct architecture
- Try uninstalling any previous versions

## Next Steps

1. **Customize the app:**
   - Update app name in `app.config.ts`
   - Change package name: `android.package` and `ios.bundleIdentifier`
   - Add your app icon and splash screen to `assets/`

2. **Add features:**
   - Create new screens in `src/app/`
   - Add components in `src/components/`
   - Set up state management if needed

3. **Deploy:**
   - Build with production profile
   - Submit to Google Play Store or App Store
   - Use EAS Submit: `eas submit --platform android`

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

## Support

For issues or questions:
- Check [Expo Forums](https://forums.expo.dev/)
- Read [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- Review [Troubleshooting Guide](https://docs.expo.dev/build-reference/troubleshooting/)
