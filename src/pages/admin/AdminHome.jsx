import { Link } from 'react-router-dom';
import { adminSections } from '../../config/adminSections';

// Solo las secciones con description se muestran como cards en el dashboard
const quickLinks = adminSections.filter((s) => s.description);

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
              className={`group p-6 rounded-xl border-2 ${link.cardClasses.card} bg-gradient-to-br to-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-full ${link.cardClasses.iconBg} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                <Icon className={`w-6 h-6 ${link.cardClasses.iconText}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {link.label}
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
