import { motion } from 'framer-motion';
import { Clock3, Hammer, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EntryCard({ entry, onSave }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, borderColor: 'rgba(111,141,181,0.35)' }}
      className="card transition-colors"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg leading-tight text-slate-100">{entry.title}</h3>
        <span className="rounded-full border border-slate-600/60 bg-slate-800/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-amberMuted">{entry.difficulty}</span>
      </div>

      <p className="mb-4 text-sm text-slate-300">{entry.summary}</p>

      <div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
        <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-blueMuted" /> {entry.timeRequired}</p>
        <p className="flex items-center gap-2"><Hammer className="h-3.5 w-3.5 text-tealMuted" /> {entry.tools?.slice(0, 2).join(', ') || 'No special tools'}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {entry.tags?.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-700/70 px-2 py-0.5 text-[11px] text-slate-300">#{tag}</span>
        ))}
      </div>

      {entry.safetyNotes?.[0] && (
        <p className="mt-3 flex items-start gap-2 text-xs text-slate-400">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 text-amberMuted" />
          {entry.safetyNotes[0]}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <Link className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900 transition hover:bg-white" to={`/library/${entry._id}`}>
          Open
        </Link>
        <button onClick={() => onSave?.(entry._id)} className="rounded-xl border border-slate-600/60 px-3 py-1.5 text-sm text-slate-200 transition hover:border-tealMuted/80">
          Save
        </button>
      </div>
    </motion.article>
  );
}
