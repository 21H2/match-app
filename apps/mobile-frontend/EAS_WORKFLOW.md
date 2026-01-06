# Bunk Mobile Frontend - EAS Build Workflow

## Complete Build & Deploy Workflow

### Prerequisites Checklist
- [ ] Node.js 20.x installed
- [ ] EAS CLI installed: `npm install -g eas-cli`
- [ ] Expo account created at https://expo.dev
- [ ] Logged in: `eas login`

### Step 1: Initial Project Configuration

```bash
cd apps/mobile-frontend

# Install dependencies
npm install

# Configure EAS project
eas build:configure
```

This will prompt you to:
1. Create a new project or link to existing
2. Generate a project ID
3. Choose Android/iOS setup

### Step 2: Update Project Configuration

After `eas build:configure`, your project ID will be automatically set. Verify in `app.config.ts`:

```typescript
extra: {
  eas: {
    projectId: "your-generated-project-id"
  }
}
```

### Step 3: Configure Android Package

Update `app.config.ts` to use a unique package name:

```typescript
android: {
  package: "com.yourcompany.bunk"  // Change this!
}
```

### Step 4: Your First Build

#### Option A: Preview Build (APK for testing)
```bash
eas build --platform android --profile preview
```

This creates an APK you can install directly on any Android device.

#### Option B: Production Build (for Play Store)
```bash
eas build --platform android --profile production
```

This creates an AAB (Android App Bundle) for Google Play Store.

### Step 5: Monitor Build Progress

```bash
# Watch build in terminal
eas build:list

# Or visit: https://expo.dev → Your Project → Builds
```

Build typically takes 5-15 minutes.

### Step 6: Download & Test

Once complete:

```bash
# Download via CLI
eas build:download [build-id]

# Or download from: https://expo.dev
```

Install the APK on your Android device:
1. Enable "Install from Unknown Sources"
2. Transfer APK to device
3. Open and install

## Common Build Commands

### Check Project Status
```bash
eas project:info
```

### View All Builds
```bash
eas build:list
```

### Cancel a Build
```bash
eas build:cancel [build-id]
```

### Re-run Last Build
```bash
eas build --platform android --profile preview --non-interactive
```

## Build Profiles Explained

### Development Profile
```bash
eas build --platform android --profile development
```
- Includes dev tools and debugging
- Can use Expo Go-like features
- Larger file size
- **Use for:** Active development and testing

### Preview Profile  
```bash
eas build --platform android --profile preview
```
- Creates APK (not AAB)
- Optimized for internal testing
- Easy to share and install
- **Use for:** QA testing, stakeholder demos

### Production Profile
```bash
eas build --platform android --profile production
```
- Creates AAB for Play Store
- Fully optimized and minified
- Smallest file size
- **Use for:** App store submissions

## Customizing Build Profiles

Edit `eas.json` to add custom configurations:

```json
{
  "build": {
    "staging": {
      "extends": "preview",
      "env": {
        "APP_ENV": "staging"
      },
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

Then build with:
```bash
eas build --platform android --profile staging
```

## Environment Variables

### For Build Time
Add to `eas.json`:
```json
{
  "build": {
    "production": {
      "env": {
        "API_URL": "https://api.production.com"
      }
    }
  }
}
```

### For Runtime
Use `EXPO_PUBLIC_` prefix in `.env`:
```
EXPO_PUBLIC_API_URL=https://api.production.com
```

Access in code:
```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

## Troubleshooting Builds

### Build Fails with "Gradle Error"
```bash
# Try clearing cache
eas build --platform android --profile preview --clear-cache
```

### "Project not found"
```bash
# Re-link project
eas build:configure
```

### Package Name Conflict
Update `android.package` in `app.config.ts` to something unique.

### Build Takes Too Long
- Normal build time: 5-15 minutes
- If >30 minutes, check EAS status: https://status.expo.dev

## App Store Submission

### Google Play Store

1. **Build AAB:**
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit via EAS:**
   ```bash
   eas submit --platform android
   ```

3. **Or manually:**
   - Download AAB from EAS dashboard
   - Upload to Google Play Console
   - Fill in store listing
   - Submit for review

### Apple App Store

1. **Build IPA:**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Submit via EAS:**
   ```bash
   eas submit --platform ios
   ```

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/eas-build.yml`:

```yaml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm install
        working-directory: apps/mobile-frontend
      
      - name: Build Android
        run: eas build --platform android --profile preview --non-interactive
        working-directory: apps/mobile-frontend
```

## Best Practices

1. **Version Management**
   - Update `version` in `app.config.ts` before each build
   - Use semantic versioning: `1.0.0`, `1.0.1`, etc.

2. **Build Profiles**
   - Use `preview` for testing
   - Use `production` for releases
   - Keep `development` for active dev work

3. **Environment Variables**
   - Never commit `.env` files
   - Use EAS Secrets for sensitive data
   - Prefix public vars with `EXPO_PUBLIC_`

4. **Testing**
   - Always test preview builds before production
   - Test on multiple device sizes
   - Verify all features work in standalone mode

## Quick Reference

| Task | Command |
|------|---------|
| Setup | `eas build:configure` |
| Preview APK | `eas build -p android --profile preview` |
| Production AAB | `eas build -p android --profile production` |
| List builds | `eas build:list` |
| Download build | `eas build:download [id]` |
| Submit to store | `eas submit -p android` |

## Support Resources

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- EAS Submit Docs: https://docs.expo.dev/submit/introduction/
- Expo Forums: https://forums.expo.dev/
- EAS Status: https://status.expo.dev/
