import React, { lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { injectSpeedInsights } from '@vercel/speed-insights';
import './styles.css';
import { SITE_NAME, PHONE, routes } from './data';
import { go, usePath, wa, setMeta } from './ui';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const path = usePath();
  const page = path === '/' ? 'home' : path.slice(1) || 'home';
  useEffect(() => { setMeta(['home','about','products','services','contact'].includes(page) ? page : 'notfound'); }, [page]);
  useEffect(() => {
    if (page !== 'home') document.getElementById('preload-hero')?.remove();
  }, [page]);
  let view;
  if (page === 'home') view = <Home />;
  else if (page === 'about') view = <About />;
  else if (page === 'products') view = <Products />;
  else if (page === 'services') view = <Services />;
  else if (page === 'contact') view = <Contact />;
  else view = <NotFound />;
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header page={page} />
    <main id="main-content"><Suspense fallback={<div className="page-loading" role="status">Loading…</div>}>{view}</Suspense></main>
    <Footer />
    <button className="float-wa" onClick={() => wa('Assalam-o-Alaikum, I want to enquire about your electrical and solar products.')} aria-label="Open WhatsApp enquiry">WA</button>
  </>;
}

function Header({ page }) {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return <header className="nav">
    <a className="brand" href="/" onClick={e => { e.preventDefault(); close(); go('/'); }} aria-label="Chaudhry Electric home">
      <img src="/logo.svg" alt="" width="44" height="44" fetchPriority="high" />
      <span><b>CHAUDHRY</b><small>ELECTRIC &amp; SOLAR</small></span>
    </a>
    <button className="menu-btn" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(v => !v)}><span/><span/><span/><b>{open ? 'Close' : 'Menu'}</b></button>
    <nav id="site-nav" className={open ? 'open' : ''} aria-label="Primary navigation">
      {routes.map(([url, label]) => <a key={url} href={url} aria-current={(url === '/' ? page === 'home' : page === url.slice(1)) ? 'page' : undefined} className={(url === '/' ? page === 'home' : page === url.slice(1)) ? 'active' : ''} onClick={e => { e.preventDefault(); close(); go(url); }}>{label}</a>)}
      <a className="mobile-call" href="tel:+923002269170">Call {PHONE}</a>
    </nav>
    <a className="nav-call" href="tel:+923002269170" aria-label={`Call ${PHONE}`}>Call <span>{PHONE}</span></a>
  </header>;
}

function Footer() { return <footer><div className="footer-main"><div className="brand foot"><img src="/logo.svg" alt="" width="50" height="50"/><span><b>CHAUDHRY</b><small>ELECTRIC &amp; SOLAR SYSTEMS STORE</small></span></div><div><b>Explore</b><a href="/products" onClick={e => { e.preventDefault(); go('/products'); }}>Products</a><a href="/services" onClick={e => { e.preventDefault(); go('/services'); }}>Services</a><a href="/about" onClick={e => { e.preventDefault(); go('/about'); }}>About</a></div><div><b>Contact</b><a href="tel:+923002269170">{PHONE}</a><span>Burewala Road, 68 Mod</span><span>Punjab, Pakistan</span></div></div><div className="footer-bottom">© {new Date().getFullYear()} {SITE_NAME} · Quality • Trust • Better Life</div></footer>; }

injectSpeedInsights();
createRoot(document.getElementById('root')).render(<App />);