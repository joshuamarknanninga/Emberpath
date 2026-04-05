import { Bot, MapPin, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function AiAssistantPage({ pushToast }) {
  const [question, setQuestion] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);

  const ask = async () => {
    if (!question.trim()) return pushToast('Enter a question first.', 'error');

    try {
      const data = await request('/api/ai/advice', {
        method: 'POST',
        body: JSON.stringify({ question, location })
      });
      setResult(data.response);
      pushToast('Guidance generated with internal references.', 'success');
    } catch (error) {
      pushToast('Unable to generate advice right now.', 'error');
    }
  };

  return (
    <PageShell title="AI Guide" subtitle="Stable, cautious advisory assistant that prioritizes safety and uncertainty." meta="Guidance Engine">
      <div className="grid gap-4 xl:grid-cols-[1fr_350px]">
        <div className="card space-y-3 p-5 md:p-6">
          <label className="text-sm text-slate-300">Question</label>
          <textarea
            className="min-h-36 w-full rounded-xl border border-slate-700/60 bg-slate-900/75 p-3 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-blueMuted/60"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What should I prioritize if wind chill increases and daylight is low?"
          />
          <label className="text-sm text-slate-300">Location Context (optional)</label>
          <input
            className="w-full rounded-xl border border-slate-700/60 bg-slate-900/75 p-3 text-sm outline-none placeholder:text-slate-500 focus:border-blueMuted/60"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., foothills near stream, 6°C"
          />
          <button onClick={ask} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
            <Bot className="h-4 w-4" /> Ask AI Guide
          </button>
        </div>

        <div className="card space-y-3">
          <h3 className="muted-label">Model posture</h3>
          <p className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck className="h-4 w-4 text-greenMuted" /> Safety-first recommendations</p>
          <p className="flex items-center gap-2 text-sm text-slate-300"><MapPin className="h-4 w-4 text-blueMuted" /> Uses location context when provided</p>
          <p className="text-sm text-slate-400">If no strong internal match exists, the response explicitly falls back to conservative library references.</p>
        </div>
      </div>

      {result && (
        <div className="card space-y-4 p-5 md:p-6">
          <p className="muted-label">Certainty: {result.certainty}</p>
          <div>
            <h3 className="mb-2 text-sm uppercase tracking-[0.14em] text-amberMuted">Safety First</h3>
            <ul className="list-disc space-y-1 pl-6 text-sm text-slate-200">{result.safetyFirst.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm uppercase tracking-[0.14em] text-tealMuted">Suggested Steps</h3>
            <ol className="list-decimal space-y-1 pl-6 text-sm text-slate-200">{result.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </div>
      )}
    </PageShell>
  );
}
