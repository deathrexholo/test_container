import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

  useEffect(() => {
    // 1. Check active session on mount
    const initSession = async () => {
      try {
        const { data, error } = await authService.getCurrentUser();
        if (!error && data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // 2. Set up listener for real Supabase auth events
    if (!isMock) {
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    }
  }, [isMock]);

  const login = async (email, password) => {
    const { data, error } = await authService.login(email, password);
    if (error) {
      return { error };
    }
    
    // In mock mode, we manually set the user. 
    // In real mode, onAuthStateChange handles it, but setting it here doesn't hurt for immediate feedback.
    if (data?.user) {
      setUser(data.user);
    }
    return { data, error: null };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const signup = async (email, password, metadata) => {
    const { data, error } = await authService.signup(email, password, metadata);
    return { data, error };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
