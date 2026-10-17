const fs = require('fs');
const path = require('path');
const https = require('https');

const logoQueries = [
  { name: 'cilacap.png', query: 'Lambang Kabupaten Cilacap' },
  { name: 'untidar.png', query: 'Universitas Tidar' },
  { name: 'telkom.svg', query: 'Telkom Indonesia logo' },
  { name: 'kemenag.png', query: 'Kementerian Agama' },
  { name: 'bri.svg', query: 'Bank Rakyat Indonesia' },
  { name: 'pln.svg', query: 'Perusahaan Listrik Negara' }
];

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TechSoeBot/1.0 (contact@techsoe.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function searchAndDownload(item) {
  const outDir = path.join(__dirname, '..', 'public', 'logo');
  try {
    const searchUri = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(item.query)}&srnamespace=6&format=json`;
    const searchBuf = await fetchUrl(searchUri);
    const searchJson = JSON.parse(searchBuf.toString('utf8'));
    const results = searchJson.query.search;
    if (results && results.length > 0) {
      const title = results[0].title;
      const infoUri = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
      const infoBuf = await fetchUrl(infoUri);
      const infoJson = JSON.parse(infoBuf.toString('utf8'));
      const pages = infoJson.query.pages;
      const pageId = Object.keys(pages)[0];
      const imageUrl = pages[pageId].imageinfo[0].url;
      console.log(`Downloading ${item.name} (${title}) from ${imageUrl}...`);
      const imgBuf = await fetchUrl(imageUrl);
      const ext = path.extname(imageUrl).split('?')[0] || '.png';
      const finalName = item.name.replace(/\.(png|svg)$/, ext);
      fs.writeFileSync(path.join(outDir, finalName), imgBuf);
      console.log(`Saved ${finalName} (${imgBuf.length} bytes)`);
    } else {
      console.log(`No results found for ${item.query}`);
    }
  } catch (err) {
    console.error(`Error for ${item.name}:`, err.message);
  }
}

async function main() {
  for (const item of logoQueries) {
    await searchAndDownload(item);
  }
}

main();
