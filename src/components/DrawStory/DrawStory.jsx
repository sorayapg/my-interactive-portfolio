import React, { useEffect, useRef, useState, useCallback } from 'react';
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

const iconMap = {
  SparklesIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
};

function DrawStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateScene, setAnimateScene] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const [replayKey, setReplayKey] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const sentinelRefs = useRef([]);
  const hideControlsTimer = useRef(null);

  // Debug: detectar cambios en activeIndex
  useEffect(() => {
    console.log('📍 DrawStory: Active index changed to', activeIndex);
  }, [activeIndex]);

  // Auto-hide controles después de 4 segundos de inactividad
  useEffect(() => {
    // Mostrar controles cuando cambia la escena
    setControlsVisible(true);
    
    // Limpiar timer anterior
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }
    
    // Ocultar después de 4 segundos
    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, 4000);
    
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    };
  }, [activeIndex]);

  // Mostrar controles al mover el mouse
  const handleMouseMove = useCallback(() => {
    setControlsVisible(true);
    
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }
    
    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, 4000);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.sceneIndex, 10);
            setActiveIndex(index);
            if (!hasAnimated[index]) {
              setHasAnimated((prev) => ({ ...prev, [index]: true }));
              setAnimateScene((prev) => ({ ...prev, [index]: true }));
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const currentSentinels = sentinelRefs.current;
    currentSentinels.forEach((sentinel) => {
      if (sentinel) observer.observe(sentinel);
    });

    return () => {
      currentSentinels.forEach((sentinel) => {
        if (sentinel) observer.unobserve(sentinel);
      });
    };
  }, [hasAnimated]);

  const handleReplay = useCallback(() => {
    console.log('🔄 DrawStory: Replay animation for scene', activeIndex);
    setAnimateScene((prev) => ({ ...prev, [activeIndex]: false }));
    setReplayKey((prev) => prev + 1);
    setTimeout(() => {
      setAnimateScene((prev) => ({ ...prev, [activeIndex]: true }));
    }, 50);
  }, [activeIndex]);

  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
      aria-label="Mi historia profesional"
      onMouseMove={handleMouseMove}
    >
      <div className="relative">
        {scenes.map((scene, index) => {
          const IconComponent = iconMap[scene.icon];
          const isActive = activeIndex === index;

          return (
            <div
              key={scene.id}
              className="min-h-screen flex items-center justify-center py-16 px-4 relative"
            >
              <div
                ref={(el) => (sentinelRefs.current[index] = el)}
                data-scene-index={index}
                className="absolute top-1/2 left-0 w-full h-1"
                aria-hidden="true"
              />
              <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div
                    className={`space-y-6 transition-all duration-700 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
                    }`}
                  >
                    {IconComponent && (
                      <div className="flex justify-center lg:justify-start">
                        <div className="p-3 bg-white rounded-xl shadow-md">
                          <IconComponent className="w-12 h-12 text-indigo-600" />
                        </div>
                      </div>
                    )}
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center lg:text-left">
                      {scene.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                      {scene.description}
                    </p>
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
                  <div
                    className={`relative transition-all duration-700 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                    }`}
                  >
                    {/* Paper Card Container - Estilo cuaderno kawaii */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-2xl p-8 flex items-center justify-center border-4 border-white/50 relative overflow-hidden">
                      {/* Textura papel sutil */}
                      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiMwMDAiIG9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')]"></div>
                      
                      <SvgDraw
                        outlinePaths={scene.outlinePaths || []}
                        fillShapes={scene.fillShapes || []}
                        stickers={scene.stickers || []}
                        animate={animateScene[index] || false}
                        replayKey={replayKey}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Indicadores de progreso y controles - Fixed position con auto-hide */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl px-6 py-4 flex items-center gap-4 border border-gray-200/50">
          <div className="flex gap-2">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                onClick={() => {
                  const sentinel = sentinelRefs.current[index];
                  sentinel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
