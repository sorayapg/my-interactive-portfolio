import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../firebase/auth';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
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
    } else if (loggedUser) {
      showUserUID(loggedUser);
      navigate('/admin');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const authFunction = isSignUp ? signUpWithEmail : signInWithEmail;
    const { user: loggedUser, error: loginError } = await authFunction(email, password);

    if (loginError) {
      setError(loginError);
      setLoading(false);
    } else if (loggedUser) {
      showUserUID(loggedUser);
      navigate('/admin');
    }
  };

  const showUserUID = (loggedUser) => {
    console.log('🔐 Tu UID de Firebase:', loggedUser.uid);
    console.log('👉 Copia este UID y añádelo a src/firebase/auth.js en ADMIN_UIDS');
    console.log('📍 O ve a /show-uid para verlo en pantalla grande');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-3xl font-bold text-purple-600 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              Accede al panel de administración
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              {loading ? 'Procesando...' : isSignUp ? '🎉 Crear Cuenta' : '🔓 Iniciar Sesión'}
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Crea una'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-purple-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">O continúa con</span>
            </div>
          </div>

          {/* Google Login Button */}
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 border-2 ${
              loading
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-400'
                : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400 hover:shadow-md'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                <span>Conectando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </div>
            )}
          </button>

          {/* Info Message */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl">
            <p className="text-xs text-purple-700">
              <strong>⚡ Rápido:</strong> Usa email/password para crear tu cuenta admin
            </p>
            <p className="text-xs text-purple-600 mt-1">
              <strong>🔍 Primera vez:</strong> Después de iniciar sesión, te mostraremos tu UID en pantalla grande para que lo copies fácilmente
            </p>
          </div>

          {/* Back to Portfolio */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
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
