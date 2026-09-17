const fs = require('fs');
const path = require('path');

const files = [
  'src/app/(app)/dresden-guide/page.tsx',
  'src/app/(app)/dresden-guide/neustadt/page.tsx',
  'src/app/(app)/dresden-guide/pieschen/page.tsx',
  'src/app/(app)/dresden-guide/altstadt/page.tsx'
];

for (const f of files) {
  const p = path.join(__dirname, '..', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/style="color:hsl\(var\(--primary\)\)"/g, 'className="text-primary"');
    fs.writeFileSync(p, content);
  }
}
