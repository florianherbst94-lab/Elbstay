const fs = require('fs');
const path = require('path');

const ids = {
  'boutique': '2329032',
  'urban': '2302773',
  'premium': '2302775'
};

for (const [apt, id] of Object.entries(ids)) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Replace iframe with hospitable-direct-property
  const iframeRegex = /<iframe[^>]*src="https:\/\/booking\.hospitable\.com\/widget\/a20a137a-0c7e-42ba-8aa6-9c47accca90f\/\d+"[^>]*><\/iframe>/g;
  content = content.replace(iframeRegex, `<hospitable-direct-property identifier="a20a137a-0c7e-42ba-8aa6-9c47accca90f" property="${id}"></hospitable-direct-property>`);
  
  fs.writeFileSync(pagePath, content);
}

const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
let layout = fs.readFileSync(layoutPath, 'utf8');
if (!layout.includes('hospitable-property-widget.prod.js')) {
  layout = layout.replace(
    'src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"',
    'src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"\n        />\n        <Script \n          strategy="lazyOnload"\n          src="https://hospitable.b-cdn.net/direct-property-widget/hospitable-property-widget.prod.js"'
  );
  fs.writeFileSync(layoutPath, layout);
}
