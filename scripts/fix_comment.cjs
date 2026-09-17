const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const badChunk = `      {/* ═══════════════════════════════════════════
      {/* ═══════════════════════════════════════════
      <SEOClusterLinks />

          6. FAQ`;

const goodChunk = `<SEOClusterLinks />

      {/* ═══════════════════════════════════════════
          6. FAQ
      ═══════════════════════════════════════════ */}`;

content = content.replace(badChunk, goodChunk);
fs.writeFileSync(pagePath, content);
