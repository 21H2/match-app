# Building Android APK with GitHub Actions

## Automatic Builds

The Android APK is automatically built on:
- ✅ Push to `main` branch
- ✅ Pull requests to `main`
- ✅ Manual trigger (workflow_dispatch)

## How to Build

### Option 1: Automatic (on push)
```bash
git add .
git commit -m "Build Android app"
git push origin main
```

### Option 2: Manual Trigger
1. Go to: https://github.com/21H2/match-app/actions
2. Click "Build Android APK"
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow"

## Download APK

After the build completes (5-10 minutes):

1. Go to: https://github.com/21H2/match-app/actions
2. Click on the latest workflow run
3. Scroll to "Artifacts"
4. Download `bunk-app-release`
5. Extract the ZIP to get your APK

## Releases

When you push to `main`, the APK is also:
- Automatically tagged (v1.0.1, v1.0.2, etc.)
- Published as a GitHub Release
- Available at: https://github.com/21H2/match-app/releases

## Build Process

The GitHub Action:
1. Sets up Node.js, Java 17, and Android SDK
2. Installs dependencies with pnpm
3. Runs `expo prebuild` to generate Android files
4. Builds the release APK with Gradle
5. Uploads APK as artifact
6. Creates a GitHub Release (on main branch)

## Local Development

To develop locally:
```bash
cd apps/mobile-frontend
pnpm install
pnpm start
```

## Troubleshooting

### Build Failed
Check the logs at: https://github.com/21H2/match-app/actions

Common fixes:
- Ensure all dependencies are in package.json
- Check app.config.ts is valid
- Verify Android package name is unique

### APK Not Found
- Wait for build to complete (check Actions tab)
- Build only triggers on changes to `apps/mobile-frontend/**`
- Use manual trigger if needed

## Configuration

Edit the workflow at: `.github/workflows/build-android.yml`

Key settings:
- **Java version**: 17 (Android requirement)
- **Node version**: 20 (matches project)
- **Artifact retention**: 30 days
- **Gradle**: No daemon for CI efficiency

## Signing

The APK is signed with a debug key. For production:

1. Generate a keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Add to GitHub Secrets:
   - `ANDROID_KEYSTORE_BASE64`
   - `ANDROID_KEY_ALIAS`
   - `ANDROID_KEY_PASSWORD`
   - `ANDROID_STORE_PASSWORD`

3. Update workflow to use signing config

## Costs

GitHub Actions is free for public repos:
- ✅ 2,000 minutes/month free
- ✅ Each build takes ~5-10 minutes
- ✅ ~200-400 builds per month free

For private repos:
- First 2,000 minutes free
- $0.008 per minute after

## Next Steps

1. **Commit and push** to trigger a build
2. **Watch the build** in Actions tab
3. **Download APK** from artifacts
4. **Install on device** and test

```bash
# Quick start
git add .github/workflows/build-android.yml
git commit -m "Add Android build workflow"
git push origin main
```

Then visit: https://github.com/21H2/match-app/actions
