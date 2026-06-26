import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, firebaseInitialized } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    participants: ['demo-student', 'demo-owner-1'],
    participantDetails: {
      'demo-owner-1': { name: 'Amit Properties', avatar: null, online: true, role: 'owner' }
    },
    lastMessage: 'Hi, is the 2BHK still available for next month?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: { 'demo-student': 1, 'demo-owner-1': 0 },
  },
  {
    id: 'conv-2',
    participants: ['demo-student', 'demo-owner-2'],
    participantDetails: {
      'demo-owner-2': { name: 'Sunrise PG', avatar: null, online: false, role: 'owner' }
    },
    lastMessage: 'Great, I will come for a visit tomorrow at 10 AM.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: { 'demo-student': 0, 'demo-owner-2': 0 },
  }
];

export function useInbox() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (!firebaseInitialized || !db) {
      // Demo Mode
      setTimeout(() => {
        setConversations(MOCK_CONVERSATIONS);
        setLoading(false);
      }, 500);
      return;
    }

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(convs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching conversations:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { conversations, loading };
}
