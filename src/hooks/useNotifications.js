import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, firebaseInitialized } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';

// Mock state for Demo Mode
let MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'demo-student',
    type: 'message',
    title: 'New Message',
    message: 'Amit Properties: Yes, you can visit anytime between 9 AM and 6 PM.',
    link: '/inbox',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'demo-student',
    type: 'visit',
    title: 'Tour Approved!',
    message: 'Your visit to Luxury 2BHK Apartment has been approved for tomorrow.',
    link: '/student/visits',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'notif-3',
    userId: 'demo-owner',
    type: 'visit',
    title: 'New Tour Request',
    message: 'A student has requested a tour for Sunrise PG for Boys.',
    link: '/owner/visits',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  }
];

export function useNotifications() {
  const { user, userProfile } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !userProfile) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    const currentUserId = user.uid || (userProfile.role === 'owner' ? 'demo-owner' : 'demo-student');

    if (!firebaseInitialized || !db) {
      // Demo Mode
      setTimeout(() => {
        setNotifications(MOCK_NOTIFICATIONS.filter(n => n.userId === currentUserId));
        setLoading(false);
      }, 500);
      return;
    }

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, userProfile]);

  const markAsRead = async (id) => {
    if (!firebaseInitialized || !db) {
      // Demo Mode
      MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => n.id === id ? { ...n, isRead: true } : n);
      const currentUserId = user?.uid || (userProfile?.role === 'owner' ? 'demo-owner' : 'demo-student');
      setNotifications(MOCK_NOTIFICATIONS.filter(n => n.userId === currentUserId));
      return;
    }

    try {
      await updateDoc(doc(db, 'notifications', id), { isRead: true });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    if (!firebaseInitialized || !db) {
      // Demo Mode
      const currentUserId = user?.uid || (userProfile?.role === 'owner' ? 'demo-owner' : 'demo-student');
      MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => n.userId === currentUserId ? { ...n, isRead: true } : n);
      setNotifications(MOCK_NOTIFICATIONS.filter(n => n.userId === currentUserId));
      return;
    }

    try {
      const unreadNotifs = notifications.filter(n => !n.isRead);
      const promises = unreadNotifs.map(n => updateDoc(doc(db, 'notifications', n.id), { isRead: true }));
      await Promise.all(promises);
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead };
}
