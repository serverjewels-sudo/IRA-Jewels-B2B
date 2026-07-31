import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Read .env.local manually
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '.env.local')

let envFile = ''
try {
  envFile = fs.readFileSync(envPath, 'utf-8')
} catch (e) {
  console.error("❌ Could not read .env.local file.")
  process.exit(1)
}

const env = {}
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=')
  if (key && values.length > 0 && !key.trim().startsWith('#')) {
    env[key.trim()] = values.join('=').trim().replace(/^['"](.*)['"]$/, '$1')
  }
})

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
  process.exit(1)
}

// Create client using the SERVICE ROLE key to bypass RLS and view raw data
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runTest() {
  console.log("=== Querying raw 'products' table using service_role key ===")
  const { data, error } = await supabase
    .from('products')
    .select('id, name, images')
    .limit(10)

  if (error) {
    console.error("❌ ERROR:", error)
  } else {
    console.log("✅ RAW DATA:")
    console.log(JSON.stringify(data, null, 2))
  }
}

runTest()
