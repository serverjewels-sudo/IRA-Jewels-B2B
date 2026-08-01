const fs = require('fs');
const html = fs.readFileSync('output.html', 'utf8');

const whoWeAreMatch = html.match(/<div class="([^"]*)"[^>]*>(?=[^<]*<div[^>]*><p[^>]*>Who We Are)/);
console.log('Who We Are wrapper class:', whoWeAreMatch ? whoWeAreMatch[1] : 'NOT FOUND');

const whyPartnerMatch = html.match(/<div class="([^"]*)"[^>]*>(?=[^<]*<div[^>]*><p[^>]*>Why Partner)/);
console.log('Why Partner wrapper class:', whyPartnerMatch ? whyPartnerMatch[1] : 'NOT FOUND');

const allGridCols = html.match(/class="[^"]*grid-cols-[^"]*"/g);
console.log('All grid-cols classes found in document:');
if(allGridCols) {
  const unique = [...new Set(allGridCols)];
  unique.forEach(c => console.log(c));
}
