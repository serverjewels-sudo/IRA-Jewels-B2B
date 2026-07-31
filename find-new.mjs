import https from 'https'

const ids = [
  '1611087388916-b6c97e01735b',
  '1512310604669-443f26c35f52',
  '1581403341630-a6e0b9d2d257',
  '1540331547168-8b63109225b7',
  '1474533410427-a23da4fd49d0',
  '1566977744263-79e677f4e7cf'
]

async function checkUrl(id) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`
  return new Promise((resolve) => {
    https.get(url, (res) => resolve({ id, status: res.statusCode }))
  })
}

async function main() {
  for (const id of ids) {
    const res = await checkUrl(id)
    if (res.status === 200) {
      console.log(`✅ ${res.id}`)
    } else {
      console.log(`❌ ${res.id} (${res.status})`)
    }
  }
}
main()
