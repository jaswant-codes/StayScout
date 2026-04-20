import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { db, firebaseInitialized } from '../lib/firebase';

export function useChat(messageLimit = 100) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseInitialized || !db) {
      setLoading(false);
      return;
    }

    let unsubscribe;
    try {
      const q = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'asc'),
        limit(messageLimit)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }, (error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });
    } catch (err) {
      console.error('Error setting up chat listener:', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [messageLimit]);

  const sendMessage = async (userId, userName, message) => {
    if (!message.trim()) return;
    await addDoc(collection(db, 'messages'), {
      userId,
      userName,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });
  };

  return { messages, loading, sendMessage };
}
