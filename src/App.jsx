import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar los componentes y secciones
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Storyboard from './sections/Storyboard';
import ProfessionalStory from './sections/ProfessionalStory';
import Projects from './sections/Projects';
import CoverLetter from './sections/CoverLetter';
import Certifications from './sections/Certifications';

// Importar componentes admin
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminProfile from './pages/admin/AdminProfile';
import AdminProjects from './pages/admin/AdminProjects';
import AdminCoverLetter from './pages/admin/AdminCoverLetter';
import AdminSettings from './pages/admin/AdminSettings';
import AdminStoryboard from './pages/admin/AdminStoryboard';
import AdminWhiteboard from './pages/admin/AdminWhiteboard';
import AdminCertifications from './pages/admin/AdminCertifications';

// Importar componentes demo (FASE 1 — solo local, sin deploy)
import DemoLayout from './components/admin/DemoLayout';
import DemoHome from './pages/admin/DemoHome';
import PrivateRoute from './routes/PrivateRoute';
import DemoRoute from './routes/DemoRoute';
import Login from './pages/Login';

// NOTA: Si ves errores de importación, haz: npm run dev (reiniciar servidor)

// Componente para el layout público del portfolio
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Hero />
      <About />
      <CoverLetter />
      <Storyboard />
      <ProfessionalStory />
      <Projects />
      <Certifications />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública del portfolio */}
        <Route path="/" element={<PublicLayout />} />
        
        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas del admin panel */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="cover-letter" element={<AdminCoverLetter />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="storyboard" element={<AdminStoryboard />} />
          <Route path="whiteboard" element={<AdminWhiteboard />} />
          <Route path="certifications" element={<AdminCertifications />} />
        </Route>

        {/* Rutas de demo — accesibles solo si VITE_DEMO_MODE=true (ver .env.local.example) */}
        <Route
          path="/demo"
          element={
            <DemoRoute>
              <DemoLayout />
            </DemoRoute>
          }
        >
          <Route index element={<DemoHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="certifications" element={<AdminCertifications />} />
          <Route path="storyboard" element={<AdminStoryboard />} />
          <Route path="cover-letter" element={<AdminCoverLetter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
