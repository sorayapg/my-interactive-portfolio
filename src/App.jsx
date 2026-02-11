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

// Importar componentes admin
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminProfile from './pages/admin/AdminProfile';
import AdminExperiences from './pages/admin/AdminExperiences';
import AdminProjects from './pages/admin/AdminProjects';
import AdminCoverLetter from './pages/admin/AdminCoverLetter';
import AdminSettings from './pages/admin/AdminSettings';
import AdminStoryboard from './pages/admin/AdminStoryboard';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import ShowUID from './pages/ShowUID';

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
        
        {/* Ruta para ver UID (temporal) */}
        <Route path="/show-uid" element={<ShowUID />} />
        
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
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="cover-letter" element={<AdminCoverLetter />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="storyboard" element={<AdminStoryboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
