/**
 * mockService.js
 *
 * ⚠️  SOLO PARA DEMO — NO usar en producción.
 *
 * Implementa la misma API que contentService.js pero con:
 *   - Datos ficticios (sin datos personales reales)
 *   - Almacenamiento en memoria (no persiste entre recargas)
 *   - Sin llamadas a Firebase / Firestore / Auth
 *   - Sin imports de firebase/
 *
 * Activado por serviceFactory.js cuando VITE_DEMO_MODE=true.
 * Las páginas admin NO importan desde aquí directamente (Fase 0).
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _idCounter = 1;
const genId = () => `mock-${_idCounter++}`;

const ok      = (data) => ({ data, error: null });
const okWrite = ()     => ({ error: null });
const okId    = (id)   => ({ id, error: null });

// ─── Estado en memoria (inicializado con datos ficticios) ─────────────────────

let _profile = {
  id: 'main',
  name: 'Alex Demo',
  title: 'Frontend Developer',
  bio: 'Desarrolladora apasionada por crear experiencias web únicas e intuitivas. Especializada en React y diseño de interfaces accesibles.',
  email: 'demo@example.com',
  github: 'https://github.com/demo-user',
  linkedin: 'https://linkedin.com/in/demo-user',
  imageUrl: '',
};

let _projects = [
  {
    id: 'mock-p1',
    title: 'Portfolio Interactivo',
    description: 'Portfolio personal con animaciones SVG y CMS propio construido con React y Firebase.',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/demo',
    demo: 'https://demo.web.app',
    order: 1,
  },
  {
    id: 'mock-p2',
    title: 'App de Gestión de Eventos',
    description: 'Aplicación full-stack para gestión de eventos con autenticación de usuarios y CRUD completo.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/demo',
    demo: '',
    order: 2,
  },
  {
    id: 'mock-p3',
    title: 'Dashboard de Huella de Carbono',
    description: 'Herramienta de medición y visualización de emisiones CO₂ para empresas del sector financiero.',
    technologies: ['React', 'Chart.js', 'REST API'],
    github: '',
    demo: '',
    order: 3,
  },
];

let _coverLetterMain = {
  id: 'main',
  content:
    'Estimado/a equipo:\n\nMe dirijo a vosotros con entusiasmo para presentar mi candidatura. Soy Frontend Developer con experiencia en proyectos reales y una sólida base técnica en React.\n\nQuedo a vuestra disposición.',
};

let _coverLetterCards = [
  { id: 'mock-cl1', title: '¿Por qué yo?', content: 'Combino habilidades técnicas con sensibilidad de diseño, cuidando cada detalle de la experiencia de usuario.', order: 1 },
  { id: 'mock-cl2', title: 'Mi stack', content: 'React, JavaScript (ES6+), Tailwind CSS, Firebase, Git. Aprendizaje continuo de TypeScript y testing.', order: 2 },
  { id: 'mock-cl3', title: 'Enfoque', content: 'Trabajo de forma autónoma y en equipo, con atención al detalle y orientación a resultados.', order: 3 },
];

let _storybook = [
  { id: 'local_1', title: 'El comienzo', text: 'Todo empezó con la curiosidad de entender cómo funcionaban las webs. Un tutorial de HTML y CSS fue la chispa.', img: '', alt: 'Inicio del viaje', bg: 'bg-purple-50', order: 1, visible: true },
  { id: 'local_2', title: 'El primer reto', text: 'Aprender JavaScript fue un desafío apasionante. Variables, funciones, el DOM… cada concepto abrió nuevas posibilidades.', img: '', alt: 'Primer reto técnico', bg: 'bg-pink-50', order: 2, visible: true },
  { id: 'local_3', title: 'React y el salto', text: 'Con React todo cambió. Los componentes, el estado, los hooks… una nueva forma de pensar las interfaces.', img: '', alt: 'Descubriendo React', bg: 'bg-blue-50', order: 3, visible: true },
];

let _whiteboardScenes = [
  { id: 'mock-w0', sceneId: 0, title: 'La Idea',      description: 'Todo proyecto comienza con una idea. Un boceto, una necesidad real.',            buttonText: '',        buttonLink: '' },
  { id: 'mock-w1', sceneId: 1, title: 'El Diseño',    description: 'El diseño da forma a la experiencia. Cada detalle importa.',                     buttonText: 'Ver proceso', buttonLink: '#' },
  { id: 'mock-w2', sceneId: 2, title: 'El Código',    description: 'Transformar diseño en código limpio y reutilizable con React.',                   buttonText: '',        buttonLink: '' },
  { id: 'mock-w3', sceneId: 3, title: 'Las Pruebas',  description: 'Probar en múltiples dispositivos, corregir, iterar hasta que funcione bien.',     buttonText: '',        buttonLink: '' },
  { id: 'mock-w4', sceneId: 4, title: 'El Resultado', description: 'Un producto funcional, accesible y con personalidad propia.',                     buttonText: 'Ver demo', buttonLink: '#' },
];

let _settings = {
  id: 'main',
  sectionsOrder: ['hero', 'about', 'coverLetter', 'storyboard', 'projects'],
  showStoryboard: true,
  showProjects: true,
  maintenanceMode: false,
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const getProfile = async () => ok({ ..._profile });

export const updateProfile = async (profileData) => {
  _profile = { ..._profile, ...profileData };
  return okWrite();
};

// ─── Experiences ──────────────────────────────────────────────────────────────
// Colección eliminada del CMS. Se mantiene en la API por compatibilidad de firma.

export const listExperiences   = async ()        => ok([]);
export const addExperience     = async ()        => okId(genId());
export const updateExperience  = async ()        => okWrite();
export const deleteExperience  = async ()        => okWrite();

// ─── Projects ─────────────────────────────────────────────────────────────────

export const listProjects = async () => ok([..._projects]);

export const addProject = async (projectData) => {
  const id = genId();
  _projects = [..._projects, { id, ...projectData }];
  return okId(id);
};

export const updateProject = async (id, projectData) => {
  _projects = _projects.map((p) => (p.id === id ? { ...p, ...projectData } : p));
  return okWrite();
};

export const deleteProject = async (id) => {
  _projects = _projects.filter((p) => p.id !== id);
  return okWrite();
};

// ─── Cover Letter ─────────────────────────────────────────────────────────────

export const getCoverLetter = async () => ok({ ..._coverLetterMain });

export const updateCoverLetter = async (content) => {
  _coverLetterMain = { ..._coverLetterMain, content };
  return okWrite();
};

export const listCoverLetterCards = async () => ok([..._coverLetterCards]);

export const addCoverLetterCard = async (cardData) => {
  const id = genId();
  _coverLetterCards = [..._coverLetterCards, { id, ...cardData }];
  return okId(id);
};

export const updateCoverLetterCard = async (id, cardData) => {
  _coverLetterCards = _coverLetterCards.map((c) => (c.id === id ? { ...c, ...cardData } : c));
  return okWrite();
};

export const deleteCoverLetterCard = async (id) => {
  _coverLetterCards = _coverLetterCards.filter((c) => c.id !== id);
  return okWrite();
};

export const updateCoverLetterCardOrder = async (id, newOrder) => {
  _coverLetterCards = _coverLetterCards.map((c) => (c.id === id ? { ...c, order: newOrder } : c));
  return okWrite();
};

export const seedCoverLetterFromLocal = async () => ({ added: 0, error: null }); // no-op en demo

// ─── Storybook ────────────────────────────────────────────────────────────────

export const listStorybook = async () => ok([..._storybook]);

export const updateStoryOrder = async (id, newOrder) => {
  _storybook = _storybook.map((s) => (s.id === id ? { ...s, order: newOrder } : s));
  return okWrite();
};

export const addStorybook = async (storyData) => {
  const id = genId();
  _storybook = [..._storybook, { id, ...storyData }];
  return okId(id);
};

export const updateStorybook = async (id, storyData) => {
  _storybook = _storybook.map((s) => (s.id === id ? { ...s, ...storyData } : s));
  return okWrite();
};

export const deleteStorybook = async (id) => {
  _storybook = _storybook.filter((s) => s.id !== id);
  return okWrite();
};

export const seedStorybookFromLocal = async () => ({ created: 0, updated: 0, error: null }); // no-op en demo

// ─── Whiteboard ───────────────────────────────────────────────────────────────

export const listWhiteboardScenes = async () => ok([..._whiteboardScenes]);

export const updateWhiteboardScene = async (id, sceneData) => {
  _whiteboardScenes = _whiteboardScenes.map((s) => (s.id === id ? { ...s, ...sceneData } : s));
  return okWrite();
};

export const seedWhiteboardFromLocal = async () => ({ added: 0, error: null }); // no-op en demo

// ─── Settings ─────────────────────────────────────────────────────────────────

export const getSettings = async () => ok({ ..._settings });

export const updateSettings = async (settingsData) => {
  _settings = { ..._settings, ...settingsData };
  return okWrite();
};

// ─── Seed ─────────────────────────────────────────────────────────────────────

export const seedInitialData = async () => okWrite(); // no-op en demo
