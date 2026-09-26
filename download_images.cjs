const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/b7bf01d9-dea2-4143-823a-21afccc10266.png",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/2525fd10-8473-478c-abea-60ad5f55aff1.png",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/5cc84f83-07a0-4675-8371-9b252dbc384b.png",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/1029b0eb-b323-4c1d-82b2-6359e432b40e.png",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/b185c303-4d02-480c-b670-a09c6efffe69.png",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/09aaf075-70ee-48a6-9803-b93b5b11c5ee.png",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/f5e97bfc-0a70-4614-80d7-b2affbf89a63.png"
];

const dir = path.join(__dirname, 'public', 'images', 'boutique-2');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function downloadImage(url, idx) {
  return new Promise((resolve, reject) => {
    const filename = `image-${idx + 1}.png`;
    const filepath = path.join(dir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`/images/boutique-2/${filename}`);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function run() {
  const localUrls = [];
  for (let i = 0; i < images.length; i++) {
    const localPath = await downloadImage(images[i], i);
    localUrls.push(localPath);
    console.log(`Downloaded ${images[i]} to ${localPath}`);
  }
  
  // Update the images.ts file
  const fileContent = `import { ImageCategory } from "@/lib/images";

export const boutique2Gallery: ImageCategory[] = [
  {
    "title": "Highlights",
    "images": [
      "${localUrls[0]}",
      "${localUrls[1]}"
    ]
  },
  {
    "title": "Wohnbereich",
    "images": [
      "${localUrls[2]}",
      "${localUrls[3]}"
    ]
  },
  {
    "title": "Schlafzimmer 1",
    "images": [
      "${localUrls[4]}"
    ]
  },
  {
    "title": "Schlafzimmer 2",
    "images": [
      "${localUrls[5]}"
    ]
  },
  {
    "title": "Badezimmer",
    "images": [
      "${localUrls[6]}"
    ]
  }
];
`;

  fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'boutique-2', 'images.ts'), fileContent);
  console.log("Updated images.ts with categorized local images");
}

run();
