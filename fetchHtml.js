const http = require('http');
http.get('http://localhost:3000/about', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('output.html', data);
    console.log('HTML written to output.html');
  });
}).on('error', err => console.error(err));
