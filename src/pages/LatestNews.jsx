import React, { useState, useEffect } from 'react';

// Dummy categories
const categories = [
  { key: 'all', label: 'All' },
  { key: 'admin', label: 'Administrative' },
  { key: 'clubs', label: 'Club Activities' },
  { key: 'scholarships', label: 'Scholarships' },
  { key: 'others', label: 'Others' }
];

// Dummy news data
const dummyNews = [
  {
    id: 1,
    category: 'admin',
    title: 'Semester Registration Open',
    description: 'Register for the upcoming semester before July 10.',
    date: '2025-06-09',
    image: '',
    full: 'Full details about semester registration...',
  },
  {
    id: 2,
    category: 'clubs',
    title: 'Photography Club Meetup',
    description: 'Join us for a campus photo walk this Friday.',
    date: '2025-06-09',
    image: '',
    full: 'Full details about the club meetup...',
  },
  // ...add more dummy news as needed
];

const LatestNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [modalNews, setModalNews] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulate fetch delay
    setTimeout(() => {
      let filtered = dummyNews;
      if (selectedCategory !== 'all') {
        filtered = dummyNews.filter(n => n.category === selectedCategory);
      }
      // Sort by date (latest first)
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNews(filtered);
      setLoading(false);
    }, 500);
  }, [selectedCategory]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '0',
        animation: 'bgFade 6s ease-in-out infinite',
        background: 'linear-gradient(120deg, #1E3A8A 0%, #3730A3 100%)'
      }}
    >
      {/* Animated background keyframes */}
      <style>
        {`
          @keyframes bgFade {
            0% { background: linear-gradient(120deg, #1E3A8A 0%, #3730A3 100%);}
            50% { background: linear-gradient(120deg, #3730A3 0%, #1E3A8A 100%);}
            100% { background: linear-gradient(120deg, #1E3A8A 0%, #3730A3 100%);}
          }
        `}
      </style>

      {/* Top Navigation Bar */}
      <nav style={{
        backgroundColor: 'rgba(30, 58, 138, 0.9)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#ffffff' }}>Gradify Portal</div>
        <div>
          <a href="/home" style={{ marginRight: '1.5rem', color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="/profile" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Profile</a>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <div className="card" style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(30, 58, 138, 0.3)', padding: '2rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <h2 style={{ color: '#1E3A8A', fontSize: '2rem', marginBottom: '1rem' }}>📰 Latest College News</h2>
          <p style={{ color: '#64748B', marginBottom: '2rem' }}>Stay updated with the latest announcements and events.</p>
          
          {/* Category Selector */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #1E3A8A', paddingBottom: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  background: selectedCategory === cat.key ? '#1E3A8A' : 'rgba(30, 58, 138, 0.1)',
                  color: selectedCategory === cat.key ? '#ffffff' : '#1E3A8A',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: selectedCategory === cat.key ? '0 4px 8px rgba(30, 58, 138, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* News Feed Area */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <span style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  border: '4px solid #1E3A8A',
                  borderTop: '4px solid rgba(30, 58, 138, 0.3)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <style>
                  {`@keyframes spin { 0% { transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}
                </style>
                <div style={{ marginTop: '1rem', color: '#1E3A8A' }}>Loading news...</div>
              </div>
            ) : news.length === 0 ? (
              <div style={{
                padding: '2rem',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
                border: '1px solid #1E3A8A',
                color: '#1E3A8A'
              }}>
                No news in this category.
              </div>
            ) : (
              <div>
                {news.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    background: 'rgba(30, 58, 138, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(30, 58, 138, 0.2)',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backdropFilter: 'blur(5px)'
                  }}>
                    {item.image && (
                      <img src={item.image} alt="news" style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '1rem' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1E3A8A' }}>{item.title}</div>
                      <div style={{ color: '#64748B', margin: '0.5rem 0' }}>{item.description}</div>
                      <div style={{ fontSize: '0.9rem', color: '#1E3A8A', marginBottom: '0.5rem' }}>
                        {new Date(item.date).toLocaleString()}
                      </div>
                      <button
                        style={{
                          background: '#1E3A8A',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.4rem 1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 4px rgba(30, 58, 138, 0.3)'
                        }}
                        onClick={() => setModalNews(item)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#3730A3'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#1E3A8A'}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal for full news */}
        {modalNews && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(30, 58, 138, 0.3)',
              position: 'relative',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {/* Modal header with flexbox for alignment */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: '#1E3A8A', margin: 0 }}>{modalNews.title}</h3>
                <button
                  style={{
                    background: '#1E3A8A',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '1rem'
                  }}
                  onClick={() => setModalNews(null)}
                  aria-label="Close"
                >×</button>
              </div>
              <div style={{ color: '#64748B', marginBottom: '1rem' }}>{modalNews.full}</div>
              <div style={{ fontSize: '0.9rem', color: '#1E3A8A' }}>
                {new Date(modalNews.date).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/home" style={{
            backgroundColor: '#1E3A8A',
            color: '#ffffff',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 4px 8px rgba(30, 58, 138, 0.3)',
            transition: 'all 0.3s ease'
          }}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
