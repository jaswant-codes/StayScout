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
    maintenance: 500,
    brokerage: 0,
    electricity: 'As per usage (₹9/unit)',
    water: 'Included',
    refundableDeposit: 12000,
    preference: 'boys',
    
    // Structured Description
    description: {
      overview: 'A premium student accommodation with all modern amenities. Designed specifically for DU students who want a hassle-free college life.',
      whyChoose: ['Walking distance to campus', 'Excellent high-speed WiFi', 'Daily housekeeping', 'Safe neighbourhood with CCTV'],
      bestFor: 'First-year DU students looking for a secure, food-included stay.',
      nearbyColleges: 'Delhi University North Campus, Hansraj College, SRCC.',
      transportation: '5 mins to GTB Nagar Metro. E-rickshaws available 24/7.',
      lifestyle: 'Vibrant student community, close to Hudson Lane cafes.'
    },

    availability: 'available',
    moveInDate: '2026-07-01',
    bedsAvailable: 4,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    
    facilities: ['WiFi', 'AC', 'Food Included', 'Laundry', 'Security', 'Power Backup', 'RO Water', 'Housekeeping', 'Study Table', 'Attached Bathroom'],
    
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
    college: 'Delhi University',
    
    roomTypes: [
      { id: 'r1', type: 'Private Room', price: 15000, available: true, area: '120 sq.ft', furnishing: 'Fully Furnished', attachedBath: true, balcony: false },
      { id: 'r2', type: 'Double Sharing', price: 12000, available: true, area: '180 sq.ft', furnishing: 'Fully Furnished', attachedBath: true, balcony: true }
    ],
    
    rules: [
      { label: 'Visitors Allowed', value: 'No' },
      { label: 'Smoking', value: 'Strictly Prohibited' },
      { label: 'Alcohol', value: 'Strictly Prohibited' },
      { label: 'Pets', value: 'Not Allowed' },
      { label: 'Curfew', value: '10:30 PM' },
      { label: 'Quiet Hours', value: '11:00 PM to 6:00 AM' }
    ],
    
    safety: ['24/7 Night Guard', 'CCTV in common areas', 'Biometric Entry', 'Fire Safety', 'Emergency Contact'],
    
    food: {
      veg: true,
      nonVeg: false,
      breakfast: true,
      lunch: true,
      dinner: true,
      kitchen: false,
      included: true,
      mealTimings: 'Breakfast: 7:30AM-9:30AM, Dinner: 8:00PM-10:00PM'
    },
    
    commute: [
      { type: 'walk', time: '5 min' },
      { type: 'metro', time: '2 min' }
    ],
    
    nearby: [
      { category: 'College', name: 'Hansraj College', distance: '500m', walkTime: '5 min', driveTime: '2 min' },
      { category: 'Metro', name: 'GTB Nagar', distance: '800m', walkTime: '8 min', driveTime: '3 min' },
      { category: 'Hospital', name: 'Hindu Rao', distance: '2.5km', walkTime: '25 min', driveTime: '8 min' },
      { category: 'Restaurant', name: 'Hudson Cafe', distance: '400m', walkTime: '4 min', driveTime: '1 min' }
    ],
    
    location: 'Delhi, North Campus',
    
    ownerDetails: {
      name: 'Rakesh Sharma',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      joinedSince: 'Jan 2023',
      responseRate: '98%',
      responseTime: 'within an hour',
      totalListings: 3,
      rating: 4.9
    },

    categoryRatings: {
      cleanliness: 4.8,
      safety: 4.9,
      food: 4.5,
      wifi: 4.2,
      location: 5.0,
      valueForMoney: 4.6
    }
  },
  {
    id: 'demo-prop-2',
    name: 'The Student Housing Co.',
    propertyType: 'hostel',
    city: 'Pune',
    area: 'Viman Nagar',
    rent: 8500,
    deposit: 8500,
    maintenance: 0,
    brokerage: 0,
    electricity: 'Included',
    water: 'Included',
    refundableDeposit: 8500,
    preference: 'girls',
    
    description: {
      overview: 'Vibrant student community hostel specifically for girls. Features study rooms, gaming zones, and a fully equipped gym.',
      whyChoose: ['Safe and secure for girls', 'In-house gym', 'Study rooms', 'Close to Symbiosis'],
      bestFor: 'Symbiosis students looking for an active community.',
      nearbyColleges: 'Symbiosis International University, Christ College.',
      transportation: 'Auto stand right outside. 10 mins to airport.',
      lifestyle: 'Very active, lots of events and get-togethers.'
    },

    availability: 'available',
    moveInDate: '2026-06-30',
    bedsAvailable: 2,
    lastUpdated: new Date(Date.now() - 86400000).toISOString(),
    
    facilities: ['WiFi', 'Gym', 'Security', 'Library', 'Power Backup', 'RO Water', 'Washing Machine', 'Attached Bathroom'],
    
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
    college: 'Symbiosis International University',
    
    roomTypes: [
      { id: 'r3', type: 'Triple Sharing', price: 8500, available: true, area: '200 sq.ft', furnishing: 'Fully Furnished', attachedBath: true, balcony: false }
    ],
    
    rules: [
      { label: 'Visitors Allowed', value: 'Females only' },
      { label: 'Curfew', value: '10:00 PM' },
      { label: 'Quiet Hours', value: 'Strictly after 10 PM' }
    ],
    
    safety: ['Female Security Guards', 'Keycard Entry', 'CCTV', 'Girls Warden'],
    
    food: {
      veg: true,
      nonVeg: true,
      breakfast: true,
      lunch: false,
      dinner: true,
      kitchen: true,
      included: true,
      mealTimings: 'Breakfast: 8AM-10AM, Dinner: 7:30PM-9:30PM'
    },
    
    commute: [
      { type: 'walk', time: '12 min' },
      { type: 'drive', time: '4 min' }
    ],
    
    nearby: [
      { category: 'College', name: 'Symbiosis', distance: '1km', walkTime: '12 min', driveTime: '4 min' },
      { category: 'Mall', name: 'Phoenix Mall', distance: '1.5km', walkTime: '18 min', driveTime: '5 min' }
    ],
    
    location: 'Pune, Viman Nagar',
    
    ownerDetails: {
      name: 'Priya Desai',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      joinedSince: 'Mar 2024',
      responseRate: '100%',
      responseTime: 'within 10 minutes',
      totalListings: 1,
      rating: 5.0
    },

    categoryRatings: {
      cleanliness: 5.0,
      safety: 5.0,
      food: 4.7,
      wifi: 4.5,
      location: 4.8,
      valueForMoney: 4.9
    }
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
