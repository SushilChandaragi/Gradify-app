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
        background: 'linear-gradient(120deg, #F9FAFB 0%, #FEF3C7 100%)'
      }}
    >
      {/* Animated background keyframes */}
      <style>
        {`
          @keyframes bgFade {
            0% { background: linear-gradient(120deg, #F9FAFB 0%, #FEF3C7 100%);}
            50% { background: linear-gradient(120deg, #FEF3C7 0%, #F9FAFB 100%);}
            100% { background: linear-gradient(120deg, #F9FAFB 0%, #FEF3C7 100%);}
          }
        `}
      </style>

      {/* Top Navigation Bar */}
      <nav style={{
        backgroundColor: '#EAB308',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#111827' }}>Gradify Portal</div>
        <div>
          <a href="/home" style={{ marginRight: '1.5rem', color: '#111827', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="/profile" style={{ color: '#111827', textDecoration: 'none', fontWeight: 'bold' }}>Profile</a>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <div className="card" style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #eab30833', padding: '2rem' }}>
          <h2 style={{ color: '#EAB308', fontSize: '2rem', marginBottom: '1rem' }}>📰 Latest College News</h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Stay updated with the latest announcements and events.</p>
          
          {/* Category Selector */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #EAB308', paddingBottom: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  background: selectedCategory === cat.key ? '#EAB308' : '#FEF3C7',
                  color: selectedCategory === cat.key ? '#111827' : '#92400E',
                  border: 'none',
                  borderRadius: '6px 6px 0 0',
                  padding: '0.5rem 1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: selectedCategory === cat.key ? '0 2px 4px #eab30833' : 'none'
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
                  border: '4px solid #EAB308',
                  borderTop: '4px solid #FEF3C7',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <style>
                  {`@keyframes spin { 0% { transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}
                </style>
                <div style={{ marginTop: '1rem', color: '#92400E' }}>Loading news...</div>
              </div>
            ) : news.length === 0 ? (
              <div style={{
                padding: '2rem',
                backgroundColor: '#FEF3C7',
                borderRadius: '8px',
                textAlign: 'center',
                border: '1px solid #EAB308',
                color: '#92400E'
              }}>
                No news in this category.
              </div>
            ) : (
              <div>
                {news.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    background: '#FEF3C7',
                    borderRadius: '8px',
                    border: '1px solid #EAB308',
                    marginBottom: '1.5rem',
                    padding: '1rem'
                  }}>
                    {item.image && (
                      <img src={item.image} alt="news" style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '1rem' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#92400E' }}>{item.title}</div>
                      <div style={{ color: '#6B7280', margin: '0.5rem 0' }}>{item.description}</div>
                      <div style={{ fontSize: '0.9rem', color: '#92400E', marginBottom: '0.5rem' }}>
                        {new Date(item.date).toLocaleString()}
                      </div>
                      <button
                        style={{
                          background: '#EAB308',
                          color: '#111827',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4rem 1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                        onClick={() => setModalNews(item)}
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
              background: '#fff',
              borderRadius: '10px',
              maxWidth: '500px',
              width: '90%',
              padding: '2rem',
              boxShadow: '0 4px 16px #eab30855',
              position: 'relative'
            }}>
              {/* Modal header with flexbox for alignment */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: '#EAB308', margin: 0 }}>{modalNews.title}</h3>
                <button
                  style={{
                    background: '#EAB308',
                    color: '#111827',
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
              <div style={{ color: '#6B7280', marginBottom: '1rem' }}>{modalNews.full}</div>
              <div style={{ fontSize: '0.9rem', color: '#92400E' }}>
                {new Date(modalNews.date).toLocaleString()}
              </div>
            </div>
          </div>
        )}

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
