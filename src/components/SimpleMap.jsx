import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create colored markers for different place types
const createColoredIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
};


const kleCollege = { lat: 15.3647, lng: 75.1240 };

const AddLocationOnClick = ({ onAdd }) => {
  useMapEvents({
    click(e) {
      onAdd(e.latlng);
    }
  });
  return null;
};

const SimpleMap = () => {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocCoords, setNewLocCoords] = useState(null);
  const [newLocName, setNewLocName] = useState("");
  const [newLocDesc, setNewLocDesc] = useState("");

  // Fetch places from Firestore
  const fetchPlaces = async () => {
    const snap = await getDocs(collection(db, "locations"));
    setPlaces(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };
  useEffect(() => {
    fetchPlaces();
  }, []);
  // Add new location
  const handleAddLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await addDoc(collection(db, "locations"), {
        name: newLocName,
        description: newLocDesc,
        coordinates: `${newLocCoords.lat},${newLocCoords.lng}`,
        createdAt: Timestamp.now()
      });
      setMessage("Location added!");
      setNewLocName("");
      setNewLocDesc("");
      setNewLocCoords(null);
      setShowAddLocation(false);
      fetchPlaces();
    } catch (err) {
      setMessage("Error adding location.");
    }
    setLoading(false);
  };

  // Fetch reviews for selected place
  useEffect(() => {
    if (!selected) return;
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("location", "==", selected.name));
      const snap = await getDocs(q);
      setReviews(snap.docs.map(doc => doc.data()));
    };
    fetchReviews();
  }, [selected]);

  // Add review for selected place
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await addDoc(collection(db, "reviews"), {
        location: selected.name,
        review: reviewText,
        rating: reviewRating,
        createdAt: Timestamp.now()
      });
      setMessage("Review added!");
      setReviewText("");
      setReviewRating(0);
      setShowReviewForm(false);
      // Refresh reviews
      const q = query(collection(db, "reviews"), where("location", "==", selected.name));
      const snap = await getDocs(q);
      setReviews(snap.docs.map(doc => doc.data()));
    } catch (err) {
      setMessage("Error adding review.");
    }
    setLoading(false);
  };

  // Calculate average rating
  const getAvgRating = (locName) => {
    const locReviews = reviews.filter(r => r.location === locName);
    if (locReviews.length === 0) return null;
    const avg = locReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / locReviews.length;
    return avg.toFixed(1);
  };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem', backgroundColor: '#1E293B', color: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>🗺️ Find Popular Places</h2>
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#94A3B8' }}>
          Click a marker to see reviews and add your own!
        </p>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[kleCollege.lat, kleCollege.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <AddLocationOnClick onAdd={coords => { setNewLocCoords(coords); setShowAddLocation(true); }} />
        {/* Add Location Modal */}
        {showAddLocation && newLocCoords && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleAddLocation} style={{ background: '#1E293B', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', minWidth: '320px', color: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{margin:0}}>Add New Location</h2>
              <input type="text" placeholder="Location name" value={newLocName} onChange={e => setNewLocName(e.target.value)} required style={{padding:'0.5rem',borderRadius:'8px',border:'1px solid #334155'}} />
              <textarea placeholder="Description" value={newLocDesc} onChange={e => setNewLocDesc(e.target.value)} required style={{padding:'0.5rem',borderRadius:'8px',border:'1px solid #334155',minHeight:'60px'}} />
              <div style={{ color: '#94A3B8', fontSize: '0.95rem' }}>Coordinates: {newLocCoords.lat.toFixed(5)}, {newLocCoords.lng.toFixed(5)}</div>
              <div style={{display:'flex',gap:'1rem'}}>
                <button type="submit" disabled={loading} style={{padding:'0.5rem 1.5rem',borderRadius:'8px',border:'none',background:'#22C55E',color:'white',fontWeight:'600'}}>Submit</button>
                <button type="button" onClick={()=>{setShowAddLocation(false);setNewLocCoords(null);}} style={{padding:'0.5rem 1.5rem',borderRadius:'8px',border:'none',background:'#64748B',color:'white'}}>Cancel</button>
              </div>
              {message && <div style={{color:'#22C55E'}}>{message}</div>}
            </form>
          </div>
        )}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          {/* Main campus marker */}
          <Marker position={[kleCollege.lat, kleCollege.lng]}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>🏫 KLE College</strong><br />
                Belagavi, Karnataka<br />
                <strong>PIN: 590008</strong><br />
                <em>Main Campus</em>
              </div>
            </Popup>
          </Marker>
          {/* Dynamic places */}
          {places.map(place => {
            const [lat, lng] = place.coordinates.split(',').map(Number);
            return (
              <Marker key={place.id} position={[lat, lng]} eventHandlers={{ click: () => setSelected(place) }}>
                <Popup>
                  <div style={{ minWidth: '220px' }}>
                    <strong>{place.name}</strong><br />
                    <span style={{ color: '#94A3B8', fontSize: '0.95rem' }}>{place.description}</span><br />
                    <span style={{ color: '#F59E0B', fontWeight: '600' }}>{place.type || 'Other'}</span>
                    <hr style={{ margin: '0.5rem 0' }} />
                    <div>
                      <b>Popular Reviews:</b>
                      {selected && selected.id === place.id && reviews.length > 0 ? (
                        <ul style={{ paddingLeft: '1rem', margin: '0.5rem 0' }}>
                          {reviews.map((rev, idx) => (
                            <li key={idx} style={{ marginBottom: '0.5rem' }}>
                              <span style={{ color: '#FACC15', fontWeight: 'bold' }}>{'★'.repeat(rev.rating)}</span>
                              <span style={{ marginLeft: '0.5rem' }}>{rev.review}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div style={{ color: '#64748B', fontSize: '0.95rem' }}>No reviews yet.</div>
                      )}
                      {selected && selected.id === place.id && (
                        <div style={{ marginTop: '0.5rem', color: '#22C55E', fontWeight: '600' }}>
                          {getAvgRating(place.name) ? `Average Rating: ${getAvgRating(place.name)} ★` : ''}
                        </div>
                      )}
                    </div>
                    <button
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.4rem 1rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                      }}
                      onClick={() => {
                        setSelected(place);
                        setShowReviewForm(true);
                      }}
                    >Add Review</button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        {/* Review Form Modal */}
        {showReviewForm && selected && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleReviewSubmit} style={{ background: 'linear-gradient(135deg, #1E293B 60%, #334155 100%)', padding: '2rem', borderRadius: '20px', boxShadow: '0 12px 40px rgba(59,130,246,0.25)', minWidth: '340px', color: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center' }}>
              <h2 style={{margin:0, fontWeight:'700', fontSize:'1.3rem', letterSpacing:'0.5px'}}>Add Review for {selected.name}</h2>
              <div style={{display:'flex',alignItems:'center',gap:'0.5rem',margin:'0.5rem 0'}}>
                <span style={{fontWeight:'600',fontSize:'1rem'}}>Rating:</span>
                {[1,2,3,4,5].map(star => (
                  <span key={star} style={{ cursor:'pointer', fontSize:'1.7rem', color: star <= reviewRating ? '#FACC15' : '#64748B', transition:'color 0.2s' }} onClick={()=>setReviewRating(star)} onMouseEnter={()=>setReviewRating(star)} onMouseLeave={()=>setReviewRating(reviewRating)} >★</span>
                ))}
              </div>
              <textarea placeholder="Write your review description..." value={reviewText} onChange={e => setReviewText(e.target.value)} required style={{padding:'0.7rem',borderRadius:'10px',border:'1px solid #334155',minHeight:'90px',width:'100%',fontSize:'1rem',background:'#0F172A',color:'#F8FAFC'}} />
              <div style={{display:'flex',gap:'1rem',marginTop:'0.5rem'}}>
                <button type="submit" disabled={loading || reviewRating===0} style={{padding:'0.7rem 2rem',borderRadius:'10px',border:'none',background:reviewRating===0?'#64748B':'#3B82F6',color:'white',fontWeight:'600',fontSize:'1rem',cursor:reviewRating===0?'not-allowed':'pointer'}}>Submit</button>
                <button type="button" onClick={()=>setShowReviewForm(false)} style={{padding:'0.7rem 2rem',borderRadius:'10px',border:'none',background:'#64748B',color:'white',fontWeight:'600',fontSize:'1rem'}}>Cancel</button>
              </div>
              {message && <div style={{color:'#22C55E',marginTop:'0.5rem'}}>{message}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleMap;