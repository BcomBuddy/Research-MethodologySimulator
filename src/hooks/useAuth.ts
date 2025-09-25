import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { AuthService } from '../firebase/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await AuthService.signInWithEmail(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await AuthService.signInWithGoogle();
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await AuthService.signOut();
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    setLoading(true);
    try {
      await AuthService.sendPasswordResetEmail(email);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    sendPasswordReset,
    isAuthenticated: !!user
  };
};
