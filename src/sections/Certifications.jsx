import { useState, useEffect } from 'react';
import { listCertifications } from '../services/contentService';
import CertificationModal from '../components/CertificationModal';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// Palabras clave que marcan una certificación como destacada
const FEATURED_KEYWORDS = ['generative ai', 'aws', 'gen ai', 'machine learning', 'cloud'];

const isFeatured = (title = '') =>
  FEATURED_KEYWORDS.some((k) => title.toLowerCase().includes(k));

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    setLoading(true);
    const { data } = await listCertifications();
    if (data) {
      setCertifications(data.filter((c) => c.visible !== false));
    }
    setLoading(false);
  };

  // Sección vacía: no mostrar nada si no hay certificaciones en Firestore
  if (!loading && certifications.length === 0) return null;

  if (loading) {
    return (
      <section id="certifications" className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Certificaciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-gray-100 rounded-2xl h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="certifications" className="py-20 bg-gray-50 text-gray-800">
        <div className="container mx-auto px-4">
          {/* Encabezado */}
          <h2 className="text-4xl font-bold text-center mb-3">Certificaciones</h2>
          <p className="text-center text-gray-400 mb-14 text-sm tracking-wide uppercase">
            Formación continua y aprendizaje certificado
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => {
              const featured = isFeatured(cert.title);

              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer
                    transition-all duration-200 ease-out
                    hover:-translate-y-1 hover:shadow-xl
                    ${featured
                      ? 'border-2 border-amber-200 shadow-md shadow-amber-50'
                      : 'border border-gray-200 shadow-sm'
                    }`}
                >
                  {/* Badge destacada */}
                  {featured && (
                    <span className="absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                      ✨ Destacada
                    </span>
                  )}

                  {/* Zona imagen — más alta, más protagonismo */}
                  <div className="flex items-center justify-center h-44 bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="max-h-32 max-w-full w-auto object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl">
                        🎓
                      </div>
                    )}
                  </div>

                  {/* Contenido de la card */}
                  <div className="flex flex-col flex-1 px-5 pt-4 pb-3">
                    {/* Plataforma — por encima del título, discreta */}
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                      {cert.platform}
                    </span>

                    {/* Título — peso visual principal */}
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-emerald-700 transition-colors duration-150">
                      {cert.title}
                    </h3>

                    {/* Fecha — discreta */}
                    {cert.issueDate && (
                      <p className="text-xs text-gray-300 mb-3">
                        {new Date(cert.issueDate + '-01').toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    )}

                    {/* Skills — chips suaves al fondo del contenido */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-xs bg-slate-100 text-slate-500 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-400 rounded-full">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer de la card */}
                  <div className="px-5 pb-4 pt-2 flex items-center justify-between border-t border-gray-50">
                    <span className="text-xs text-emerald-600 font-medium group-hover:underline">
                      Ver detalles →
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 transition"
                        title="Verificar certificado"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal de detalle */}
      {selectedCert && (
        <CertificationModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </>
  );
}

export default Certifications;
