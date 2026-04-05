import { useState } from 'react';
import PageShell from '../components/PageShell';

export default function ProfilePage({ auth }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (!auth.user) {
    return (
      <PageShell title="Profile" subtitle="Register or login to save entries and track progress.">
        <div className="grid gap-4 md:grid-cols-2">
          <form
            className="card space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              auth.login(form.email, form.password);
            }}
          >
            <h3 className="font-semibold">Login</h3>
            <input className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="rounded-lg bg-ember px-3 py-2 font-medium text-slate-900">Login</button>
          </form>
          <form
            className="card space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              auth.register(form.name, form.email, form.password);
            }}
          >
            <h3 className="font-semibold">Register</h3>
            <input className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="rounded-lg border border-slate-700 px-3 py-2">Create Account</button>
          </form>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Profile" subtitle="Your saved entries, points, and resilience progress.">
      <div className="card space-y-2">
        <p className="text-lg font-semibold">{auth.user.name}</p>
        <p className="text-sm text-slate-400">{auth.user.email}</p>
        <p className="text-sm text-amber-300">Points: {auth.user.points || 0}</p>
        <button onClick={auth.logout} className="rounded-lg border border-slate-700 px-3 py-2">
          Logout
        </button>
      </div>
    </PageShell>
  );
}
