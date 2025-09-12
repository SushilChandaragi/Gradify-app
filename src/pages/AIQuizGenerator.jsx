import React from 'react';

const AIQuizGenerator = () => {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="card">
          <h2 style={{ color: '#1E3A8A', fontSize: '2rem', marginBottom: '1rem' }}>🤖 AI Quiz Generator</h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Generate quizzes from your PDF documents using AI technology.</p>
          {/* AI quiz generator content will be added here */}
          <div style={{ 
            padding: '2rem', 
            backgroundColor: '#EFF6FF', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #EAB308'
          }}>
            <p style={{ color: '#1E40AF', fontSize: '1.1rem' }}>AI-powered quiz generation coming soon...</p>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '1rem' }}>Upload PDFs and generate custom quizzes automatically</p>
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
            display: 'inline-block',
            border: '2px solid #EAB308'
          }}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default AIQuizGenerator;
