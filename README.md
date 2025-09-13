# 🎓 Gradify - Smart Campus Solutions Platform

A comprehensive student-centric platform built with React + Vite, featuring AI-powered quiz generation, interactive campus navigation, and intelligent timetable management.
[Working Vercel site](https://thegradify.vercel.app/)

## 📁 Project Structure

```
Gradify/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── SimpleMap.jsx            # Interactive campus map component
│   ├── pages/
│   │   ├── AIQuizGenerator.jsx      # AI-powered quiz generation from PDFs
│   │   ├── CGPACalculator.jsx       # CGPA tracking and calculation
│   │   ├── LatestNews.jsx           # Campus news and updates
│   │   ├── Login.jsx                # User authentication with Vanta background
│   │   ├── Navigation.jsx           # Campus navigation with interactive map
│   │   ├── Signup.jsx               # User registration
│   │   ├── TimetableTracker.jsx     # Schedule management
│   │   └── vanta-init.js            # Vanta.js animation initialization
│   ├── utils/
│   │   └── quizGenerator.js         # PDF text extraction and quiz generation logic
│   ├── firebase.js                  # Firebase configuration
│   ├── Home.css                     # Home page styles
│   ├── Home.jsx                     # Dashboard/landing page
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
├── .env.example                     # Environment variables template
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
└── vite.config.js                   # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SushilChandaragi/Gradify-app.git
   cd Gradify-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your Firebase configuration
   2. Edit `.env` with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start exploring Gradify!

### Usage

1. **Sign Up/Login**: Create an account or login to access all features
2. **Dashboard**: Navigate through different tools from the main dashboard
3. **Quiz Generator**: Upload PDFs and generate AI-powered quizzes using Hugging Face API
4. **CGPA Calculator**: Track your academic performance across semesters
5. **Timetable Tracker**: Manage your class schedule
6. **Campus Navigation**: Interactive map with location markers and reviews
7. **Latest News**: Stay updated with campus announcements

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks and context
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with modern features

### Backend & Services
- **Firebase**: Authentication, Firestore database, hosting
- **Hugging Face API**: AI model integration for quiz generation

### Libraries & Dependencies
- **PDF.js**: PDF processing and text extraction for quiz generation
- **Leaflet**: Interactive maps for campus navigation
- **Vanta.js + Three.js**: Animated background effects on login page

### Development Tools
- **ESLint**: Code linting and formatting
- **Vite**: Module bundling and hot reload
- **Git**: Version control and collaboration

## 🎯 Key Features

- **AI Quiz Generation**: Upload PDFs and generate intelligent quizzes using advanced NLP
- **Interactive Campus Map**: Navigate campus with location markers and user reviews
- **CGPA Calculator**: Track academic performance with semester-wise calculations
- **Timetable Management**: Organize and manage class schedules
- **Modern UI**: Dark theme with glassmorphism effects and Vanta.js animations
- **Firebase Integration**: Secure authentication and real-time data storage

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for students, by students**

*Gradify - Your Complete Academic Companion*

## 🎨 Design Features

- **Dark Theme**: Professional dark blue/purple color scheme
- **Glassmorphism Effects**: Modern transparent cards with backdrop blur
- **Animated Background**: Vanta.js network animation on login page
- **Responsive Design**: Mobile-first approach with seamless desktop scaling
- **Smooth Interactions**: CSS transitions and hover effects throughout
