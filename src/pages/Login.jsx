import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, isAdmin as checkIsAdmin, signOut } from '../firebase/auth';
import { useAdmin } from '../hooks/useAdmin';

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAdmin();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado Y es admin
  useEffect(() => {
    if (user && checkIsAdmin(user)) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    const { user: loggedUser, error: loginError } = await signInWithGoogle();
    
    if (loginError) {
      setError(loginError);
      setLoading(false);
      return;
    }
    
    if (loggedUser) {
      // ⚠️ VERIFICACIÓN CRÍTICA: Solo admin puede acceder
      const userIsAdmin = checkIsAdmin(loggedUser);
      
      if (!userIsAdmin) {
        // NO ES ADMIN: expulsar inmediatamente
        setError('⛔ Acceso denegado. No tienes permisos de administrador.');
        console.warn('🚫 Login rechazado:', loggedUser.email, 'UID:', loggedUser.uid);
        
        // Hacer signOut automático
        await signOut();
        setLoading(false);
        
        return;
      }
      
      // ✅ ES ADMIN: permitir acceso
      console.log('✅ Admin autorizado:', loggedUser.email);
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-purple-600 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 text-sm">
              Solo para administradores autorizados
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 border-2 shadow-lg ${
              loading
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-400'
                : 'bg-white border-purple-300 text-gray-700 hover:border-purple-500 hover:shadow-xl hover:scale-105'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                <span>Verificando acceso...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-lg">Continuar con Google</span>
              </div>
            )}
          </button>

          {/* Security Info */}
          <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <span className="text-xl">🛡️</span>
              <div>
                <p className="text-xs text-purple-800 font-semibold mb-1">
                  Acceso Restringido
                </p>
                <p className="text-xs text-purple-600 leading-relaxed">
                  Solo cuentas autorizadas pueden acceder al panel de administración.
                  Si no eres admin, serás redirigido automáticamente.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Portfolio */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
            >
              ← Volver al Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
