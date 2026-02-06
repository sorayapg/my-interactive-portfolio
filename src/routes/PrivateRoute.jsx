import { Navigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';

/**
 * Componente para proteger rutas administrativas
 * Redirige a home si el usuario no está autenticado o no es admin
 */
const PrivateRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAdmin();

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

  // Redirigir si no está autenticado o no es admin
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Renderizar contenido protegido
  return children;
};

export default PrivateRoute;
