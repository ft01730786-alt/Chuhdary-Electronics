import { go, PageHero } from '../ui';

export default function NotFound() { return <section className="page"><PageHero kicker="404" title={<>Page <em>not found.</em></>} text="The page you requested does not exist." /><button className="btn primary" onClick={() => go('/')}>Back Home</button></section>; }