import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'products');
await mkdir(outDir, { recursive: true });

const SOURCES = {
  'solar-panel': 'photo-1756913454500-2e5487528409',
  'inverex-inverter': 'photo-1662601286465-ce2cebef31ce',
  'pak-fan': 'photo-1581153691064-8d0ec09725b9',
  'haier-ac': 'photo-1707329563732-ff1d580ab3ad',
  'led-lights': 'photo-1738512504684-dabd9e7afa3d',
  'electrical-fittings': 'photo-1759772237947-0c14aef755d5',
  'electrical-accessories': 'photo-1581558775369-0fe7925f0035',
  'pvc-fittings': 'photo-1682540963112-facad29c3fa2',
  'cctv-camera': 'photo-1576554741364-a0d5593b0d62',
  'home-appliances': 'photo-1619871383432-651e8411764d',
};

const UNSPLASH = 'https://images.unsplash.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function download(id) {
  const url = `${UNSPLASH}/${id}?fm=jpg&q=78&w=1400&auto=format&fit=crop&cs=srgb`;
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'image/avif,image/webp,image/jpeg,*/*' } });
  if (!res.ok) throw new Error(`${id} -> HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

for (const [name, id] of Object.entries(SOURCES)) {
  const input = await download(id);
  const before = input.length;
  const main = await sharp(input)
    .resize({ width: 800, height: 620, fit: 'cover', position: 'centre' })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  const mobile = await sharp(input)
    .resize({ width: 400, height: 300, fit: 'cover', position: 'centre' })
    .webp({ quality: 76, effort: 6 })
    .toBuffer();
  await writeFile(path.join(outDir, `${name}.webp`), main);
  await writeFile(path.join(outDir, `${name}-400.webp`), mobile);
  console.log(
    `${name}: ${(before / 1024).toFixed(0)}KB -> 800w ${(main.length / 1024).toFixed(1)}KB + 400w ${(mobile.length / 1024).toFixed(1)}KB`
  );
}
console.log('done');