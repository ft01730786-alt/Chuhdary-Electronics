import { useMemo, useState } from 'react';
import { products } from '../data';
import { ProductCard, PageHero } from '../ui';

export default function Products() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(products.map(p => p.cat))];
  const list = useMemo(() => filter === 'All' ? products : products.filter(p => p.cat === filter), [filter]);
  return <section className="page"><PageHero kicker="PRODUCT SHOWROOM" title={<>Real products. <em>Electric</em> energy.</>} text="A lightweight local catalogue using the supplied product imagery. Confirm exact model, stock and price with the store before purchase." /><div className="filters" role="group" aria-label="Product categories">{cats.map(c => <button key={c} className={filter === c ? 'selected' : ''} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>)}</div><div className="product-grid large">{list.map(p => <ProductCard key={p.name} p={p} />)}</div></section>;
}