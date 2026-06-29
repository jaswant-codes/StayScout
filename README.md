# 🏠 StayScout — Trust-First Student Accommodation Platform

<div align="center">

![StayScout](https://img.shields.io/badge/StayScout-Student%20Accommodation-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Backend-ffca28?style=flat-square&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-Frontend-646cff?style=flat-square&logo=vite)

**Find the best PGs & hostels based on real student reviews — not just owner listings.**

[Live Demo](https://stay-scout-six.vercel.app/) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## ✨ Features

### 🔐 Authentication System
- Email/password authentication via Firebase Auth
- Two roles: **Student** and **Owner**
- Role-based dashboard routing
- Protected routes with role verification

### 🏠 Property Listings
- Owners can list properties with images, facilities, rent, and description
- Multi-image upload to Firebase Storage
- Availability status management (Available / Full)
- Edit and delete property listings

### 🔍 Search & Filters
- Search by city or area name
- Filter by budget range (min/max)
- Filter by facilities (WiFi, AC, Food, Laundry, etc.)
- Real-time property card grid with stagger animations

### ⭐ Review System
- Students can rate properties (1–5 stars)
- Add comments and select review tags (Food quality, Cleanliness, Safety, Owner behavior)
- Real-time average rating calculation
- Review history on student dashboard

### 🤖 AI Review Summary
- Heuristic-based sentiment analysis of reviews
- Generates natural-language summary of student opinions
- Highlights positive/negative aspects across categories

### 💬 Community Chat
- Global real-time chat room for students
- Powered by Firebase Firestore `onSnapshot`
- Username and timestamp on each message
- Auto-scroll to latest messages

### 🎨 Premium UI/UX
- Dark-mode-first design with indigo accent
- Glassmorphism effects and smooth micro-animations
- Mobile-responsive throughout
- Card-based Airbnb-inspired layout
- Inter font (Google Fonts)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Routing | React Router v7 |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Real-time | Firestore onSnapshot |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/       # Shared UI components
│   ├── ChatMessage.jsx
│   ├── FacilityTag.jsx
│   ├── FilterPanel.jsx
│   ├── Footer.jsx
│   ├── ImageGallery.jsx
│   ├── Layout.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── PropertyCard.jsx
│   ├── ProtectedRoute.jsx
│   ├── ReviewCard.jsx
│   └── StarRating.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useChat.js
│   ├── useProperties.js
│   └── useReviews.js
├── lib/
│   └── firebase.js
├── pages/
│   ├── AddProperty.jsx
│   ├── Chat.jsx
│   ├── EditProperty.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── OwnerDashboard.jsx
│   ├── PropertyDetails.jsx
│   ├── Signup.jsx
│   └── StudentDashboard.jsx
├── utils/
│   ├── helpers.js
│   └── reviewSummary.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project ([Create one here](https://console.firebase.google.com))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/stayscout.git
   cd stayscout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**

   Copy `.env.example` to `.env` and fill in your Firebase config:
   ```bash
   cp .env.example .env
   ```
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Enable Firebase services** in the Firebase Console:
   - Authentication → Email/Password sign-in
   - Authentication → Google sign-in
   - Authentication → Settings → Authorized domains: add your Vercel domain
   - Cloud Firestore → Create database
   - Storage → Set up Cloud Storage

5. **Run locally**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment (Vercel)

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add your Firebase environment variables in Vercel's project settings
4. Keep the `/__/auth/:path*` rewrite in `vercel.json` before the catch-all rewrite. This proxies Firebase Auth's redirect helper on Vercel so Google redirect fallback can restore the Firebase session.
5. Deploy — Vercel auto-detects the Vite build

---

## 📸 Screenshots

> Add screenshots of:
> - Home page with property listings
> - Property details with reviews
> - Login / Signup flow
> - Owner dashboard
> - Community chat

---

## 🗃️ Database Structure

### Users (`/users/{uid}`)
| Field | Type |
|---|---|
| name | string |
| email | string |
| role | "student" \| "owner" |
| createdAt | string (ISO) |

### Properties (`/properties/{id}`)
| Field | Type |
|---|---|
| ownerId | string |
| ownerName | string |
| name | string |
| city | string |
| area | string |
| rent | number |
| facilities | string[] |
| images | string[] |
| description | string |
| availability | "available" \| "full" |
| avgRating | number |
| reviewCount | number |
| createdAt | string (ISO) |

### Reviews (`/reviews/{id}`)
| Field | Type |
|---|---|
| propertyId | string |
| userId | string |
| userName | string |
| rating | number (1–5) |
| comment | string |
| tags | string[] |
| createdAt | string (ISO) |

### Messages (`/messages/{id}`)
| Field | Type |
|---|---|
| userId | string |
| userName | string |
| message | string |
| createdAt | string (ISO) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with ❤️ for students everywhere</p>
</div>
