import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const quickCards = [
  ['Knowledge Library', 'Browse structured field techniques', '/library'],
  ['AI Assistant', 'Ask for cautious step-by-step guidance', '/ai'],
  ['Offline Builder', 'Export flash-drive-ready packs', '/offline'],
  ['Map Reports', 'Track resources, hazards, and meetups', '/map']
];

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard" subtitle="Preparedness knowledge, coordination, and offline resilience.">
      <div className="grid gap-4 md:grid-cols-2">
        {quickCards.map(([title, desc, link]) => (
          <Link key={title} to={link} className="card transition hover:border-ember/40">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{desc}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
