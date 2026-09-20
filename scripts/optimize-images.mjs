import sharp from 'sharp';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const productsDir = path.join(publicDir, 'products');
const PRODUCT_MAX_WIDTH = 800;
const OG_MAX_WIDTH = 1200;

async function optimize(file, maxWidth, quality) {
  const out = [];
  const input = await readFile(file);
  let { width, height } = await sharp(input).metadata();
  const before = input.length;
  const resized = await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  await writeFile(file, resized);
  const noMobile = file.includes('brand-main') || file.includes('owner-hero');
  if (width > 430 && !noMobile) {
    const mobile = await sharp(input)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 76, effort: 6 })
      .toBuffer();
    await writeFile(file.replace(/\.webp$/, '-400.webp'), mobile);
  }
  const after = resized.length;
  out.push(
    `${path.basename(file)}: ${width}x${height} -> ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB (${before ? Math.round(100 - (after / before) * 100) : 0}% smaller)`
  );
  return out;
}

const results = [];
for (const f of await readdir(productsDir)) {
  if (f.endsWith('.webp')) results.push(...(await optimize(path.join(productsDir, f), PRODUCT_MAX_WIDTH, 78)));
}
for (const f of ['brand-main.webp', 'owner-hero.webp']) {
  const file = path.join(publicDir, f);
  if (await stat(file).catch(() => null)) {
    results.push(...(await optimize(file, f === 'brand-main.webp' ? OG_MAX_WIDTH : 640, 80)));
  }
}
console.log(results.join('\n'));