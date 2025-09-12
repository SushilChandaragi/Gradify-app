# 🚀 Smart Campus Solutions - Setup Instructions

## 📋 Quick Setup for Team Collaboration

### 1. Push to GitHub

```bash
# Create a new repository on GitHub first, then run:
git remote add origin https://github.com/YOUR_USERNAME/smart-campus-solutions.git
git branch -M main  
git push -u origin main
```

### 2. Set up Firebase Authentication

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Name it "Smart Campus Solutions" (or similar)
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Step 2: Enable Authentication
1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click "Email/Password"
5. Enable "Email/Password" (first toggle)
6. Click "Save"

#### Step 3: Get Firebase Configuration
1. Click the gear icon ⚙️ (Project settings)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app with nickname "Smart Campus Web"
5. Copy the `firebaseConfig` object

#### Step 4: Configure Environment Variables
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Create Test Users
In Firebase Console > Authentication > Users:
- Click "Add user"
- Create test accounts like:
  - Email: `test@college.edu`, Password: `test123456`
  - Email: `admin@college.edu`, Password: `admin123456`

### 4. Team Collaboration Setup

Each team member should:
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/smart-campus-solutions.git
cd smart-campus-solutions
npm install
```

2. Get the `.env` file from project lead (don't commit it to git)
3. Start development:
```bash
npm run dev
```

## 🎯 Current Features Ready for Development

### Login/Authentication ✅
- Firebase email/password authentication
- Login and signup pages styled
- Environment variables for security

### Main Dashboard ✅  
- Home page with 4 feature cards
- Professional color scheme applied
- Responsive grid layout

### Feature Pages (Ready for Content) 🚀
- **Timetable Tracker** (`/src/pages/TimetableTracker.jsx`)
- **Campus Navigation** (`/src/pages/Navigation.jsx`) 
- **Latest News** (`/src/pages/LatestNews.jsx`)
- **AI Quiz Generator** (`/src/pages/AIQuizGenerator.jsx`)

## 👥 Team Development Workflow

1. **Each developer picks a page/feature**
2. **Create feature branch:**
```bash
git checkout -b feature/timetable-tracker
# or feature/navigation, feature/news, etc.
```

3. **Develop the feature**
4. **Commit and push:**
```bash
git add .
git commit -m "Add timetable tracker functionality"
git push origin feature/timetable-tracker
```

5. **Create Pull Request on GitHub**

## 🔥 Firebase Services Available
- ✅ Authentication (Email/Password)
- ✅ Firestore Database (ready to use)
- 🚀 Storage (for file uploads - AI Quiz PDFs)
- 🚀 Functions (for AI quiz generation backend)

## 🎨 Design System
All components use the established color palette:
- Primary: `#1E3A8A` (Royal Blue)
- Secondary: `#4338CA` (Indigo)  
- Accent: `#EAB308` (Gold)
- Background: `#F9FAFB` (Off White)
- Text: `#111827` (Almost Black)

Ready to build innovative campus solutions! 🎓
