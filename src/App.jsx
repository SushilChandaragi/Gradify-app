import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from './pages/Navigation';
import TimetableTracker from './pages/TimetableTracker';
import LatestNews from './pages/LatestNews';
import AIQuizGenerator from './pages/AIQuizGenerator';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/timetable-tracker" element={<TimetableTracker />} />
          <Route path="/latest-news" element={<LatestNews />} />
          <Route path="/ai-quiz-generator" element={<AIQuizGenerator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
