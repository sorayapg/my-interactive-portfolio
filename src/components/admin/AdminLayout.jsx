import { Outlet, Link } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { signOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import { ServiceProvider } from '../../context/ServiceContext';
import * as contentService from '../../services/contentService';
import {
  HeartIcon,
  IdentificationIcon,
  EyeIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const { user } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <ServiceProvider service={contentService} isDemo={false}>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-purple-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/admin" className="flex items-center gap-2 text-2xl font-bold text-purple-600">
                <HeartIcon className="w-6 h-6 text-pink-400" />
                Admin Panel
              </Link>
              <span className="text-sm text-gray-500 hidden sm:inline">
                kawaii CMS
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-600 hidden sm:flex">
                <IdentificationIcon className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate max-w-[180px]">{user?.displayName || user?.email}</span>
              </div>
              
              <Link 
                to="/" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 hover:shadow-sm transition-all duration-200"
              >
                <EyeIcon className="w-4 h-4 shrink-0" />
                Ver Portfolio
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 hover:shadow-sm transition-all duration-200"
              >
                <ArrowRightStartOnRectangleIcon className="w-4 h-4 shrink-0" />
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
    </ServiceProvider>
  );
};

export default AdminLayout;
