const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// The regex might not have worked properly because it depended on specific line numbers or comments that were changed in previous edits.
// We need to completely remove the REVIEWS mapping section.

const reviewsStart = '<section className="py-24 bg-muted/30 relative overflow-hidden">';
const reviewsEnd = '{/* ═══════════════════════════════════════════\n          6. FAQ';

if (content.includes(reviewsStart) && content.includes(reviewsEnd)) {
    const before = content.substring(0, content.indexOf(reviewsStart));
    const after = content.substring(content.indexOf(reviewsEnd));
    
    // Check if it's really the reviews section we're removing (it should contain REVIEWS.map)
    const sectionToRemove = content.substring(content.indexOf(reviewsStart), content.indexOf(reviewsEnd));
    if (sectionToRemove.includes('REVIEWS.map')) {
        content = before + after;
        fs.writeFileSync(pagePath, content);
        console.log('Successfully removed REVIEWS mapping section.');
    } else {
        console.log('Section did not contain REVIEWS.map, skipping to prevent accidental deletion.');
    }
} else {
    console.log('Could not find start or end markers for REVIEWS section.');
}
