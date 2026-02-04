import React, { useState, useEffect, useRef } from 'react';
import { scenes } from './scenes';
import SvgDraw from './SvgDraw';
import { Transition } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const DrawStory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const sentinelRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sentinelRefs.current.forEach((sentinel) => {
      if (sentinel) observer.observe(sentinel);
    });

    return () => observer.disconnect();
  }, []);
  
  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReplayAnimation = () => {
    setReplayTrigger(key => key + 1);
  };

  const currentScene = scenes[activeIndex];

  return (
    <section id="draw-my-life" className="relative min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 py-20">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center px-4">
        
        <div className="relative h-[50vh] md:h-[80vh] flex flex-col justify-center">
          {scenes.map((scene, index) => (
            <Transition
              key={index}
              show={activeIndex === index}
              as="div"
              className="absolute w-full"
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-start gap-4">
                <scene.icon className="w-8 h-8 mt-1 text-indigo-500 shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{scene.title}</h3>
                  <p className="mt-4 text-lg text-gray-600">{scene.text}</p>
                </div>
              </div>
            </Transition>
          ))}
          {activeIndex === scenes.length - 1 && (
            <Transition
              show={activeIndex === scenes.length - 1}
              enter="transition-opacity duration-500 delay-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <button
                  onClick={handleScrollToProjects}
                  className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
              >
                  Ver mis proyectos
              </button>
            </Transition>
          )}
        </div>

        <div className="relative h-[80vh]">
          <div className="sticky top-1/2 -translate-y-1/2 w-full h-[60vh]">
            <SvgDraw 
                key={`${activeIndex}-${replayTrigger}`}
                paths={currentScene.svgPaths}
            />
          </div>
          {scenes.map((_, index) => (
            <div
              key={index}
              ref={(el) => (sentinelRefs.current[index] = el)}
              data-index={index}
              className="h-screen"
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-lg z-20">
            <div className="flex gap-3">
                {scenes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => sentinelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-indigo-600 scale-125' : 'bg-gray-400 hover:bg-gray-500'}`}
                        aria-label={`Ir a la escena ${index + 1}`}
                    />
                ))}
            </div>
            <div className="w-px h-5 bg-gray-300" />
            <button
                onClick={handleReplayAnimation}
                className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                aria-label="Reproducir animación"
            >
                <ArrowPathIcon className="w-5 h-5" />
            </button>
      </div>
    </section>
  );
};

export default DrawStory;
