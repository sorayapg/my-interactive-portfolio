import { useState, useEffect } from 'react';
import {
  listWhiteboardScenes,
  updateWhiteboardScene,
  seedWhiteboardFromLocal,
} from '../../services/contentService';
import {
  PencilIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

// Datos locales de las 5 escenas — solo campos de texto.
// La estructura visual (paths, animaciones, iconos) vive en scenes.js.
const SCENES_LOCALES = [
  {
    sceneId: 0,
    title: 'Mi Viaje Profesional',
    description: 'Bienvenido a mi historia profesional. A través de esta experiencia interactiva, te contaré cómo he evolucionado en el mundo del desarrollo.',
    buttonText: '',
    buttonLink: '',
  },
  {
    sceneId: 1,
    title: 'Telefónica Tech',
    description: 'En Telefónica Tech trabajé como desarrolladora, donde aprendí a manejar proyectos grandes y colaborar en equipos multidisciplinares.',
    buttonText: '',
    buttonLink: '',
  },
  {
    sceneId: 2,
    title: 'CaixaBank Tech',
    description: 'En CaixaBank Tech me especialicé en el desarrollo de soluciones financieras, trabajando con arquitecturas complejas.',
    buttonText: '',
    buttonLink: '',
  },
  {
    sceneId: 3,
    title: 'CalendarApp',
    description: 'Desarrollé CalendarApp, una aplicación completa de gestión de eventos con React, Redux y Node.js.',
    buttonText: '',
    buttonLink: '',
  },
  {
    sceneId: 4,
    title: 'Siguiente Capítulo',
    description: 'Estoy lista para el siguiente desafío. Mi objetivo es seguir creciendo como desarrolladora y formar parte de un equipo innovador.',
    buttonText: 'Ver Proyectos',
    buttonLink: '#projects',
  },
];

const EMPTY_FORM = {
  title: '',
  description: '',
  buttonText: '',
  buttonLink: '',
};

const AdminWhiteboard = () => {
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingSceneId, setEditingSceneId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    loadScenes();
  }, []);

  const loadScenes = async () => {
    setLoading(true);
    const { data } = await listWhiteboardScenes();
    if (data && data.length > 0) setScenes(data);
    else setScenes([]);
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  // Combinar datos de Firestore con datos locales para mostrar siempre las 5 escenas
  const mergedScenes = SCENES_LOCALES.map((local) => {
    const fromFirestore = scenes.find((s) => s.sceneId === local.sceneId);
    return fromFirestore ? { ...local, ...fromFirestore } : { ...local, id: null };
  });

  const openEdit = (scene) => {
    setEditingId(scene.id || null);
    setEditingSceneId(scene.sceneId);
    setForm({
      title: scene.title || '',
      description: scene.description || '',
      buttonText: scene.buttonText || '',
      buttonLink: scene.buttonLink || '',
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setEditingSceneId(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      showMessage('error', '⚠️ El título es obligatorio');
      return;
    }
    setSaving(true);
    const sceneData = {
      sceneId: editingSceneId,
      title: form.title.trim(),
      description: form.description.trim(),
      buttonText: form.buttonText.trim(),
      buttonLink: form.buttonLink.trim(),
    };
    const { error } = await updateWhiteboardScene(editingId, sceneData);
    if (error) {
      showMessage('error', `❌ Error al guardar: ${error}`);
    } else {
      showMessage('success', '✅ Escena actualizada');
      closeForm();
      loadScenes();
    }
    setSaving(false);
  };

  const handleMigrate = async () => {
    setMigrating(true);
    const { added, error } = await seedWhiteboardFromLocal(SCENES_LOCALES);
    if (error) showMessage('error', `❌ Error en migración: ${error}`);
    else showMessage('success', `✅ Migración completada: ${added} escena(s) subidas`);
    setMigrating(false);
    loadScenes();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">🎨 Whiteboard — Mi Viaje Profesional</h1>
        <p className="text-gray-600 text-sm">
          Edita el texto de las escenas del whiteboard. Las animaciones e ilustraciones son fijas.
        </p>
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

      {/* Banner de migración */}
      {scenes.length === 0 && (
        <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 font-medium mb-3">
            📦 Las escenas aún no están en Firestore. Mígralas para poder editarlas desde el CMS.
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium text-sm disabled:opacity-50"
          >
            {migrating ? '⏳ Migrando...' : '🚀 Migrar escenas locales a Firestore'}
          </button>
        </div>
      )}

      {scenes.length > 0 && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium text-xs disabled:opacity-50"
          >
            {migrating ? '⏳ Migrando...' : '🔄 Re-migrar (no duplica)'}
          </button>
        </div>
      )}

      {/* Form edición */}
      {formOpen && (
        <div className="mb-6 p-6 border-2 border-indigo-200 rounded-xl bg-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-indigo-700">
              ✏️ Editar escena {editingSceneId + 1}
            </h2>
            <button
              onClick={closeForm}
              className="cms-close-btn p-1.5"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none text-sm"
                placeholder="Mi Viaje Profesional"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none text-sm resize-none"
                placeholder="Texto descriptivo de la escena..."
              />
            </div>

            {/* Botón — solo si la escena tiene o puede tener botón */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texto del botón (opcional)</label>
                <input
                  type="text"
                  value={form.buttonText}
                  onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none text-sm"
                  placeholder="Ver Proyectos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enlace del botón (opcional)</label>
                <input
                  type="text"
                  value={form.buttonLink}
                  onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none text-sm"
                  placeholder="#projects"
                />
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm disabled:opacity-50"
            >
              <CheckIcon className="w-4 h-4" />
              {saving ? 'Guardando...' : 'Guardar cambios'}
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

      {/* Lista de escenas */}
      <div className="space-y-3">
        {mergedScenes.map((scene) => (
          <div
            key={scene.sceneId}
            className="flex items-start gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-indigo-200 transition-all"
          >
            {/* Número de escena */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
              {scene.sceneId + 1}
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{scene.title}</h3>
                {!scene.id && (
                  <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                    solo local
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{scene.description}</p>
              {scene.buttonText && (
                <p className="text-xs text-indigo-500 mt-1">
                  Botón: <span className="font-medium">{scene.buttonText}</span>
                  {scene.buttonLink && <span className="text-gray-400"> → {scene.buttonLink}</span>}
                </p>
              )}
            </div>

            {/* Botón editar */}
            <button
              onClick={() => openEdit(scene)}
              disabled={!scene.id}
              title={!scene.id ? 'Migra primero las escenas a Firestore' : 'Editar'}
              className="cms-action-btn p-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {mergedScenes.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">Sin escenas</p>
          <p className="text-sm">Migra los datos locales para empezar.</p>
        </div>
      )}
    </div>
  );
};

export default AdminWhiteboard;
