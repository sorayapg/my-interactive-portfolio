import { Navigate } from 'react-router-dom';

/**
 * DemoRoute
 *
 * Guard para las rutas /demo/*.
 * Si VITE_DEMO_MODE no está activo (valor por defecto en producción),
 * redirige al portfolio / para que la demo sea inaccesible públicamente.
 *
 * Activación: crear .env.local con VITE_DEMO_MODE=true (ver .env.local.example)
 */
const DemoRoute = ({ children }) => {
  if (import.meta.env.VITE_DEMO_MODE !== 'true') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default DemoRoute;
