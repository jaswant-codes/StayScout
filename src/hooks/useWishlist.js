import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useWishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist on mount or auth change
  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      try {
        if (user) {
          // Sync with Firebase
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            const firebaseWishlist = data.wishlist || [];
            
            // Merge with local storage items
            const localWishlist = JSON.parse(localStorage.getItem('stayscout_wishlist') || '[]');
            const merged = [...new Set([...firebaseWishlist, ...localWishlist])];
            
            if (isMounted) setWishlist(merged);
            
            // Update firebase with merged
            if (localWishlist.length > 0) {
              await updateDoc(userRef, { wishlist: merged });
              localStorage.removeItem('stayscout_wishlist');
            }
          }
        } else {
          // Load from LocalStorage
          const localWishlist = JSON.parse(localStorage.getItem('stayscout_wishlist') || '[]');
          if (isMounted) setWishlist(localWishlist);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const toggleWishlist = async (propertyId) => {
    const isSaved = wishlist.includes(propertyId);
    const newWishlist = isSaved
      ? wishlist.filter(id => id !== propertyId)
      : [...wishlist, propertyId];
      
    setWishlist(newWishlist);

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        if (isSaved) {
          await updateDoc(userRef, { wishlist: arrayRemove(propertyId) });
        } else {
          await updateDoc(userRef, { wishlist: arrayUnion(propertyId) });
        }
      } catch (error) {
        console.error("Error syncing wishlist to Firebase", error);
        // Revert on failure
        setWishlist(wishlist);
      }
    } else {
      localStorage.setItem('stayscout_wishlist', JSON.stringify(newWishlist));
    }
    
    return !isSaved; // Returns true if added, false if removed
  };

  const isInWishlist = (propertyId) => wishlist.includes(propertyId);

  return { wishlist, toggleWishlist, isInWishlist, loading };
}
