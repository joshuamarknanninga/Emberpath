import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';
import EntryDetailPage from './pages/EntryDetailPage';
import AiAssistantPage from './pages/AiAssistantPage';
import OfflinePackPage from './pages/OfflinePackPage';
import MapPage from './pages/MapPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:id" element={<EntryDetailPage />} />
          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/offline" element={<OfflinePackPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage auth={auth} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
