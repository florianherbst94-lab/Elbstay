const fs = require('fs');

let content = fs.readFileSync('src/app/(app)/admin/gallery/page.tsx', 'utf-8');

// Replace the disabled button with the functional one
content = content.replace(
  /<Button disabled=\{true\} size="lg" className="gap-2 bg-gray-400 text-white shrink-0 shadow-md cursor-not-allowed">[\s\S]*?<\/Button>/m,
  `<Button onClick={saveChanges} disabled={saving} size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white shrink-0 shadow-md">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Speichert in Cloud..." : "Speichern & Live schalten"}
        </Button>`
);

fs.writeFileSync('src/app/(app)/admin/gallery/page.tsx', content);
