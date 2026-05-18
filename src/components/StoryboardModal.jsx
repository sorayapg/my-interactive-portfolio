import { useEffect, useCallback } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

/**
 * Modal carrusel para el Storyboard público.
 * - Navega entre viñetas con botones Anterior/Siguiente, dots clickables o teclado (← →).
 * - Cierra con Escape, click en overlay o botón X.
 * - Diseño responsive: imagen arriba en móvil, izquierda en desktop.
 */
const StoryboardModal = ({ vinetas, selectedIndex, onClose, onNavigate }) => {
  const vineta = vinetas[selectedIndex];
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === vinetas.length - 1;
  const total = vinetas.length;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && !isFirst) onNavigate(selectedIndex - 1);
      if (e.key === 'ArrowRight' && !isLast) onNavigate(selectedIndex + 1);
    },
    [onClose, onNavigate, selectedIndex, isFirst, isLast]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!vineta) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        style={{ animation: 'certModalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition z-10"
          aria-label="Cerrar"
        >
          <XMarkIcon className="w-5 h-5 text-pink-400" />
        </button>

        {/* Contenido principal (scrollable si el texto es muy largo) */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto">
          {/* Imagen — 3/5 desktop, ancho completo móvil */}
          <div className={`md:w-3/5 flex-shrink-0 flex items-center justify-center p-6 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none ${vineta.bg}`}>
            <img
              src={vineta.img}
              alt={vineta.alt}
              className="w-full max-w-xs md:max-w-full h-auto object-contain"
            />
          </div>

          {/* Texto — 2/5 desktop, debajo en móvil */}
          <div className="md:w-2/5 flex flex-col justify-center px-6 py-8 md:pr-10">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight pr-6 mb-4">
              {vineta.title}
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">{vineta.text}</p>
          </div>
        </div>

        {/* Barra de navegación */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-t border-purple-100 bg-white gap-2">
          {/* Anterior */}
          <button
            onClick={() => onNavigate(selectedIndex - 1)}
            disabled={isFirst}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-purple-50 text-purple-600 font-medium text-sm hover:bg-purple-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Viñeta anterior"
          >
            <ChevronLeftIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Dots + contador */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {vinetas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(i)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === selectedIndex
                      ? 'w-4 bg-pink-400'
                      : 'w-2 bg-purple-200 hover:bg-purple-400'
                  }`}
                  aria-label={`Ir a viñeta ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium tabular-nums">
              {selectedIndex + 1} / {total}
            </span>
          </div>

          {/* Siguiente */}
          <button
            onClick={() => onNavigate(selectedIndex + 1)}
            disabled={isLast}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-purple-50 text-purple-600 font-medium text-sm hover:bg-purple-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Viñeta siguiente"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRightIcon className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryboardModal;
