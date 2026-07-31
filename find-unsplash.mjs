import https from 'https'

function search(query) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${query}`, (res) => {
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => {
        const matches = [...data.matchAll(/\/photos\/([a-zA-Z0-9-]+)/g)]
        resolve(matches.map(m => m[1]).filter(id => id.length > 20))
      })
    })
  })
}

async function checkUrl(id) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`
  return new Promise((resolve) => {
    https.get(url, (res) => resolve(res.statusCode))
  })
}

async function main() {
  for (const q of ['pendant', 'mens-jewelry']) {
    console.log(`Searching ${q}...`)
    const ids = await search(q)
    for (const id of ids.slice(0, 5)) {
      const status = await checkUrl(id)
      if (status === 200) {
        console.log(`Found working ${q}: ${id}`)
        break
      }
    }
  }
}
main()
