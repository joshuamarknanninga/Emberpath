import { Award, UserCheck } from 'lucide-react';
import { useState } from 'react';
import PageShell from '../components/PageShell';

export default function ProfilePage({ auth, pushToast }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (!auth.user) {
    return (
      <PageShell title="Profile" subtitle="Authenticate to save entries, track points, and export packs." meta="Identity">
        <div className="grid gap-4 md:grid-cols-2">
          <form
            className="card space-y-3 p-5"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await auth.login(form.email, form.password);
                pushToast('Welcome back.', 'success');
              } catch (error) {
                pushToast('Unable to login with provided credentials.', 'error');
              }
            }}
          >
            <h3 className="text-lg">Login</h3>
            <input className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 p-2.5 text-sm" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 p-2.5 text-sm" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">Login</button>
          </form>

          <form
            className="card space-y-3 p-5"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await auth.register(form.name, form.email, form.password);
                pushToast('Account created successfully.', 'success');
              } catch (error) {
                pushToast('Registration failed. Try another email.', 'error');
              }
            }}
          >
            <h3 className="text-lg">Register</h3>
            <input className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 p-2.5 text-sm" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 p-2.5 text-sm" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 p-2.5 text-sm" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="rounded-xl border border-slate-600/70 px-4 py-2 text-sm">Create account</button>
          </form>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Profile" subtitle="Your readiness profile and contribution metrics." meta="Identity">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card md:col-span-2 space-y-3 p-5">
          <p className="flex items-center gap-2 text-lg"><UserCheck className="h-5 w-5 text-tealMuted" /> {auth.user.name}</p>
          <p className="text-sm text-slate-400">{auth.user.email}</p>
          <p className="text-sm text-slate-300">Track saved entries, community reports, and pack export history.</p>
          <button onClick={auth.logout} className="rounded-xl border border-slate-600/60 px-4 py-2 text-sm">Logout</button>
        </div>
        <div className="card p-5">
          <p className="muted-label">Points</p>
          <p className="mt-2 flex items-center gap-2 text-3xl font-heading"><Award className="h-6 w-6 text-amberMuted" /> {auth.user.points || 0}</p>
        </div>
      </div>
    </PageShell>
  );
}
