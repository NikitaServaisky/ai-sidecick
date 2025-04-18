# AI Sidekick

AI Sidekick is a personal productivity app designed to help users manage their daily routines, calendar events, and receive smart morning tips. Built with React Native and structured for clean modular development.

---

## 📁 Project Structure
```
ai-sidekick/
├── App.js                  # Main app component
├── index.js                # Entry point using AppRegistry
├── app.json                # Expo configuration
├── app.config.js           # Dynamic config if needed
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Lock file for npm
├── assets/                 # App icons and splash images
│   ├── favicon.png
│   ├── splash-icon.png
│   ├── icon.png
│   └── adaptive-icon.png
├── components/             # Shared UI components
│   └── MorningTip.js       # Morning tip display component
├── screens/                # Screen views
│   ├── CalendarScreen.js   # Weekly/monthly calendar UI
│   └── HomeScreen.js       # App home screen
├── services/               # Utility logic and services
│   ├── CalendarUtils.js    # Helper functions for calendar logic
│   └── notifications.js    # Local notifications handling
```

---

## 🛠️ Getting Started

1. Install Node.js and npm  
2. Install Expo CLI:

```bash
npm install -g expo-cli
```

3. Install project dependencies:

```bash
npm install
```

4. Start the development server:

```bash
expo start
```

Scan the QR code using the Expo Go app on your device, or use an Android/iOS emulator.

---

## 🧪 Features (In Progress)

- [ ] Weekly calendar screen with gestures  
- [ ] Daily motivational tips  
- [ ] Push notification system  
- [ ] Custom habit tracking system  
- [ ] Local holiday recognition logic (future)

---

## 🔒 Privacy & Ownership

This app does not use third-party data storage or analytics.  
All data is intended to be stored locally or on a private server.  
Expo is used solely as a development and build tool and does not access user data.

---

## 📌 Notes for Developers

- Use clear commit messages, e.g., `feat: add calendar screen` or `fix: adjust layout for tablet view`
- Keep this README updated with any structural or functional changes
- Document new components or utilities in-line and in the README when appropriate

---

Built by [Nikita Servaisky](https://github.com/NikitaServaisky) with assistance from ChatGPT.

> "I prefer to be honest and give credit where it's due, even if it means a little less spotlight."
