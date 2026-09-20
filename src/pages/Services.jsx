import { services } from '../data';
import { wa, PageHero } from '../ui';

export default function Services() {
  return <section className="page"><PageHero kicker="SERVICES" title={<>From <em>power</em> hardware to practical support.</>} text="Explore the store's main service categories. Enquire directly for exact scope and current availability." /><div className="service-grid">{services.map(s => <article className="service-card neon-card" key={s[0]}><div className="service-icon">{s[2]}</div><h2>{s[0]}</h2><p>{s[1]}</p><button className="link-btn" onClick={() => wa(`Hello, I want to enquire about ${s[0]}.`)}>Ask about this service →</button></article>)}</div></section>;
}