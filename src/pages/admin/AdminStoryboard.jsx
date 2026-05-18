import { useState, useEffect } from 'react';
import {
  listStorybook,
  updateStoryOrder,
  addStorybook,
  updateStorybook,
  deleteStorybook,
  seedStorybookFromLocal,
} from '../../services/contentService';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

// Viñetas locales para migración — mismo array que el portfolio público
const VINETAS_LOCALES = [
  { id: 1, title: '🎀 Viñeta 1: ¡Hola mundo!', text: '¡Soy Soraya! Desarrolladora Front-End apasionada por crear experiencias digitales mágicas. 📍 Desde Luanco, creando interfaces con alegría y mucho código.', img: '/images/storyboard/hola-mundo.png', alt: 'Viñeta 1: ¡Hola mundo!', bg: 'bg-white' },
  { id: 2, title: '🧁 Viñeta 2: Formación, el inicio', text: '🎓 Me formé en Desarrollo de Aplicaciones Web en CIFP Avilés. Aquí aprendí JavaScript, React, HTML, CSS y Bootstrap. ¡Fue el inicio de mi hechizo tecnológico!', img: '/images/storyboard/formacion-daw.png', alt: 'Viñeta 2: Formación, el inicio', bg: 'bg-pink-100' },
  { id: 3, title: '☁️ Viñeta 3: Cloud Portal Telefónica', text: '💻 Trabajé en el desarrollo frontend del Cloud Portal corporativo de Telefónica, creando componentes reutilizables dentro de una arquitectura híbrida Joomla (PHP) + JavaScript. ⚙️ Aquí trabajé con integración real con backend, lógica de negocio y entorno enterprise, mejorando rendimiento, estructura y experiencia de usuario. 🚀 Fue el paso donde mis habilidades pasaron de aprendizaje a experiencia profesional real en producto corporativo.', img: '/images/storyboard/cloud-telefonica.png', alt: 'Viñeta 3: Cloud Portal Telefónica', bg: 'bg-indigo-100' },
  { id: 4, title: '🍡 Viñeta 4: Primeras prácticas', text: '🔰 En Visualia 360 me enfrenté a APIs, traducciones dinámicas y WordPress. ¡Mis poderes crecían entre idiomas y plugins!', img: '/images/storyboard/visualia-practicas.png', alt: 'Viñeta 4: Primeras prácticas', bg: 'bg-blue-100' },
  { id: 5, title: '🌟 Viñeta 5: Misiones en DXC Technology', text: '👩‍💻 Desde febrero a mayo 2024, desarrollé apps con React, pruebas automatizadas con Selenium y Jest, y trabajé con equipos ágiles (Scrum y Waterfall). 💚 ¡Incluso participé en un proyecto premiado de huella de carbono!', img: '/images/storyboard/dxc-experiencia.png', alt: 'Viñeta 5: Misiones en DXC Technology', bg: 'bg-green-100' },
  { id: 6, title: '🛠️ Viñeta 6: Mi stack kawaii', text: '🧠 Mi arsenal: JavaScript (ES6+), React, Figma, GitHub, Jenkins, Selenium, pruebas unitarias y diseño UX/UI. 📈 ¡Siempre aprendiendo para subir de nivel!', img: '/images/storyboard/stack-tecnologico.png', alt: 'Viñeta 6: Mi stack kawaii', bg: 'bg-yellow-100' },
  { id: 7, title: '🧑‍🚀 Viñeta 7: Proyecto con superpoderes', text: '🗓️ App de calendario con React, Node.js, MongoDB: 🔗 Frontend / Backend 👾 Tecnologías utilizadas: React, Redux Toolkit, Node, Express, MongoDB Compass.', img: '/images/storyboard/calendar-app.png', alt: 'Viñeta 7: Proyecto con superpoderes', bg: 'bg-purple-100' },
  { id: 8, title: '📚 Viñeta 8: Certificaciones mágicas', text: '🎓 Cursos que me han dado +100 puntos de experiencia: ✔️ Generative AI (AWS) ✔️ JavaScript, diseño web, IA aplicada ✔️ ¡Y muchos más!', img: '/images/storyboard/certificaciones.png', alt: 'Viñeta 8: Certificaciones mágicas', bg: 'bg-blue-100' },
  { id: 9, title: '🎯 Viñeta 9: ¿Qué busco ahora?', text: '✨ Busco nuevos desafíos donde pueda crear interfaces adorables, eficientes y llenas de UX/UI kawaii. 🫶 Si tu equipo cree en la magia de la tecnología, ¡conectemos!', img: '/images/storyboard/busqueda-actual.png', alt: 'Viñeta 9: ¿Qué busco ahora?', bg: 'bg-pink-100' },
];

const EMPTY_FORM = {
  title: '',
  text: '',
  img: '',
  alt: '',
  bg: 'bg-white',
  order: 0,
  visible: true,
};

const BG_OPTIONS = [
  { label: 'Blanco', value: 'bg-white' },
  { label: 'Rosa', value: 'bg-pink-100' },
  { label: 'Índigo', value: 'bg-indigo-100' },
  { label: 'Azul', value: 'bg-blue-100' },
  { label: 'Verde', value: 'bg-green-100' },
  { label: 'Amarillo', value: 'bg-yellow-100' },
  { label: 'Lila', value: 'bg-purple-100' },
  { label: 'Rojo suave', value: 'bg-red-100' },
];

const AdminStoryboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    const { data } = await listStorybook();
    if (data) setStories(data);
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // ── Reorder (lógica original preservada) ─────────────────────────────────
  const moveUp = async (index) => {
    if (index === 0) return;
    const story = stories[index];
    const prevStory = stories[index - 1];
    await updateStoryOrder(story.id, prevStory.order);
    await updateStoryOrder(prevStory.id, story.order);
    showMessage('success', '✅ Orden actualizado');
    loadStories();
  };

  const moveDown = async (index) => {
    if (index === stories.length - 1) return;
    const story = stories[index];
    const nextStory = stories[index + 1];
    await updateStoryOrder(story.id, nextStory.order);
    await updateStoryOrder(nextStory.id, story.order);
    showMessage('success', '✅ Orden actualizado');
    loadStories();
  };

  // ── Form helpers ──────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: stories.length });
    setFormOpen(true);
  };

  const openEdit = (story) => {
    setEditingId(story.id);
    setForm({
      title: story.title || '',
      text: story.text || '',
      img: story.img || '',
      alt: story.alt || '',
      bg: story.bg || 'bg-white',
      order: story.order ?? 0,
      visible: story.visible !== false,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) {
      showMessage('error', '⚠️ El título es obligatorio');
      return;
    }
    setSaving(true);
    if (editingId) {
      const { error } = await updateStorybook(editingId, form);
      if (error) showMessage('error', `❌ Error: ${error}`);
      else showMessage('success', '✅ Viñeta actualizada');
    } else {
      const { error } = await addStorybook(form);
      if (error) showMessage('error', `❌ Error: ${error}`);
      else showMessage('success', '✅ Viñeta añadida');
    }
    setSaving(false);
    closeForm();
    loadStories();
  };

  const handleDelete = async (id) => {
    const { error } = await deleteStorybook(id);
    if (error) showMessage('error', `❌ Error: ${error}`);
    else showMessage('success', '🗑️ Viñeta eliminada');
    setConfirmDelete(null);
    loadStories();
  };

  const handleMigrate = async () => {
    setMigrating(true);
    const { created, updated, error } = await seedStorybookFromLocal(VINETAS_LOCALES);
    if (error) showMessage('error', `❌ Error en migración: ${error}`);
    else showMessage('success', `✅ Migración: ${created} creadas, ${updated} actualizadas, 0 duplicadas`);
    setMigrating(false);
    loadStories();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <BookOpenIcon className="w-6 h-6 text-purple-400 shrink-0" />
            Storyboard
          </h1>
          <p className="text-gray-600 text-sm">Gestiona y reordena las viñetas de tu historia</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md font-medium text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Nueva viñeta
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg border-2 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Banner de migración — visible siempre para poder migrar viñetas locales pendientes */}
      {!loading && (
        <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 font-medium mb-2">
            📦 Migración idempotente en 2 pasos: (1) crea/actualiza <code className="font-mono bg-amber-100 px-1 rounded">local_1…local_N</code> desde el array local; (2) promueve automáticamente los docs con <strong>⚠️ ID antiguo</strong> al siguiente <code className="font-mono bg-amber-100 px-1 rounded">local_N+1</code> conservando sus datos. Tras migrar, elimina los docs ⚠️ con 🗑️.
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium text-sm disabled:opacity-50"
          >
            {migrating ? '⏳ Migrando...' : '🚀 Migrar viñetas locales a Firestore'}
          </button>
        </div>
      )}

      {/* Form (add / edit) */}
      {formOpen && (
        <div className="mb-6 p-6 border-2 border-purple-200 rounded-xl bg-purple-50">
          <h2 className="text-lg font-bold text-purple-700 mb-4">
            {editingId ? '✏️ Editar viñeta' : '➕ Nueva viñeta'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
                placeholder="🎀 Viñeta 1: ¡Hola mundo!"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                rows={3}
                className="cms-field px-3 py-2 text-sm resize-none"
                placeholder="Descripción de la viñeta..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ruta imagen</label>
              <input
                type="text"
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
                placeholder="/images/storyboard/nombre.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt (accesibilidad)</label>
              <input
                type="text"
                value={form.alt}
                onChange={(e) => setForm({ ...form, alt: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
                placeholder="Descripción de la imagen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fondo</label>
              <select
                value={form.bg}
                onChange={(e) => setForm({ ...form, bg: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
              >
                {BG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} ({o.value})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="cms-field px-3 py-2 text-sm"
                min={0}
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="visible"
                checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                className="w-4 h-4 accent-purple-500"
              />
              <label htmlFor="visible" className="text-sm font-medium text-gray-700">
                Visible en portfolio
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium text-sm disabled:opacity-50"
            >
              <CheckIcon className="w-4 h-4" />
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={closeForm}
              className="cms-close-btn flex items-center gap-2 px-4 py-2 font-medium text-sm"
            >
              <XMarkIcon className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Stories list */}
      <div className="space-y-3">
        {stories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No hay viñetas en el storyboard aún
          </div>
        ) : (
          stories.map((story, index) => (
            <div
              key={story.id}
              className="flex items-center gap-3 p-3 border-2 border-purple-200 rounded-lg bg-purple-50 overflow-hidden"
            >
              {/* Reorder buttons */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUpIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === stories.length - 1}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDownIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail */}
              {story.img ? (
                <img
                  src={story.img}
                  alt={story.alt || story.title}
                  className="w-14 h-14 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-purple-100 shrink-0 flex items-center justify-center text-purple-300 text-xs">
                  sin img
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-purple-500 shrink-0">#{index + 1}</span>
                  <h3 className="font-bold text-gray-900 truncate">{story.title}</h3>
                  {story.visible === false && (
                    <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full shrink-0">
                      oculta
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs font-mono text-gray-400 truncate">{story.id}</span>
                  {!story.id.startsWith('local_') && (
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 border border-amber-200 rounded-full shrink-0 font-medium">
                      ⚠️ ID antiguo
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{story.text}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(story)}
                  className="cms-action-btn p-1.5"
                  title="Editar"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                {confirmDelete === story.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs font-medium"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-xs font-medium"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(story.id)}
                    className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition"
                    title="Eliminar"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Usa los botones ↑ ↓ para reordenar las viñetas. Los cambios se guardan automáticamente.
        </p>
      </div>
    </div>
  );
};

export default AdminStoryboard;
