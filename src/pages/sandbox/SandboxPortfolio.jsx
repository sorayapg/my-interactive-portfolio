import { useState, useEffect } from 'react';
import { useService } from '../../context/ServiceContext';

/**
 * SandboxPortfolio
 *
 * Página de verificación de infraestructura del Sandbox (Fase 1).
 * Obtiene los datos exclusivamente vía useService() — nunca importa contentService.
 * No sustituye a ningún componente del Portfolio: es exclusiva de /sandbox/portfolio.
 */
function SandboxPortfolio() {
  const { getProfile, isDemo } = useService();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then(({ data }) => {
      setProfile(data);
      setLoading(false);
    });
  }, [getProfile]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '640px', margin: '0 auto' }}>
      <h1>🧪 Sandbox Portfolio — Verificación de infraestructura</h1>
      <p>
        Esta página confirma que la ruta <code>/sandbox/portfolio</code> consume{' '}
        <code>mockService</code> a través de <code>useService()</code>, de forma aislada
        respecto al Portfolio Real.
      </p>

      <p><strong>isDemo:</strong> {String(isDemo)}</p>

      {loading ? (
        <p>Cargando datos ficticios...</p>
      ) : profile ? (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
          <p><strong>Nombre:</strong> {profile.name}</p>
          <p><strong>Título:</strong> {profile.title}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      ) : (
        <p>No se han podido cargar los datos.</p>
      )}
    </div>
  );
}

export default SandboxPortfolio;
