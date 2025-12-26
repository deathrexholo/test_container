import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Key in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('--- Fetching PROFILES ---');
  const { data: profiles, error: err1 } = await supabase.from('profiles').select('*');
  if (err1) console.error('Error fetching profiles:', err1.message);
  else console.table(profiles);

  console.log('\n--- Fetching ATHLETE_DETAILS ---');
  const { data: athletes, error: err2 } = await supabase.from('athlete_details').select('*');
  if (err2) console.error('Error fetching athlete_details:', err2.message);
  else console.table(athletes);
}

checkData();
