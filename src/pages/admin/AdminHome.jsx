import { Link } from 'react-router-dom';
import {
  UserIcon,
  BriefcaseIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const quickLinks = [
  {
    title: 'Perfil',
    description: 'Editar información personal',
    icon: UserIcon,
    path: '/admin/profile',
    color: 'purple',
  },
  {
    title: 'Experiencias',
    description: 'Gestionar experiencia laboral',
    icon: BriefcaseIcon,
    path: '/admin/experiences',
    color: 'pink',
  },
  {
    title: 'Proyectos',
    description: 'Administrar portfolio de proyectos',
    icon: RectangleStackIcon,
    path: '/admin/projects',
    color: 'indigo',
  },
  {
    title: 'Cover Letter',
    description: 'Editar carta de presentación',
    icon: DocumentTextIcon,
    path: '/admin/cover-letter',
    color: 'rose',
  },
  {
    title: 'Storyboard',
    description: 'Reordenar viñetas del storyboard',
    icon: BookOpenIcon,
    path: '/admin/storyboard',
    color: 'violet',
  },
  {
    title: 'Ajustes',
    description: 'Configuración general',
    icon: Cog6ToothIcon,
    path: '/admin/settings',
    color: 'fuchsia',
  },
];

const AdminHome = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ✨ Panel de Administración
        </h1>
        <p className="text-gray-600">
          Bienvenida al mini CMS de tu portfolio kawaii
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`p-6 rounded-xl border-2 border-${link.color}-200 bg-gradient-to-br from-${link.color}-50 to-white hover:shadow-lg hover:scale-105 transition-all duration-200`}
            >
              <div className={`w-12 h-12 rounded-full bg-${link.color}-100 flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${link.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-2">💡 Consejos</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Los cambios se reflejarán en tiempo real en tu portfolio</li>
          <li>• Recuerda guardar después de cada edición</li>
          <li>• Las imágenes deben estar en la carpeta /public/images/</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
