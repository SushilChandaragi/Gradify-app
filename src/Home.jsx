import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#111827' }}>
        <h1 style={{ color: '#1E3A8A', fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Campus Solutions</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem' }}>Welcome! Choose an option below:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <Link to="/timetable-tracker" style={{
            background: '#1E3A8A', 
            color: '#F9FAFB', 
            padding: '3rem 2rem', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            textAlign: 'center', 
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            display: 'block'
          }}>📅 Timetable Tracker</Link>
          <Link to="/navigation" style={{
            background: 'linear-gradient(135deg, #4338CA, #6366F1)', 
            color: '#F9FAFB', 
            padding: '3rem 2rem', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            textAlign: 'center', 
            boxShadow: '0 6px 20px rgba(67, 56, 202, 0.4)', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            display: 'block',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>🗺️ Student Places Map</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Review restaurants, PGs, gyms & more!
            </div>
          </Link>
          <Link to="/latest-news" style={{
            background: '#EAB308', 
            color: '#111827', 
            padding: '3rem 2rem', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            textAlign: 'center', 
            boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            display: 'block'
          }}>📰 Latest News</Link>
          <Link to="/ai-quiz-generator" style={{
            background: '#F9FAFB', 
            color: '#1E3A8A', 
            padding: '3rem 2rem', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            textAlign: 'center', 
            boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)', 
            fontWeight: 'bold', 
            border: '3px solid #EAB308',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            display: 'block'
          }}>🤖 AI Quiz Generator</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
