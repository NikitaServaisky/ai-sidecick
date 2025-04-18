export default {
  name: "ai-sidekick",
  slug: "ai-sidekick",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  platforms: ["ios", "android", "web"], // הוספנו תמיכה מפורשת ב־web
  android: {
    package: "com.nikitaservaisky.aisidekick",
    intentFilters: [
      {
        action: "VIEW",
        data: {
          scheme: "aisidekick"
        },
        category: ["BROWSABLE", "DEFAULT"]
      }
    ]
  },
  ios: {
    bundleIdentifier: "com.anonymous.aisidekick"
  },
  web: {
    bundler: "metro" // הגדרה ברורה ש־expo web ירוץ עם מטרו
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ["**/*"],
  runtimeVersion: {
    policy: "sdkVersion"
  }
};
