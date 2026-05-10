import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { signOut } from '../firebase/auth';
import { useState, useEffect } from 'react';
import { getProfile } from '../services/contentService';
import {
  UserIcon,
  DocumentTextIcon,
  BookOpenIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  Bars3Icon,
  XMarkIcon,
  IdentificationIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon, KeyIcon } from '@heroicons/react/20/solid';

const NAV_LINKS = [
  { label: 'Sobre Mí',        href: '#about',           icon: UserIcon,          hover: 'hover:bg-pink-100     hover:text-pink-600',    iconColor: 'text-pink-400' },
  { label: 'Carta',           href: '#cover-letter',    icon: DocumentTextIcon,  hover: 'hover:bg-rose-100     hover:text-rose-500',    iconColor: 'text-rose-400' },
  { label: 'Storyboard',      href: '#storyboard',      icon: BookOpenIcon,      hover: 'hover:bg-purple-100   hover:text-purple-600',  iconColor: 'text-purple-400' },
  { label: 'Whiteboard',      href: '#whiteboard',      icon: PaintBrushIcon,    hover: 'hover:bg-sky-100      hover:text-sky-500',     iconColor: 'text-sky-400' },
  { label: 'Proyectos',       href: '#projects',        icon: RocketLaunchIcon,  hover: 'hover:bg-violet-100   hover:text-violet-600',  iconColor: 'text-violet-400' },
  { label: 'Certificaciones', href: '#certifications',  icon: AcademicCapIcon,   hover: 'hover:bg-emerald-100  hover:text-emerald-600', iconColor: 'text-emerald-400' },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function Header() {
  const { user, isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [profileName, setProfileName] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfileName = async () => {
      if (user) {
        const { data } = await getProfile();
        if (data && data.name) setProfileName(data.name);
      }
    };
    fetchProfileName();
  }, [user]);

  // Cerrar menú móvil al hacer resize a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = async () => {
    if (!window.confirm('¿Seguro que quieres cerrar sesión?')) return;
    setLoggingOut(true);
    await signOut();
    setLoggingOut(false);
    navigate('/');
  };

  const handleNavClick = (href) => {
    scrollTo(href);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[5.5rem]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-purple-600 hover:text-pink-500 transition shrink-0">
            <StarIcon className="w-6 h-6 text-pink-400" />
            Mi Portfolio
          </Link>

          {/* Nav desktop — centro, estilo kawaii/pastel */}
          <nav className="hidden lg:flex flex-1 items-center justify-center mx-8" aria-label="Navegación principal">
            <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm border border-pink-100 rounded-full px-5 py-3 shadow-sm">
              {NAV_LINKS.map(({ label, href, icon: Icon, hover, iconColor }) => (
                <span
                  key={href}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleNavClick(href)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNavClick(href)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium cursor-pointer select-none
                    text-purple-500
                    hover:scale-105 hover:shadow-sm
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200
                    transition-all duration-200 ${hover}`}
                >
                  <Icon className={`w-[1.15rem] h-[1.15rem] shrink-0 ${iconColor}`} />
                  {label}
                </span>
              ))}
            </div>
          </nav>

          {/* Derecha: usuario + hamburguesa móvil */}
          <div className="flex items-center gap-4 shrink-0">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-base text-gray-600 hidden sm:inline-flex max-w-[200px] truncate">
                  <IdentificationIcon className="w-5 h-5 text-purple-400 shrink-0" />
                  <span className="truncate">{profileName || user.displayName || user.email}</span>
                </span>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg font-medium text-base"
                  >
                    <UserCircleIcon className="w-5 h-5 shrink-0" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-all font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5 shrink-0" />
                  {loggingOut ? 'Saliendo...' : 'Salir'}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-medium text-sm"
              >
                <KeyIcon className="w-4 h-4 text-purple-400" />
                Login
              </Link>
            )}

            {/* Botón hamburguesa — solo en móvil/tablet */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-purple-500 hover:bg-purple-50 transition"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <XMarkIcon className="w-6 h-6" />
                : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable — estilo kawaii/pastel */}
      {menuOpen && (
        <div className="lg:hidden bg-pink-50/95 backdrop-blur-md border-t border-pink-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Navegación móvil">
            {NAV_LINKS.map(({ label, href, icon: Icon, hover, iconColor }) => (
              <span
                key={href}
                role="button"
                tabIndex={0}
                onClick={() => handleNavClick(href)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavClick(href)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium cursor-pointer select-none
                  text-purple-600
                  hover:shadow-sm
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200
                  transition-all duration-200 w-full ${hover}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
                {label}
              </span>
            ))}

            {/* Admin Panel y Salir — solo en menú móvil cuando hay sesión */}
            {user && (
              <>
                <div className="my-1 border-t border-pink-200" />
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all duration-200 w-full"
                  >
                    <UserCircleIcon className="w-5 h-5 shrink-0 text-purple-400" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  disabled={loggingOut}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-pink-600 hover:bg-pink-100 transition-all duration-200 w-full disabled:opacity-50"
                >
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5 shrink-0 text-pink-400" />
                  {loggingOut ? 'Saliendo...' : 'Salir'}
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;