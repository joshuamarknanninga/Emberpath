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

  if (!entry) return <p>Loading entry...</p>;

  return (
    <PageShell title={entry.title} subtitle={entry.summary}>
      <article className="card space-y-3">
        <p className="text-slate-200">{entry.content}</p>
        <p className="text-sm text-slate-400">Time: {entry.timeRequired}</p>
        <p className="text-sm text-slate-400">Tools: {entry.tools?.join(', ')}</p>
        <div>
          <h3 className="font-semibold text-amber-300">Safety Notes</h3>
          <ul className="list-disc pl-5 text-sm text-slate-300">
            {entry.safetyNotes?.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </article>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-2 font-semibold">Related by Tags</h3>
          {entry.crossReferences.relatedByTag.map((rel) => (
            <p key={rel._id} className="text-sm text-slate-300">
              {rel.title}
            </p>
          ))}
        </div>
        <div className="card">
          <h3 className="mb-2 font-semibold">Stored Relationships</h3>
          {entry.crossReferences.explicit.map((rel) => (
            <p key={rel._id} className="text-sm text-slate-300">
              {rel.toEntry?.title}
            </p>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
