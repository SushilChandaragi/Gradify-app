import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Error creating account. Please try again.');
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
        }}>Sign Up</h2>
        
        <form onSubmit={handleSignup}>
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
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#111827', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              backgroundColor: '#4338CA',
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
            Sign Up
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#111827' 
        }}>
          Already have an account?{' '}
          <a 
            href="/login" 
            style={{ 
              color: '#EAB308', 
              textDecoration: 'none', 
              fontWeight: 'bold' 
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
