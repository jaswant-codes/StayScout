import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, firebaseInitialized } from '../lib/firebase';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseInitialized || !auth) {
      // Firebase not available — run in demo mode
      setLoading(false);
      return;
    }

    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          try {
            const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (profileDoc.exists()) {
              setUserProfile({ id: profileDoc.id, ...profileDoc.data() });
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }, (error) => {
        console.error('Auth state listener error:', error);
        setLoading(false);
      });
    } catch (err) {
      console.error('Failed to set up auth listener:', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signup = async (name, email, password, role) => {
    if (!auth) {
      // Demo mode bypass
      const demoUser = { uid: `demo-${Date.now()}`, email };
      const demoProfile = { id: demoUser.uid, name, role, email };
      setUser(demoUser);
      setUserProfile(demoProfile);
      return demoUser;
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const profile = {
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', cred.user.uid), profile);
    setUserProfile({ id: cred.user.uid, ...profile });
    return cred.user;
  };

  const login = async (email, password) => {
    if (!auth) {
      // Demo mode bypass: automatically guess role based on email word (e.g. 'owner@test.com' -> owner)
      const fakeRole = email.toLowerCase().includes('owner') ? 'owner' : 'student';
      const demoUser = { uid: 'demo-12345', email };
      const demoProfile = { id: 'demo-12345', name: email.split('@')[0], role: fakeRole };
      setUser(demoUser);
      setUserProfile(demoProfile);
      return { user: demoUser, profile: demoProfile };
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const profileDoc = await getDoc(doc(db, 'users', cred.user.uid));
    let profile = null;
    if (profileDoc.exists()) {
      profile = { id: profileDoc.id, ...profileDoc.data() };
      setUserProfile(profile);
    }
    return { user: cred.user, profile };
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setUserProfile(null);
  };

  const value = {
    user,
    userProfile,
    loading,
    signup,
    login,
    logout,
    isStudent: userProfile?.role === 'student',
    isOwner: userProfile?.role === 'owner',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
