import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db, firebaseInitialized } from '../lib/firebase';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';

const MOCK_MESSAGES = {
  'conv-1': [
    { id: 'msg-1', senderId: 'demo-student', text: 'Hi, is the 2BHK still available for next month?', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), status: 'delivered' }
  ],
  'conv-2': [
    { id: 'msg-2', senderId: 'demo-owner-2', text: 'Yes, you can visit anytime between 9 AM and 6 PM.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), status: 'seen' },
    { id: 'msg-3', senderId: 'demo-student', text: 'Great, I will come for a visit tomorrow at 10 AM.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), status: 'seen' }
  ]
};

export function useConversation(conversationId) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId || !user) {
      setMessages([]);
      setLoading(false);
      return;
    }

    if (!firebaseInitialized || !db) {
      // Demo Mode
      setTimeout(() => {
        setMessages(MOCK_MESSAGES[conversationId] || []);
        setLoading(false);
      }, 500);
      return;
    }

    const q = query(
      collection(db, `conversations/${conversationId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [conversationId, user]);

  const sendMessage = async (text, attachments = []) => {
    if (!text.trim() && attachments.length === 0) return;
    if (!user) return;

    if (!firebaseInitialized || !db) {
      // Demo mode: update local state
      const newMsg = {
        id: `msg-${Date.now()}`,
        senderId: user.uid || 'demo-student',
        text: text.trim(),
        timestamp: new Date().toISOString(),
        status: 'sent',
        attachments
      };
      setMessages(prev => [...prev, newMsg]);
      return;
    }

    try {
      await addDoc(collection(db, `conversations/${conversationId}/messages`), {
        senderId: user.uid,
        text: text.trim(),
        attachments,
        status: 'sent',
        timestamp: serverTimestamp()
      });
      
      // Update last message in conversation document
      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: text.trim() || 'Sent an attachment',
        lastMessageTime: serverTimestamp()
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return { messages, loading, sendMessage };
}
