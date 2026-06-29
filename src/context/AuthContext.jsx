import { useCallback, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AuthContext } from './AuthContextBase';

const getFallbackProfile = (user, role = 'student') => ({
  id: user.uid,
  uid: user.uid,
  name: user.displayName || user.email?.split('@')[0] || 'StayScout User',
  displayName: user.displayName || '',
  email: user.email || '',
  photoURL: user.photoURL || '',
  role,
  provider: 'password',
  emailVerified: user.emailVerified,
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalAuthError, setGlobalAuthError] = useState(null);

  const ensureUserProfile = useCallback(async (user, role = 'student') => {
    const fallbackProfile = getFallbackProfile(user, role);

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const existingProfile = { id: user.uid, ...userSnap.data() };
        setUserProfile(existingProfile);
        return existingProfile;
      }

      const profile = {
        uid: user.uid,
        name: fallbackProfile.name,
        displayName: fallbackProfile.displayName,
        email: fallbackProfile.email,
        photoURL: fallbackProfile.photoURL,
        role,
        provider: fallbackProfile.provider,
        emailVerified: fallbackProfile.emailVerified,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(userRef, profile);
      const createdProfile = { id: user.uid, ...profile };
      setUserProfile(createdProfile);
      return createdProfile;
    } catch (error) {
      console.error('[Auth] Failed to create/load Firestore user profile:', error);
      setUserProfile(fallbackProfile);
      return fallbackProfile;
    }
  }, []);

  useEffect(() => {
    let unsubscribe;
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        console.log("[Auth] 1. Awaiting setPersistence");
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setGlobalAuthError(error);
      }

      console.log("[Auth] 3. Registering onAuthStateChanged");
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log("[Auth] onAuthStateChanged fired");
        if (user) {
          console.log(`[Auth] UID: ${user.uid}`);
          console.log(`[Auth] Email: ${user.email}`);
          console.log(`[Auth] Provider IDs: ${user.providerData.map(p => p.providerId).join(', ')}`);
          console.log(`[Auth] emailVerified: ${user.emailVerified}`);

          if (user.emailVerified) {
            console.log("[Auth] 4. Updating currentUser");
            if (isMounted) setCurrentUser(user);
            await ensureUserProfile(user);
          } else {
            console.log("[Auth] Setting currentUser to null (unverified)");
            if (isMounted) {
              setCurrentUser(null);
              setUserProfile(null);
            }
          }
        } else {
          console.log("[Auth] User is null. Setting currentUser to null.");
          if (isMounted) {
            setCurrentUser(null);
            setUserProfile(null);
          }
        }
        
        console.log("[Auth] 5. Setting loading to false");
        if (isMounted) setLoading(false);
      });
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [ensureUserProfile]);

  const signUp = async (name, email, password, role = 'student') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update profile with name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: '', // Empty for email users as requested
      });
      await ensureUserProfile(userCredential.user, role);
      await sendEmailVerification(userCredential.user);
      await firebaseSignOut(auth); // Sign them out immediately
    }
    return userCredential.user;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Refresh user data from Firebase to get latest emailVerified status
    await userCredential.user.reload();
    
    if (!userCredential.user.emailVerified) {
      await firebaseSignOut(auth);
      const error = new Error('Please verify your email before logging in.');
      error.code = 'auth/unverified-email';
      throw error;
    }
    return userCredential.user;
  };

  const forgotPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const resendVerification = async (email, password) => {
    // Need to sign in briefly to send the verification email, then sign back out
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    await firebaseSignOut(auth);
  };



  const logout = async () => {
    await firebaseSignOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    user: currentUser,
    userProfile,
    loading,
    globalAuthError,
    setGlobalAuthError,
    isAuthenticated: !!currentUser,
    signUp,
    signIn,
    forgotPassword,
    logout,
    resendVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
