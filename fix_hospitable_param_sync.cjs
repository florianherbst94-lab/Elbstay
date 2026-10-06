const fs = require('fs');
const path = require('path');

const syncFilePath = path.join(__dirname, 'src', 'components', 'booking', 'HospitableIframeSync.tsx');
let content = fs.readFileSync(syncFilePath, 'utf8');

// We need to pass the widget UUID and Property ID as data attributes, or parse the URL from the iframe properly
// The Hospitable direct-booking iframe doesn't just take query parameters appended to the URL directly like we did.
// It seems Hospitable expects parameters in a specific way or doesn't support them at all in the iframe.

// BUT FIRST: let's check if the widget the user showed is actually the right one!
console.log("File content:");
console.log(content);
