import { AlertTriangle, Link2, MapPinned, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function EntryDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    request(`/api/knowledge/${id}`).then(setEntry);
  }, [id]);

  if (!entry) return <p className="text-slate-400">Loading field entry…</p>;

  return (
    <PageShell title={entry.title} subtitle={entry.summary} meta="Knowledge Entry">
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <article className="card space-y-6 p-6 md:p-8">
          <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-3">
            <p><span className="muted-label block">Difficulty</span>{entry.difficulty}</p>
            <p><span className="muted-label block">Time Required</span>{entry.timeRequired}</p>
            <p className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-blueMuted" />{entry.region}</p>
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-slate-200 prose-p:leading-8">
            <p>{entry.content}</p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-amberMuted"><Wrench className="h-4 w-4" />Tools</h3>
            <div className="flex flex-wrap gap-2">{entry.tools?.map((tool) => <span key={tool} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{tool}</span>)}</div>
          </div>

          <div className="rounded-2xl border border-amberMuted/30 bg-amberMuted/10 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-amberMuted"><AlertTriangle className="h-4 w-4" />Safety Notes</h3>
            <ul className="list-disc space-y-1 pl-6 text-sm text-slate-200">
              {entry.safetyNotes?.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="card">
            <h3 className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-tealMuted"><Link2 className="h-4 w-4" />Related by Tags</h3>
            <div className="space-y-2">
              {entry.crossReferences.relatedByTag.map((rel) => (
                <p key={rel._id} className="rounded-xl border border-slate-700/40 bg-slate-900/45 p-2 text-sm text-slate-300">{rel.title}</p>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="mb-3 text-sm uppercase tracking-[0.14em] text-blueMuted">Stored Relationships</h3>
            <div className="space-y-2">
              {entry.crossReferences.explicit.map((rel) => (
                <p key={rel._id} className="rounded-xl border border-slate-700/40 bg-slate-900/45 p-2 text-sm text-slate-300">{rel.toEntry?.title}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
