import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, RocketLaunchIcon, AcademicCapIcon, BookOpenIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';

/**
 * DemoNav — FASE 1G
 */
const demoSections = [
  { path: '/demo',                  label: 'Home',            icon: HomeIcon,          exact: true },
  { path: '/demo/profile',          label: 'Perfil',          icon: UserIcon,          exact: false },
  { path: '/demo/projects',         label: 'Proyectos',       icon: RocketLaunchIcon,  exact: false },
  { path: '/demo/certifications',   label: 'Certificaciones', icon: AcademicCapIcon,   exact: false },
  { path: '/demo/storyboard',       label: 'Storyboard',      icon: BookOpenIcon,      exact: false },
  { path: '/demo/cover-letter',     label: 'Cover Letter',    icon: EnvelopeOpenIcon,  exact: false },
];

const DemoNav = () => (
  <nav className="bg-white rounded-xl shadow-md p-4 border-2 border-amber-200">
    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-3 px-2">
      Demo — disponible
    </p>
    <ul className="space-y-2">
      {demoSections.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `group flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                }`
              }
            >
              <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default DemoNav;
