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

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Firebase:**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your config and replace values in `src/firebase.js`

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

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

## Firebase Configuration

Replace the placeholder values in `src/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Team Collaboration

The project structure is designed for team development:
- Each page is a separate component for parallel development
- Consistent styling through CSS custom properties
- Clear separation of concerns between auth, routing, and features
- Firebase provides real-time collaboration capabilities

Ready for your team to build innovative campus solutions! 🎓
