import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Modal de detalle para una viñeta del Storyboard.
 * Mismo patrón que CertificationModal: cierra con Escape, click en overlay o botón X.
 * Reutiliza la animación certModalIn definida en index.css.
 */
const StoryboardModal = ({ vineta, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
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

        {/* Imagen — object-contain para verla completa, fondo suave de la viñeta */}
        <div className={`w-full flex items-center justify-center rounded-t-2xl py-6 px-6 ${vineta.bg}`}>
          <img
            src={vineta.img}
            alt={vineta.alt}
            className="max-h-64 w-auto object-contain"
          />
        </div>

        {/* Contenido */}
        <div className="px-6 py-5">
          <h2 className="text-xl font-bold text-gray-800 leading-tight pr-8 mb-4">
            {vineta.title}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{vineta.text}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryboardModal;
