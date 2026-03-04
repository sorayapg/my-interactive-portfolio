import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { signOut } from '../firebase/auth';
import { useState, useEffect } from 'react';
import { getProfile } from '../services/contentService';

function Header() {
  const { user, isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [profileName, setProfileName] = useState(null);

  // Obtener nombre del perfil desde Firestore
  useEffect(() => {
    const fetchProfileName = async () => {
      if (user) {
        const { data } = await getProfile();
        if (data && data.name) {
          setProfileName(data.name);
        }
      }
    };
    
    fetchProfileName();
  }, [user]);

  const handleLogout = async () => {
    if (!window.confirm('¿Seguro que quieres cerrar sesión?')) return;
    
    setLoggingOut(true);
    await signOut();
    setLoggingOut(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b-2 border-purple-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-purple-600 hover:text-purple-700 transition">
            ✨ Mi Portfolio
          </Link>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Mostrar email/nombre del usuario */}
                <span className="text-sm text-gray-600 hidden sm:inline">
                  👋 {profileName || user.displayName || user.email}
                </span>
                
                {/* Botón Admin (solo si es admin) */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    🔐 Admin Panel
                  </Link>
                )}
                
                {/* Botón Logout */}
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loggingOut ? '⏳' : '🚪 Salir'}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-medium"
              >
                🔑 Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;