import { useState } from 'react';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function AiAssistantPage() {
  const [question, setQuestion] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);

  const ask = async () => {
    try {
      const data = await request('/api/ai/advice', {
        method: 'POST',
        body: JSON.stringify({ question, location })
      });
      setResult(data.response);
    } catch (error) {
      alert('Login required for AI advice route.');
    }
  };

  return (
    <PageShell title="AI Assistant" subtitle="Cautious guidance with internal entry references and explicit uncertainty.">
      <div className="card space-y-3">
        <textarea
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What should I prioritize if I lost trail at dusk and temperatures are dropping?"
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Optional location context"
        />
        <button onClick={ask} className="rounded-lg bg-ember px-4 py-2 font-medium text-slate-900">
          Ask for Advice
        </button>
      </div>
      {result && (
        <div className="card space-y-3">
          <p className="text-sm text-slate-400">Certainty: {result.certainty}</p>
          <h3 className="font-semibold">Safety First</h3>
          <ul className="list-disc pl-6 text-sm">{result.safetyFirst.map((s) => <li key={s}>{s}</li>)}</ul>
          <h3 className="font-semibold">Suggested Steps</h3>
          <ol className="list-decimal pl-6 text-sm">{result.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
      )}
    </PageShell>
  );
}
