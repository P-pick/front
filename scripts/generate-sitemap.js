import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://yourdomain.com'; // ✅ 본인 도메인으로 수정
const DIST_PATH = path.resolve('dist');

function getAllHtmlFiles(dir, basePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getAllHtmlFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(relativePath);
    }
  }
  return files;
}

function generateSitemap(urls) {
  const xmlUrls = urls
    .map(url => {
      const loc = `${DOMAIN}/${url.replace(/index\.html$/, '').replace(/\.html$/, '')}`;
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${loc === `${DOMAIN}/` ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

// 실행
const htmlFiles = getAllHtmlFiles(DIST_PATH);
const sitemap = generateSitemap(htmlFiles);
fs.writeFileSync(path.join(DIST_PATH, 'sitemap.xml'), sitemap, 'utf-8');

console.log('✅ sitemap.xml generated!');
