import { useState, useEffect, useCallback } from 'react';
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
  startAfter
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, firebaseInitialized } from '../lib/firebase';
import indianCities from '../data/indianCities.json';

// High-quality expanded mock data
export let mockProperties = [
  {
    id: 'demo-prop-1',
    name: 'Stanza Living - Premium PG',
    propertyType: 'pg',
    city: 'Delhi',
    area: 'North Campus',
    rent: 12000,
    deposit: 12000,
    preference: 'boys',
    description: 'A premium student accommodation with all modern amenities. Walking distance to major colleges. Includes daily housekeeping, 3-time meals, and high-speed WiFi.',
    availability: 'available',
    moveInDate: '2026-07-01',
    facilities: ['WiFi', 'AC', 'Food Included', 'Laundry', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1e525044c7?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
    ],
    ownerId: 'demo-owner-1',
    avgRating: 4.8,
    reviewCount: 124,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    landmark: 'Near DU North Campus',
    college: 'Delhi University'
  },
  {
    id: 'demo-prop-2',
    name: 'The Student Housing Co.',
    propertyType: 'hostel',
    city: 'Pune',
    area: 'Viman Nagar',
    rent: 8500,
    deposit: 8500,
    preference: 'girls',
    description: 'Vibrant student community hostel. Features study rooms, gaming zones, and a fully equipped gym. Perfect for making connections.',
    availability: 'available',
    moveInDate: '2026-06-30',
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
    landmark: 'Phoenix Mall',
    college: 'Symbiosis International University'
  },
  {
    id: 'demo-prop-3',
    name: 'CoLive Spaces Bangalore',
    propertyType: 'flat',
    city: 'Bangalore',
    area: 'Koramangala',
    rent: 15000,
    deposit: 30000,
    preference: 'any',
    description: 'Fully furnished shared apartment. No broker fees. Move-in ready with premium appliances and smart TV.',
    availability: 'available',
    moveInDate: '2026-06-25',
    facilities: ['WiFi', 'AC', 'TV', 'Washing Machine'],
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
    ],
    ownerId: 'demo-owner-3',
    avgRating: 4.7,
    reviewCount: 210,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    landmark: 'Sony World Signal',
    college: 'Christ University'
  },
  {
    id: 'demo-prop-4',
    name: 'Cozy PG for Girls',
    propertyType: 'pg',
    city: 'Mumbai',
    area: 'Andheri West',
    rent: 18000,
    deposit: 20000,
    preference: 'girls',
    description: 'Safe and secure PG for girls with strict security. Meals not included but kitchen available.',
    availability: 'available',
    moveInDate: '2026-07-15',
    facilities: ['WiFi', 'Security', 'Washing Machine'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
    ownerId: 'demo-owner-4',
    avgRating: 4.5,
    reviewCount: 45,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    landmark: 'Andheri Station',
    college: 'Mithibai College'
  },
  {
    id: 'demo-prop-5',
    name: 'Boys Hostel Hub',
    propertyType: 'hostel',
    city: 'Chennai',
    area: 'Guindy',
    rent: 6000,
    deposit: 10000,
    preference: 'boys',
    description: 'Affordable hostel for boys. Close to IIT Madras.',
    availability: 'booked',
    moveInDate: '2026-08-01',
    facilities: ['Food Included', 'Security'],
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
    ownerId: 'demo-owner-5',
    avgRating: 3.8,
    reviewCount: 20,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    landmark: 'Guindy National Park',
    college: 'IIT Madras'
  },
  {
    id: 'demo-prop-6',
    name: 'Luxury Studio Flat',
    propertyType: 'flat',
    city: 'Pune',
    area: 'Koregaon Park',
    rent: 25000,
    deposit: 50000,
    preference: 'any',
    description: 'High end studio flat for those who want privacy. Includes all modern appliances.',
    availability: 'available',
    moveInDate: '2026-07-05',
    facilities: ['WiFi', 'AC', 'TV', 'Washing Machine', 'Gym'],
    images: ['https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80'],
    ownerId: 'demo-owner-6',
    avgRating: 4.2,
    reviewCount: 15,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    landmark: 'Osho Ashram',
    college: 'Fergusson College'
  }
];

// Fuzzy match for typo tolerance (levenshtein distance based or simple partial)
function isFuzzyMatch(str, query) {
  if (!query) return true;
  if (!str) return false;
  
  const s = String(str).toLowerCase();
  const q = String(query).toLowerCase();
  
  if (s.includes(q)) return true;
  
  let i = 0, j = 0;
  while(i < s.length && j < q.length) {
    if(s[i] === q[j]) j++;
    i++;
  }
  return j === q.length;
}

export function useProperties(filters = {}, sortBy = 'newest') {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const applyClientFilters = useCallback((items) => {
    let filtered = [...items];

    if (filters.minBudget) filtered = filtered.filter(p => p.rent >= Number(filters.minBudget));
    if (filters.maxBudget) filtered = filtered.filter(p => p.rent <= Number(filters.maxBudget));
    if (filters.deposit) filtered = filtered.filter(p => (p.deposit || 0) <= Number(filters.deposit));
    if (filters.availability && filters.availability !== 'all') {
      filtered = filtered.filter(p => p.availability === filters.availability);
    }
    if (filters.preference && filters.preference !== 'all') {
      filtered = filtered.filter(p => p.preference === filters.preference);
    }
    if (filters.moveInDate) {
      filtered = filtered.filter(p => new Date(p.moveInDate || new Date()) >= new Date(filters.moveInDate));
    }
    
    if (filters.facilities && filters.facilities.length > 0) {
      filtered = filtered.filter(p =>
        filters.facilities.every(f => p.facilities?.includes(f))
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter(p =>
        isFuzzyMatch(p.city, loc) || isFuzzyMatch(p.area, loc)
      );
    }

    if (filters.globalSearch) {
      const qs = filters.globalSearch;
      filtered = filtered.filter(p => 
        isFuzzyMatch(p.name, qs) || 
        isFuzzyMatch(p.city, qs) || 
        isFuzzyMatch(p.area, qs) ||
        isFuzzyMatch(p.landmark, qs) ||
        isFuzzyMatch(p.college, qs)
      );
    }

    if (sortBy === 'lowest_rent') filtered.sort((a, b) => a.rent - b.rent);
    else if (sortBy === 'highest_rent') filtered.sort((a, b) => b.rent - a.rent);
    else if (sortBy === 'top_rated') filtered.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
    else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest

    return filtered;
  }, [filters, sortBy]);

  const fetchProperties = useCallback(async (isLoadMore = false) => {
    if (!isLoadMore) {
      setLoading(true);
    }
    
    if (!firebaseInitialized || !db) {
      const filtered = applyClientFilters(mockProperties);
      
      const startIdx = isLoadMore ? properties.length : 0;
      const paginated = filtered.slice(0, startIdx + 3);
      
      setProperties(paginated);
      setHasMore(paginated.length < filtered.length);
      setLoading(false);
      return;
    }

    try {
      let qList = [collection(db, 'properties')];
      
      if (filters.propertyType && filters.propertyType !== 'all') {
        qList.push(where('propertyType', '==', filters.propertyType));
      }
      
      qList.push(orderBy('createdAt', 'desc'));
      qList.push(limit(10));

      if (isLoadMore && lastVisible) {
        qList.push(startAfter(lastVisible));
      }

      const q = query(...qList);
      const snapshot = await getDocs(q);
      
      let docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      
      if (snapshot.docs.length > 0) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
      setHasMore(snapshot.docs.length === 10);
      
      docs = applyClientFilters(docs);
      
      if (isLoadMore) {
        setProperties(prev => [...prev, ...docs]);
      } else {
        setProperties(docs);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, lastVisible, properties.length, applyClientFilters]);

  useEffect(() => {
    // Reset properties and lastVisible when filters change
    setProperties([]);
    setLastVisible(null);
    setHasMore(true);
    fetchProperties(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), sortBy]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProperties(true);
    }
  };

  return { properties, loading, loadMore, hasMore };
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
