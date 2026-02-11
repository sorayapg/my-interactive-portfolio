/**
 * Datos iniciales del portfolio para cargar en Firestore
 * Estos son los datos actuales hardcodeados en el portfolio
 */

export const initialSeedData = {
  profile: {
    name: 'Soraya Povedano Gardo',
    title: 'Desarrolladora Front-End',
    tagline: 'Desarrolladora Front-End creativa y apasionada por el diseño.',
    about: 'Soy Desarrolladora Front-End especializada en React y JavaScript, enfocada en crear interfaces funcionales, intuitivas y visualmente cuidadas.\n\nHe participado en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend dentro de una arquitectura híbrida PHP (Joomla) y JavaScript, así como en proyectos reales como una aplicación de huella de carbono para CaixaBank y una aplicación full-stack de gestión de eventos (CalendarApp) con autenticación de usuarios.\n\nMe caracterizo por combinar lógica técnica con sensibilidad de diseño, cuidando la experiencia de usuario, el detalle visual pixel-perfect y la integración eficiente con backend.',
    location: 'España',
    email: 'sorayapovedano@outlook.com',
    phone: '+34 678678678',
    github: 'https://github.com/sorayapg',
    linkedin: 'https://www.linkedin.com/in/soraya-povedano',
    cvUrl: '/documents/Curriculum Vitae Soraya Povedano Gardo.pdf',
    imageUrl: 'public/images/storyboard/Soraya.png',
  },

  projects: [
    {
      name: 'CalendarApp',
      description: 'Una aplicación completa tipo calendario desarrollada para gestionar eventos. Permite a los usuarios crear, visualizar, editar y eliminar eventos de forma sencilla.',
      stack: ['React', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Express'],
      liveUrl: 'https://calendar-app-backend-pro.up.railway.app/auth/login',
      frontendRepo: 'https://github.com/sorayapg/calendarApp',
      backendRepo: 'https://github.com/sorayapg/calendarApp_Backend',
      imageUrl: '',
      highlights: [
        'Autenticación de usuarios',
        'CRUD completo de eventos',
        'Interfaz intuitiva',
        'API RESTful',
      ],
      order: 0,
      visible: true,
    },
  ],

  experiences: [
    {
      title: 'Frontend Developer',
      company: 'Telefónica',
      location: 'Madrid, España',
      startDate: '2022',
      endDate: 'Actualidad',
      description: 'Participación en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend dentro de una arquitectura híbrida PHP (Joomla) y JavaScript.',
      tech: ['JavaScript', 'PHP', 'Joomla', 'HTML5', 'CSS3'],
      order: 0,
      visible: true,
    },
    {
      title: 'Frontend Developer',
      company: 'CaixaBank (Proyecto)',
      location: 'España',
      startDate: '2023',
      endDate: '2023',
      description: 'Desarrollo de una aplicación de huella de carbono para CaixaBank, enfocada en sostenibilidad y UX.',
      tech: ['React', 'JavaScript', 'CSS3'],
      order: 1,
      visible: true,
    },
  ],

  coverLetter: {
    content: JSON.stringify([
      {
        title: 'PRESENTACIÓN PERSONAL',
        text: 'Me llamo Soraya y soy desarrolladora Front-End. Pero más allá del código, vivo el diseño como una forma de expresión. Me apasiona crear experiencias digitales que sean funcionales como hermosas, y cada interfaz que diseño lleva mi curiosidad, emoción y propósito.',
      },
      {
        title: '💻 SOBRE MIS PASIONES',
        text: 'He participado en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend, y he trabajado en proyectos como una aplicación de huella de carbono para CaixaBank y una aplicación full-stack de gestión de eventos. Me apasiona combinar la lógica técnica con la sensibilidad del diseño para crear productos que la gente ame usar.',
      },
      {
        title: '🌱 VALORES QUE DEFINEN MI TRABAJO',
        text: 'Trabajo en equipo, comunicación clara y mejora continua son esenciales para mí. Me formo en entornos ágiles, colaboro con profesionales diversos y siempre estoy buscando cómo mejorar el producto… y a mí misma. Para mí, programar es pensar en las personas.',
      },
      {
        title: '✨ MI UNIVERSO CREATIVO',
        text: 'Me inspiran los colores suaves, las formas que respiran y los diseños que cuentan historias. Utilizo Figma para dar vida a prototipos pensados desde la experiencia del usuario, y combino herramientas como HTML5, CSS3, React, Jest, Node.js y MongoDB para construir soluciones con estructura y sensibilidad visual.',
      },
      {
        title: '🌍 MI MISIÓN',
        text: 'Quiero que el desarrollo web tenga alma. Que cada proyecto sea una carta visual que diga "aquí hay alguien que se preocupa por los detalles". Creo en la sostenibilidad, la empatía, el arte digital y en usar la tecnología para mejorar cómo vivimos y nos comunicamos.',
      },
      {
        title: '💖 DISEÑO CON ALMA',
        text: 'El desarrollo web necesita funcionalidad, seguridad y belleza. Mi misión es crear interfaces que sean intuitivas, accesibles y que transmitan emociones. Cada línea de código que escribo lleva mi pasión por el diseño y la tecnología.',
      },
      {
        title: '📬 Contacto',
        text: '📧 sorayapovedano@outlook.com\n📞 +34 678678678\n🔗 LinkedIn: Soraya Povedano\n🐱 GitHub: https://github.com/sorayapg',
      },
    ]),
  },

  settings: {
    sectionsOrder: ['hero', 'about', 'coverLetter', 'storyboard', 'professionalStory', 'projects'],
    flags: {
      showStoryboard: true,
      showProfessionalStory: true,
      showProjects: true,
      showCoverLetter: true,
      maintenanceMode: false,
    },
  },
};
