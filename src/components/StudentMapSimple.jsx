import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simple custom icons for different place types
const createCustomIcon = (type) => {
  const colors = {
    'Restaurant': '#FF6B6B',
    'PG': '#4ECDC4', 
    'Gym': '#45B7D1',
    'Library': '#96CEB4',
    'Other': '#FECA57'
  };
  
  return L.divIcon({
    html: `<div style="
      width: 25px; 
      height: 25px; 
      background-color: ${colors[type] || colors.Other}; 
      border-radius: 50%; 
      border: 2px solid white; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-marker',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
  });
};

// Component for adding markers by clicking on map
function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onLocationSelect) {
        onLocationSelect(e.latlng);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Click here to add a new place</Popup>
    </Marker>
  );
}

// Simple user location marker
function UserLocationMarker({ position }) {
  if (!position) return null;
  
  const userIcon = L.divIcon({
    html: `<div style="
      width: 15px; 
      height: 15px; 
      background-color: #4285F4; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    "></div>`,
    className: 'user-location-marker',
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>Your Location</Popup>
    </Marker>
  );
}

const StudentMapSimple = () => {
  const [user] = useAuthState(auth);
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({ name: '', type: 'Restaurant', lat: null, lng: null });
  const [showAddForm, setShowAddForm] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();
  
  // KLE College coordinates (Belgaum) - PIN 590008
  const kleCollege = { lat: 15.3647, lng: 75.1240 };

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

  if (!user) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E293B',
        color: '#F8FAFC'
      }}>
        <div>
          <h2>Please sign in to access the map</h2>
          <p>You need to be logged in to view and add places.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Simple controls */}
      <div style={{ 
        padding: '1rem',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={getCurrentLocation}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          📍 My Location
        </button>
        
        <button 
          onClick={() => mapRef.current?.flyTo([kleCollege.lat, kleCollege.lng], 15)}
          style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: '#34D399',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          🏫 KLE College
        </button>

        <span style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>
          Click on the map to add places
        </span>
      </div>

      {/* Add place form */}
      {showAddForm && (
        <div style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.95)', 
          padding: '1rem', 
          border: '1px solid rgba(148, 163, 184, 0.2)',
          color: '#F8FAFC'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#F8FAFC' }}>Add New Place</h3>
          <form onSubmit={handleAddPlace} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Place name"
              value={newPlace.name}
              onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
            
            <select
              value={newPlace.type}
              onChange={(e) => setNewPlace({ ...newPlace, type: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="Restaurant">Restaurant</option>
              <option value="PG">PG</option>
              <option value="Gym">Gym</option>
              <option value="Library">Library</option>
              <option value="Other">Other</option>
            </select>
            
            <button type="submit" style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Add Place
            </button>
            
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            {newPlace.lat && (
              <span style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
                Location: {newPlace.lat.toFixed(4)}, {newPlace.lng.toFixed(4)}
              </span>
            )}
          </form>
        </div>
      )}

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={[kleCollege.lat, kleCollege.lng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* KLE College marker */}
          <Marker position={[kleCollege.lat, kleCollege.lng]}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>KLE College</strong><br />
                Belagavi, Karnataka<br />
                PIN: 590008
              </div>
            </Popup>
          </Marker>
          
          {/* User location marker */}
          {userLocation && <UserLocationMarker position={userLocation} />}
          
          {/* Existing places */}
          {places.map((place) => (
            <Marker 
              key={place.id} 
              position={[place.lat, place.lng]} 
              icon={createCustomIcon(place.type)}
            >
              <Popup>
                <div>
                  <strong>{place.name}</strong><br />
                  Type: {place.type}<br />
                  Added by: {place.userName}
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Location selector for adding new places */}
          <LocationMarker onLocationSelect={handleLocationSelect} />
        </MapContainer>
      </div>
    </div>
  );
};

export default StudentMapSimple;