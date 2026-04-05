import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Database, MapPinned, PackageCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const quickCards = [
  { title: 'Knowledge Library', desc: 'Structured techniques with provenance and caution metadata.', link: '/library', icon: Database, accent: 'text-blueMuted' },
  { title: 'AI Guide', desc: 'Safety-first, uncertainty-aware tactical guidance.', link: '/ai', icon: BrainCircuit, accent: 'text-tealMuted' },
  { title: 'Offline Packs', desc: 'Build export bundles for disconnected environments.', link: '/offline', icon: PackageCheck, accent: 'text-greenMuted' },
  { title: 'Map Intel', desc: 'Track resources, hazards, and meetup signals.', link: '/map', icon: MapPinned, accent: 'text-amberMuted' }
];

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard" subtitle="Calm command surface for preparedness planning and field-ready execution." meta="Overview">
      <div className="card bg-radial p-6">
        <p className="muted-label">Status</p>
        <h2 className="mt-2 text-xl">Operational Readiness: Stable</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Maintain your saved protocols, build offline kits, and monitor community signals from one resilient workflow.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quickCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link to={card.link} className="card group block transition hover:border-slate-500/55">
                <div className="flex items-start justify-between">
                  <Icon className={`h-5 w-5 ${card.accent}`} />
                  <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
                </div>
                <h3 className="mt-4 text-lg">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{card.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="muted-label">Saved Entries</p><p className="mt-2 text-2xl font-heading">12</p></div>
        <div className="card"><p className="muted-label">Map Reports</p><p className="mt-2 text-2xl font-heading">6</p></div>
        <div className="card"><p className="muted-label">Community Activity</p><p className="mt-2 flex items-center gap-2 text-2xl font-heading"><Users className="h-5 w-5 text-tealMuted" /> Active</p></div>
      </div>
    </PageShell>
  );
}
