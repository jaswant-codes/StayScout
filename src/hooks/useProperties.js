import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  getDocs,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, firebaseInitialized } from '../lib/firebase';

// In-memory array to store properties during Demo Mode
export let mockProperties = [];

export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseInitialized || !db) {
      let filtered = [...mockProperties];
      if (filters.minBudget) filtered = filtered.filter((p) => p.rent >= Number(filters.minBudget));
      if (filters.maxBudget) filtered = filtered.filter((p) => p.rent <= Number(filters.maxBudget));
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        filtered = filtered.filter((p) => p.city?.toLowerCase().includes(loc) || p.area?.toLowerCase().includes(loc));
      }
      setProperties(filtered);
      setLoading(false);
      return;
    }

    let unsubscribe;
    // Timeout fallback: if Firestore never responds (e.g. invalid config), stop loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        let docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Client-side filtering
        if (filters.minBudget) {
          docs = docs.filter((p) => p.rent >= Number(filters.minBudget));
        }
        if (filters.maxBudget) {
          docs = docs.filter((p) => p.rent <= Number(filters.maxBudget));
        }
        if (filters.location) {
          const loc = filters.location.toLowerCase();
          docs = docs.filter(
            (p) =>
              p.city?.toLowerCase().includes(loc) ||
              p.area?.toLowerCase().includes(loc)
          );
        }
        if (filters.facilities?.length > 0) {
          docs = docs.filter((p) =>
            filters.facilities.every((f) => p.facilities?.includes(f))
          );
        }

        setProperties(docs);
        setLoading(false);
      }, (error) => {
        console.error('Error fetching properties:', error);
        setLoading(false);
      });
    } catch (err) {
      console.error('Error setting up properties listener:', err);
      setLoading(false);
    }

    return () => {
      clearTimeout(timeout);
      if (unsubscribe) unsubscribe();
    };
  }, [filters.minBudget, filters.maxBudget, filters.location, JSON.stringify(filters.facilities)]);

  return { properties, loading };
}

export function useOwnerProperties(ownerId) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ownerId || !firebaseInitialized || !db) {
      setProperties(mockProperties.filter(p => p.ownerId === ownerId));
      setLoading(false);
      return;
    }

    let unsubscribe;
    try {
      const q = query(
        collection(db, 'properties'),
        where('ownerId', '==', ownerId),
        orderBy('createdAt', 'desc')
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        setProperties(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }, (error) => {
        console.error('Error fetching owner properties:', error);
        setLoading(false);
      });
    } catch (err) {
      console.error('Error setting up owner properties listener:', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [ownerId]);

  return { properties, loading };
}

export async function uploadPropertyImages(files) {
  if (!storage) {
    // Demo Mode bypass: convert real files to base64 Data URLs so they render correctly
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  }
  const urls = [];
  for (const file of files) {
    const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
}

export async function addProperty(data) {
  if (!db) {
    const newProp = {
      id: `demo-prop-${Date.now()}`,
      ...data,
      avgRating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    mockProperties = [newProp, ...mockProperties];
    return { id: newProp.id };
  }
  return addDoc(collection(db, 'properties'), {
    ...data,
    avgRating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
  });
}

export async function updateProperty(id, data) {
  if (!db) {
    mockProperties = mockProperties.map(p => p.id === id ? { ...p, ...data } : p);
    return;
  }
  return updateDoc(doc(db, 'properties', id), data);
}

export async function deleteProperty(id) {
  if (!db) {
    mockProperties = mockProperties.filter(p => p.id !== id);
    return;
  }
  // Also delete related reviews
  const reviewsQuery = query(
    collection(db, 'reviews'),
    where('propertyId', '==', id)
  );
  const reviewSnapshot = await getDocs(reviewsQuery);
  const deletePromises = reviewSnapshot.docs.map((d) => deleteDoc(d.ref));
  await Promise.all(deletePromises);

  return deleteDoc(doc(db, 'properties', id));
}
