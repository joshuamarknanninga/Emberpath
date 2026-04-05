import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';
import { downloadHtmlBundle, downloadJson } from '../utils/offlineExport';

export default function OfflinePackPage() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    request('/api/knowledge').then(setEntries);
  }, []);

  const toggle = (id) => {
    setSelected((curr) => (curr.includes(id) ? curr.filter((i) => i !== id) : [...curr, id]));
  };

  const selectedEntries = entries.filter((entry) => selected.includes(entry._id));

  return (
    <PageShell title="Offline Pack Builder" subtitle="Create flash-drive-ready exports (JSON or static HTML).">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2 space-y-2">
          {entries.map((entry) => (
            <label key={entry._id} className="flex items-center gap-3 rounded-lg border border-slate-800 p-2">
              <input type="checkbox" checked={selected.includes(entry._id)} onChange={() => toggle(entry._id)} />
              <span>{entry.title}</span>
            </label>
          ))}
        </div>
        <div className="card space-y-3">
          <h3 className="font-semibold">Export</h3>
          <p className="text-sm text-slate-400">Selected: {selected.length}</p>
          <button
            onClick={() => downloadJson({ exportedAt: new Date().toISOString(), entries: selectedEntries }, 'emberpath-pack.json')}
            className="w-full rounded-lg border border-slate-700 px-3 py-2"
          >
            Download JSON
          </button>
          <button
            onClick={() => downloadHtmlBundle('EMBERPATH Offline Pack', selectedEntries)}
            className="w-full rounded-lg bg-ember px-3 py-2 font-medium text-slate-900"
          >
            Download HTML Bundle
          </button>
        </div>
      </div>
    </PageShell>
  );
}
