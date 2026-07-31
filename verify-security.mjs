import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 1. Read .env.local manually (avoids needing 'dotenv' for a standalone script)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '.env.local')

let envFile = ''
try {
  envFile = fs.readFileSync(envPath, 'utf-8')
} catch (e) {
  console.error("❌ Could not read .env.local file. Are you in the project root?")
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
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local")
  process.exit(1)
}

// 2. Create client using the ANON key (browser equivalent)
const supabase = createClient(supabaseUrl, supabaseKey)

// 3. User Credentials - FILL THESE IN DIRECTLY HERE BEFORE RUNNING
const TEST_EMAIL = "Dipak14v08@gmail.com"
const TEST_PASSWORD = "!^yg5k!UfyQij%FC"

async function runTests() {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    console.error("❌ Please fill in TEST_EMAIL and TEST_PASSWORD in verify-security.mjs first.")
    return
  }

  console.log(`Signing in as ${TEST_EMAIL}...`)
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  })

  if (authError || !authData.user) {
    console.error("❌ Sign in failed:", authError.message)
    return
  }
  console.log("✅ Signed in successfully as:", authData.user.id)

  // Determine buyer's tier for Test 1
  const { data: buyer, error: buyerError } = await supabase
    .from('buyers')
    .select('price_tier')
    .eq('id', authData.user.id)
    .single()

  if (buyerError) {
    console.error("❌ Failed to fetch buyer record:", buyerError.message)
    return
  }
  
  const tierColumn = `${buyer.price_tier.toLowerCase()}_price`
  console.log(`\nBuyer tier is: ${buyer.price_tier} -> Alias column: ${tierColumn}\n`)

  // ==========================================
  // TEST 1: The exact catalogue query (Aliased)
  // ==========================================
  console.log("=== TEST 1: The Catalogue Page Query (Aliased) ===")
  const { data: test1Data, error: test1Error } = await supabase
    .from('products')
    .select(`id, name, slug, sku, category, gold_purity, images, price:${tierColumn}`)
    .eq('is_active', true)
    .limit(2) // limit to 2 rows to keep output clean

  if (test1Error) {
    console.error("❌ TEST 1 ERROR:", test1Error)
  } else {
    console.log("✅ TEST 1 DATA (raw JSON):")
    console.log(JSON.stringify(test1Data, null, 2))
  }
  
  // ==========================================
  // TEST 2: Aggressive query for all tiers
  // ==========================================
  console.log("\n=== TEST 2: Aggressive Query (Attempting to fetch all tiers) ===")
  const { data: test2Data, error: test2Error } = await supabase
    .from('products')
    .select('id, name, tier1_price, tier2_price, tier3_price')
    .eq('is_active', true)
    .limit(2)

  if (test2Error) {
    console.error("❌ TEST 2 ERROR:", test2Error)
  } else {
    console.log("✅ TEST 2 DATA (raw JSON):")
    console.log(JSON.stringify(test2Data, null, 2))
  }
  // ==========================================
  // TEST 3: Query products_buyer_view directly
  // ==========================================
  console.log("\n=== TEST 3: Query products_buyer_view ===")
  const { data: test3Data, error: test3Error } = await supabase
    .from('products_buyer_view')
    .select('*')
    .limit(2)

  console.log("TEST 3 ERROR OBJECT:", test3Error)
  console.log("TEST 3 DATA (raw JSON):")
  console.log(JSON.stringify(test3Data, null, 2))
}

runTests()
