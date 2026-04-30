import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

/**
 * Fuente de verdad única para las secciones del panel admin.
 *
 * Consumido por:
 *  - AdminNav.jsx  → usa path, label, icon, exact
 *  - AdminHome.jsx → usa todos los campos; filtra los que tienen `description`
 *
 * cardClasses contiene clases Tailwind COMPLETAS (nunca interpoladas)
 * para que el build de producción las incluya correctamente.
 */
export const adminSections = [
  {
    path: '/admin',
    label: 'Home',
    icon: HomeIcon,
    exact: true,
    // Sin description → no aparece como card en AdminHome
  },
  {
    path: '/admin/profile',
    label: 'Perfil',
    description: 'Editar información personal',
    icon: UserIcon,
    cardClasses: {
      card: 'border-purple-200 from-purple-50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
    },
  },
  {
    path: '/admin/experiences',
    label: 'Experiencias',
    description: 'Gestionar experiencia laboral',
    icon: BriefcaseIcon,
    cardClasses: {
      card: 'border-pink-200 from-pink-50',
      iconBg: 'bg-pink-100',
      iconText: 'text-pink-600',
    },
  },
  {
    path: '/admin/projects',
    label: 'Proyectos',
    description: 'Administrar portfolio de proyectos',
    icon: RectangleStackIcon,
    cardClasses: {
      card: 'border-indigo-200 from-indigo-50',
      iconBg: 'bg-indigo-100',
      iconText: 'text-indigo-600',
    },
  },
  {
    path: '/admin/cover-letter',
    label: 'Cover Letter',
    description: 'Editar carta de presentación',
    icon: DocumentTextIcon,
    cardClasses: {
      card: 'border-rose-200 from-rose-50',
      iconBg: 'bg-rose-100',
      iconText: 'text-rose-600',
    },
  },
  {
    path: '/admin/storyboard',
    label: 'Storyboard',
    description: 'Reordenar viñetas del storyboard',
    icon: BookOpenIcon,
    cardClasses: {
      card: 'border-violet-200 from-violet-50',
      iconBg: 'bg-violet-100',
      iconText: 'text-violet-600',
    },
  },
  {
    path: '/admin/certifications',
    label: 'Certificaciones',
    description: 'Gestionar certificados y cursos',
    icon: AcademicCapIcon,
    cardClasses: {
      card: 'border-emerald-200 from-emerald-50',
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-600',
    },
  },
  {
    path: '/admin/settings',
    label: 'Ajustes',
    description: 'Configuración general',
    icon: Cog6ToothIcon,
    cardClasses: {
      card: 'border-fuchsia-200 from-fuchsia-50',
      iconBg: 'bg-fuchsia-100',
      iconText: 'text-fuchsia-600',
    },
  },
];
