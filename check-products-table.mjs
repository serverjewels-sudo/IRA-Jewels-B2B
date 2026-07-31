import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_SERVICE_ROLE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkTable() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Product keys:', Object.keys(data[0] || {}));
  }
}

checkTable();
