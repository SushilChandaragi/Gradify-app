import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        padding: '0',
        margin: '0',
        position: 'relative',
        overflow: 'hidden',
        animation: 'bgHomeFade 8s ease-in-out infinite',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Animated background keyframes */}
      <style>
        {`
          @keyframes bgHomeFade {
            0% { background: linear-gradient(120deg, #F9FAFB 0%, #E0E7FF 100%);}
            50% { background: linear-gradient(120deg, #E0E7FF 0%, #FEF3C7 100%);}
            100% { background: linear-gradient(120deg, #F9FAFB 0%, #E0E7FF 100%);}
          }
        `}
      </style>
      <h1 style={{
        color: '#1E3A8A',
        fontSize: '3rem',
        textAlign: 'center',
        margin: '2rem 0 1rem 0',
        fontWeight: 'bold'
      }}>
        Welcome to Gradify
      </h1>
      <hr style={{
        border: 'none',
        borderTop: '3px solid #EAB308',
        width: '300px',
        margin: '0 0 2rem 0'
      }} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '2.5rem',
          width: '80vw',
          height: '60vh',
          maxWidth: '1200px',
          maxHeight: '700px',
          alignItems: 'stretch',
          justifyItems: 'stretch'
        }}
      >
        <a href="/timetable-tracker" style={{
          background: '#1E3A8A', 
          color: '#F9FAFB', 
          padding: '3rem 2rem', 
          borderRadius: '18px', 
          textDecoration: 'none', 
          textAlign: 'center', 
          boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)', 
          fontWeight: 'bold',
          fontSize: '1.3rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>📅 Timetable Tracker</a>
        <a href="/navigation" style={{
          background: '#4338CA', 
          color: '#F9FAFB', 
          padding: '3rem 2rem', 
          borderRadius: '18px', 
          textDecoration: 'none', 
          textAlign: 'center', 
          boxShadow: '0 4px 12px rgba(67, 56, 202, 0.3)', 
          fontWeight: 'bold',
          fontSize: '1.3rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>🗺️ Navigation</a>
        <a href="/latest-news" style={{
          background: '#EAB308', 
          color: '#111827', 
          padding: '3rem 2rem', 
          borderRadius: '18px', 
          textDecoration: 'none', 
          textAlign: 'center', 
          boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)', 
          fontWeight: 'bold',
          fontSize: '1.3rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>📰 Latest News</a>
        <a href="/ai-quiz-generator" style={{
          background: 'linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)',
          color: '#fff',
          padding: '3rem 2rem',
          borderRadius: '18px',
          textDecoration: 'none',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(99,102,241,0.25)',
          fontWeight: 'bold',
          fontSize: '1.35rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none'
        }}>🤖 AI Quiz Generator</a>
      </div>
    </div>
  );
};

export default Home;
