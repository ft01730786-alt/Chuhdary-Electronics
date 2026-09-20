import { products, services, owner } from '../data';
import { go, wa, ProductCard, SectionTitle } from '../ui';

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-energy" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
      <div className="hero-copy reveal">
        <span className="eyebrow"><span className="live-dot"/> BUREWALA • ELECTRICAL • SOLAR</span>
        <h1>Powering <em>Better</em><br />Living.</h1>
        <p>Electrical goods, solar systems, lighting, appliances, wiring and security solutions — presented with a fast, modern shopping experience.</p>
        <div className="actions"><button className="btn primary" onClick={() => go('/products')}>Explore Products <span>↗</span></button><button className="btn ghost" onClick={() => wa('Hello Chaudhry Electric Store, I need a quotation.')}>Get a Quote</button></div>
        <div className="trust-row"><span>⚡ Direct WhatsApp</span><span>☀️ Solar categories</span><span>◈ Local service</span></div>
      </div>
      <div className="hero-visual" aria-label="Store owner portrait and product categories">
        <div className="energy-ring ring-a"/><div className="energy-ring ring-b"/><div className="energy-ring ring-c"/>
        <div className="portrait-glow"><img src={owner} alt="Chaudhry Electric store owner" width="520" height="520" fetchPriority="high" decoding="async" /></div>
        <div className="float-card fc1"><span>☀</span><b>Solar</b><small>Power</small></div>
        <div className="float-card fc2"><span>⚡</span><b>Electrical</b><small>Goods</small></div>
        <div className="float-card fc3"><span>💡</span><b>Lighting</b><small>Solutions</small></div>
        <div className="hero-chip"><span className="chip-dot"/> 0300-2269170</div>
      </div>
    </section>

    <section className="stats" aria-label="Store highlights"><div><b>01</b><span>Local Store</span></div><div><b>WA</b><span>Direct Enquiries</span></div><div><b>360°</b><span>Electrical Range</span></div><div><b>⚡</b><span>Power Focused</span></div></section>

    <section className="section dark">
      <SectionTitle kicker="PRODUCT SHOWROOM" title="Products with an electric edge." text="Explore the core categories represented in the store material. Ask the store for current model, stock and price." />
      <div className="product-grid">{products.slice(0, 6).map(p => <ProductCard key={p.name} p={p} />)}</div>
      <button className="btn outline center-btn" onClick={() => go('/products')}>Open Full Catalogue →</button>
    </section>

    <section className="section split">
      <div><SectionTitle kicker="WHY THIS EXPERIENCE" title="Fast, focused and built for mobile." text="The interface keeps product discovery, contact actions and store information close to the thumb without sacrificing the premium visual identity." /><div className="feature-list">{['One-tap call and WhatsApp','Responsive product catalogue','Accessible focus and keyboard states','Optimized local WebP imagery'].map(x => <div key={x}><strong>✓</strong><span>{x}</span></div>)}</div></div>
      <div className="service-mini">{services.slice(0, 4).map(s => <article className="neon-card" key={s[0]}><span className="service-symbol">{s[2]}</span><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div>
    </section>

    <section className="cta"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Need a product or power solution?</h2><p>Call or message the store directly for availability and a quotation.</p></div><button className="btn primary" onClick={() => wa('Assalam-o-Alaikum, I would like to ask about products and availability.')}>WhatsApp the Store</button></section>
  </>;
}