import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EntryCard({ entry, onSave }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{entry.title}</h3>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs uppercase">{entry.difficulty}</span>
      </div>
      <p className="text-sm text-slate-300">{entry.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {entry.tags?.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-300">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Link className="rounded-lg bg-ember px-3 py-1 text-sm font-medium text-slate-900" to={`/library/${entry._id}`}>
          View
        </Link>
        <button onClick={() => onSave?.(entry._id)} className="rounded-lg border border-slate-700 px-3 py-1 text-sm">
          Save
        </button>
      </div>
    </motion.article>
  );
}
