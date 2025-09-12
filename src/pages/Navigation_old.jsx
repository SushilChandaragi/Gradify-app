import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleMap from '../components/SimpleMap';

const Navigation = () => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen);
  };

  const filters = [
    { id: 'all', label: 'All Places', icon: '🌍', color: '#3B82F6' },
    { id: 'academic', label: 'Academic', icon: '🎓', color: '#10B981' },
    { id: 'food', label: 'Food & Dining', icon: '🍽️', color: '#F59E0B' },
    { id: 'recreation', label: 'Recreation', icon: '🎯', color: '#8B5CF6' }
  ];

  return (
    <div className={`navigation-container ${mounted ? 'mounted' : ''}`}>
      {/* Enhanced Header */}
      <header className="navigation-header">
        <div className="header-brand">
          <div className="brand-icon">
            <span className="icon-emoji">🗺️</span>
            <div className="icon-glow"></div>
          </div>
          <div className="brand-content">
            <h1 className="brand-title">KLE Campus Map</h1>
            <p className="brand-subtitle">Discover & Navigate with Ease</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button
            onClick={toggleFullscreen}
            className={`action-btn ${isMapFullscreen ? 'danger' : 'success'}`}
          >
            <span className="btn-icon">
              {isMapFullscreen ? '📋' : '🖥️'}
            </span>
            <span className="btn-text">
              {isMapFullscreen ? 'Show Controls' : 'Fullscreen'}
            </span>
          </button>
          
          <Link to="/home" className="action-btn primary">
            <span className="btn-icon">🏠</span>
            <span className="btn-text">Home</span>
          </Link>
        </div>
      </header>

      {/* Filter Bar */}
      {!isMapFullscreen && (
        <div className="filter-bar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              style={{ '--filter-color': filter.color }}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Enhanced Map Container */}
      <div className={`map-container ${isMapFullscreen ? 'fullscreen' : ''}`}>
        <div className="map-wrapper">
          <SimpleMap />
          
          {/* Loading Overlay */}
          <div className="map-loading">
            <div className="loading-spinner"></div>
            <p>Loading campus map...</p>
          </div>
          
          {/* Map Overlay Controls */}
          <div className="map-controls">
            <button className="control-btn zoom-in" title="Zoom In">
              <span>+</span>
            </button>
            <button className="control-btn zoom-out" title="Zoom Out">
              <span>−</span>
            </button>
            <button className="control-btn my-location" title="My Location">
              <span>📍</span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Info Panel */}
        {!isMapFullscreen && (
          <div className="info-panel">
            <div className="panel-header">
              <div className="panel-icon">
                <span>💡</span>
              </div>
              <h3>Navigation Tips</h3>
            </div>
            <div className="panel-content">
              <div className="tip-item">
                <span className="tip-icon">👆</span>
                <span>Click markers to view location details</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🔍</span>
                <span>Use filters to find specific places</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📍</span>
                <span>Enable location for better directions</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🖥️</span>
                <span>Toggle fullscreen for immersive view</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Floating Action Buttons */}
      {!isMapFullscreen && (
        <div className="floating-actions">
          <ActionButton
            icon="🔍"
            color="from-amber-500 to-orange-500"
            tooltip="Search Places"
            onClick={() => console.log('Search clicked')}
          />
          <ActionButton
            icon="📤"
            color="from-purple-500 to-purple-600"
            tooltip="Share Location"
            onClick={() => console.log('Share clicked')}
          />
          <ActionButton
            icon="📋"
            color="from-emerald-500 to-teal-500"
            tooltip="Save Route"
            onClick={() => console.log('Save clicked')}
          />
        </div>
      )}

      <style jsx>{`
        .navigation-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-primary);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .navigation-container.mounted {
          opacity: 1;
        }

        .navigation-header {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .brand-icon {
          position: relative;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .icon-emoji {
          font-size: 1.5rem;
          z-index: 2;
        }

        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          opacity: 0.5;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          to { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }

        .brand-content h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 400;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .action-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .action-btn:hover::before {
          left: 100%;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .action-btn.primary {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        }

        .action-btn.success {
          background: linear-gradient(135deg, var(--accent), #059669);
        }

        .action-btn.danger {
          background: linear-gradient(135deg, #EF4444, #DC2626);
        }

        .filter-bar {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }

        .filter-bar::-webkit-scrollbar {
          display: none;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 2px solid transparent;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          position: relative;
        }

        .filter-btn:hover {
          background: var(--bg-quaternary);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background: var(--filter-color);
          color: white;
          border-color: var(--filter-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .map-container {
          flex: 1;
          position: relative;
          background: var(--bg-primary);
          padding: 1rem;
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .map-container.fullscreen {
          padding: 0;
        }

        .map-wrapper {
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--glass-border);
          position: relative;
          transition: all 0.3s ease;
        }

        .map-container.fullscreen .map-wrapper {
          border-radius: 0;
          box-shadow: none;
          border: none;
        }

        .map-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-primary);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .map-controls {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 100;
        }

        .control-btn {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: var(--bg-tertiary);
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
        }

        .info-panel {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          color: var(--text-primary);
          max-width: 320px;
          box-shadow: var(--shadow-xl);
          z-index: 1000;
          animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .panel-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .tip-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .tip-icon {
          font-size: 1rem;
          opacity: 0.8;
        }

        .floating-actions {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 1000;
          animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .navigation-header {
            padding: 1rem;
          }
          
          .filter-bar {
            padding: 0.75rem 1rem;
          }
          
          .map-container {
            padding: 0.5rem;
          }
          
          .info-panel {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
          
          .floating-actions {
            bottom: 1rem;
            left: 1rem;
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
};

const ActionButton = ({ icon, color, tooltip, onClick }) => {
  return (
    <button
      className="action-button"
      onClick={onClick}
      title={tooltip}
    >
      <span className="action-icon">{icon}</span>
      <style jsx>{`
        .action-button {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          border: none;
          background: linear-gradient(135deg, var(--secondary), var(--secondary));
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .action-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #F59E0B, #D97706);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .action-button:nth-child(1)::before {
          background: linear-gradient(135deg, #F59E0B, #EA580C);
        }

        .action-button:nth-child(2)::before {
          background: linear-gradient(135deg, #8B5CF6, #7C3AED);
        }

        .action-button:nth-child(3)::before {
          background: linear-gradient(135deg, #10B981, #14B8A6);
        }

        .action-button:hover::before {
          opacity: 1;
        }

        .action-button:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .action-icon {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </button>
  );
};

export default Navigation;
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.5rem', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #F8FAFC, #CBD5E1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              KLE Student Map
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: '#94A3B8',
              fontWeight: '400'
            }}>
              Discover places around campus
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleFullscreen}
            style={{
              background: isMapFullscreen 
                ? 'linear-gradient(135deg, #EF4444, #DC2626)' 
                : 'linear-gradient(135deg, #10B981, #059669)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            {isMapFullscreen ? '📋 Show Controls' : '🖥️ Fullscreen'}
          </button>
          
          <Link 
            to="/home" 
            style={{
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            ← Home
          </Link>
        </div>
      </div>

      {/* Map Container */}
      <div style={{
        flex: 1,
        position: 'relative',
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        padding: isMapFullscreen ? '0' : '1rem',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          height: '100%',
          borderRadius: isMapFullscreen ? '0' : '16px',
          overflow: 'hidden',
          boxShadow: isMapFullscreen 
            ? 'none' 
            : '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(148, 163, 184, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}>
          {/* Map Component */}
          <div style={{ height: '100%', width: '100%' }}>
            <SimpleMap />
          </div>
          
          {/* Floating Info Panel */}
          {!isMapFullscreen && (
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2rem',
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              color: '#F8FAFC',
              maxWidth: '300px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              zIndex: 1000
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  💡
                </div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.1rem', 
                  fontWeight: '600' 
                }}>
                  Quick Tips
                </h3>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: '1.2rem',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                color: '#CBD5E1'
              }}>
                <li>Click anywhere on the map to add a new place</li>
                <li>Use the location button to find places near you</li>
                <li>Click on existing markers to see reviews</li>
                <li>Toggle fullscreen for better navigation</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      {!isMapFullscreen && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 1000
        }}>
          <button style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) translateY(-2px)';
            e.target.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.4)';
          }}
          title="Filter Places">
            🔍
          </button>
          
          <button style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) translateY(-2px)';
            e.target.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
          }}
          title="Share Location">
            📤
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
