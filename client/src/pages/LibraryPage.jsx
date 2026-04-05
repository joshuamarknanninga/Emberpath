import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import EntryCard from '../components/EntryCard';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function LibraryPage({ pushToast }) {
  const [entries, setEntries] = useState([]);
  const [q, setQ] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const load = async ({ query = q, diff = difficulty } = {}) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (diff) params.set('difficulty', diff);
    const data = await request(`/api/knowledge${params.toString() ? `?${params}` : ''}`);
    setEntries(data);
  };

  useEffect(() => {
    load({ query: '', diff: '' });
  }, []);

  const saveEntry = async (id) => {
    try {
      await request(`/api/knowledge/${id}/save`, { method: 'POST' });
      pushToast('Entry saved to your profile.', 'success');
    } catch (error) {
      pushToast('Login required to save entries.', 'error');
    }
  };

  return (
    <PageShell title="Knowledge Library" subtitle="Editorially organized, safety-tagged survival methods." meta="Knowledge System">
      <div className="card">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-2 rounded-xl border border-slate-700/55 bg-slate-900/70 px-3 py-2">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              placeholder="Search techniques, regions, tools, tags..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-slate-700/55 bg-slate-900/70 px-3 py-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-transparent text-sm outline-none">
              <option value="">All difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <button onClick={() => load()} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">Apply</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <EntryCard key={entry._id} entry={entry} onSave={saveEntry} />
        ))}
      </div>
    </PageShell>
  );
}
