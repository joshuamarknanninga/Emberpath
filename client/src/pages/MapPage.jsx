import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

const defaultCenter = [47.61, -122.31];

export default function MapPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    request('/api/map/reports').then(setReports);
  }, []);

  return (
    <PageShell title="Map" subtitle="Resource, hazard, and meetup reporting with lightweight points system.">
      <div className="card h-[420px] overflow-hidden">
        <MapContainer center={defaultCenter} zoom={12} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
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
