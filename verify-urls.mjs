import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?q=\d+&w=\d+&auto=format&fit=crop/g

const results = {} // url -> { files: Set, usages: Set }

function searchDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      searchDir(fullPath)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      let match;
      while ((match = urlRegex.exec(content)) !== null) {
        const url = match[0]
        if (!results[url]) {
          results[url] = { files: new Set(), usages: new Set() }
        }
        const relPath = path.relative(__dirname, fullPath)
        
        // try to guess category/purpose from line
        const line = content.substring(content.lastIndexOf('\n', match.index) + 1, content.indexOf('\n', match.index))
        let purpose = "Image"
        const categoryMatch = line.match(/slug:\s*["']([^"']+)["']/) || line.match(/name:\s*["']([^"']+)["']/) || line.match(/title:\s*["']([^"']+)["']/)
        if (categoryMatch) purpose = categoryMatch[1]
        else if (line.includes("rings\"")) purpose = "rings"
        else if (line.includes("earrings\"")) purpose = "earrings"
        // just store path for simplicity and we can infer
        results[url].files.add(relPath)
      }
    }
  }
}

searchDir(srcDir)

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode)
    }).on('error', (e) => {
      resolve('ERROR')
    })
  })
}

async function main() {
  console.log(`Found ${Object.keys(results).length} unique URLs. Checking status codes...`)
  
  const table = []
  for (const url of Object.keys(results)) {
    const status = await checkUrl(url)
    const files = Array.from(results[url].files).join(', ')
    table.push({
      URL: url,
      'Used In': files,
      Status: status,
      State: status === 200 ? 'Working' : 'Broken'
    })
  }

  console.table(table)
  console.log("JSON DUMP:")
  console.log(JSON.stringify(table, null, 2))
}

main()
