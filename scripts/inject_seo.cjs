const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Insert import
if (!content.includes('SEOClusterLinks')) {
  content = content.replace(
    'import { motion, useScroll, useTransform } from "framer-motion";',
    'import { motion, useScroll, useTransform } from "framer-motion";\nimport { SEOClusterLinks } from "@/components/layout/SEOClusterLinks";'
  );
  
  // Insert component
  content = content.replace(
    '{/* ═══════════════════════════════════════════\n          6. FAQ',
    '<SEOClusterLinks />\n\n      {/* ═══════════════════════════════════════════\n          6. FAQ'
  );
}

fs.writeFileSync(pagePath, content);
