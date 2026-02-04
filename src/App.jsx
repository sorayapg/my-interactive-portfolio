import './App.css'; // Mantenemos la importación del CSS de la App
import './index.css'; // Importación global de estilos, incluyendo Tailwind

// Importar los componentes y secciones
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Storyboard from './sections/Storyboard';
import Projects from './sections/Projects';
import CoverLetter from './sections/CoverLetter'; // Importar la nueva sección de la Carta de Presentación
import DrawStory from './components/DrawStory'; // Sección interactiva de Draw Story

function App() {
  return (
    <div className="min-h-screen flex flex-col"> {/* Flex container para la estructura general */}
      <Header /> {/* Encabezado */}

      <main className="flex-grow"> {/* Contenedor principal que ocupa el espacio restante */}
        <Hero /> {/* Sección de bienvenida */}
        <About /> {/* Sección sobre ti (CV y carta) */}
        <CoverLetter /> {/* Sección de la Carta de Presentación */}
        <Storyboard /> {/* Sección del storyboard */}
        <DrawStory /> {/* Sección interactiva Draw Story */}
        <Projects /> {/* Sección de proyectos */}
      </main>

      <Footer /> {/* Pie de página */}
    </div>
  );
}

export default App;
