import { Navigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { useEffect, useState } from 'react';

/**
 * Componente para proteger rutas administrativas
 * Redirige a home si el usuario no está autenticado o no es admin
 */
const PrivateRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAdmin();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
    // Si el usuario está cargado pero no es admin, mostrar mensaje
    if (!loading && user && !isAdmin) {
      setShowUnauthorized(true);
      // Redirigir después de 2 segundos
      const timer = setTimeout(() => {
        setShowUnauthorized(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, user, isAdmin]);

  // Mostrar loading mientras se verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de "No autorizado" si aplica
  if (showUnauthorized && user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-200 max-w-md text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Acceso Denegado
          </h1>
          <p className="text-gray-600 mb-4">
            No tienes permisos de administrador.
          </p>
          <p className="text-sm text-gray-500">
            Redirigiendo al portfolio...
          </p>
        </div>
      </div>
    );
  }

  // Redirigir si no está autenticado o no es admin
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Renderizar contenido protegido
  return children;
};

export default PrivateRoute;
