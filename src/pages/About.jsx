import { services, owner } from '../data';
import { wa, PageHero } from '../ui';

export default function About() {
  return <section className="page">
    <PageHero kicker="ABOUT THE STORE" title={<>Built around <em>power</em>, trust &amp; service.</>} text="Chaudhry Electric & Solar Systems Store brings electrical essentials, solar solutions, appliances and related service categories into one straightforward local destination." />
    <div className="about-grid"><div className="owner-panel neon-card"><div className="portrait-frame"><img src={owner} alt="Chaudhry Electric store owner" width="520" height="520" loading="lazy" decoding="async" /></div><div><span className="eyebrow">STORE OWNER</span><h2>Chaudhry Electric</h2><p>For enquiries, product availability and service requests, connect directly through phone or WhatsApp.</p><div className="actions"><a className="btn primary" href="tel:+923002269170">Call</a><button className="btn ghost" onClick={() => wa('Hello, I want to enquire about your store.')}>WhatsApp</button></div></div></div><div className="about-copy"><h2>What we cover</h2><div className="about-pills">{services.map(s => <span key={s[0]}>{s[2]} {s[0]}</span>)}</div><p>From everyday electrical fittings and lighting to solar systems, inverters, fans, appliances, wiring and CCTV, the catalogue is organized around the categories visible in the supplied store material.</p><p className="note">Product models, stock and prices can change. Contact the store for current availability before visiting.</p></div></div>
  </section>;
}