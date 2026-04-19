<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

<h1 align="center">⚡ ResumeForge Pro</h1>
<p align="center">
  <strong>A full-stack, drag-and-drop resume builder with AI-powered bullet enhancement, real-time ATS scoring, and cloud-synced storage.</strong>
</p>

<p align="center">
  <a href="https://kushal1805.github.io/ResumeForge/"><strong>🌍 View Live Application</strong></a>
</p>

<p align="center">
  Build. Drag. Export. — Your next resume, ready in minutes.
</p>

---

## ✨ Features

### 🎨 6 Professional Templates
| Template | Style |
|----------|-------|
| **Sidebar** | Polished split layout with a colored sidebar |
| **Timeline Left** | Modern edge-border timeline design |
| **Bordered** | Structured boxed sections |
| **Clean Header** | Bold minimalist headers |
| **Timeline Right** | Creative profile-focused layout |
| **ATS Optimized** | Single-column, black-and-white for maximum parsing accuracy |

### 🧠 Smart Features
- **AI Bullet Enhancement** — Refine bullet points with one click using the Anthropic API
- **Real-Time ATS Scoring** — Live compatibility score with actionable tips to improve parsing
- **Completeness Meter** — Track how filled-out your resume is at a glance
- **Drag & Drop Sections** — Reorder sections with smooth drag-and-drop
- **Undo / Redo** — Full history tracking with keyboard shortcuts

### 🔐 Authentication & Cloud Storage
- **Firebase Auth** — Sign in with Google or Email/Password
- **Firestore Database** — Resumes auto-save to the cloud every second
- **Multi-Resume Support** — Create, manage, and delete multiple resumes per account
- **Cross-Device Sync** — Access your resumes from anywhere

### 📤 Export & Share
- **PDF Export** — Download print-ready PDF (A4 formatted)
- **Share Link** — Generate a URL to share your resume instantly
- **Manual Save** — One-click cloud save with visual confirmation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3 |
| **State Management** | `useReducer` + custom `useUndoRedo` hook |
| **Drag & Drop** | `@dnd-kit/core` + `@dnd-kit/sortable` |
| **Animations** | Framer Motion |
| **Auth** | Firebase Authentication (Google + Email/Password) |
| **Database** | Cloud Firestore |
| **AI** | Anthropic Claude API (bullet enhancement) |
| **PDF Export** | html2pdf.js |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v6 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Auth + Firestore enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/Kushal1805/ResumeForge.git
cd ResumeForge

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ANTHROPIC_API_KEY=your_anthropic_key  # Optional: for AI bullet enhancement
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # Protected routes
│   ├── builder/       # Toolbar, SectionList, SectionCard, CompletenessBar
│   ├── preview/       # ResumePreview + 6 template components
│   └── sections/      # Header, Experience, Education, Skills, Projects, etc.
├── config/
│   └── firebase.js    # Firebase + Firestore initialization
├── context/
│   ├── AuthContext.jsx # Firebase Auth provider
│   └── ResumeContext.jsx # Resume state + Firestore auto-save
├── data/
│   └── seedData.js    # Skeleton placeholder data for new resumes
├── hooks/
│   └── useUndoRedo.js # Custom undo/redo history hook
├── pages/
│   ├── LandingPage.jsx
│   ├── AuthPage.jsx
│   ├── DashboardPage.jsx
│   └── BuilderPage.jsx
├── services/
│   └── firestoreService.js # Firestore CRUD operations
├── ui/                # Shared UI components (modals, inline edit, etc.)
└── utils/             # ATS scorer, PDF export, completeness score, share link
```

---

## 🔧 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Sign-in methods: Google + Email/Password
3. Enable **Firestore Database** → Start in test mode
4. Copy your config values into `.env.local`
5. Add your deployment domain to **Authorized Domains** in Auth settings

### Firestore Schema

```
users/{userId}/
  └── resumes/{resumeId}/
        ├── title: string
        ├── createdAt: timestamp
        ├── updatedAt: timestamp
        ├── meta: { template, accentColor, fontPair }
        └── sections: [ { id, type, visible, data } ]
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Vite
5. Add your Vercel URL to Firebase Authorized Domains

---

## 📝 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Kushal1805">Kushal</a>
</p>
