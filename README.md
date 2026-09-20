# Chaudhry Electric & Solar Systems Store

React + Vite, frontend-only, mobile-first branded storefront.

## Included
- Separate Home, About, Products, Services and Contact routes
- Local WebP product assets (no third-party product image requests at runtime)
- Generated owner hero portrait
- RGB electric hover borders, glow accents and lightweight 3D/parallax-style visuals
- Short non-blocking intro overlay
- Responsive mobile navigation and accessible focus states
- WhatsApp and phone CTAs
- Dynamic page titles/descriptions/canonical URL
- LocalBusiness JSON-LD
- Favicon + Apple touch icon
- Static-host SPA fallback via `public/_redirects` and `vercel.json`
- Reduced-motion support

## Run
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm run preview
```

Deploy the generated `dist/` folder. For a static host, keep the SPA fallback configuration. Replace the canonical/site URL with the real production domain when you have one.

## SEO note
No codebase can guarantee a Google #1 position or a permanent Lighthouse 100. Lighthouse scores depend on the test device, network, browser version, deployment, caching and runtime conditions. This build removes common avoidable issues such as remote product images, missing image dimensions, missing mobile navigation semantics, weak focus states, broken example sitemap URLs, and long blocking intro animations.

For production SEO, connect the real domain in Google Search Console, submit a real absolute sitemap URL, verify business details, and only publish factual business information.
