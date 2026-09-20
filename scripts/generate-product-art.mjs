import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const productsDir = path.join(root, 'public', 'products');

const G = {
  cyan: '#18d8ff', cyan2: '#5eeaff', cyanD: '#0b5c7a',
  gold: '#ffd84d', gold2: '#ffb44d',
  pink: '#ff168f',
  navy: '#0b1d34', navy2: '#12304f', navy3: '#0a1a2e',
  steel: '#cfe3f7', steel2: '#9db8d2', steel3: '#6d89a6',
  white: '#f8fdff',
};

const defs = (id, body) => `<defs>${body}</defs>`;
const glow = (cx, cy, r, color, alpha) =>
  `<radialGradient id="${id}_glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${color}" stop-opacity="${alpha}"/><stop offset="70%" stop-color="${color}" stop-opacity="${alpha * 0.25}"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>
   <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}_glow"/>`;
const id = () => Math.random().toString(36).slice(2, 8);

function wrap(name, inner) {
  const uid = id();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  ${defs(uid, inner.defs || '')}
  ${glow(400, 320, 340, inner.glowColor || G.cyan, inner.glowA || 0.10)}
  ${inner.svg}
</svg>`;
}

/* ------------------------------ 1. SOLAR PANELS ------------------------------ */
function solarPanel() {
  const cells = `<pattern id="pv" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
    <rect width="36" height="36" fill="#062a44"/>
    <rect width="36" height="36" fill="none" stroke="#0e4a6e" stroke-width="2"/>
    <line x1="0" y1="18" x2="36" y2="18" stroke="#0a3a58" stroke-width="1"/>
  </pattern>`;
  const panel = (x, y, w, h, rot) => `
    <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#frameGrad)" stroke="#243b52" stroke-width="2"/>
      <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="6" fill="url(#pv)"/>
      <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="6" fill="url(#cellSheen)"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="url(#rim)" stroke-width="3" opacity=".8"/>
      <rect x="${x + w / 2 - 46}" y="${y + h - 14}" width="92" height="10" rx="3" fill="#0a1a2e"/>
    </g>`;
  return wrap('solar', {
    defs: `
      <linearGradient id="frameGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c465f"/><stop offset="1" stop-color="#15293f"/></linearGradient>
      <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${G.gold}" stop-opacity=".95"/><stop offset=".5" stop-color="${G.cyan}"/><stop offset="1" stop-color="${G.pink}" stop-opacity=".8"/></linearGradient>
      <linearGradient id="cellSheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fd9ff" stop-opacity=".22"/><stop offset=".45" stop-color="#7fd9ff" stop-opacity="0"/><stop offset="1" stop-color="#ffd84d" stop-opacity=".10"/></linearGradient>
      <radialGradient id="sun" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${G.gold}" stop-opacity=".85"/><stop offset=".4" stop-color="${G.gold}" stop-opacity=".25"/><stop offset="100%" stop-color="${G.gold}" stop-opacity="0"/></radialGradient>
      ${cells}
    `,
    glowColor: G.gold, glowA: 0.10,
    svg: `
      <rect x="300" y="26" width="200" height="200" rx="100" fill="url(#sun)"/>
      <circle cx="404" cy="122" r="40" fill="url(#sun)"/>
      ${panel(120, 250, 300, 200, -12)}
      ${panel(266, 212, 300, 200, -3)}
      ${panel(412, 250, 300, 200, 11)}
      <g fill="${G.gold}" opacity=".8">
        <circle cx="150" cy="210" r="3"/><circle cx="250" cy="180" r="2.4"/><circle cx="620" cy="205" r="3"/>
        <circle cx="545" cy="505" r="2.4"/><circle cx="350" cy="520" r="2"/><circle cx="700" cy="330" r="2.4"/>
      </g>`,
  });
}

/* ------------------------------ 2. INVERTER ------------------------------ */
function inverter() {
  return wrap('inv', {
    defs: `
      <linearGradient id="invBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#18354f"/><stop offset=".5" stop-color="#0e2036"/><stop offset="1" stop-color="#0a1729"/></linearGradient>
      <linearGradient id="invFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2036"/><stop offset="1" stop-color="#081527"/></linearGradient>
      <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#06232f"/><stop offset="1" stop-color="#041820"/></linearGradient>
    `,
    svg: `
      <rect x="298" y="120" width="212" height="322" rx="20" fill="url(#invBody)" stroke="#2a4560" stroke-width="2"/>
      <rect x="314" y="134" width="180" height="294" rx="12" fill="url(#invFace)"/>
      <rect x="326" y="150" width="156" height="86" rx="9" fill="url(#screen)" stroke="${G.cyanD}" stroke-width="1.5"/>
      <g fill="${G.cyan}">
        <rect x="338" y="168" width="9" height="30" rx="2" opacity=".9"/>
        <rect x="352" y="158" width="9" height="40" rx="2" opacity=".95"/>
        <rect x="366" y="176" width="9" height="22" rx="2" opacity=".65"/>
        <rect x="380" y="163" width="9" height="35" rx="2" opacity=".55"/>
      </g>
      <circle cx="452" cy="170" r="9" fill="none" stroke="${G.gold}" stroke-width="2.5"/>
      <path d="M452 164v6l5 3" fill="none" stroke="${G.gold}" stroke-width="2.4" stroke-linecap="round"/>
      <g stroke="${G.steel3}" stroke-width="2.6" stroke-linecap="round" opacity=".55"><line x1="336" y1="262" x2="472" y2="262"/><line x1="336" y1="280" x2="472" y2="280"/><line x1="336" y1="298" x2="472" y2="298"/></g>
      <rect x="360" y="322" width="128" height="30" rx="15" fill="none" stroke="${G.gold}" stroke-width="2.4"/>
      <circle cx="438" cy="337" r="5" fill="${G.gold}"/>
      <rect x="358" y="368" width="132" height="16" rx="8" fill="#081527" stroke="${G.steel3}" stroke-width="1.2"/>
      <rect x="358" y="394" width="132" height="16" rx="8" fill="#081527" stroke="${G.steel3}" stroke-width="1.2"/>
      <rect x="380" y="424" width="88" height="22" rx="11" fill="none" stroke="${G.cyan}" stroke-width="2.2" opacity=".9"/>
      <g fill="${G.pink}" opacity=".7"><circle cx="380" cy="188" r="2"/><circle cx="470" cy="300" r="2"/><circle cx="470" cy="430" r="2"/></g>`,
  });
}

/* ------------------------------ 3. CEILING FAN ------------------------------ */
function fan() {
  const blade = (ang) => `
    <g transform="rotate(${ang} 400 300)">
      <ellipse cx="470" cy="252" rx="130" ry="24" fill="url(#bladeGrad)" stroke="#2adbc4" stroke-width="2" transform="rotate(-14 470 252)"/>
      <path d="M430 258 q28 -12 86 -14" fill="none" stroke="#eafff8" stroke-width="3" opacity=".5"/>
    </g>`;
  return wrap('fan', {
    defs: `
      <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0f4a44"/><stop offset=".6" stop-color="#21b795"/><stop offset="1" stop-color="#52ffae"/></linearGradient>
      <linearGradient id="motorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c465f"/><stop offset="1" stop-color="#12263c"/></linearGradient>
      <linearGradient id="hubG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e0952b"/></linearGradient>
    `,
    glowColor: '#52ffae', glowA: 0.08,
    svg: `
      <rect x="392" y="60" width="18" height="78" rx="4" fill="url(#hubG)"/>
      <rect x="382" y="148" width="36" height="54" rx="12" fill="url(#motorG)" stroke="#35506c" stroke-width="2"/>
      ${blade(0)}${blade(120)}${blade(240)}
      <circle cx="400" cy="300" r="30" fill="url(#hubG)" stroke="#fff0b3" stroke-width="3"/>
      <circle cx="400" cy="300" r="12" fill="#2c465f"/>
      <circle cx="400" cy="300" r="5" fill="${G.gold}"/>
      <g stroke="${G.steel2}" stroke-width="1.6" opacity=".35" fill="none"><path d="M400 366 a66 30 0 0 1 57 -17"/><path d="M400 396 a96 42 0 0 1 82 -24"/></g>
      <g fill="${G.gold}" opacity=".8"><circle cx="330" cy="140" r="2.4"/><circle cx="470" cy="110" r="2"/><circle cx="200" cy="330" r="2"/><circle cx="620" cy="400" r="2.4"/></g>`,
  });
}

/* ------------------------------ 4. HAER AC (split unit) ------------------------------ */
function ac() {
  return wrap('ac', {
    defs: `
      <linearGradient id="acBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf6ff"/><stop offset="1" stop-color="#a8cbe6"/></linearGradient>
      <linearGradient id="acVent" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b5675"/><stop offset="1" stop-color="#0c2438"/></linearGradient>
    `,
    glowColor: '#18d8ff', glowA: 0.08,
    svg: `
      <rect x="188" y="150" width="424" height="232" rx="30" fill="url(#acBody)" stroke="#7ba3c4" stroke-width="2"/>
      <rect x="214" y="182" width="158" height="54" rx="12" fill="url(#acVent)"/>
      <rect x="382" y="182" width="204" height="54" rx="12" fill="url(#acVent)"/>
      <g stroke="#0d2c42" stroke-width="3" opacity=".85"><line x1="232" y1="198" x2="354" y2="198"/><line x1="232" y1="213" x2="354" y2="213"/><line x1="232" y1="228" x2="354" y2="228"/><line x1="400" y1="198" x2="568" y2="198"/><line x1="400" y1="213" x2="568" y2="213"/><line x1="400" y1="228" x2="568" y2="228"/></g>
      <rect x="214" y="262" width="372" height="66" rx="14" fill="#d6e9fb" stroke="#7ba3c4" stroke-width="1.5"/>
      <g fill="${G.cyan}"><rect x="234" y="278" width="58" height="18" rx="7" opacity=".9"/><rect x="298" y="278" width="58" height="18" rx="7" opacity=".55"/><rect x="362" y="278" width="58" height="18" rx="7" opacity=".9"/><rect x="426" y="278" width="58" height="18" rx="7" opacity=".55"/></g>
      <rect x="214" y="336" width="372" height="24" rx="10" fill="#0d2036"/>
      <rect x="340" y="340" width="120" height="16" rx="8" fill="${G.cyan}" opacity=".9"/>
      <circle cx="246" cy="206" r="4" fill="${G.gold}"/>
      <g fill="${G.pink}" opacity=".6"><circle cx="586" cy="176" r="2"/><circle cx="200" cy="330" r="2"/></g>`,
  });
}

/* ------------------------------ 5. LED LIGHTING ------------------------------ */
function bulb() {
  return wrap('led', {
    defs: `
      <radialGradient id="ledCore" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".55" stop-color="#ffdf6b"/><stop offset="1" stop-color="#ffb84d" stop-opacity=".35"/></radialGradient>
      <linearGradient id="glassG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset="1" stop-color="#bfe9ff" stop-opacity=".35"/></linearGradient>
      <linearGradient id="baseG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#c6891f"/></linearGradient>
    `,
    glowColor: G.gold, glowA: 0.16,
    svg: `
      <circle cx="400" cy="300" r="150" fill="url(#ledCore)"/>
      <path d="M400 186 c-64 0 -104 38 -110 96 h220 c-6 -58 -46 -96 -110 -96z" fill="url(#glassG)" stroke="#eafaff" stroke-width="2"/>
      <path d="M290 282 h220 a8 8 0 0 1 8 8 c0 42 -24 74 -63 84 h-110 c-39 -10 -63 -42 -63 -84 a8 8 0 0 1 8 -8z" fill="#dff2ff" stroke="#9dc8ee" stroke-width="2"/>
      <path d="M338 300 l24 40 22 -30 18 52 24 -88 14 60" fill="none" stroke="${G.gold}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>
      <path d="M338 300 l24 40 22 -30 18 52 24 -88 14 60" fill="none" stroke="#fff8dd" stroke-width="2.6" stroke-linecap="round" opacity=".8"/>
      <rect x="376" y="398" width="48" height="34" rx="6" fill="url(#baseG)" stroke="#b98314" stroke-width="1.5"/>
      <g stroke="#8a5f0c" stroke-width="2.2"><line x1="384" y1="404" x2="416" y2="404"/><line x1="384" y1="411" x2="416" y2="411"/><line x1="384" y1="418" x2="416" y2="418"/></g>
      <g fill="${G.cyan}" opacity=".75"><circle cx="252" cy="210" r="2.4"/><circle cx="560" cy="250" r="2"/><circle cx="300" cy="470" r="2"/><circle cx="520" cy="460" r="2.4"/></g>`,
  });
}

/* ------------------------------ 6. ELECTRICAL FITTINGS ------------------------------ */
function fittings() {
  return wrap('fit', {
    defs: `
      <linearGradient id="plateG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d3c59"/><stop offset="1" stop-color="#0d2036"/></linearGradient>
      <linearGradient id="rockG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb6d4"/><stop offset="1" stop-color="#3c6281"/></linearGradient>
    `,
    glowColor: G.cyan, glowA: 0.10,
    svg: `
      <rect x="240" y="120" width="320" height="340" rx="26" fill="url(#plateG)" stroke="#33526f" stroke-width="2.5"/>
      <circle cx="400" cy="146" r="5" fill="#223d56" stroke="#3d5f7d" stroke-width="1.4"/>
      <rect x="278" y="170" width="244" height="90" rx="16" fill="#0a1a2e" stroke="#28445f" stroke-width="2"/>
      <rect x="268" y="186" width="120" height="58" rx="12" fill="url(#rockG)" stroke="#9fc0da" stroke-width="2" transform="rotate(2 328 215)"/>
      <rect x="278" y="198" width="56" height="34" rx="8" fill="#eaf4ff"/>
      <circle cx="310" cy="214" r="4" fill="${G.gold}"/>
      <rect x="404" y="186" width="118" height="58" rx="12" fill="url(#rockG)" stroke="#9fc0da" stroke-width="2"/>
      <path d="M426 224 l14 12 24 -26" fill="none" stroke="${G.gold}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="230" y="286" width="340" height="150" rx="18" fill="#0a1a2e" stroke="#28445f" stroke-width="2"/>
      <g fill="#3c6281"><circle cx="292" cy="332" r="12"/><circle cx="400" cy="332" r="12"/><circle cx="508" cy="332" r="12"/></g>
      <g fill="#0a1a2e"><circle cx="292" cy="332" r="5"/><circle cx="400" cy="332" r="5"/><circle cx="508" cy="332" r="5"/></g>
      <rect x="286" y="376" width="228" height="44" rx="10" fill="none" stroke="${G.cyan}" stroke-width="2.4" opacity=".8"/>
      <g fill="${G.pink}" opacity=".6"><circle cx="226" cy="160" r="2"/><circle cx="568" cy="420" r="2"/></g>`,
  });
}

/* ------------------------------ 7. ELECTRICAL ACCESSORIES ------------------------------ */
function accessories() {
  return wrap('acc', {
    defs: `
      <linearGradient id="plugG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c465f"/><stop offset="1" stop-color="#101f33"/></linearGradient>
      <linearGradient id="stripG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b3a55"/><stop offset="1" stop-color="#0c1d31"/></linearGradient>
    `,
    glowColor: G.cyan, glowA: 0.10,
    svg: `
      <path d="M290 170 c0 -46 40 -70 92 -70 c48 0 84 26 84 68 c0 30 -20 46 -20 70 c0 34 8 56 8 84 c0 40 -30 64 -72 64 c-42 0 -74 -26 -74 -66 c0 -28 14 -40 14 -74 c0 -20 -32 -7 -32 -76z"
        fill="none" stroke="${G.steel2}" stroke-width="7" stroke-linecap="round" opacity=".9"/>
      <g transform="translate(0 0)"><rect x="316" y="388" width="168" height="118" rx="16" fill="url(#plugG)" stroke="#35506c" stroke-width="2.5"/>
        <rect x="352" y="404" width="30" height="70" rx="6" fill="#081527" stroke="#3d5f7d" stroke-width="2"/><rect x="418" y="404" width="30" height="70" rx="6" fill="#081527" stroke="#3d5f7d" stroke-width="2"/></g>
      <g opacity="0"><rect x="316" y="388" width="168" height="118" rx="16" fill="url(#plugG)"/></g>
      <rect x="250" y="470" width="300" height="64" rx="16" fill="url(#stripG)" stroke="#2a4560" stroke-width="2"/>
      <g fill="${G.gold}"><circle cx="286" cy="502" r="5"/><circle cx="326" cy="502" r="5"/><circle cx="366" cy="502" r="5"/></g>
      <g fill="${G.cyan}"><circle cx="420" cy="502" r="8"/><circle cx="452" cy="502" r="8"/><circle cx="484" cy="502" r="8"/><circle cx="516" cy="502" r="8"/></g>
      <g fill="${G.pink}" opacity=".6"><circle cx="240" cy="190" r="2"/><circle cx="560" cy="260" r="2"/><circle cx="580" cy="470" r="2"/></g>`,
  });
}

/* ------------------------------ 8. PVC FITTINGS ------------------------------ */
function pvc() {
  return wrap('pvc', {
    defs: `
      <linearGradient id="pipeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#eef6fd"/><stop offset=".5" stop-color="#c3d9ec"/><stop offset="1" stop-color="#8fb2cc"/></linearGradient>
      <linearGradient id="ringG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd84d"/><stop offset="1" stop-color="#d98e1f"/></linearGradient>
    `,
    glowColor: '#18d8ff', glowA: 0.08,
    svg: `
      <g transform="rotate(-10 300 300)"><rect x="168" y="180" width="210" height="230" rx="30" fill="url(#pipeG)" stroke="#7ba0bd" stroke-width="2.5"/><rect x="150" y="150" width="34" height="260" rx="14" fill="url(#pipeG)" stroke="#7ba0bd" stroke-width="2"/><rect x="150" y="200" width="34" height="34" rx="8" fill="url(#ringG)" stroke="#b97e12" stroke-width="1.5"/><rect x="150" y="330" width="34" height="34" rx="8" fill="url(#ringG)" stroke="#b97e12" stroke-width="1.5"/></g>
      <g transform="rotate(6 500 320)"><rect x="404" y="250" width="220" height="140" rx="26" fill="url(#pipeG)" stroke="#7ba0bd" stroke-width="2.5"/><rect x="462" y="232" width="26" height="176" rx="10" fill="url(#pipeG)" stroke="#7ba0bd" stroke-width="2"/><rect x="430" y="386" width="200" height="30" rx="12" fill="url(#ringG)" stroke="#b97e12" stroke-width="1.5"/></g>
      <g fill="${G.gold}" opacity=".8"><circle cx="180" cy="140" r="2.4"/><circle cx="620" cy="180" r="2"/><circle cx="560" cy="470" r="2.4"/><circle cx="250" cy="470" r="2"/></g>`,
  });
}

/* ------------------------------ 9. CCTV ------------------------------ */
function cctv() {
  return wrap('cctv', {
    defs: `
      <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c465f"/><stop offset="1" stop-color="#101f33"/></linearGradient>
      <linearGradient id="domeG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2540"/><stop offset="1" stop-color="#020d18"/></linearGradient>
    `,
    glowColor: '#52ffae', glowA: 0.08,
    svg: `
      <rect x="300" y="96" width="200" height="26" rx="8" fill="#1a3047" stroke="#35506c" stroke-width="2"/>
      <rect x="330" y="118" width="140" height="58" rx="14" fill="url(#camBody)" stroke="#3d5f7d" stroke-width="2"/>
      <rect x="330" y="118" width="140" height="20" rx="10" fill="#1a3047"/>
      <g transform="translate(400 236)"><circle r="112" fill="url(#camBody)" stroke="#3d5f7d" stroke-width="2.5"/>
        <circle r="82" fill="url(#domeG)" stroke="#35506c" stroke-width="1.6"/>
        <circle r="44" fill="#04121f" stroke="#18d8ff" stroke-width="3" opacity=".9"/>
        <circle r="20" fill="url(#lensGrad)" stroke="#9df0ff" stroke-width="2"/>
        <g fill="${G.cyan}"><circle cx="-52" cy="-30" r="5"/><circle cx="-30" cy="-52" r="5"/><circle cx="52" cy="-30" r="5"/><circle cx="30" cy="-52" r="5"/><circle cx="-52" cy="30" r="5"/><circle cx="-30" cy="52" r="5"/><circle cx="52" cy="30" r="5"/><circle cx="30" cy="52" r="5"/></g>
        <circle cx="86" cy="-66" r="4" fill="#52ffae"/></g>
      <defs><radialGradient id="lensGrad" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#05202e"/><stop offset=".6" stop-color="#0a4a66"/><stop offset="1" stop-color="#eaffff"/></radialGradient></defs>`,
  });
}

/* ------------------------------ 10. HOME APPLIANCES ------------------------------ */
function appliances() {
  return wrap('app', {
    defs: `
      <linearGradient id="ketG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d3c59"/><stop offset="1" stop-color="#0c1d31"/></linearGradient>
    `,
    glowColor: G.cyan, glowA: 0.09,
    svg: `
      <g transform="translate(230 130)">
        <rect x="22" y="60" width="120" height="220" rx="60" fill="url(#ketG)" stroke="#35506c" stroke-width="2.5"/>
        <path d="M96 86 q82 -16 58 64 l-18 34" fill="none" stroke="${G.steel2}" stroke-width="16" stroke-linecap="round"/>
        <rect x="142" y="120" width="28" height="120" rx="14" fill="#35506c"/>
        <path d="M60 190 h46" stroke="${G.cyan}" stroke-width="8" stroke-linecap="round" opacity=".95"/>
        <path d="M60 212 h34" stroke="${G.cyan}" stroke-width="8" stroke-linecap="round" opacity=".7"/>
        <rect x="66" y="252" width="32" height="20" rx="6" fill="#16293e"/>
      </g>
      <g transform="translate(420 130)">
        <rect x="30" y="150" width="200" height="120" rx="22" fill="#223d56" stroke="#3d5f7d" stroke-width="2.5"/>
        <rect x="92" y="96" width="52" height="70" rx="10" fill="#0c1d31" stroke="#3d5f7d" stroke-width="2"/>
        <circle cx="118" cy="142" r="6" fill="${G.gold}"/>
        <g fill="#35506c"><circle cx="60" cy="250" r="7"/><circle cx="118" cy="250" r="7"/><circle cx="176" cy="250" r="7"/></g>
        <rect x="54" y="176" width="56" height="20" rx="6" fill="#0a1a2e"/>
        <rect x="190" y="176" width="20" height="20" rx="6" fill="${G.gold}" opacity=".9"/>
      </g>
      <g transform="translate(520 120)">
        <path d="M70 250 l-14 -92 a26 26 0 0 1 18 -32 l70 -8 a26 26 0 0 1 22 30 l16 92 a34 34 0 0 1 -34 40 l-44 0 a34 34 0 0 1 -34 -30z" fill="#223d56" stroke="#3d5f7d" stroke-width="2.5"/>
        <rect x="62" y="140" width="112" height="26" rx="13" fill="#0a1a2e"/>
        <circle cx="118" cy="153" r="5" fill="${G.pink}"/>
      </g>
      <g fill="${G.gold}" opacity=".75"><circle cx="206" cy="118" r="2.2"/><circle cx="700" cy="150" r="2.2"/><circle cx="640" cy="430" r="2"/></g>`,
  });
}

const art = {
  'solar-panel': solarPanel(),
  'inverex-inverter': inverter(),
  'pak-fan': fan(),
  'haier-ac': ac(),
  'led-lights': bulb(),
  'electrical-fittings': fittings(),
  'electrical-accessories': accessories(),
  'pvc-fittings': pvc(),
  'cctv-camera': cctv(),
  'home-appliances': appliances(),
};

async function render(name, svg) {
  const buf = Buffer.from(svg);
  const meta = await sharp(buf).metadata();
  if (!meta.width || !meta.height) throw new Error(`${name}: svg did not render`);
  const full = await sharp(buf).resize(800, 600).webp({ quality: 84, effort: 6 }).toBuffer();
  const mobile = await sharp(buf).resize(400, 300).webp({ quality: 80, effort: 5 }).toBuffer();
  await writeFile(path.join(productsDir, `${name}.webp`), full);
  await writeFile(path.join(productsDir, `${name}-400.webp`), mobile);
  return `${name}.webp -> ${(full.length / 1024).toFixed(1)}KB (+ mobile ${(mobile.length / 1024).toFixed(1)}KB)`;
}

const stale = await readdir(productsDir).catch(() => []);
const keep = new Set([...Object.keys(art).flatMap(k => [`${k}.webp`, `${k}-400.webp`])]);
for (const f of stale) if (!keep.has(f)) { /* leave non-product public files alone */ }

const results = [];
for (const [name, svg] of Object.entries(art)) results.push(await render(name, svg));
console.log(results.join('\n'));