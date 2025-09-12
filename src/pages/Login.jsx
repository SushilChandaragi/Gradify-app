import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div style={{ 
      backgroundColor: '#F9FAFB', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '3rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(30, 58, 138, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          color: '#1E3A8A', 
          textAlign: 'center', 
          fontSize: '2rem', 
          marginBottom: '2rem' 
        }}>Login</h2>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#111827', 
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
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#111827', 
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
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
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
              backgroundColor: '#1E3A8A',
              color: '#F9FAFB',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Login
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#111827' 
        }}>
          Don't have an account?{' '}
          <a 
            href="/signup" 
            style={{ 
              color: '#EAB308', 
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
