<p align="center">
  <img src="website/images/logo.svg" alt="VibeStream Logo" width="120" height="120" />
</p>

<h1 align="center">🚀 VibeStream</h1>

<p align="center">
  <strong>An Ad-Free, Open-Source Premium Lossless Audio Sanctuary with Real-time Social Listening</strong>
</p>

<p align="center">
  <a href="https://github.com/keshu-codes/vibestream/releases/latest">
    <img src="https://img.shields.io/badge/Version-3.0.1-brightgreen?style=for-the-badge&logo=github" alt="Version 3.0.1" />
  </a>
  <a href="https://keshu-codes.github.io/vibestream/">
    <img src="https://img.shields.io/badge/Live%20Demo-Website-FF1493?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Platform-Android%2024%2B-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android Support" />
  <img src="https://img.shields.io/badge/UI-Jetpack%20Compose-4285F4?style=for-the-badge&logo=jetpackcompose&logoColor=white" alt="Jetpack Compose" />
  <img src="https://img.shields.io/badge/Backend-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Sync" />
</p>

<p align="center">
  <a href="https://keshu-codes.github.io/vibestream/"><strong>🌍 Visit Live Website</strong></a> •
  <a href="https://github.com/keshu-codes/vibestream/releases/latest/download/VibeStream.apk"><strong>📲 Download APK</strong></a>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-visual-showcase">Visual Showcase</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-security--hardening">Security & Hardening</a>
</p>

---

## 🎧 About VibeStream

VibeStream is a premium, ad-free audio streaming and social listening platform built to provide a modern, sensory-rich listening experience. Operating entirely without subscriptions or commercial constraints, VibeStream fetches and plays direct high-fidelity streams, supports full offline downloads, and enables global real-time synchronized playback (Social Sessions). 

It is accompanied by a custom, hardware-accelerated **3D Parallax Marketing Website** featuring responsive screen scroll transitions, live feedback backlogs, and full SEO optimization.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **👥 Social Listening** | Host or join real-time sync rooms to listen to tracks together simultaneously with anyone, anywhere in the world. |
| **🔊 Lossless Playback** | Bypasses third-party embed limits to stream direct, high-fidelity audio streams natively using ExoPlayer (Media3). |
| **📥 Offline Downloads** | Save your favorite tracks locally on your device for high-quality, offline listening anytime. |
| **☁️ Cloud Sync Library** | Keep your favorites, custom playlists, and profiles synchronized across devices with Firebase. |
| **🎛️ Dynamic Visualizers** | Neon Pulse, Golden Glow, Symmetric Spectrum, and Ambient Glow visualizers rendered in real-time via Compose Canvas. |
| **💤 Custom Sleep Timer** | Drift off to sleep with customized timers or triggers to stop playback when the current song ends. |
| **🎨 Customizer Themes** | Personalize your player skin between Dark Mode, Twilight Glow, or Glowing Neon. |

---

## 📸 Visual Showcase

### 🌐 Web Landing Page & Console
An interactive responsive layout featuring dual-element cursor parallax tracking, scroll-triggered frame transitions, and direct Firebase integration.
<p align="center">
  <img src="website/images/webpage.png" alt="VibeStream Web Landing Page" width="850" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.3);" />
</p>

### 📱 Android Mobile App Interface
Featuring a sleek Material 3 dark-themed UI, vinyl player rotations, waveform overlays, and social session hubs.
<p align="center">
  <img src="website/images/app.jpeg" alt="App Overview" width="220" style="border-radius: 14px;" /> &nbsp; &nbsp;
  <img src="website/images/screen_home.webp" alt="App Home Screen" width="220" style="border-radius: 14px;" /> &nbsp; &nbsp;
  <img src="website/images/screen_player.webp" alt="App Waveform Player" width="220" style="border-radius: 14px;" /> &nbsp; &nbsp;
  <img src="website/images/screen_library.webp" alt="App Downloads Library" width="220" style="border-radius: 14px;" />
</p>

---

## 🛠️ Tech Stack

### Android Native App
* **Language:** Kotlin
* **UI Engine:** Jetpack Compose (Declarative components, custom Canvas brushes, hardware-accelerated transformations)
* **Audio Engine:** Google Media3 / ExoPlayer (Direct stream extractors, dynamic buffering policies)
* **Database & Auth:** Firebase Realtime Database, Google Sign-In, & Anonymous Auth
* **Image Loading:** Coil Compose
* **Local Storage:** Jetpack DataStore / SharedPreferences

### Marketing Website
* **Layout:** Semantic HTML5 & CSS3 Grid/Flexbox
* **Aesthetics:** Glassmorphic layout panels, glowing SVG overlays, and responsive keyframe animations
* **Interactivity:** Vanilla Javascript (IntersectionObserver transitions, touch/gyroscope device tilts)
* **Backend Integration:** Serverless Firebase REST API submissions
* **SEO:** Automated meta indexing configurations and search engine crawler setups

---

## 🚀 Getting Started

### 1. Quick Install on Android
1. Go to the [Latest Releases](https://github.com/keshu-codes/vibestream/releases) page.
2. Download and open the **`VibeStream.apk`** file.
3. Allow installations from unknown sources if prompted.

### 2. View Landing Page Locally
1. Clone this repository.
2. Navigate to the `/website` folder.
3. Open `index.html` in your web browser.

---

## 🔒 Security & Hardening

* **Secured Credentials:** Release keys are kept completely out of the codebase and loaded dynamically from git-ignored local property sheets.
* **Input Sanitization:** Web inputs are escaped to eliminate XSS injections and bounded to prevent overflow attacks. Android fields restrict inputs to a maximum of 40 characters.
* **Rate Limiting:** Form submissions are rate-limited via client-side timestamp storage (max 5 requests per 15 mins) to prevent endpoint exhaustion.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
