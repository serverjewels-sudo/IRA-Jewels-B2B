import https from 'https'

const candidates = [
  '1601121141461-9d6647bca1ed', // ring
  '1535632066927-ab7c9ab60908', // earrings (already known working)
  '1573408301145-b98c46544eb8', // broken men's
  '1599643477877-530eb83abc8e', // necklace (known working)
  '1611591437281-460bfbe1220a', // bracelets (known working)
  '1589674781759-c21c37956a44', // mangalsutras (known working)
  '1611085583191-a3b181a88401', // bangles (known working)
  '1515562141207-7a8efc9d3000', // random ring test
  '1596944924616-7b38e7cf5367', // ring test 2
  '1599643478514-4a884f1807bd', // broken pendant
  '1611591437281-460bfbe1220a', // wait this is bracelets
  '1596122700538-23f20d20d7af', // pendant test
  '1588444838242-02404b901a1d', // pendant test 2
  '1573408301145-b98c46544eb8', // broken mens
  '1611591437281-460bfbe1220a', // ...
  '1587426176906-8d6ef7af8a6d', // men's watch/jewelry
  '1615367357454-e69d7dc06db3', // another ring
  '1599643478524-fb5244098795', // broken pendants
  '1550186981-6fdf3966fbab', // pendant
  '1611255877884-a131b09b5311', // mens ring/bracelet
]

async function checkUrl(id) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode })
    }).on('error', (e) => {
      resolve({ id, status: 'ERROR' })
    })
  })
}

async function main() {
  for (const id of candidates) {
    const res = await checkUrl(id)
    console.log(`${res.id}: ${res.status}`)
  }
}
main()
