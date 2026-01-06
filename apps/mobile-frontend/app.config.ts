import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  version: "1.0.0",
  runtimeVersion: {
    policy: "appVersion"
  },
  name: "Bunk",
  scheme: "bunk",
  slug: "bunk-frontend",
  orientation: "portrait",
  platforms: ["ios", "android"],
  
  plugins: [
    "expo-router"
  ],
  
  androidStatusBar: {
    barStyle: "dark-content",
    backgroundColor: "#ffffff"
  },
  
  android: {
    package: "app.bunk.frontend"
  },
  
  ios: {
    bundleIdentifier: "app.bunk.frontend"
  },
  
  extra: {
    eas: {
      projectId: "7a9db95f-7cdb-4498-a1e8-a8eb1397104a"
    }
  }
};

export default config;
