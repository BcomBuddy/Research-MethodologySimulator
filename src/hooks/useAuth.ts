import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { AuthService as FirebaseAuthService } from '../firebase/authService';
import { AuthService as SSOAuthService, UserData } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ssoUser, setSsoUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check for SSO token
    const ssoUserData = SSOAuthService.validateTokenFromShell();
    
    if (ssoUserData) {
      setSsoUser(ssoUserData);
      console.log('✅ SSO Login successful:', ssoUserData);
      setLoading(false);
      return;
    }

    // Check for stored SSO user data
    const storedSsoUser = SSOAuthService.getUserData();
    if (storedSsoUser) {
      setSsoUser(storedSsoUser);
      setLoading(false);
      return;
    }

    // Fallback to Firebase authentication
    const unsubscribe = FirebaseAuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await FirebaseAuthService.signInWithEmail(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await FirebaseAuthService.signInWithGoogle();
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      if (ssoUser) {
        // SSO logout - redirect to shell
        SSOAuthService.logout();
        setSsoUser(null);
      } else {
        // Firebase logout
        await FirebaseAuthService.signOut();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    setLoading(true);
    try {
      await FirebaseAuthService.sendPasswordResetEmail(email);
    } finally {
      setLoading(false);
    }
  };

  // Determine if user is authenticated (either SSO or Firebase)
  const isAuthenticated = !!user || !!ssoUser;
  
  // Get current user data (prioritize SSO user)
  const currentUser = ssoUser ? {
    uid: ssoUser.uid,
    email: ssoUser.email,
    displayName: ssoUser.name,
    emailVerified: true
  } as User : user;

  return {
    user: currentUser,
    ssoUser,
    loading,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    sendPasswordReset,
    isAuthenticated
  };
};
