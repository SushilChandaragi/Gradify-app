
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TimetableTracker from './pages/TimetableTracker';
import Navigation from './pages/Navigation';
import LatestNews from './pages/LatestNews';
import AIQuizGenerator from './pages/AIQuizGenerator';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/timetable-tracker" element={<TimetableTracker />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/latest-news" element={<LatestNews />} />
        <Route path="/ai-quiz-generator" element={<AIQuizGenerator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
