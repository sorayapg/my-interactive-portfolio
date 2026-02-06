import { Outlet, Link } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { signOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';

const AdminLayout = () => {
  const { user } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-purple-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-2xl font-bold text-purple-600">
                ✨ Admin Panel
              </Link>
              <span className="text-sm text-gray-500 hidden sm:inline">
                kawaii CMS
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 hidden sm:block">
                👋 {user?.displayName || user?.email}
              </div>
              
              <Link 
                to="/" 
                className="px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
              >
                Ver Portfolio
              </Link>
              
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <AdminNav />
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-xl shadow-md p-6 border-2 border-purple-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
