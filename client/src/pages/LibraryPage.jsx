import { useEffect, useState } from 'react';
import EntryCard from '../components/EntryCard';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function LibraryPage() {
  const [entries, setEntries] = useState([]);
  const [q, setQ] = useState('');

  const load = async (query = '') => {
    const data = await request(`/api/knowledge${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    setEntries(data);
  };

  useEffect(() => {
    load();
  }, []);

  const saveEntry = async (id) => {
    try {
      await request(`/api/knowledge/${id}/save`, { method: 'POST' });
      alert('Saved');
    } catch (error) {
      alert('Login required to save entries');
    }
  };

  return (
    <PageShell title="Knowledge Library" subtitle="Original structured field entries with safety metadata.">
      <div className="card flex flex-col gap-3 md:flex-row">
        <input
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          placeholder="Search by term, tag, or topic..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => load(q)} className="rounded-lg bg-ember px-4 py-2 font-medium text-slate-900">
          Search
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <EntryCard key={entry._id} entry={entry} onSave={saveEntry} />
        ))}
      </div>
    </PageShell>
  );
}
