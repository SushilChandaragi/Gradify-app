import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SimpleMap = () => {
  const mapRef = useRef();
  
  // KLE College coordinates (Belgaum) - PIN 590008
  const kleCollege = { lat: 15.3647, lng: 75.1240 };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Simple header */}
      <div style={{ 
        padding: '1rem',
        backgroundColor: '#1E293B',
        color: '#F8FAFC',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>🗺️ KLE Student Map</h2>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#94A3B8' }}>
          Map is working! Click markers to see details.
        </p>
      </div>

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
                <strong>🏫 KLE College</strong><br />
                Belagavi, Karnataka<br />
                <strong>PIN: 590008</strong><br />
                <br />
                <em>Main Campus</em>
              </div>
            </Popup>
          </Marker>

          {/* Sample places around KLE */}
          <Marker position={[15.3650, 75.1245]}>
            <Popup>
              <div>
                <strong>🍕 Sample Restaurant</strong><br />
                Near KLE College<br />
                <em>Great food for students!</em>
              </div>
            </Popup>
          </Marker>

          <Marker position={[15.3640, 75.1235]}>
            <Popup>
              <div>
                <strong>🏠 Sample PG</strong><br />
                Hostel near college<br />
                <em>Affordable accommodation</em>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default SimpleMap;