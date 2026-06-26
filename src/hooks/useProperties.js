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
  limit,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, firebaseInitialized } from '../lib/firebase';
import indianCities from '../data/indianCities.json';

// High-quality mock data for functional demo properties
export let mockProperties = [
  {
    id: 'demo-prop-1',
    name: 'Stanza Living - Premium PG',
    propertyType: 'pg',
    city: 'Delhi',
    area: 'North Campus',
    rent: 12000,
    description: 'A premium student accommodation with all modern amenities. Walking distance to major colleges. Includes daily housekeeping, 3-time meals, and high-speed WiFi.',
    availability: 'available',
    facilities: ['WiFi', 'AC', 'Food Included', 'Laundry', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1e525044c7?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
    ],
    ownerId: 'demo-owner-1',
    avgRating: 4.8,
    reviewCount: 124,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'demo-prop-2',
    name: 'The Student Housing Co.',
    propertyType: 'hostel',
    city: 'Pune',
    area: 'Viman Nagar',
    rent: 8500,
    description: 'Vibrant student community hostel. Features study rooms, gaming zones, and a fully equipped gym. Perfect for making connections.',
    availability: 'available',
    facilities: ['WiFi', 'Gym', 'Security', 'Library'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
    ],
    ownerId: 'demo-owner-2',
    avgRating: 4.9,
    reviewCount: 89,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'demo-prop-3',
    name: 'CoLive Spaces Bangalore',
    propertyType: 'flat',
    city: 'Bangalore',
    area: 'Koramangala',
    rent: 15000,
    description: 'Fully furnished shared apartment. No broker fees. Move-in ready with premium appliances and smart TV.',
    availability: 'available',
    facilities: ['WiFi', 'AC', 'TV', 'Washing Machine'],
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
    ],
    ownerId: 'demo-owner-3',
    avgRating: 4.7,
    reviewCount: 210,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  }
];

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
      if (filters.facilities?.length > 0) {
        filtered = filtered.filter((p) =>
          filters.facilities.every((f) => p.facilities?.includes(f))
        );
      }
      if (filters.propertyType && filters.propertyType !== 'all') {
        filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
      }
      setProperties(filtered);
      setLoading(false);
      return;
    }

    let unsubscribe;
    const timeout = setTimeout(() => { setLoading(false); }, 5000);

    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        let docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Client-side filtering
        if (filters.minBudget) docs = docs.filter((p) => p.rent >= Number(filters.minBudget));
        if (filters.maxBudget) docs = docs.filter((p) => p.rent <= Number(filters.maxBudget));
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
        if (filters.propertyType && filters.propertyType !== 'all') {
          docs = docs.filter((p) => p.propertyType === filters.propertyType);
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
  }, [filters.minBudget, filters.maxBudget, filters.location, filters.propertyType, JSON.stringify(filters.facilities)]);

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

export function useFeaturedProperties() {
  const [featured, setFeatured] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recent, setRecent] = useState([]);
  const [popularCities, setPopularCities] = useState([]);
  const [stats, setStats] = useState({ totalProperties: 0, totalCities: 0, totalStudents: 0, avgRating: 0, verifiedOwners: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseInitialized || !db) {
      // Demo mode fallback using the highly functional mockProperties
      const sorted = [...mockProperties];
      setFeatured(sorted.slice(0, 3));
      setTopRated([...sorted].sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0)).slice(0, 3));
      setRecent([...sorted].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3));
      
      // Fallback popular cities from indianCities.json with mock listing counts
      const cities = indianCities.slice(0, 6).map(city => ({
        city: city.name,
        image: city.image,
        count: Math.floor(Math.random() * 50) + 10,
        avgRent: Math.floor(Math.random() * 5000) + 7000
      }));
      setPopularCities(cities);
      
      // Stats is 0 in demo mode so UI can hide it or use it to show explicit mock data
      setStats({ totalProperties: 0, totalCities: 0, totalStudents: 0, avgRating: 0, verifiedOwners: 0 });
      setLoading(false);
      return;
    }

    let unsubscribe;
    const timeout = setTimeout(() => setLoading(false), 5000);

    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        
        if (docs.length === 0) {
          // Empty state: render mock demo data
          const sorted = [...mockProperties];
          setFeatured(sorted.slice(0, 3));
          setTopRated([...sorted].sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0)).slice(0, 3));
          setRecent([...sorted].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3));
          
          const cities = indianCities.slice(0, 6).map(city => ({
            city: city.name,
            image: city.image,
            count: Math.floor(Math.random() * 50) + 10,
            avgRent: Math.floor(Math.random() * 5000) + 7000
          }));
          setPopularCities(cities);
          setStats({ totalProperties: 0, totalCities: 0, totalStudents: 0, avgRating: 0, verifiedOwners: 0 });
        } else {
          // Real data exists
          setFeatured(docs.slice(0, 3));
          
          const byRating = [...docs].sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
          setTopRated(byRating.slice(0, 3));
          
          setRecent(docs.slice(0, 3));
          
          const cityMap = {};
          docs.forEach(p => {
            if (p.city) {
              if (!cityMap[p.city]) cityMap[p.city] = { count: 0, totalRent: 0 };
              cityMap[p.city].count += 1;
              cityMap[p.city].totalRent += Number(p.rent || 0);
            }
          });
          
          const cities = Object.entries(cityMap)
            .map(([city, data]) => {
              const staticCity = indianCities.find(c => c.name.toLowerCase() === city.toLowerCase());
              return { 
                city, 
                count: data.count, 
                avgRent: Math.round(data.totalRent / data.count),
                image: staticCity ? staticCity.image : 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&q=80'
              };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);
          setPopularCities(cities);
          
          const totalRating = byRating.reduce((sum, p) => sum + (p.avgRating || 0), 0);
          const activeOwners = new Set(docs.map(p => p.ownerId)).size;
          
          setStats({
            totalProperties: docs.length,
            totalCities: Object.keys(cityMap).length,
            totalStudents: Math.floor(docs.length * 4.5), // Estimate based on properties
            avgRating: docs.length > 0 ? (totalRating / docs.length).toFixed(1) : 0,
            verifiedOwners: activeOwners
          });
        }
        
        setLoading(false);
      }, (error) => {
        console.error('Error fetching featured properties:', error);
        setLoading(false);
      });
    } catch (err) {
      console.error('Error setting up featured properties listener:', err);
      setLoading(false);
    }

    return () => {
      clearTimeout(timeout);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { featured, topRated, recent, popularCities, stats, loading };
}

export async function uploadPropertyImages(files) {
  if (!storage) {
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
  const reviewsQuery = query(
    collection(db, 'reviews'),
    where('propertyId', '==', id)
  );
  const reviewSnapshot = await getDocs(reviewsQuery);
  const deletePromises = reviewSnapshot.docs.map((d) => deleteDoc(d.ref));
  await Promise.all(deletePromises);

  return deleteDoc(doc(db, 'properties', id));
}
