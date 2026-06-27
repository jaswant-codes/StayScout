import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const { user } = useAuth();
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadRecent = async () => {
      try {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            const firebaseRecent = data.recentlyViewed || [];
            
            // Merge with local storage
            const localRecent = JSON.parse(localStorage.getItem('stayscout_recent') || '[]');
            
            // Combine, deduplicate by ID, keep latest MAX_RECENT
            const allItems = [...localRecent, ...firebaseRecent];
            const uniqueMap = new Map();
            allItems.forEach(item => {
              if (!uniqueMap.has(item.id) || new Date(item.viewedAt) > new Date(uniqueMap.get(item.id).viewedAt)) {
                uniqueMap.set(item.id, item);
              }
            });
            
            const merged = Array.from(uniqueMap.values())
              .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt))
              .slice(0, MAX_RECENT);
              
            if (isMounted) setRecentlyViewed(merged);
            
            if (localRecent.length > 0) {
              await updateDoc(userRef, { recentlyViewed: merged });
              localStorage.removeItem('stayscout_recent');
            }
          }
        } else {
          const localRecent = JSON.parse(localStorage.getItem('stayscout_recent') || '[]');
          if (isMounted) setRecentlyViewed(localRecent);
        }
      } catch (error) {
        console.error("Error loading recently viewed:", error);
      }
    };

    loadRecent();
    return () => { isMounted = false; };
  }, [user]);

  const addRecentlyViewed = async (property) => {
    const viewEntry = { 
      id: property.id, 
      name: property.name,
      image: property.images?.[0],
      rent: property.rent,
      city: property.city,
      viewedAt: new Date().toISOString() 
    };

    const newRecent = [viewEntry, ...recentlyViewed.filter(p => p.id !== property.id)].slice(0, MAX_RECENT);
    setRecentlyViewed(newRecent);

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { recentlyViewed: newRecent });
      } catch (error) {
        console.error("Error updating recently viewed", error);
      }
    } else {
      localStorage.setItem('stayscout_recent', JSON.stringify(newRecent));
    }
  };

  return { recentlyViewed, addRecentlyViewed };
}
