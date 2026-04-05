import { Link, NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Dashboard'],
  ['/library', 'Library'],
  ['/ai', 'AI Assistant'],
  ['/offline', 'Offline Packs'],
  ['/map', 'Map'],
  ['/community', 'Community'],
  ['/profile', 'Profile']
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold tracking-wide text-ember">
            EMBERPATH
          </Link>
          <nav className="hidden gap-3 md:flex">
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1 text-sm ${isActive ? 'bg-slate-800 text-ember' : 'text-slate-300'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
