const fs = require('fs');
const path = require('path');

const ids = {
  'boutique': '2329032',
  'urban': '2302773',
  'premium': '2302775',
  'boutique-2': '2329032' // Assume same as boutique or use the TODO
};

for (const [apt, id] of Object.entries(ids)) {
  const pagePath = path.join(__dirname, 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // In boutique-2, it might have the TODO string
    content = content.replace(
      /\{\/\*\s*@ts-ignore\s*\*\/\}\s*<hospitable-direct-property identifier="[^"]+" property="([^"]+)"><\/hospitable-direct-property>/g, 
      (match, propId) => {
        return `<iframe \n                id="booking-iframe" \n                sandbox="allow-top-navigation allow-scripts allow-same-origin allow-popups" \n                style={{ width: "100%", height: "900px" }} \n                frameBorder="0" \n                src={\`https://booking.hospitable.com/widget/a20a137a-0c7e-42ba-8aa6-9c47accca90f/\${"${propId}"}\`}\n              ></iframe>`;
      }
    );

    // Also just in case the ts-ignore was removed
    content = content.replace(
      /<hospitable-direct-property identifier="[^"]+" property="([^"]+)"><\/hospitable-direct-property>/g, 
      (match, propId) => {
        return `<iframe \n                id="booking-iframe" \n                sandbox="allow-top-navigation allow-scripts allow-same-origin allow-popups" \n                style={{ width: "100%", height: "900px" }} \n                frameBorder="0" \n                src={\`https://booking.hospitable.com/widget/a20a137a-0c7e-42ba-8aa6-9c47accca90f/\${"${propId}"}\`}\n              ></iframe>`;
      }
    );
    
    fs.writeFileSync(pagePath, content);
    console.log("Restored iframe in", apt);
  }
}

const layoutPath = path.join(__dirname, 'src', 'app', 'layout.tsx');
let layout = fs.readFileSync(layoutPath, 'utf8');
layout = layout.replace(
  /\s*<Script[^>]*src="https:\/\/hospitable\.b-cdn\.net\/direct-property-widget\/hospitable-property-widget\.prod\.js"[^>]*\/>/g,
  ''
);
fs.writeFileSync(layoutPath, layout);
console.log("Removed 404 script from layout");

