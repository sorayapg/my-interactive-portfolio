import { NavLink } from 'react-router-dom';
import { adminSections } from '../../config/adminSections';

const AdminNav = () => {
  return (
    <nav className="bg-white rounded-xl shadow-md p-4 border-2 border-purple-100">
      <ul className="space-y-2">
        {adminSections.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminNav;
