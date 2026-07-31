import https from 'https'

const ids = [
  '1581403341630-a6e0b9d2d257', // Proposed for Pendants
  '1566977744263-79e677f4e7cf'  // Proposed for Men's Jewellery
]

async function checkUrl(id) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`
  return new Promise((resolve) => {
    https.get(url, (res) => resolve({ id, url, status: res.statusCode }))
  })
}

async function main() {
  console.log('Testing NEW Unsplash placeholder IDs...\n')
  for (const id of ids) {
    const res = await checkUrl(id)
    if (res.status === 200) {
      console.log(`[PASS] ID: ${res.id}`)
      console.log(`       URL: ${res.url}`)
      console.log(`       Status: ${res.status} OK\n`)
    } else {
      console.log(`[FAIL] ID: ${res.id}`)
      console.log(`       URL: ${res.url}`)
      console.log(`       Status: ${res.status}\n`)
    }
  }
}
main()
