import { Download, FileArchive, FileJson2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';
import { downloadHtmlBundle, downloadJson } from '../utils/offlineExport';

export default function OfflinePackPage({ pushToast }) {
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
    <PageShell title="Offline Pack Builder" subtitle="Assemble export bundles for disconnected field devices and flash drives." meta="Offline Resilience">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="card space-y-2 p-5">
          {entries.map((entry) => (
            <label key={entry._id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-700/50 bg-slate-900/45 p-3">
              <div>
                <p className="text-sm text-slate-100">{entry.title}</p>
                <p className="text-xs text-slate-400">{entry.region} • {entry.difficulty}</p>
              </div>
              <input type="checkbox" checked={selected.includes(entry._id)} onChange={() => toggle(entry._id)} className="h-4 w-4 rounded border-slate-600 bg-slate-800" />
            </label>
          ))}
        </div>

        <div className="card space-y-4 p-5">
          <h3 className="text-lg">Export Package</h3>
          <p className="text-sm text-slate-400">Selected entries: {selected.length}</p>
          <button
            onClick={() => {
              downloadJson({ exportedAt: new Date().toISOString(), entries: selectedEntries }, 'emberpath-pack.json');
              pushToast('JSON pack exported.', 'success');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600/70 px-3 py-2 text-sm"
          >
            <FileJson2 className="h-4 w-4 text-blueMuted" /> Download JSON
          </button>
          <button
            onClick={() => {
              downloadHtmlBundle('EMBERPATH Offline Pack', selectedEntries);
              pushToast('HTML bundle exported.', 'success');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900"
          >
            <FileArchive className="h-4 w-4" /> Download HTML Bundle
          </button>
          <p className="rounded-xl border border-slate-700/45 bg-slate-900/55 p-3 text-xs text-slate-400"><Download className="mr-1 inline h-3.5 w-3.5" /> Files are generated locally and can be copied to offline systems.</p>
        </div>
      </div>
    </PageShell>
  );
}
