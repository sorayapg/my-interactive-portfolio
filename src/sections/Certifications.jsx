import { useState, useEffect } from 'react';
import { listCertifications } from '../services/contentService';
import CertificationModal from '../components/CertificationModal';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// Devuelve un Set con los IDs de las N certificaciones más recientes (por issueDate)
const getRecentIds = (certs, n = 2) => {
  const sorted = [...certs]
    .filter((c) => c.issueDate)
    .sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  return new Set(sorted.slice(0, n).map((c) => c.id));
};

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
      <section id="certifications" className="py-16 bg-pink-50 text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Certificaciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-pink-100/60 rounded-2xl h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const recentIds = getRecentIds(certifications, 2);

  return (
    <>
      <section id="certifications" className="py-20 bg-pink-50 text-gray-800">
        <div className="container mx-auto px-4">
          {/* Encabezado */}
          <h2 className="text-4xl font-bold text-center mb-3">Certificaciones</h2>
          <p className="text-center text-pink-300 mb-14 text-sm tracking-wide uppercase">
            Formación continua y aprendizaje certificado
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => {
              const isRecent = recentIds.has(cert.id);

              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer
                    transition-all duration-200 ease-out
                    hover:-translate-y-1.5
                    ${
                      isRecent
                        ? 'border border-pink-200 shadow-sm hover:shadow-[0_12px_32px_rgba(244,114,182,0.20)]'
                        : 'border border-purple-100 shadow-sm hover:shadow-[0_8px_24px_rgba(167,139,250,0.18)]'
                    }`}
                >
                  {/* Etiqueta Reciente — pequeña y discreta, solo en las 2 más nuevas */}
                  {isRecent && (
                    <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-50 text-pink-400 border border-pink-100 leading-tight">
                      Reciente
                    </span>
                  )}

                  {/* Zona imagen — alturas responsive, más protagonismo */}
                  <div className="flex items-center justify-center h-[130px] sm:h-[140px] lg:h-[160px] bg-gradient-to-br from-pink-50 to-purple-50 p-5">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="max-h-[100px] sm:max-h-[110px] lg:max-h-[130px] max-w-[90%] w-auto object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-3xl">
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
                    <h3 className="text-[15px] font-bold text-gray-800 leading-snug mb-2 group-hover:text-pink-500 transition-colors duration-150">
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
                            className="px-2 py-0.5 text-xs bg-purple-50 text-purple-400 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-2 py-0.5 text-xs bg-pink-50 text-pink-300 rounded-full">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer de la card */}
                  <div className="px-5 pb-4 pt-2 flex items-center justify-between border-t border-pink-100">
                    <span className="text-xs text-pink-500 font-medium group-hover:underline">
                      Ver detalles →
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-pink-200 hover:text-pink-500 hover:bg-pink-50 transition"
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
