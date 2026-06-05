import { Link } from 'react-router-dom';
import { BeakerIcon, UserIcon, RocketLaunchIcon, AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';

/**
 * DemoHome — FASE 1
 *
 * Página índice del modo demo. Muestra las secciones disponibles
 * con acceso directo. Sin llamadas a Firebase ni servicios.
 */
const DemoHome = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <BeakerIcon className="w-7 h-7 text-amber-500 shrink-0" />
        Demo del CMS
      </h1>
      <p className="text-gray-600">
        Explora el panel de administración con datos ficticios. Ningún cambio afecta al portfolio real.
      </p>
    </div>

    <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg mb-6">
      <p className="text-sm text-amber-800">
        🎭 Los datos son ficticios y se resetean al recargar la página. No se realiza ninguna llamada a Firebase.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link
        to="/demo/profile"
        className="group p-6 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
          <UserIcon className="w-6 h-6 text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Perfil</h3>
        <p className="text-sm text-gray-600">Editar información del perfil ficticio</p>
      </Link>

      <Link
        to="/demo/projects"
        className="group p-6 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
          <RocketLaunchIcon className="w-6 h-6 text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Proyectos</h3>
        <p className="text-sm text-gray-600">Gestionar el portfolio de proyectos ficticio</p>
      </Link>

      <Link
        to="/demo/certifications"
        className="group p-6 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
          <AcademicCapIcon className="w-6 h-6 text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Certificaciones</h3>
        <p className="text-sm text-gray-600">Gestionar certificados y cursos ficticios</p>
      </Link>
    </div>

    <p className="text-xs text-gray-400 mt-6">
      Fase 1D — Perfil, Proyectos, Certificaciones y Storyboard disponibles.
    </p>
  </div>
);

export default DemoHome;
