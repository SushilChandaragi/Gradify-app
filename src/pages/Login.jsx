import React, { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { initVanta } from './vanta-init';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;
    
    const timer = setTimeout(() => {
      try {
        vantaEffect = initVanta();
      } catch (error) {
        console.error('Failed to initialize Vanta:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#0f0f23' }}>
      <div id="vanta-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}></div>
      
      {/* Welcome Text */}
      <div style={{
        position: 'absolute',
        left: '3rem',
        top: '35%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: '#ffffff',
        fontSize: '5rem',
        fontWeight: '900',
        textShadow: '6px 6px 12px rgba(0,0,0,0.8), 3px 3px 6px rgba(0,0,0,0.6), 0px 0px 30px rgba(0,0,0,0.4)',
        lineHeight: '1.0',
        letterSpacing: '2px'
      }}>
        Welcome to<br/>
         Gradify!
      </div>

      <div style={{ 
        position: 'absolute',
        top: '50%',
        right: '3rem',
        transform: 'translateY(-50%)',
        zIndex: 1,
        background: 'rgba(26, 26, 46, 0.7)', 
        padding: '3rem', 
        borderRadius: '20px', 
        boxShadow: '0 25px 45px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(192, 171, 171, 0.2)',
        backdropFilter: 'blur(15px)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2 style={{ 
          color: '#ffffff', 
          textAlign: 'center', 
          fontSize: '2rem', 
          marginBottom: '2rem' 
        }}>Login</h2>
        {/* ...existing code for form and signup link... */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#ffffff', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #444',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                backgroundColor: '#2a2a3e',
                color: '#ffffff'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#ffffff', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #444',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                backgroundColor: '#2a2a3e',
                color: '#ffffff'
              }}
              required
            />
          </div>
          {error && (
            <p style={{ color: '#DC2626', textAlign: 'center', marginBottom: '1rem' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#4068b1',
              color: '#ffffff',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5078c1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4068b1'}
          >
            Login
          </button>
        </form>
        <p style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#ffffff' 
        }}>
          Don't have an account?{' '}
          <a 
            href="/signup" 
            style={{ 
              color: '#4068b1', 
              textDecoration: 'none', 
              fontWeight: 'bold' 
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
