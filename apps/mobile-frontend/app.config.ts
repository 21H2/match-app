import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Pegada",
  slug: "pegada-mobile",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  scheme: "pegada",
  platforms: ["ios", "android"],
  
  splash: {
    backgroundColor: "#EE61A1",
    resizeMode: "contain"
  },
  
  android: {
    package: "app.pegada",
    versionCode: 1,
    adaptiveIcon: {
      backgroundColor: "#EE61A1"
    },
    permissions: [],
    softwareKeyboardLayoutMode: "pan"
  },
  
  ios: {
    bundleIdentifier: "app.pegada",
    buildNumber: "1",
    supportsTablet: true
  },
  
  web: {
    bundler: "metro",
    output: "static",
    favicon: undefined
  },
  
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        resizeMode: "contain"
      }
    ]
  ],
  
  experiments: {
    typedRoutes: true
  },
  
  extra: {
    eas: {
      projectId: "7a9db95f-7cdb-4498-a1e8-a8eb1397104a"
    }
  }
};

export default config;
