import { Compass, House, Library, Map, MessageSquare, Package, Sparkles, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: House },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/ai', label: 'AI Guide', icon: Sparkles },
  { to: '/offline', label: 'Offline', icon: Package },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/community', label: 'Community', icon: MessageSquare },
  { to: '/profile', label: 'Profile', icon: UserCircle2 }
];

function NavItem({ item, mobile = false }) {
  const Icon = item.icon;
  return (
    <NavLink to={item.to} className="relative">
      {({ isActive }) => (
        <div className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${isActive ? 'text-mist' : 'text-slate-400 hover:text-slate-200'}`}>
          {isActive && (
            <motion.span
              layoutId={mobile ? 'mobile-active-pill' : 'active-pill'}
              className="absolute inset-0 -z-10 rounded-xl bg-slate-700/45"
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            />
          )}
          <Icon className="h-4 w-4" />
          {!mobile && <span>{item.label}</span>}
        </div>
      )}
    </NavLink>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pb-24 text-mist md:pb-8">
      <div className="mx-auto flex w-full max-w-7xl gap-4 px-3 pt-3 md:px-5 md:pt-5">
        <aside className="sticky top-5 hidden h-[calc(100vh-2.5rem)] w-64 flex-col rounded-2xl border border-slate-700/35 bg-panel/70 p-4 shadow-glow backdrop-blur-xl md:flex">
          <Link to="/" className="mb-6 flex items-center gap-3 rounded-xl bg-panelSoft/70 px-3 py-3">
            <Compass className="h-5 w-5 text-tealMuted" />
            <div>
              <p className="font-heading text-sm text-slate-200">EMBERPATH</p>
              <p className="text-xs text-slate-400">Field Knowledge System</p>
            </div>
          </Link>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="mb-4 rounded-2xl border border-slate-700/35 bg-panel/55 px-4 py-4 shadow-soft backdrop-blur md:px-6">
            <p className="muted-label">Survival Knowledge OS</p>
            <p className="mt-1 max-w-3xl text-sm text-slate-300">Organized fieldcraft, cautious guidance, and offline-first resilience workflows.</p>
          </header>
          <main className="rounded-2xl border border-slate-700/30 bg-slate-900/25 p-3 md:p-5">{children}</main>
        </div>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-2xl border border-slate-700/40 bg-panel/85 px-2 py-2 shadow-glow backdrop-blur md:hidden">
        {navItems.slice(0, 5).map((item) => (
          <NavItem key={item.to} item={item} mobile />
        ))}
      </nav>
    </div>
  );
}
