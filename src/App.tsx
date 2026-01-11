import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Integrations from './pages/Integrations';
import Maintenance from './pages/Maintenance';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="settings">
            <Route path="integrations" element={<Integrations />} />

            {/* Organisation Routes */}
            <Route path="organisation" element={<Maintenance />} />
            <Route path="manage" element={<Maintenance />} />
            <Route path="users" element={<Maintenance />} />
            <Route path="tags" element={<Maintenance />} />

            {/* Other Catch-all Routes */}
            <Route path="utilities/*" element={<Maintenance />} />
            <Route path="carbon/*" element={<Maintenance />} />
            <Route path="displays/*" element={<Maintenance />} />

            <Route path="*" element={<Maintenance />} />
          </Route>

          <Route index element={<Navigate to="/settings/integrations" replace />} />
          <Route path="*" element={<Navigate to="/settings/integrations" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
