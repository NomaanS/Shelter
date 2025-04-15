# 🏡 Shelter – Real Estate Mobile App

**Shelter** is a cross-platform mobile application built with **Expo (React Native + TypeScript)** that allows users to browse property listings, view detailed information, and book viewings. It integrates with **Firebase** for authentication and Firestore data storage, and uses **Google Maps** for property location viewing.

---

## 🚀 Features

- 🔐 **User Authentication** with Firebase (Sign Up / Login)
- 🏘️ **View All Properties** in a tab-based layout
- 📋 **View Property Details** (images, price, description, etc.)
- 📅 **Book Property Viewings** via Firestore
- 📍 **Google Maps Integration** to view property locations
- 📱 **Responsive Design** for both mobile and tablet devices

---

## 📦 Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) (Auth + Firestore)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)

---

## 🧑‍💻 How to Run This App Locally

### 📌 Prerequisites

- [Node.js (LTS)](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- A Firebase Project with:
  - Authentication enabled (Email/Password)
  - Firestore database set up

---

### 🛠️ Installation Steps

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/shelter.git

# Navigate to the project directory
cd shelter

# Install dependencies
npm install

# Start Expo development server
npx expo start

├── README.md
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── bookings.tsx
│   │   ├── explore.tsx
│   │   ├── index.tsx
│   │   └── properties.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   ├── auth
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── auth.tsx
│   ├── bookings.tsx
│   ├── properties
│   │   ├── [id].tsx
│   │   └── index.tsx
│   └── sample-data.tsx
├── app.config.js
├── assets
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf
│   └── images
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       ├── partial-react-logo.png
│       ├── react-logo.png
│       ├── react-logo@2x.png
│       ├── react-logo@3x.png
│       ├── splash-icon.png
│       └── splash.png
├── components
│   ├── Button.tsx
│   ├── Collapsible.tsx
│   ├── ExternalLink.tsx
│   ├── HapticTab.tsx
│   ├── HelloWave.tsx
│   ├── Input.tsx
│   ├── ParallaxScrollView.tsx
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   ├── __tests__
│   │   ├── ThemedText-test.tsx
│   │   └── __snapshots__
│   │       └── ThemedText-test.tsx.snap
│   └── ui
│       ├── IconSymbol.ios.tsx
│       ├── IconSymbol.tsx
│       ├── TabBarBackground.ios.tsx
│       └── TabBarBackground.tsx
├── constants
│   ├── Colors.ts
│   └── firebase
│       └── firebaseConfig.ts
├── expo-env.d.ts
├── hooks
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
├── package-lock.json
├── package.json
├── scripts
│   └── reset-project.js
├── tsconfig.json
└── types
    └── types.ts

17 directories, 52 files
