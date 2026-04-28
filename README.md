# 🏥 VaidyaSearch
### *"Search Smart. Heal Better."*
> India's most trusted doctor discovery and review platform — bridging the gap between patients and verified doctors across Bharat.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Claude API](https://img.shields.io/badge/Claude-API-D97757?style=flat)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)

---

## 📌 Table of Contents
- [About](#about)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Future Scope](#future-scope)
- [Team](#team)

---

## 🩺 About

**VaidyaSearch** is a doctor discovery platform built for India. Just like Zomato helps you find the best restaurant, VaidyaSearch helps you find the best doctor — by specialty, location, fees, language, and real patient reviews.

India has **1.4 billion people** but finding a trusted doctor still relies on word of mouth. VaidyaSearch solves this with transparency, multilingual support, and AI-powered features — making quality healthcare accessible to every Indian.

---

## ❗ Problem Statement

- 🔍 No centralized platform to **search and compare doctors** in India
- ⭐ No way to read **verified patient reviews** before visiting a doctor
- 💰 **Hidden consultation fees** with no way to compare
- 🗣️ Most health platforms are **English-only**, excluding 780M+ Hindi/regional language users
- 🏘️ Patients in **Tier 2 & Tier 3 cities** have the least access to doctor information

---

## ✨ Features

### 🔍 Core Features
| Feature | Description |
|---|---|
| **Doctor Search** | Search by name, specialty, city, or pincode |
| **Advanced Filters** | Filter by fees, rating, language, experience, teleconsultation |
| **Doctor Profile** | Full profile with photo, qualifications, hospital, timings, fees |
| **Patient Reviews** | Verified reviews with scorecard breakdown |
| **Nearby Doctors Map** | Live map showing doctors around your location |
| **Doctor Comparison** | Compare 2-3 doctors side by side |
| **Bookmarks** | Save and revisit your preferred doctors |

### 🤖 AI-Powered Features
| Feature | Description |
|---|---|
| **AI Symptom Checker** | Enter symptoms → get possible conditions + recommended doctor type |
| **Multilingual Symptom Input** | Supports Hindi, Hinglish, Punjabi, Haryanvi, Tamil, Bengali & more |
| **Voice Input** | Speak your symptoms in your native language |
| **Review Summarizer** | AI reads all reviews and gives a one-line summary |
| **Prescription Explainer** | Upload prescription → AI explains it in simple language |

### 📊 Transparency Features
| Feature | Description |
|---|---|
| **Fee Comparison** | Compare consultation fees of similar doctors |
| **Scorecard Breakdown** | Rate separately — Punctuality, Behaviour, Diagnosis, Cleanliness |
| **Wait Time Indicator** | Crowdsourced average wait time per doctor |
| **Doctor Shortage Heatmap** | Visual map of areas with low doctor availability |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Core UI framework |
| **React Router v6** | Client-side routing |
| **Context API** | Global state management |
| **Tailwind CSS** | Styling & responsive design |
| **Claude API (Anthropic)** | AI Symptom Checker, Multilingual support, Review Summarizer |
| **Web Speech API** | Voice input — free, browser built-in |
| **Leaflet.js** | Interactive doctor maps |
| **Firebase Auth + Firestore** | Authentication & reviews storage |
| **Recharts** | Rating charts & data visualization |
| **OpenWeatherMap API** | Health + weather alerts |
| **NewsAPI** | Live health news feed |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Firebase account (free)
- Anthropic API key (free credits)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vaidyasearch.git

# Navigate to project
cd vaidyasearch

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
# Anthropic Claude API
VITE_ANTHROPIC_API_KEY=your_claude_api_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# OpenWeatherMap
VITE_WEATHER_API_KEY=your_weather_api_key

# NewsAPI
VITE_NEWS_API_KEY=your_news_api_key
```

---

## 📁 Project Structure

```
vaidyasearch/
│
├── public/
│   └── vaidya-logo.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── MapView.jsx
│   │   ├── SymptomChecker.jsx
│   │   ├── VoiceInput.jsx
│   │   └── LanguageToggle.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── DoctorProfile.jsx
│   │   ├── Compare.jsx
│   │   ├── SymptomAI.jsx
│   │   ├── Bookmarks.jsx
│   │   ├── HealthNews.jsx
│   │   └── Login.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── BookmarkContext.jsx
│   │   └── LanguageContext.jsx
│   ├── hooks/
│   │   ├── useVoiceInput.js
│   │   ├── useGeolocation.js
│   │   └── useSymptomAI.js
│   ├── services/
│   │   ├── claudeService.js
│   │   ├── firebaseService.js
│   │   ├── weatherService.js
│   │   └── newsService.js
│   ├── data/
│   │   └── doctors.json
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔮 Future Scope

- 📅 **Real Appointment Booking** — integrate with hospital systems
- 💊 **Medicine Reminder** — post-appointment follow-up
- 🏥 **Hospital Bed Availability** — real-time via NHA APIs
- 📱 **React Native App** — mobile version for Android/iOS
- 🤝 **Doctor Verification System** — via MCI registration number
- 💬 **Teleconsultation** — video call with doctors

---

## 👨‍💻 Team

| Name | Role |
|---|---|
| **Your Name Here** | Full Stack Frontend Developer |

---

## 🙏 Acknowledgements

- [Anthropic](https://anthropic.com) — Claude API
- [Leaflet.js](https://leafletjs.com) — Maps
- [Firebase](https://firebase.google.com) — Backend
- [Tailwind CSS](https://tailwindcss.com) — Styling

---

<div align="center">
  <strong>Built with ❤️ for Bharat 🇮🇳</strong><br/>
  <em>VaidyaSearch — Because every Indian deserves a trusted doctor.</em>
</div>
