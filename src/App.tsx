import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Integrations from './pages/Integrations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="settings">
            <Route path="integrations" element={<Integrations />} />
          </Route>
          <Route index element={<Navigate to="/settings/integrations" replace />} />
          <Route path="*" element={<Navigate to="/settings/integrations" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
