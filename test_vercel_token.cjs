const { execSync } = require('child_process');

try {
  const result = execSync('npx vercel ls Elbstay --token $VERCEL_TOKEN');
  console.log(result.toString());
} catch(e) {
  console.error("No Vercel Token found or unauthorized.");
}
