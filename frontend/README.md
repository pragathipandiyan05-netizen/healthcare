# Care Alert Frontends

This directory contains the frontends for the Care Alert Healthcare platform.
We have clearly separated the Mobile Application from the Web Admin Portal as they use different technology stacks.

## 1. Admin Portal (`admin_portal/`)
The web-based dashboard used by administrators and security personnel.

- **Tech Stack:** React, Vite, Material UI (MUI)
- **Language:** JavaScript
- **Setup & Run:**
  ```bash
  cd admin_portal
  npm install
  npm run dev
  ```
- **Build:**
  ```bash
  npm run build
  ```

## 2. Mobile App (`mobile_app/`)
The native application used by doctors, nurses, and staff members.

- **Tech Stack:** Flutter, Firebase
- **Language:** Dart
- **Setup & Run:**
  ```bash
  cd mobile_app
  flutter pub get
  flutter run
  ```
- **Build APK:**
  ```bash
  flutter build apk --release
  ```

## Docker
The `admin_portal` can also be run alongside the backend via Docker Compose from the root directory of this repository:
```bash
cd ..
docker-compose up --build
```
*(Note: The mobile app compiles to native Android/iOS and is not run via Docker)*
