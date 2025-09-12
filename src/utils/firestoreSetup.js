// Firestore Database Setup Helper
// Run this once to set up the collections and indexes for your map system

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Sample data structure for places collection
const samplePlace = {
  name: 'Example Restaurant',
  type: 'Restaurant', // Restaurant, PG, Gym, Library, Other
  address: '123 College Street, City',
  description: 'Great food and student-friendly prices',
  contact: '+91-9876543210',
  latitude: 12.9716,
  longitude: 77.5946,
  createdBy: 'admin@college.edu',
  createdAt: new Date(),
  averageRating: 0,
  totalReviews: 0,
  verified: false // Admin can verify places
};

// Sample data structure for reviews collection  
const sampleReview = {
  placeId: 'place_id_here',
  placeName: 'Example Restaurant',
  rating: 5, // 1-5 stars
  comment: 'Great experience! Highly recommended.',
  category: 'Overall', // Overall, Food Quality, Service, etc.
  userName: 'student123',
  userEmail: 'student@college.edu',
  createdAt: new Date(),
  helpful: 0, // Number of users who found this helpful
  verified: false // For verified purchases/visits
};

// Categories for filtering
export const PLACE_CATEGORIES = [
  'Restaurant',
  'PG', // Paying Guest accommodations
  'Gym',
  'Library',
  'Stationary',
  'Medical',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Other'
];

// Review categories
export const REVIEW_CATEGORIES = [
  'Overall',
  'Food Quality',
  'Service',
  'Cleanliness', 
  'Value for Money',
  'Facilities',
  'Location',
  'Safety'
];

// Firestore Security Rules (add these to your Firebase Console)
const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Places collection - anyone can read, authenticated users can write
    match /places/{placeId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Reviews collection - anyone can read, authenticated users can write their own
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null && 
                   request.auth.token.email == resource.data.userEmail;
      allow update, delete: if request.auth != null && 
                            request.auth.token.email == resource.data.userEmail;
    }
    
    // Users can only access their own user documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
`;

console.log('Firestore Collections Setup:');
console.log('1. Places Collection Structure:', samplePlace);
console.log('2. Reviews Collection Structure:', sampleReview);
console.log('3. Add these security rules to Firebase Console > Firestore > Rules:');
console.log(firestoreRules);

export { samplePlace, sampleReview };
