import { supabase } from '../supabaseClient';

export const profileService = {
  createAthleteProfile: async (userId, details) => {
    // Determine if we are in mock mode (using the flag from authService concept)
    const isMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

    if (isMock) {
      console.log('Mock: Creating athlete profile for', userId, details);
      return { data: details, error: null };
    }

    const { data, error } = await supabase
      .from('athlete_details')
      .insert([
        { 
          id: userId,
          ...details
        }
      ]);

    return { data, error };
  }
};
