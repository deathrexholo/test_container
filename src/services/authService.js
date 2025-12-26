import { supabase } from '../supabaseClient';

const isMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// Mock user data
const MOCK_USER = {
  id: 'mock-user-id-123',
  email: 'athlete@example.com',
  role: 'athlete',
  user_metadata: {
    full_name: 'Mock Athlete'
  }
};

export const authService = {
  login: async (email, password) => {
    if (isMock) {
      console.log('Attempting Mock Login:', { email, password });
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email === 'athlete@example.com' && password === 'password') {
             resolve({ data: { user: MOCK_USER, session: { access_token: 'mock-token' } }, error: null });
          } else {
             resolve({ data: { user: null, session: null }, error: { message: 'Invalid mock credentials. Use athlete@example.com / password' } });
          }
        }, 1000); // Simulate network delay
      });
    } else {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    }
  },

  logout: async () => {
    if (isMock) {
      console.log('Mock Logout');
      return Promise.resolve({ error: null });
    } else {
      return await supabase.auth.signOut();
    }
  },

  getCurrentUser: async () => {
    if (isMock) {
      // In a real mock scenario, you might check localStorage or a global variable
      // For simplicity, we'll just return null or the mock user if we were tracking session
      return { data: { user: MOCK_USER }, error: null }; 
    } else {
      return await supabase.auth.getUser();
    }
  },

  signup: async (email, password, metadata = {}) => {
    if (isMock) {
      console.log('Mock Signup:', { email, password, metadata });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            data: { user: { ...MOCK_USER, email, user_metadata: metadata }, session: null }, 
            error: null 
          });
        }, 1000);
      });
    } else {
      return await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
    }
  }
};
