import https from 'https'

function searchNapi(query) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${query}&per_page=5`, (res) => {
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve(json.results.map(r => r.id))
        } catch (e) {
          resolve([])
        }
      })
    })
  })
}

async function checkUrl(id) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`
  return new Promise((resolve) => {
    https.get(url, (res) => resolve({ id, status: res.statusCode }))
  })
}

async function main() {
  for (const q of ['pendant+jewelry', 'mens+jewelry']) {
    console.log(`Searching API for ${q}...`)
    const ids = await searchNapi(q)
    for (const id of ids) {
      const res = await checkUrl(id)
      if (res.status === 200) {
        console.log(`✅ Found working ${q}: ${res.id}`)
      }
    }
  }
}
main()
