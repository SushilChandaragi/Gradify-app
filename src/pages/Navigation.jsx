import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleMap from '../components/SimpleMap';

const Navigation = () => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#0F172A',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        color: '#F8FAFC',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            🗺️
          </div>
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
