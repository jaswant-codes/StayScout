import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db, firebaseInitialized } from '../lib/firebase';

import { mockProperties } from './useProperties';

let mockReviews = [];

export function useReviews(propertyId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (!propertyId || !firebaseInitialized || !db) {
      const filtered = mockReviews.filter(r => r.propertyId === propertyId);
      setReviews(filtered);
      if (filtered.length > 0) {
        const avg = filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length;
        setAvgRating(Math.round(avg * 10) / 10);
      } else {
        setAvgRating(0);
      }
      setLoading(false);
      return;
    }

    let unsubscribe;
    try {
      const q = query(
        collection(db, 'reviews'),
        where('propertyId', '==', propertyId),
        orderBy('createdAt', 'desc')
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setReviews(docs);

        if (docs.length > 0) {
          const avg = docs.reduce((sum, r) => sum + r.rating, 0) / docs.length;
          setAvgRating(Math.round(avg * 10) / 10);
        } else {
          setAvgRating(0);
        }

        setLoading(false);
      }, (error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
    } catch (err) {
      console.error('Error setting up reviews listener:', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [propertyId]);

  return { reviews, loading, avgRating };
}

export async function addReview(reviewData) {
  if (!firebaseInitialized || !db) {
    const newReview = { id: `demo-review-${Date.now()}`, ...reviewData, createdAt: new Date().toISOString() };
    mockReviews = [newReview, ...mockReviews];
    
    // Update property rating
    const propReviews = mockReviews.filter(r => r.propertyId === reviewData.propertyId);
    const avg = propReviews.reduce((sum, r) => sum + r.rating, 0) / propReviews.length;
    const propIndex = mockProperties.findIndex(p => p.id === reviewData.propertyId);
    if (propIndex !== -1) {
      mockProperties[propIndex].avgRating = Math.round(avg * 10) / 10;
      mockProperties[propIndex].reviewCount = propReviews.length;
    }
    return { id: newReview.id };
  }

  const docRef = await addDoc(collection(db, 'reviews'), {
    ...reviewData,
    createdAt: new Date().toISOString(),
  });

  const reviewsQuery = query(
    collection(db, 'reviews'),
    where('propertyId', '==', reviewData.propertyId)
  );
  const snapshot = await getDocs(reviewsQuery);
  const allReviews = snapshot.docs.map((d) => d.data());
  const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  await updateDoc(doc(db, 'properties', reviewData.propertyId), {
    avgRating: Math.round(avg * 10) / 10,
    reviewCount: allReviews.length,
  });

  return docRef;
}

export async function getUserReviews(userId) {
  if (!firebaseInitialized || !db) {
    return mockReviews.filter(r => r.userId === userId);
  }
  const q = query(
    collection(db, 'reviews'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
