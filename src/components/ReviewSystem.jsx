import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ReviewSystem = ({ placeId, placeName, onClose }) => {
  const [user] = useAuthState(auth);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    category: 'Overall'
  });

  useEffect(() => {
    fetchReviews();
  }, [placeId]);

  const fetchReviews = async () => {
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('placeId', '==', placeId),
        orderBy('createdAt', 'desc')
      );
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewsList = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsList);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to add a review.');
      return;
    }

    try {
      const reviewData = {
        placeId,
        placeName,
        ...newReview,
        userName: user.email.split('@')[0], // Use part before @ as display name
        userEmail: user.email,
        createdAt: new Date(),
        helpful: 0
      };

      await addDoc(collection(db, 'reviews'), reviewData);
      
      setNewReview({
        rating: 5,
        comment: '',
        category: 'Overall'
      });
      
      fetchReviews(); // Refresh reviews
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Error adding review. Please try again.');
    }
  };

  const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => !readOnly && onRatingChange && onRatingChange(star)}
            style={{
              fontSize: '1.5rem',
              color: star <= rating ? '#EAB308' : '#D1D5DB',
              cursor: readOnly ? 'default' : 'pointer',
              userSelect: 'none'
            }}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#1E3A8A', margin: 0 }}>Reviews for {placeName}</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6B7280'
            }}
          >
            ✕
          </button>
        </div>

        {/* Average Rating */}
        {reviews.length > 0 && (
          <div style={{ 
            backgroundColor: '#F3F4F6', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              <StarRating rating={Math.round(averageRating)} readOnly />
            </div>
            <p style={{ margin: 0, color: '#6B7280' }}>
              {averageRating.toFixed(1)} out of 5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </p>
          </div>
        )}

        {/* Add Review Form */}
        {user && (
          <form onSubmit={handleSubmitReview} style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#4338CA', marginBottom: '1rem' }}>Add Your Review</h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Rating</label>
              <StarRating 
                rating={newReview.rating} 
                onRatingChange={(rating) => setNewReview({...newReview, rating})}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category</label>
              <select
                value={newReview.category}
                onChange={(e) => setNewReview({...newReview, category: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              >
                <option value="Overall">Overall Experience</option>
                <option value="Food Quality">Food Quality</option>
                <option value="Service">Service</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Value for Money">Value for Money</option>
                <option value="Facilities">Facilities</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Share your experience..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#EAB308',
                color: '#111827',
                padding: '0.75rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div>
          <h4 style={{ color: '#4338CA', marginBottom: '1rem' }}>
            All Reviews ({reviews.length})
          </h4>
          
          {reviews.length === 0 ? (
            <p style={{ color: '#6B7280', textAlign: 'center', padding: '2rem' }}>
              No reviews yet. Be the first to review this place!
            </p>
          ) : (
            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  style={{ 
                    borderBottom: '1px solid #E5E7EB', 
                    paddingBottom: '1rem', 
                    marginBottom: '1rem' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ color: '#1E3A8A' }}>{review.userName}</strong>
                      <span style={{ 
                        backgroundColor: '#F3F4F6', 
                        color: '#6B7280', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '12px', 
                        fontSize: '0.8rem',
                        marginLeft: '0.5rem'
                      }}>
                        {review.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                      {review.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <StarRating rating={review.rating} readOnly />
                  </div>
                  
                  <p style={{ margin: 0, color: '#374151' }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSystem;
