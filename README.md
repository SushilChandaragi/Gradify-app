# Smart Campus Solutions

A student-centric website built with React + Vite and Firebase for authentication and database management.

## Project Overview

This project provides innovative solutions to improve campus life, focusing on:
- **Timetable Tracker**: Manage class schedules effectively
- **Campus Navigation**: Interactive campus mapping
- **Latest News**: College announcements and updates  
- **AI Quiz Generator**: Generate quizzes from PDF documents using AI

## Color Scheme (Formal & Sophisticated)
- **Primary**: #1E3A8A (Royal Blue — authority)
- **Secondary**: #4338CA (Indigo — education)
- **Accent**: #EAB308 (Gold — prestige, highlights)
- **Background**: #F9FAFB (Off White)
- **Text**: #111827 (Almost Black)

## Tech Stack
- **Frontend**: React 18 + Vite
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router DOM
- **Styling**: CSS with custom properties

## Project Structure
```
src/
├── pages/
│   ├── Login.jsx           # Firebase authentication login
│   ├── Signup.jsx          # User registration
│   ├── TimetableTracker.jsx # Class schedule management
│   ├── Navigation.jsx      # Campus navigation
│   ├── LatestNews.jsx     # College news feed
│   └── AIQuizGenerator.jsx # AI-powered quiz generation
├── App.jsx                # Main app component
├── Home.jsx              # Landing page after login
├── main.jsx              # Router configuration
├── firebase.js           # Firebase configuration
└── index.css            # Global styles with color theme

```

## Getting Started

### 🚀 Quick Setup for Team Members

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SushilChandaragi/Gradify.git
   cd Gradify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file (Firebase config is already included)
   cp .env.example .env
   ```

4. **IMPORTANT: Enable Firebase Authentication** (Project owner must do this ONCE):
   - Go to https://console.firebase.google.com
   - Select "gradify-f7c5d" project  
   - Click "Authentication" → "Get started"
   - Go to "Sign-in method" tab
   - Enable "Email/Password" (toggle ON)
   - Click "Save"

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Visit http://localhost:5173** - You should see the login page!

### 🔧 Troubleshooting White Screen

If you see a white screen:
1. Check browser console for errors (F12 → Console)
2. Make sure `.env` file exists with Firebase config
3. Ensure Firebase Authentication is enabled (step 4 above)
4. Try creating a test user in Firebase Console → Authentication → Users

### 📱 Test Login
Create a test user in Firebase Console:
- Email: `test@gradify.com`
- Password: `test123456`

## Features

### Authentication Flow
- Landing page redirects to Login
- Users can sign up or login with email/password
- Successful authentication redirects to Home dashboard

### Dashboard
- Clean, professional design with 4 main feature cards
- Each feature has its own dedicated page
- Consistent color scheme throughout

### Future Development
Each page is structured as a placeholder ready for feature implementation:
- Timetable integration with calendar APIs
- Interactive campus maps
- News feed with college API integration  
- AI quiz generation using PDF parsing and LLM APIs

## ⚠️ MUST ENABLE FIREBASE AUTHENTICATION

**Project Owner (SushilChandaragi) must do this ONCE:**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select "gradify-f7c5d" project
3. Click "Authentication" → "Get started" 
4. Go to "Sign-in method" tab
5. Click on "Email/Password"
6. **Enable the first toggle** (Email/Password)
7. Click "Save"

**Without this step, everyone will see a white screen!**

## Firebase Configuration ✅

The Firebase config is already set up in `.env.example`. When you copy it to `.env`, you get:
```bash
VITE_FIREBASE_API_KEY=AIzaSyD8I-vrNCdeT2lrNvOdZQhE5ca5Oys5bi8
VITE_FIREBASE_AUTH_DOMAIN=gradify-f7c5d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gradify-f7c5d
# ... etc
```

## Team Collaboration

The project structure is designed for team development:
- Each page is a separate component for parallel development
- Consistent styling through CSS custom properties
- Clear separation of concerns between auth, routing, and features
- Firebase provides real-time collaboration capabilities

Ready for your team to build innovative campus solutions! 🎓
