# 🎓 Gradify - Smart Campus Solutions Platform

A comprehensive student-centric platform built with React + Vite, featuring AI-powered quiz generation, interactive campus navigation, and intelligent timetable management.

## 🌟 Key Features

### 🤖 AI Quiz Generator
- **AI-Powered Question Generation**: Upload PDF documents and automatically generate quizzes using advanced T5-Large ML model
- **Interactive Quiz Interface**: Take quizzes with real-time scoring and detailed explanations
- **PDF Text Extraction**: Advanced text processing with multiple fallback methods for robust content extraction
- **Smart Question Types**: Multiple choice questions with intelligent distractors and explanations

### 📅 Smart Timetable Tracker
- **Interactive Schedule Management**: Add, edit, and organize class schedules with visual timetable grid
- **Conflict Detection**: Automatic detection and prevention of scheduling conflicts
- **Persistent Storage**: Local storage integration for data persistence across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🗺️ Campus Navigation & Maps
- **Interactive Campus Maps**: Navigate through campus with interactive map integration
- **React-Leaflet Integration**: High-performance mapping with detailed campus locations
- **Location Services**: Find buildings, facilities, and points of interest

### � CGPA Calculator
- **Grade Point Average Tracking**: Calculate semester-wise SGPA and overall CGPA
- **Multi-Semester Support**: Track academic performance across multiple semesters
- **Grade Scale Integration**: Support for standard Indian university grading system (O, A+, A, B+, B, C, P, F)
- **Credit-Based Calculation**: Accurate CGPA calculation based on credit hours and grade points
- **Data Persistence**: Local storage to save academic records across sessions
- **Performance Analytics**: Visual representation of academic progress and trends

### 📰 Latest News & Updates
- **Real-time College Updates**: Stay informed with the latest campus news and announcements
- **Organized Information**: Categorized news feed for easy browsing

## 📁 Project Structure

```
Gradify/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── pages/
│   │   ├── AIQuizGenerator.jsx      # AI-powered quiz generation
│   │   ├── CGPACalculator.jsx       # CGPA tracking and calculation
│   │   ├── LatestNews.jsx           # Campus news and updates
│   │   ├── Login.jsx                # User authentication
│   │   ├── Navigation.jsx           # Navigation component
│   │   ├── Signup.jsx               # User registration
│   │   └── TimetableTracker.jsx     # Schedule management
│   ├── App.css                      # Main application styles
│   ├── App.jsx                      # Main application component
│   ├── firebase.js                  # Firebase configuration
│   ├── Home.jsx                     # Dashboard/landing page
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── README.md                        # Project documentation
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
   git clone https://github.com/yourusername/Gradify.git
   cd Gradify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Copy your Firebase configuration
   - Update the `firebase.js` file with your configuration:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
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
3. **Quiz Generator**: Upload PDFs and generate AI-powered quizzes
4. **CGPA Calculator**: Track your academic performance across semesters
5. **Timetable Tracker**: Manage your class schedule with conflict detection
6. **Latest News**: Stay updated with campus announcements

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks and context
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with modern features

### Backend & Services
- **Firebase**: Authentication, Firestore database, hosting
- **Hugging Face API**: AI model integration for quiz generation

### Libraries & Dependencies
- **PDF.js**: PDF processing and text extraction
- **React Leaflet**: Interactive maps for campus navigation
- **Leaflet**: Open-source mapping library

### Development Tools
- **ESLint**: Code linting and formatting
- **Vite**: Module bundling and hot reload
- **Git**: Version control and collaboration

## 🤝 Contributing

We welcome contributions to make Gradify even better! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and structure
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure your code passes ESLint checks

### Issues and Feature Requests
- Use GitHub Issues to report bugs or request features
- Provide detailed descriptions and steps to reproduce
- Label issues appropriately (bug, enhancement, question, etc.)

## 🎯 Future Enhancements

- **Mobile Application**: React Native app for iOS and Android
- **Advanced AI Features**: Personalized learning recommendations
- **Study Groups**: Collaborative study session management
- **Grade Predictions**: ML-based academic performance forecasting
- **Integration**: Connect with popular LMS platforms
- **Notifications**: Real-time alerts and reminders
- **Analytics Dashboard**: Detailed academic performance insights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Gradify is developed and maintained by passionate students who understand the challenges of academic life.

## 🙏 Acknowledgments

- **Hugging Face**: For providing accessible AI model APIs
- **Firebase**: For robust backend infrastructure
- **React Community**: For excellent documentation and community support
- **Open Source Contributors**: For the amazing libraries that make this project possible

## 📞 Support

If you encounter any issues or have questions:
- Create an issue on GitHub
- Reach out to the development team
- Check the documentation for common solutions

---

**Made with ❤️ for students, by students**

*Gradify - Your Complete Academic Companion*

### 🔐 Secure Authentication
- **Firebase Authentication**: Secure login and signup system
- **User Management**: Complete user account management with Firebase backend

## 🎨 Design System

### Color Palette (Professional & Academic)
- **Primary**: `#1E3A8A` (Royal Blue — authority & trust)
- **Secondary**: `#4338CA` (Indigo — education & wisdom)
- **Accent**: `#EAB308` (Gold — prestige & highlights)
- **Background**: `#F9FAFB` (Clean Off-White)
- **Text**: `#111827` (Professional Dark)
- **Subtle Text**: `#6B7280` (Secondary Information)

### Typography & Spacing
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Responsive Design**: Mobile-first approach with seamless desktop scaling
- **Smooth Interactions**: CSS transitions and hover effects throughout

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern component-based architecture
- **Vite** - Lightning-fast development and build tool
- **React Router DOM** - Client-side routing and navigation
- **CSS3** - Custom properties and modern styling techniques

### AI & ML Integration
- **Hugging Face Transformers** - T5-Large model for question generation
- **PDF.js** - Browser-based PDF text extraction
- **Advanced Text Processing** - Multiple extraction methods with fallbacks

### Backend & Database
- **Firebase Authentication** - Secure user management
- **Firebase Firestore** - Real-time database for user data and content
- **Local Storage** - Client-side data persistence for timetables

### Mapping & Navigation
- **React-Leaflet** - Interactive map components
- **Leaflet** - Open-source mapping library
- **Geolocation APIs** - Location-based services

## 📁 Project Architecture
```
src/
├── pages/                    # Main application pages
│   ├── Login.jsx            # 🔐 Firebase authentication login
│   ├── Signup.jsx           # 📝 User registration system
│   ├── TimetableTracker.jsx # 📅 Interactive schedule management
│   ├── Navigation.jsx       # 🗺️ Campus navigation & maps
│   ├── LatestNews.jsx      # 📰 College news & announcements
│   └── AIQuizGenerator.jsx # 🤖 AI-powered quiz generation
├── utils/                   # Utility functions and helpers
│   ├── quizGenerator.js     # AI/ML quiz generation logic
│   └── quizHelpers.js      # Quiz processing utilities
├── components/              # Reusable UI components
├── assets/                  # Static assets and images
├── App.jsx                 # Main application component
├── Home.jsx               # Dashboard/landing page
├── main.jsx               # Router configuration & app entry
├── firebase.js            # Firebase configuration & setup
└── index.css             # Global styles & theme variables
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SushilChandaragi/Gradify.git
   cd Gradify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - React & React DOM
   - Vite build tool
   - React Router for navigation
   - Firebase for authentication & database
   - React-Leaflet for mapping
   - PDF.js for document processing

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173` (or next available port)

5. **Build for production:**
   ```bash
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
