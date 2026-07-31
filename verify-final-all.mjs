import https from 'https';

const CATEGORY_IDS = {
  "rings": "1601121141461-9d6647bca1ed",
  "earrings": "1535632066927-ab7c9ab60908",
  "pendants": "1581403341630-a6e0b9d2d257",
  "necklaces": "1599643477877-530eb83abc8e",
  "bracelets": "1611591437281-460bfbe1220a",
  "bangles": "1611085583191-a3b181a88401",
  "mangalsutras": "1589674781759-c21c37956a44",
  "mens-jewellery": "1566977744263-79e677f4e7cf",
  "general": "1620288627223-53302f4e8c74",
  "general_alt": "1603561596112-0a132b757442"
};

async function checkUrl(id) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`;
  return new Promise((resolve) => {
    https.get(url, (res) => resolve({ id, url, status: res.statusCode }));
  });
}

async function main() {
  console.log('Verifying all centralized placeholder IDs...\n');
  let allPass = true;
  for (const [cat, id] of Object.entries(CATEGORY_IDS)) {
    const res = await checkUrl(id);
    if (res.status === 200) {
      console.log(`[PASS] ${cat} -> ${res.status}`);
    } else {
      console.log(`[FAIL] ${cat} -> ${res.status}`);
      allPass = false;
    }
  }
  
  if (allPass) {
    console.log('\nAll IDs returned 200 OK.');
  } else {
    console.log('\nSome IDs failed.');
    process.exit(1);
  }
}

main();
