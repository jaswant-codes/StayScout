import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, firebaseInitialized } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// Mock state for Demo Mode
let MOCK_VISITS = [
  {
    id: 'visit-1',
    propertyId: 'mock-prop-1',
    propertyName: 'Luxury 2BHK Apartment',
    studentId: 'demo-student',
    ownerId: 'demo-owner',
    date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    timeSlot: '10:00 AM - 11:00 AM',
    status: 'approved',
    notes: 'Looking forward to seeing the property.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'visit-2',
    propertyId: 'mock-prop-2',
    propertyName: 'Sunrise PG for Boys',
    studentId: 'demo-student',
    ownerId: 'demo-owner',
    date: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    timeSlot: '04:00 PM - 05:00 PM',
    status: 'pending',
    notes: 'Can I bring my roommate along?',
    createdAt: new Date().toISOString()
  }
];

export function useVisits() {
  const { user, userProfile } = useAuth();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !userProfile) {
      setVisits([]);
      setLoading(false);
      return;
    }

    if (!firebaseInitialized || !db) {
      // Demo Mode
      setTimeout(() => {
        const roleFilter = userProfile.role === 'owner' ? 'ownerId' : 'studentId';
        const filtered = MOCK_VISITS.filter(v => v[roleFilter] === (user.uid || (userProfile.role === 'owner' ? 'demo-owner' : 'demo-student')));
        setVisits(filtered);
        setLoading(false);
      }, 500);
      return;
    }

    const roleField = userProfile.role === 'owner' ? 'ownerId' : 'studentId';
    const q = query(
      collection(db, 'visits'),
      where(roleField, '==', user.uid),
      orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const v = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVisits(v);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching visits:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, userProfile]);

  const requestVisit = async (visitData) => {
    if (!firebaseInitialized || !db) {
      // Demo Mode
      const newVisit = {
        id: `visit-${Date.now()}`,
        studentId: user?.uid || 'demo-student',
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...visitData
      };
      MOCK_VISITS = [...MOCK_VISITS, newVisit];
      const roleFilter = userProfile?.role === 'owner' ? 'ownerId' : 'studentId';
      setVisits(MOCK_VISITS.filter(v => v[roleFilter] === (user?.uid || (userProfile?.role === 'owner' ? 'demo-owner' : 'demo-student'))));
      return newVisit;
    }

    try {
      const docRef = await addDoc(collection(db, 'visits'), {
        studentId: user.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
        ...visitData
      });
      return { id: docRef.id };
    } catch (err) {
      console.error("Error requesting visit:", err);
      throw err;
    }
  };

  const updateVisitStatus = async (id, newStatus) => {
    if (!firebaseInitialized || !db) {
      // Demo Mode
      MOCK_VISITS = MOCK_VISITS.map(v => v.id === id ? { ...v, status: newStatus } : v);
      const roleFilter = userProfile?.role === 'owner' ? 'ownerId' : 'studentId';
      setVisits(MOCK_VISITS.filter(v => v[roleFilter] === (user?.uid || (userProfile?.role === 'owner' ? 'demo-owner' : 'demo-student'))));
      return;
    }

    try {
      await updateDoc(doc(db, 'visits', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error updating visit:", err);
      throw err;
    }
  };

  return { visits, loading, requestVisit, updateVisitStatus };
}
