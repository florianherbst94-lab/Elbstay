const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Find the section that contains REVIEWS.map
const marker1 = '50+ Gäste. Alle begeistert.';
const startIdx = content.lastIndexOf('<section', content.indexOf(marker1));
const nextSectionIdx = content.indexOf('<section', content.indexOf('REVIEWS.map'));
const endIdx = content.lastIndexOf('</section>', nextSectionIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx + 10); // +10 to skip </section>
    
    content = before + after;
    fs.writeFileSync(pagePath, content);
    console.log('Successfully removed REVIEWS mapping section.');
} else {
    console.log('Could not find start or end markers for REVIEWS section.', startIdx, endIdx);
}
