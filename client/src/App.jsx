import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';
import EntryDetailPage from './pages/EntryDetailPage';
import AiAssistantPage from './pages/AiAssistantPage';
import OfflinePackPage from './pages/OfflinePackPage';
import MapPage from './pages/MapPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './hooks/useAuth';

function AppRoutes({ auth, pushToast }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/library" element={<LibraryPage pushToast={pushToast} />} />
        <Route path="/library/:id" element={<EntryDetailPage />} />
        <Route path="/ai" element={<AiAssistantPage pushToast={pushToast} />} />
        <Route path="/offline" element={<OfflinePackPage pushToast={pushToast} />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage auth={auth} pushToast={pushToast} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const auth = useAuth();
  const [toast, setToast] = useState(null);

  const pushToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <AppRoutes auth={auth} pushToast={pushToast} />
      </Layout>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </BrowserRouter>
  );
}
