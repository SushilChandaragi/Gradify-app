import React from 'react';

const LatestNews = () => {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="card">
          <h2 style={{ color: '#EAB308', fontSize: '2rem', marginBottom: '1rem' }}>📰 Latest College News</h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Stay updated with the latest announcements and events.</p>
          {/* Latest news content will be added here */}
          <div style={{ 
            padding: '2rem', 
            backgroundColor: '#FEF3C7', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #EAB308'
          }}>
            <p style={{ color: '#92400E', fontSize: '1.1rem' }}>News feed integration coming soon...</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/home" style={{
            backgroundColor: '#EAB308',
            color: '#111827',
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

export default LatestNews;
