import { Outlet, useNavigate } from 'react-router-dom';
import { ServiceProvider } from '../../context/ServiceContext';
import * as mockService from '../../services/mockService';
import DemoNav from './DemoNav';
import { BeakerIcon, EyeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

/**
 * DemoLayout
 *
 * Layout del modo demo. Paralelo a AdminLayout pero:
 * - Sin autenticación ni Firebase Auth.
 * - Provee mockService al árbol de componentes vía ServiceProvider.
 * - Muestra un banner permanente de aviso de modo demo.
 * - Links de navegación apuntan a /demo/* en vez de /admin/*.
 */
const DemoLayout = () => {
  const navigate = useNavigate();

  return (
    <ServiceProvider service={mockService} isDemo={true}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">

        {/* Banner de aviso — siempre visible */}
        <div className="bg-amber-400 text-amber-900 text-center py-2 px-4 text-sm font-bold tracking-wide">
          🎭 MODO DEMO — Los cambios no afectan al portfolio real
        </div>

        {/* Header */}
        <header className="bg-white border-b-2 border-amber-300 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2 text-2xl font-bold text-amber-600">
                  <BeakerIcon className="w-6 h-6 text-orange-400" />
                  Demo CMS
                </div>
                <span className="text-sm text-gray-500 hidden sm:inline">
                  datos ficticios
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 hover:shadow-sm transition-all duration-200"
                >
                  <EyeIcon className="w-4 h-4 shrink-0" />
                  Ver Portfolio
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 hover:shadow-sm transition-all duration-200"
                >
                  <ArrowLeftIcon className="w-4 h-4 shrink-0" />
                  Salir del Demo
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation & Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <DemoNav />
            </aside>
            <main className="flex-1 bg-white rounded-xl shadow-md p-6 border-2 border-amber-100">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ServiceProvider>
  );
};

export default DemoLayout;
