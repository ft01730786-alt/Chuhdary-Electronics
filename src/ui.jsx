import { useEffect, useState } from 'react';
import { WA } from './data';

export function go(path) {
  if (location.pathname === path) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const handler = () => setPath(location.pathname);
    addEventListener('popstate', handler);
    return () => removeEventListener('popstate', handler);
  }, []);
  return path;
}

export function wa(message) {
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export function setMeta(page) {
  const meta = {
    home: ['Chaudhry Electric & Solar Systems Store | Electrical & Solar Products', 'Electrical goods, solar systems, lighting, appliances, wiring and CCTV from Chaudhry Electric & Solar Systems Store in Burewala.'],
    about: ['About Chaudhry Electric & Solar Systems Store | Burewala', 'Learn about Chaudhry Electric & Solar Systems Store, its product categories and direct enquiry options in Burewala.'],
    products: ['Electrical & Solar Products | Chaudhry Electric Store', 'Browse solar, inverters, fans, lighting, electrical fittings, PVC, CCTV and home-appliance categories.'],
    services: ['Electrical & Solar Services | Chaudhry Electric Store', 'Explore solar, electrical, appliance, repair, CCTV and gas-welding service categories.'],
    contact: ['Contact Chaudhry Electric & Solar Systems Store | Burewala', 'Call or WhatsApp Chaudhry Electric & Solar Systems Store on 0300-2269170 for products, quotations and service enquiries.'],
    notfound: ['Page Not Found | Chaudhry Electric & Solar Systems Store', 'The requested page could not be found.'],
  }[page] || [];
  document.title = meta[0];
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', meta[1]);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `${location.origin}${location.pathname}`);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogTitle) ogTitle.setAttribute('content', meta[0]);
  if (ogDesc) ogDesc.setAttribute('content', meta[1]);
}

export function ProductCard({ p }) {
  const small = p.image.replace('.webp', '-400.webp');
  const srcSet = `${small} 400w, ${p.image} 800w`;
  return <article className="product-card neon-card"><div className="product-image"><img src={p.image} srcSet={srcSet} sizes="(min-width: 980px) 33vw, (min-width: 640px) 50vw, 92vw" alt={p.name} width="520" height="360" loading="lazy" decoding="async" /><span>{p.tag}</span></div><div className="product-info"><div><h3>{p.name}</h3><small>{p.text}</small></div><button className="link-btn" onClick={() => wa(`Hello Chaudhry Electric, I want to enquire about: ${p.name}.`)}>Enquire</button></div></article>;
}

export function PageHero({ kicker, title, text }) { return <div className="page-head"><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></div>; }

export function SectionTitle({ kicker, title, text }) { return <div className="section-title"><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{text}</p></div>; }