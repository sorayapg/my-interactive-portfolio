import { useEffect, useRef } from 'react';
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

/**
 * Modal de detalle para un proyecto.
 * Cierra al hacer click en el overlay, en la X, o al pulsar Escape.
 * Tiene scroll interno si el contenido crece.
 * No ocupa toda la pantalla (max-w-2xl max-h-[88vh]).
 */
const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Mover el foco al modal al abrirse (accesibilidad)
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  if (!project) return null;

  const title = project.name || project.title;
  const techs = project.technologies || project.stack || [];
  const liveUrl = project.liveUrl || project.demo;

  return (
    /* Overlay — click fuera cierra */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* Panel del modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto outline-none"
        style={{ animation: 'certModalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-violet-50 hover:bg-violet-100 transition z-10"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-5 h-5 text-violet-400" />
        </button>

        {/* Imagen opcional */}
        {project.image && (
          <div className="flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50 rounded-t-2xl px-8 py-8">
            <img
              src={project.image}
              alt={title}
              className="max-h-48 max-w-[80%] w-auto object-contain drop-shadow-sm rounded-xl"
            />
          </div>
        )}

        {/* Cabecera */}
        <div
          className={`px-6 py-5 border-b border-violet-100 ${!project.image ? 'pt-10' : ''}`}
        >
          <h2
            id="project-modal-title"
            className="text-xl font-bold text-gray-900 leading-tight pr-8"
          >
            {title}
          </h2>

          {/* Badges de tecnologías — todas en el modal */}
          {techs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 bg-violet-100 text-violet-700 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cuerpo con scroll interno */}
        <div className="p-6 space-y-7">
          {project.description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                Descripción
              </h3>
              <p className="text-base leading-7 text-slate-600">{project.description}</p>
            </div>
          )}

          {project.longDescription && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                Más detalles
              </h3>
              <p className="text-base leading-7 text-slate-600">{project.longDescription}</p>
            </div>
          )}

          {project.challenge && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                Retos técnicos
              </h3>
              <p className="text-base leading-7 text-slate-600">{project.challenge}</p>
            </div>
          )}

          {project.learned && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                Qué aprendí
              </h3>
              <p className="text-base leading-7 text-slate-600">{project.learned}</p>
            </div>
          )}
        </div>

        {/* Footer de enlaces */}
        {(liveUrl || project.frontendRepo || project.backendRepo || project.github) && (
          <div className="px-6 pb-6 flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-rose-500 transition text-sm"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                Ver Aplicación
              </a>
            )}
            {project.frontendRepo && (
              <a
                href={project.frontendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-50 border border-violet-200 text-violet-700 font-semibold rounded-xl hover:bg-violet-100 transition text-sm"
              >
                <CodeBracketIcon className="w-4 h-4" />
                Frontend Repo
              </a>
            )}
            {project.backendRepo && (
              <a
                href={project.backendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-50 border border-violet-200 text-violet-700 font-semibold rounded-xl hover:bg-violet-100 transition text-sm"
              >
                <CodeBracketIcon className="w-4 h-4" />
                Backend Repo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-50 border border-violet-200 text-violet-700 font-semibold rounded-xl hover:bg-violet-100 transition text-sm"
              >
                <CodeBracketIcon className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
