const fs = require('fs');

let content = fs.readFileSync('src/app/(app)/admin/gallery/page.tsx', 'utf-8');

// Replace the Save button with a disabled "Live-Bearbeitung in Vercel deaktiviert" button
content = content.replace(
  /<Button onClick=\{saveChanges\} disabled=\{saving\} size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white shrink-0 shadow-md">[\s\S]*?<\/Button>/m,
  `<Button disabled={true} size="lg" className="gap-2 bg-gray-400 text-white shrink-0 shadow-md cursor-not-allowed">
          Speichern in Vercel deaktiviert
        </Button>`
);

fs.writeFileSync('src/app/(app)/admin/gallery/page.tsx', content);
