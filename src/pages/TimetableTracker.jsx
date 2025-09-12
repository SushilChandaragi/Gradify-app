import React from 'react';

const TimetableTracker = () => {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="card">
          <h2 style={{ color: '#1E3A8A', fontSize: '2rem', marginBottom: '1rem' }}>📅 Timetable Tracker</h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Track your class schedules and manage your time effectively.</p>
          {/* Timetable tracker content will be added here */}
          <div style={{ 
            padding: '2rem', 
            backgroundColor: '#F3F4F6', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#4B5563', fontSize: '1.1rem' }}>Feature coming soon...</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/home" style={{
            backgroundColor: '#1E3A8A',
            color: '#F9FAFB',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default TimetableTracker;
