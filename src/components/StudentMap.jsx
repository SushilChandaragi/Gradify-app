import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReviewSystem from './ReviewSystem';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Enhanced custom icons for different place types
const createCustomIcon = (type) => {
  const iconConfig = {
    'Restaurant': { color: '#FF6B6B', emoji: '🍽️', shadow: 'rgba(255, 107, 107, 0.4)' },
    'PG': { color: '#4ECDC4', emoji: '🏠', shadow: 'rgba(78, 205, 196, 0.4)' }, 
    'Gym': { color: '#45B7D1', emoji: '💪', shadow: 'rgba(69, 183, 209, 0.4)' },
    'Library': { color: '#96CEB4', emoji: '📚', shadow: 'rgba(150, 206, 180, 0.4)' },
    'Other': { color: '#FECA57', emoji: '🎯', shadow: 'rgba(254, 202, 87, 0.4)' }
  };
  
  const config = iconConfig[type] || iconConfig.Other;
  
  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 32px; 
        height: 32px; 
        background: linear-gradient(145deg, ${config.color}, ${config.color}dd);
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 4px 15px ${config.shadow}, 0 0 0 1px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        animation: bounce 2s infinite;
        cursor: pointer;
        transition: all 0.3s ease;
      " class="custom-marker-pin">
        ${config.emoji}
      <style>
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-3px); }
          60% { transform: translateY(-2px); }
        }
        .custom-marker-pin:hover {
          transform: scale(1.2) translateY(-2px) !important;
          box-shadow: 0 8px 25px ${config.shadow} !important;
        }
      </style>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Component for adding markers by clicking on map
function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Selected location for new place</Popup>
    </Marker>
  );
}

// Enhanced component for user's current location marker
function UserLocationMarker({ position }) {
  if (!position) return null;
  
  const userIcon = L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 20px; 
        height: 20px; 
        background: linear-gradient(145deg, #4285F4, #1a73e8); 
        border-radius: 50%; 
        border: 4px solid white; 
        box-shadow: 0 0 20px rgba(66, 133, 244, 0.8), 0 4px 15px rgba(66, 133, 244, 0.4);
        animation: pulse 2s infinite;
      " class="user-location-pin">
      </div>
      <div style="
        position: absolute;
        top: -8px;
        left: -8px;
        width: 36px;
        height: 36px;
        border: 2px solid rgba(66, 133, 244, 0.3);
        border-radius: 50%;
        animation: ripple 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      </style>
    `,
    className: 'user-location-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div style={{ textAlign: 'center', padding: '0.5rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📍</div>
          <strong style={{ color: '#1E3A8A' }}>You Are Here!</strong>
          <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.5rem' }}>
            Lat: {position[0].toFixed(6)}<br />
            Lng: {position[1].toFixed(6)}
          </div>
          <div style={{ 
            marginTop: '0.5rem', 
            padding: '0.25rem 0.75rem',
            backgroundColor: '#EAB308',
            borderRadius: '15px',
            fontSize: '0.7rem',
            fontWeight: '600',
            color: '#111827'
          }}>
            LIVE LOCATION
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// Enhanced KLE College marker component
function KLECollegeMarker() {
  const kleIcon = L.divIcon({
    html: `
      <div style="
        position: relative;
        background: linear-gradient(145deg, #1E3A8A, #1e40af); 
        width: 40px; 
        height: 40px; 
        border-radius: 8px; 
        border: 4px solid #EAB308; 
        box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4), 0 0 0 2px rgba(234, 179, 8, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 18px;
        animation: glow 3s ease-in-out infinite alternate;
        cursor: pointer;
        transform: rotate(-5deg);
      " class="kle-marker">
        🏫
      </div>
      <div style="
        position: absolute;
        top: -45px;
        left: -10px;
        background: linear-gradient(145deg, #EAB308, #f59e0b);
        color: #111827;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.7rem;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(234, 179, 8, 0.3);
        white-space: nowrap;
        animation: float 3s ease-in-out infinite;
      ">
        KLE COLLEGE
      </div>
      <style>
        @keyframes glow {
          0% { box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4), 0 0 0 2px rgba(234, 179, 8, 0.2); }
          100% { box-shadow: 0 8px 25px rgba(30, 58, 138, 0.6), 0 0 0 4px rgba(234, 179, 8, 0.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .kle-marker:hover {
          transform: rotate(0deg) scale(1.1) !important;
        }
      </style>
    `,
    className: 'kle-college-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -30]
  });

  return (
    <Marker position={[15.3647, 75.1240]} icon={kleIcon}>
      <Popup>
        <div style={{ textAlign: 'center', padding: '1rem', minWidth: '200px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏫</div>
          <h3 style={{ color: '#1E3A8A', marginBottom: '0.5rem' }}>KLE College</h3>
          <div style={{ color: '#6B7280', marginBottom: '0.5rem' }}>
            📍 Belagavi, Karnataka<br />
            📮 PIN: 590008
          </div>
          <div style={{
            background: 'linear-gradient(145deg, #EAB308, #f59e0b)',
            color: '#111827',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '700',
            marginTop: '0.75rem'
          }}>
            🎓 YOUR COLLEGE CAMPUS
          </div>
          <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '0.5rem' }}>
            The heart of student life in Belagavi
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

const StudentMap = () => {
  const [user] = useAuthState(auth);
  const [places, setPlaces] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [mapCenter, setMapCenter] = useState([15.3647, 75.1240]); // KLE College coordinates
  const mapRef = useRef();
  
  // Form state
  const [newPlace, setNewPlace] = useState({
    name: '',
    type: 'Restaurant',
    address: '',
    description: '',
    contact: ''
  });

  // KLE College coordinates (Belagavi, Karnataka - 590008)
  const kleCollegeLocation = [15.3647, 75.1240];
  const defaultZoom = 15;

  useEffect(() => {
    // Try to get user location automatically
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          if (mapRef.current) {
            mapRef.current.flyTo(location, 15);
          }
        },
        () => {
          alert('Could not get your location');
        }
      );
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'places'));
        const placesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlaces(placesData);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    if (user) {
      fetchPlaces();
    }
  }, [user]);

  const handleLocationSelect = (latlng) => {
    setNewPlace({ ...newPlace, lat: latlng.lat, lng: latlng.lng });
    setShowAddForm(true);
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();
    if (!newPlace.name || !newPlace.lat || !newPlace.lng) {
      alert('Please fill in all fields and select a location on the map');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'places'), {
        ...newPlace,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        createdAt: new Date()
      });
      
      setPlaces([...places, { id: docRef.id, ...newPlace, userId: user.uid, userName: user.displayName || 'Anonymous' }]);
      setNewPlace({ name: '', type: 'Restaurant', lat: null, lng: null });
      setShowAddForm(false);
      alert('Place added successfully!');
    } catch (error) {
      console.error('Error adding place:', error);
      alert('Error adding place. Please try again.');
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh', 
      padding: '1rem' 
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Enhanced Header */}
        <div style={{ 
          marginBottom: '2rem', 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{ 
            color: '#1E3A8A', 
            fontSize: '3rem', 
            marginBottom: '1rem',
            fontWeight: '800',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            background: 'linear-gradient(45deg, #1E3A8A, #4338CA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🗺️ KLE Student Hub
          </h1>
          <p style={{ 
            color: '#6B7280', 
            fontSize: '1.2rem',
            fontWeight: '500',
            marginBottom: '1rem'
          }}>
            Discover authentic student-reviewed places around KLE College
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#EAB308',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#111827',
            boxShadow: '0 4px 15px rgba(234, 179, 8, 0.4)'
          }}>
            📍 Belagavi, Karnataka 590008
          </div>
        </div>

        {/* Enhanced Controls Panel */}
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem', 
            alignItems: 'end'
          }}>
          {/* Enhanced Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search amazing places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '15px',
                border: '3px solid transparent',
                fontSize: '1rem',
                minWidth: '250px',
                background: 'linear-gradient(145deg, #ffffff, #f1f5f9)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.8)',
                outline: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.border = '3px solid #4338CA';
                e.target.style.transform = 'scale(1.03) translateY(-2px)';
                e.target.style.boxShadow = '0 15px 40px rgba(67, 56, 202, 0.2), inset 0 2px 5px rgba(255, 255, 255, 0.8)';
              }}
              onBlur={(e) => {
                e.target.style.border = '3px solid transparent';
                e.target.style.transform = 'scale(1) translateY(0px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.8)';
              }}
            />
            <div style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#6B7280',
              pointerEvents: 'none'
            }}>
              🔍
            </div>
          </div>
          
          {/* Enhanced Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '1rem',
              borderRadius: '15px',
              border: '3px solid transparent',
              fontSize: '1rem',
              minWidth: '200px',
              background: 'linear-gradient(145deg, #ffffff, #f1f5f9)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.8)',
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1rem',
              paddingRight: '3rem'
            }}
            onFocus={(e) => {
              e.target.style.border = '3px solid #4338CA';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 40px rgba(67, 56, 202, 0.2), inset 0 2px 5px rgba(255, 255, 255, 0.8)';
            }}
            onBlur={(e) => {
              e.target.style.border = '3px solid transparent';
              e.target.style.transform = 'translateY(0px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.8)';
            }}
          >
            <option value="All">🏪 All Categories</option>
            <option value="Restaurant">🍽️ Restaurants & Cafes</option>
            <option value="PG">🏠 PG & Hostels</option>
            <option value="Gym">💪 Gyms & Fitness</option>
            <option value="Library">📚 Libraries & Study</option>
            <option value="Other">🎯 Other Places</option>
          </select>

            {/* Enhanced Add Place Button */}
            <button
              onClick={() => {
                if (!user) {
                  const shouldLogin = window.confirm('You need to be logged in to add places. Would you like to go to the login page?');
                  if (shouldLogin) {
                    window.location.href = '/login';
                  }
                  return;
                }
                setShowAddForm(!showAddForm);
                setSelectedLocation(null);
              }}
              style={{
                background: showAddForm 
                  ? 'linear-gradient(145deg, #dc2626, #b91c1c)'
                  : 'linear-gradient(145deg, #1E3A8A, #1e40af)',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)',
                transform: 'perspective(1000px) rotateX(0deg)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(-5deg) translateY(-3px)';
                e.target.style.boxShadow = '0 15px 35px rgba(30, 58, 138, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
                e.target.style.boxShadow = '0 8px 25px rgba(30, 58, 138, 0.3)';
              }}
            >
              {showAddForm ? '❌ Cancel' : '✨ Add Place'}
            </button>
          </div>

          {/* Location Controls Row */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginTop: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {currentLocation && (
              <button
                onClick={() => {
                  setMapCenter(currentLocation);
                  if (mapRef.current) {
                    mapRef.current.flyTo(currentLocation, 17);
                  }
                }}
                style={{
                  background: 'linear-gradient(145deg, #4285F4, #1a73e8)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(66, 133, 244, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(66, 133, 244, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(66, 133, 244, 0.3)';
                }}
                title="Center map on your location"
              >
                📍 My Location
              </button>
            )}
            
            <button
              onClick={() => {
                setMapCenter(kleCollegeLocation);
                if (mapRef.current) {
                  mapRef.current.flyTo(kleCollegeLocation, 15);
                }
              }}
              style={{
                background: 'linear-gradient(145deg, #4338CA, #3730a3)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '25px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(67, 56, 202, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 30px rgba(67, 56, 202, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0px)';
                e.target.style.boxShadow = '0 6px 20px rgba(67, 56, 202, 0.3)';
              }}
              title="Center map on KLE College"
            >
              🏫 KLE College
            </button>

            {locationPermission === 'denied' && (
              <button
                onClick={requestLocationPermission}
                style={{
                  background: 'linear-gradient(145deg, #EAB308, #d97706)',
                  color: '#111827',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(234, 179, 8, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(234, 179, 8, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(234, 179, 8, 0.3)';
                }}
                title="Enable location access for better experience"
              >
                🔓 Enable Location
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Location Status */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem',
          background: locationPermission === 'granted' && currentLocation 
            ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
            : locationPermission === 'denied'
            ? 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'
            : 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
          borderRadius: '15px',
          fontSize: '1rem',
          color: '#1F2937',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ 
                fontSize: '1.1rem', 
                fontWeight: '700',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📍 Location Status
                {locationPermission === 'granted' && currentLocation && (
                  <span style={{ 
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    ACTIVE
                  </span>
                )}
              </div>
              {locationPermission === 'granted' && currentLocation ? (
                <div style={{ color: '#059669', fontWeight: '600' }}>
                  ✅ Your location detected - Enhanced experience enabled!
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    Lat: {currentLocation[0].toFixed(6)}, Lng: {currentLocation[1].toFixed(6)}
                  </div>
                </div>
              ) : locationPermission === 'denied' ? (
                <div style={{ color: '#DC2626', fontWeight: '600' }}>
                  ❌ Location access denied - Limited to KLE College area
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    You can still browse all places and add new ones!
                  </div>
                </div>
              ) : locationPermission === 'not_supported' ? (
                <div style={{ color: '#D97706', fontWeight: '600' }}>
                  ⚠️ Location not supported by your browser
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    Consider using Chrome, Firefox, or Safari for better features
                  </div>
                </div>
              ) : (
                <div style={{ color: '#4338CA', fontWeight: '600' }}>
                  🔄 Requesting location access...
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    Allow location access for personalized recommendations
                  </div>
                </div>
              )}
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(30, 58, 138, 0.1)',
              borderRadius: '10px',
              textAlign: 'center',
              minWidth: '200px'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏫</div>
              <div style={{ fontWeight: '600', color: '#1E3A8A' }}>KLE College</div>
              <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>Belagavi, Karnataka</div>
              <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>PIN: 590008</div>
            </div>
          </div>
        </div>

        {/* Add Place Form */}
        {showAddForm && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1E3A8A', marginBottom: '1rem' }}>Add New Place</h3>
            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
              Click on the map to select location, then fill out the form below:
            </p>
            
            <form onSubmit={handleAddPlace}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Place Name"
                  value={newPlace.name}
                  onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                  required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #E5E7EB' }}
                />
                
                <select
                  value={newPlace.type}
                  onChange={(e) => setNewPlace({...newPlace, type: e.target.value})}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #E5E7EB' }}
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="PG">PG/Hostel</option>
                  <option value="Gym">Gym</option>
                  <option value="Library">Library</option>
                  <option value="Other">Other</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Address"
                  value={newPlace.address}
                  onChange={(e) => setNewPlace({...newPlace, address: e.target.value})}
                  required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #E5E7EB' }}
                />
                
                <input
                  type="text"
                  placeholder="Contact (optional)"
                  value={newPlace.contact}
                  onChange={(e) => setNewPlace({...newPlace, contact: e.target.value})}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #E5E7EB' }}
                />
              </div>
              
              <textarea
                placeholder="Description"
                value={newPlace.description}
                onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
                rows="3"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '2px solid #E5E7EB',
                  marginTop: '1rem',
                  resize: 'vertical'
                }}
              />
              
              <button
                type="submit"
                disabled={!selectedLocation}
                style={{
                  backgroundColor: selectedLocation ? '#4338CA' : '#9CA3AF',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: selectedLocation ? 'pointer' : 'not-allowed',
                  marginTop: '1rem'
                }}
              >
                Add Place {selectedLocation ? '✓' : '(Select location on map)'}
              </button>
            </form>
          </div>
        )}

        {/* Enhanced Interactive Map */}
        <div style={{ 
          height: '650px', 
          borderRadius: '25px', 
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          marginBottom: '3rem',
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
          padding: '8px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '1rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E3A8A' }}>
              🗺️ Interactive Map
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.25rem' }}>
              Click markers for details • Click map to add places
            </div>
          </div>
          <MapContainer
            center={mapCenter}
            zoom={defaultZoom}
            style={{ 
              height: '100%', 
              width: '100%', 
              borderRadius: '20px',
              zIndex: 1
            }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* KLE College Marker */}
            <KLECollegeMarker />
            
            {/* User's current location */}
            {currentLocation && <UserLocationMarker position={currentLocation} />}
            
            {/* Existing places */}
            {filteredPlaces.map(place => (
              <Marker
                key={place.id}
                position={[place.latitude, place.longitude]}
                icon={createCustomIcon(place.type)}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <h4 style={{ color: '#1E3A8A', marginBottom: '0.5rem' }}>{place.name}</h4>
                    <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                      <strong>Type:</strong> {place.type}
                    </p>
                    <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                      <strong>Address:</strong> {place.address}
                    </p>
                    {place.contact && (
                      <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                        <strong>Contact:</strong> {place.contact}
                      </p>
                    )}
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{place.description}</p>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#9CA3AF' }}>
                      Added by: {place.createdBy}
                    </div>
                    
                    {/* Review Section */}
                    <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #E5E7EB' }}>
                      <button
                        onClick={() => handleOpenReviews(place)}
                        style={{
                          backgroundColor: '#EAB308',
                          color: '#1E3A8A',
                          padding: '0.5rem 1rem',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          width: '100%'
                        }}
                      >
                        ⭐ View Reviews
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Location selector for adding new places */}
            {showAddForm && (
              <LocationMarker onLocationSelect={setSelectedLocation} />
            )}
          </MapContainer>
        </div>

        {/* Places List */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1rem' 
        }}>
          {filteredPlaces.map(place => (
            <div key={place.id} style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: `3px solid ${createCustomIcon(place.type).options.html.includes('#FF6B6B') ? '#FF6B6B' : 
                createCustomIcon(place.type).options.html.includes('#4ECDC4') ? '#4ECDC4' :
                createCustomIcon(place.type).options.html.includes('#45B7D1') ? '#45B7D1' :
                createCustomIcon(place.type).options.html.includes('#96CEB4') ? '#96CEB4' : '#FECA57'}`
            }}>
              <h3 style={{ color: '#1E3A8A', marginBottom: '0.5rem' }}>{place.name}</h3>
              <span style={{ 
                backgroundColor: '#EAB308', 
                color: '#111827', 
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {place.type}
              </span>
              <p style={{ margin: '1rem 0', color: '#6B7280' }}>{place.description}</p>
              <p style={{ margin: '0.5rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                📍 {place.address}
              </p>
              {place.contact && (
                <p style={{ margin: '0.5rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                  📞 {place.contact}
                </p>
              )}
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#9CA3AF' }}>
                Added by: {place.createdBy}
              </div>
              
              {/* Action Buttons */}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleOpenReviews(place)}
                  style={{
                    backgroundColor: '#EAB308',
                    color: '#111827',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  ⭐ Reviews
                </button>
                
                <button
                  onClick={() => {
                    // Focus on map marker
                    // You could implement map centering here
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: '#4338CA',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  📍 Show on Map
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#6B7280' }}>No places found</h3>
            <p style={{ color: '#9CA3AF' }}>
              {searchTerm || filterCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Be the first to add a place!'
              }
            </p>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedPlace && (
          <ReviewSystem
            placeId={selectedPlace.id}
            placeName={selectedPlace.name}
            onClose={() => {
              setShowReviewModal(false);
              setSelectedPlace(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentMap;
