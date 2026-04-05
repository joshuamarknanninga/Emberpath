import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, Flag, Sprout } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const defaultCenter = [47.61, -122.31];

export default function MapPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    request('/api/map/reports').then(setReports);
  }, []);

  const summary = useMemo(
    () => ({
      resource: reports.filter((r) => r.type === 'resource').length,
      hazard: reports.filter((r) => r.type === 'hazard').length,
      meetup: reports.filter((r) => r.type === 'meetup').length
    }),
    [reports]
  );

  return (
    <PageShell title="Map Intelligence" subtitle="Dark tactical map for field resources, hazards, and meetup continuity." meta="Geo Layer">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="flex items-center gap-2 text-sm text-slate-300"><Sprout className="h-4 w-4 text-greenMuted" />Resources</p><p className="mt-2 text-2xl font-heading">{summary.resource}</p></div>
        <div className="card"><p className="flex items-center gap-2 text-sm text-slate-300"><AlertTriangle className="h-4 w-4 text-amberMuted" />Hazards</p><p className="mt-2 text-2xl font-heading">{summary.hazard}</p></div>
        <div className="card"><p className="flex items-center gap-2 text-sm text-slate-300"><Flag className="h-4 w-4 text-blueMuted" />Meetups</p><p className="mt-2 text-2xl font-heading">{summary.meetup}</p></div>
      </div>

      <div className="card h-[480px] overflow-hidden p-0">
        <MapContainer center={defaultCenter} zoom={12} className="h-full w-full">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />
          {reports.map((report) => (
            <Marker key={report._id} position={[report.lat, report.lng]}>
              <Popup>
                <p className="font-semibold">{report.title}</p>
                <p>{report.description}</p>
                <p className="text-xs uppercase">{report.type}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </PageShell>
  );
}
