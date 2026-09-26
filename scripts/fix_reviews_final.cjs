const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// We need to completely remove the reviews section because Vercel is failing on REVIEWS.map
const startSection = content.indexOf('<section className="py-24 bg-muted/30 relative overflow-hidden">');
const endSection = content.indexOf('<SEOClusterLinks />');

if (startSection !== -1 && endSection !== -1 && endSection > startSection) {
    const before = content.substring(0, startSection);
    const after = content.substring(endSection);
    content = before + after;
    fs.writeFileSync(pagePath, content);
    console.log('Removed reviews section.');
} else {
    console.log('Could not find exact section bounds.');
}
