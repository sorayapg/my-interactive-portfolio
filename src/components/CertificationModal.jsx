import { useEffect } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

/**
 * Modal de detalle para una certificación.
 * Se activa desde Certifications.jsx pasando `cert` y `onClose`.
 * Cierra al hacer click en el overlay, en la X, o al pulsar Escape.
 */
const CertificationModal = ({ cert, onClose }) => {
  // Cerrar con la tecla Escape
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

  if (!cert) return null;

  const formattedDate = cert.issueDate
    ? new Date(cert.issueDate + '-01').toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenedor del modal con animación de entrada */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: 'certModalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition z-10"
          aria-label="Cerrar"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Imagen centrada en su propio bloque — más grande y con fondo suave */}
        {cert.imageUrl && (
          <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 rounded-t-2xl px-8 py-7">
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="max-h-40 max-w-xs w-auto object-contain drop-shadow-sm"
            />
          </div>
        )}

        {/* Cabecera de texto */}
        <div className={`px-6 py-5 border-b border-gray-100 ${!cert.imageUrl ? 'pt-10' : ''}`}>
          <h2 className="text-xl font-bold text-gray-900 leading-tight pr-8">{cert.title}</h2>
          <p className="text-emerald-600 font-semibold mt-1">{cert.platform}</p>
          {formattedDate && (
            <p className="text-sm text-gray-400 mt-0.5">Emitido: {formattedDate}</p>
          )}
        </div>

        {/* Cuerpo */}
        <div className="p-6 space-y-5">
          {/* Descripción */}
          {cert.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Descripción
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{cert.description}</p>
            </div>
          )}

          {/* Habilidades */}
          {cert.skills && cert.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Habilidades adquiridas
              </h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Logros */}
          {cert.achievements && cert.achievements.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Logros destacados
              </h3>
              <ul className="space-y-1.5">
                {cert.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer con enlace de verificación */}
        {cert.credentialUrl && (
          <div className="px-6 pb-6">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Verificar certificado
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationModal;
