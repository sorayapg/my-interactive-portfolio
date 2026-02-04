import './App.css';
import './index.css';

// Importar los componentes y secciones
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Storyboard from './sections/Storyboard';
import ProfessionalStory from './sections/ProfessionalStory'; // <--- 1. HE AÑADIDO ESTA LÍNEA
import Projects from './sections/Projects';
import CoverLetter from './sections/CoverLetter';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />
        <About />
        <CoverLetter />
        <Storyboard /> {/* <-- ESTE ES TU STORYBOARD KAWAII ORIGINAL */}
        <ProfessionalStory /> {/* <-- 2. HE AÑADIDO ESTA LÍNEA (LA NUEVA ANIMACIÓN) */}
        <Projects />
      </main>

      <Footer />
    </div>
  );
}

export default App;
