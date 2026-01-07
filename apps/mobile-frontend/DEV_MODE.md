# Development Mode Setup (Codespace + Phone)

## Quick Start

```bash
cd apps/mobile-frontend
./start-dev.sh
# Or: pnpm start:tunnel
```

## What You Need

### 1. On Your Phone:
- Install **Expo Go** app
  - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### 2. In Codespace:
- Run the development server with tunnel mode

## Step-by-Step

### 1. Start Metro Server with Tunnel
```bash
cd /workspaces/match-app/apps/mobile-frontend
pnpm start:tunnel
```

Wait for:
- ✅ Metro bundler to start
- ✅ Expo tunnel to connect (uses ngrok automatically)
- ✅ QR code to appear

### 2. Connect Your Phone

**Option A: Scan QR Code (Easiest)**
1. Open **Expo Go** app on your phone
2. Tap "Scan QR code"
3. Scan the QR code shown in terminal
4. Wait for app to load

**Option B: Manual URL**
1. Copy the `exp://` URL from terminal
2. Open it in Expo Go app

### 3. Development Features

Once connected:
- 🔥 **Fast Refresh** - Code changes appear instantly
- 🐛 **Error Overlay** - See errors on phone screen
- 🔍 **Debug Menu** - Shake phone to access
- 📱 **Live Reload** - Auto-reload on file save

### Shake Menu Options:
- Reload - Restart the app
- Debug Remote JS - Open Chrome DevTools
- Show Performance Monitor
- Toggle Inspector

## Troubleshooting

### "Unable to connect to Metro"
```bash
# Restart with clear cache
pnpm start:tunnel --clear
```

### Tunnel Issues
```bash
# Check if ngrok is working
# Expo uses built-in ngrok tunneling
# Just make sure you see "Tunnel ready" message
```

### Slow Loading
- First load is always slower (downloading bundle)
- Subsequent hot reloads are instant
- Use production builds for final testing

## Development vs Production

| Feature | Development (Tunnel) | Production (APK) |
|---------|---------------------|------------------|
| Setup | Need Metro + Phone | Just install APK |
| Changes | Instant hot reload | Rebuild APK |
| Performance | Slower | Full speed |
| Debugging | Full dev tools | Limited |
| Network | Needs tunnel | Standalone |
| Best For | Active coding | Testing/Demo |

## Tips

1. **Keep codespace awake** - Metro needs to stay running
2. **Use WiFi** - Faster than mobile data for development
3. **Shake device** - Access debug menu
4. **Check logs** - Terminal shows all console.log outputs
5. **Restart if stuck** - Press 'r' in terminal to reload

## Production Testing

When ready to test production build:
```bash
# Push changes to trigger GitHub Actions
git add .
git commit -m "Your changes"
git push origin main

# Wait for build, then download APK from Releases
```

## Common Commands

```bash
# Start with tunnel (for codespace)
pnpm start:tunnel

# Start with tunnel + clear cache
pnpm start:tunnel --clear

# Start on LAN (local network only)
pnpm start:lan

# Regular start (localhost)
pnpm start
```
