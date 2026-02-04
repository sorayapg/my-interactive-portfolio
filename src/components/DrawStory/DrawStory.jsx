import { useEffect, useRef, useState, useCallback } from 'react';
import {
  SparklesIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import SvgDraw from './SvgDraw';
import { scenes } from './scenes';

// Mapeo de nombres de iconos a componentes
const iconMap = {
  SparklesIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
};

/**
 * Componente principal de Draw Story
 * Sección interactiva con animación de dibujo SVG controlada por scroll
 */
function DrawStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateScene, setAnimateScene] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sentinelRefs = useRef([]);
  const sectionRef = useRef(null);

  // Configurar IntersectionObserver para detectar escenas activas
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Activar cuando esté cerca del centro
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.sceneIndex);
          setActiveIndex(index);
          
          // Animar solo si no se ha animado antes
          if (!hasAnimated[index]) {
            setAnimateScene((prev) => ({ ...prev, [index]: true }));
            setHasAnimated((prev) => ({ ...prev, [index]: true }));
          }
        }
      });
    }, options);

    // Observar todos los sentinels
    sentinelRefs.current.forEach((sentinel) => {
      if (sentinel) observer.observe(sentinel);
    });

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  // Función para repetir la animación de la escena actual
  const handleReplay = useCallback(() => {
    setAnimateScene((prev) => ({ ...prev, [activeIndex]: false }));
    setTimeout(() => {
      setAnimateScene((prev) => ({ ...prev, [activeIndex]: true }));
    }, 50);
  }, [activeIndex]);

  // Función para scroll al proyecto
  const handleScrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
      aria-label="Mi historia profesional"
    >
      {/* Contenedor de escenas con scroll */}
      <div className="relative">
        {scenes.map((scene, index) => {
          const IconComponent = iconMap[scene.icon];
          const isActive = activeIndex === index;

          return (
            <div
              key={scene.id}
              className="min-h-screen flex items-center justify-center py-16 px-4 relative"
            >
              {/* Sentinel para IntersectionObserver */}
              <div
                ref={(el) => (sentinelRefs.current[index] = el)}
                data-scene-index={index}
                className="absolute top-1/2 left-0 w-full h-1 pointer-events-none"
                aria-hidden="true"
              />

              <div className="container mx-auto max-w-6xl">
                {/* Layout responsive: 2 columnas en desktop, 1 en mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  
                  {/* Columna de texto */}
                  <div 
                    className={`space-y-6 transition-all duration-700 ${
                      isActive 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-40 translate-y-4'
                    }`}
                  >
                    {/* Icono */}
                    {IconComponent && (
                      <div className="flex justify-center lg:justify-start">
                        <div className="p-3 bg-white rounded-xl shadow-md">
                          <IconComponent className="w-12 h-12 text-indigo-600" />
                        </div>
                      </div>
                    )}

                    {/* Título */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center lg:text-left">
                      {scene.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                      {scene.description}
                    </p>

                    {/* CTA en la última escena */}
                    {scene.id === 4 && (
                      <div className="flex justify-center lg:justify-start pt-4">
                        <button
                          onClick={handleScrollToProjects}
                          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-2"
                        >
                          Ver Proyectos
                          <RocketLaunchIcon className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Columna de SVG */}
                  <div 
                    className={`relative transition-all duration-700 ${
                      isActive 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-40 scale-95'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center">
                      <SvgDraw 
                        paths={scene.paths} 
                        animate={animateScene[index] || false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de progreso y controles - Fixed position */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-4 flex items-center gap-4">
          {/* Dots indicadores */}
          <div className="flex gap-2">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                onClick={() => {
                  const sentinel = sentinelRefs.current[index];
                  if (sentinel) {
                    sentinel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a escena ${index + 1}: ${scene.title}`}
              />
            ))}
          </div>

          {/* Botón de replay */}
          <div className="w-px h-6 bg-gray-300" aria-hidden="true" />
          <button
            onClick={handleReplay}
            className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-full transition-colors"
            aria-label="Repetir animación de la escena actual"
            title="Repetir animación"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DrawStory;
