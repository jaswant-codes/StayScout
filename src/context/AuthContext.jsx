import { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalAuthError, setGlobalAuthError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const initializeAuth = async () => {
      try {
        console.log("[Auth] 1. Awaiting setPersistence");
        await setPersistence(auth, browserLocalPersistence);
        
        console.log("[Auth] 2. Awaiting getRedirectResult");
        const redirectUser = await getRedirectResult(auth);
        if (redirectUser) {
          console.log("[Auth] getRedirectResult returned a user:", redirectUser.user.email);
        } else {
          console.log("[Auth] getRedirectResult returned null");
        }
      } catch (error) {
        console.error("Redirect flow error:", error);
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

          if (user.emailVerified || user.providerData.some(p => p.providerId === 'google.com')) {
            console.log("[Auth] 4. Updating currentUser");
            setCurrentUser(user);
          } else {
            console.log("[Auth] Setting currentUser to null (unverified/non-google)");
            setCurrentUser(null);
          }
        } else {
          console.log("[Auth] User is null. Setting currentUser to null.");
          setCurrentUser(null);
        }
        
        console.log("[Auth] 5. Setting loading to false");
        setLoading(false);
      });
    };

    initializeAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signUp = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update profile with name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: '', // Empty for email users as requested
      });
      await sendEmailVerification(userCredential.user);
      await firebaseSignOut(auth); // Sign them out immediately
    }
    return userCredential.user;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Refresh user data from Firebase to get latest emailVerified status
    await userCredential.user.reload();
    
    if (!userCredential.user.emailVerified && !userCredential.user.providerData.some(p => p.providerId === 'google.com')) {
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

  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      return cred.user;
    } catch (error) {
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        console.warn("Popup blocked or closed by user, falling back to redirect...");
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      throw error;
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    globalAuthError,
    setGlobalAuthError,
    isAuthenticated: !!currentUser,
    signUp,
    signIn,
    forgotPassword,
    signInWithGoogle,
    logout,
    resendVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
