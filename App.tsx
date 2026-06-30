import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import MLModels from './pages/MLModels';
import NLPAnalysis from './pages/NLPAnalysis';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/ml-models" element={<MLModels />} />
          <Route path="/nlp" element={<NLPAnalysis />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
