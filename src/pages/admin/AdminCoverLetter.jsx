import { useState, useEffect } from 'react';
import {
  listCoverLetterCards,
  updateCoverLetterCardOrder,
  addCoverLetterCard,
  updateCoverLetterCard,
  deleteCoverLetterCard,
  seedCoverLetterFromLocal,
} from '../../services/contentService';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/24/outline';

// Cards locales para migración — mismo contenido que CARDS_FALLBACK en CoverLetter.jsx
const CARDS_LOCALES = [
  {
    localId: 'cl0', type: 'text',
    title: 'PRESENTACIÓN PERSONAL',
    text: 'Me llamo Soraya y soy desarrolladora Front-End. Pero más allá del código, vivo el diseño como una forma de expresión. Me apasiona crear experiencias digitales que sean funcionales como hermosas, y cada interfaz que diseño lleva mi curiosidad, emoción y propósito.',
    bg: 'bg-white', hoverColor: 'hover:bg-pink-200', order: 0, visible: true,
  },
  {
    localId: 'cl1', type: 'text',
    title: '💻 SOBRE MIS PASIONES',
    text: 'He participado en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend, y he trabajado en proyectos como una aplicación de huella de carbono para CaixaBank y una aplicación full-stack de gestión de eventos. Me apasiona combinar la lógica técnica con la sensibilidad del diseño para crear productos que la gente ame usar.',
    bg: 'bg-white', hoverColor: 'hover:bg-blue-100', order: 1, visible: true,
  },
  {
    localId: 'cl2', type: 'text',
    title: '🌱 VALORES QUE DEFINEN MI TRABAJO',
    text: 'Trabajo en equipo, comunicación clara y mejora continua son esenciales para mí. Me formo en entornos ágiles, colaboro con profesionales diversos y siempre estoy buscando cómo mejorar el producto… y a mí misma. Para mí, programar es pensar en las personas.',
    bg: 'bg-white', hoverColor: 'hover:bg-green-100', order: 2, visible: true,
  },
  {
    localId: 'cl3', type: 'text',
    title: '✨ MI UNIVERSO CREATIVO',
    text: 'Me inspiran los colores suaves, las formas que respiran y los diseños que cuentan historias. Utilizo Figma para dar vida a prototipos pensados desde la experiencia del usuario, y combino herramientas como HTML5, CSS3, React, Jest, Node.js y MongoDB para construir soluciones con estructura y sensibilidad visual.',
    bg: 'bg-white', hoverColor: 'hover:bg-purple-100', order: 3, visible: true,
  },
  {
    localId: 'cl4', type: 'image',
    title: 'Ilustración kawaii',
    imageUrl: '/images/storyboard/carta-presentacion.png',
    imageAlt: 'Ilustración de Soraya en estilo kawaii',
    bg: 'bg-pink-100', hoverColor: 'hover:bg-pink-200', order: 4, visible: true,
  },
  {
    localId: 'cl5', type: 'text',
    title: '💖 DISEÑO CON ALMA',
    text: 'El desarrollo web necesita funcionalidad, seguridad y belleza. Mi misión es crear interfaces que sean intuitivas, accesibles y que transmitan emociones. Cada línea de código que escribo lleva mi pasión por el diseño y la tecnología.',
    bg: 'bg-white', hoverColor: 'hover:bg-rose-100', order: 5, visible: true,
  },
  {
    localId: 'cl6', type: 'contact',
    title: '📬 Contacto',
    lines: [
      '📧 sorayapovedano@outlook.com',
      '📞 +34 678678678',
      '🔗 LinkedIn: Soraya Povedano',
      '🐱 GitHub: https://github.com/sorayapg',
    ],
    bg: 'bg-white', hoverColor: 'hover:bg-indigo-100', order: 6, visible: true,
  },
  {
    localId: 'cl7', type: 'text',
    title: '🌍 MI MISIÓN',
    text: 'Quiero que el desarrollo web tenga alma. Que cada proyecto sea una carta visual que diga "aquí hay alguien que se preocupa por los detalles". Creo en la sostenibilidad, la empatía, el arte digital y en usar la tecnología para mejorar cómo vivimos y nos comunicamos.',
    bg: 'bg-white', hoverColor: 'hover:bg-yellow-100', order: 7, visible: false,
  },
];

const BG_OPTIONS = [
  { label: 'Blanco', value: 'bg-white' },
  { label: 'Rosa claro', value: 'bg-pink-50' },
  { label: 'Rosa', value: 'bg-pink-100' },
  { label: 'Lila claro', value: 'bg-purple-50' },
  { label: 'Lila', value: 'bg-purple-100' },
  { label: 'Azul', value: 'bg-blue-100' },
  { label: 'Verde', value: 'bg-green-100' },
  { label: 'Amarillo', value: 'bg-yellow-100' },
  { label: 'Rosa suave', value: 'bg-rose-100' },
  { label: 'Índigo', value: 'bg-indigo-100' },
];

const HOVER_OPTIONS = [
  { label: 'Rosa', value: 'hover:bg-pink-200' },
  { label: 'Rosa claro', value: 'hover:bg-pink-100' },
  { label: 'Azul', value: 'hover:bg-blue-100' },
  { label: 'Verde', value: 'hover:bg-green-100' },
  { label: 'Lila', value: 'hover:bg-purple-100' },
  { label: 'Amarillo', value: 'hover:bg-yellow-100' },
  { label: 'Rosa suave', value: 'hover:bg-rose-100' },
  { label: 'Índigo', value: 'hover:bg-indigo-100' },
  { label: 'Ninguno', value: '' },
];

const TYPE_OPTIONS = [
  { label: '📝 Texto', value: 'text' },
  { label: '🖼️ Imagen', value: 'image' },
  { label: '📬 Contacto', value: 'contact' },
];

const EMPTY_FORM = {
  type: 'text',
  title: '',
  text: '',
  linesRaw: '',
  imageUrl: '',
  imageAlt: '',
  bg: 'bg-white',
  hoverColor: 'hover:bg-pink-200',
  order: 0,
  visible: true,
};

const AdminCoverLetter = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setLoading(true);
    const { data } = await listCoverLetterCards();
    if (data) setCards(data);
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // ── Reorder ────────────────────────────────────────────────────────────
  const moveUp = async (index) => {
    if (index === 0) return;
    const card = cards[index];
    const prev = cards[index - 1];
    await updateCoverLetterCardOrder(card.id, prev.order);
    await updateCoverLetterCardOrder(prev.id, card.order);
    showMessage('success', '✅ Orden actualizado');
    loadCards();
  };

  const moveDown = async (index) => {
    if (index === cards.length - 1) return;
    const card = cards[index];
    const next = cards[index + 1];
    await updateCoverLetterCardOrder(card.id, next.order);
    await updateCoverLetterCardOrder(next.id, card.order);
    showMessage('success', '✅ Orden actualizado');
    loadCards();
  };

  // ── Form helpers ──────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: cards.length });
    setFormOpen(true);
  };

  const openEdit = (card) => {
    setEditingId(card.id);
    setForm({
      type: card.type || 'text',
      title: card.title || '',
      text: card.text || '',
      linesRaw: (card.lines || []).join('\n'),
      imageUrl: card.imageUrl || '',
      imageAlt: card.imageAlt || '',
      bg: card.bg || 'bg-white',
      hoverColor: card.hoverColor || 'hover:bg-pink-200',
      order: card.order ?? 0,
      visible: card.visible !== false,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // ── CRUD handlers ─────────────────────────────────────────────────────
  const buildCardData = () => {
    const base = {
      type: form.type,
      title: form.title,
      bg: form.bg,
      hoverColor: form.hoverColor,
      order: form.order,
      visible: form.visible,
    };
    if (form.type === 'image') {
      return { ...base, imageUrl: form.imageUrl, imageAlt: form.imageAlt };
    }
    if (form.type === 'contact') {
      return {
        ...base,
        lines: form.linesRaw.split('\n').filter((l) => l.trim() !== ''),
      };
    }
    return { ...base, text: form.text };
  };

  const handleSave = async () => {
    if (form.type !== 'image' && !form.title.trim()) {
      showMessage('error', '⚠️ El título es obligatorio');
      return;
    }
    setSaving(true);
    const cardData = buildCardData();
    if (editingId) {
      const { error } = await updateCoverLetterCard(editingId, cardData);
      if (error) showMessage('error', `❌ Error: ${error}`);
      else showMessage('success', '✅ Card actualizada');
    } else {
      const { error } = await addCoverLetterCard(cardData);
      if (error) showMessage('error', `❌ Error: ${error}`);
      else showMessage('success', '✅ Card añadida');
    }
    setSaving(false);
    closeForm();
    loadCards();
  };

  const handleDelete = async (id) => {
    const { error } = await deleteCoverLetterCard(id);
    if (error) showMessage('error', `❌ Error: ${error}`);
    else showMessage('success', '🗑️ Card eliminada');
    setConfirmDelete(null);
    loadCards();
  };

  const handleMigrate = async () => {
    setMigrating(true);
    const { added, error } = await seedCoverLetterFromLocal(CARDS_LOCALES);
    if (error) showMessage('error', `❌ Error en migración: ${error}`);
    else showMessage('success', `✅ Migración completada: ${added} card(s) subidas`);
    setMigrating(false);
    loadCards();
  };

  const typeLabel = (type) => {
    if (type === 'image') return '🖼️';
    if (type === 'contact') return '📬';
    return '📝';
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
            <EnvelopeOpenIcon className="w-6 h-6 text-purple-400 shrink-0" />
            Carta de Presentación
          </h1>
          <p className="text-gray-600 text-sm">Gestiona y reordena las cards de tu carta kawaii</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md font-medium text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Nueva card
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

      {/* Banner de migración */}
      {!loading && (
        <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 font-medium mb-3">
            📦 ¿Primera vez usando el CMS? Migra las cards locales a Firestore (seguro — no duplica las ya migradas).
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium text-sm disabled:opacity-50"
          >
            {migrating ? '⏳ Migrando...' : '🚀 Migrar cards locales a Firestore'}
          </button>
        </div>
      )}

      {/* Form (add / edit) */}
      {formOpen && (
        <div className="mb-6 p-6 border-2 border-pink-200 rounded-xl bg-pink-50">
          <h2 className="text-lg font-bold text-pink-700 mb-4">
            {editingId ? '✏️ Editar card' : '➕ Nueva card'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de card</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
              >
                {TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Orden */}
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

            {/* Título — no aplica para imagen */}
            {form.type !== 'image' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="cms-field px-3 py-2 text-sm"
                  placeholder="💖 DISEÑO CON ALMA"
                />
              </div>
            )}

            {/* Texto — solo para type=text */}
            {form.type === 'text' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  rows={4}
                  className="cms-field px-3 py-2 text-sm resize-none"
                  placeholder="Descripción de la card..."
                />
              </div>
            )}

            {/* Líneas de contacto — solo para type=contact */}
            {form.type === 'contact' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Líneas de contacto <span className="text-gray-400 font-normal">(una por línea)</span>
                </label>
                <textarea
                  value={form.linesRaw}
                  onChange={(e) => setForm({ ...form, linesRaw: e.target.value })}
                  rows={5}
                  className="cms-field px-3 py-2 text-sm font-mono resize-none"
                  placeholder={'📧 email@ejemplo.com\n📞 +34 600000000\n🐱 GitHub: https://github.com/usuario'}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Las líneas que empiecen por "🐱 GitHub:" se renderizan como enlace.
                </p>
              </div>
            )}

            {/* URL e alt imagen — solo para type=image */}
            {form.type === 'image' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL imagen</label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="cms-field px-3 py-2 text-sm"
                    placeholder="/images/storyboard/carta-presentacion.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt (accesibilidad)</label>
                  <input
                    type="text"
                    value={form.imageAlt}
                    onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                    className="cms-field px-3 py-2 text-sm"
                    placeholder="Descripción de la imagen"
                  />
                </div>
              </>
            )}

            {/* Fondo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fondo</label>
              <select
                value={form.bg}
                onChange={(e) => setForm({ ...form, bg: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
              >
                {BG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label} ({o.value})</option>
                ))}
              </select>
            </div>

            {/* Hover color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color hover</label>
              <select
                value={form.hoverColor}
                onChange={(e) => setForm({ ...form, hoverColor: e.target.value })}
                className="cms-field px-3 py-2 text-sm"
              >
                {HOVER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}{o.value ? ` (${o.value})` : ''}</option>
                ))}
              </select>
            </div>

            {/* Visible */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="cl-visible"
                checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor="cl-visible" className="text-sm font-medium text-gray-700">
                Visible en portfolio
              </label>
            </div>
          </div>

          {/* Preview imagen */}
          {form.type === 'image' && form.imageUrl && (
            <div className="mt-4 p-3 bg-pink-100 rounded-xl border border-pink-200 inline-block">
              <img
                src={form.imageUrl}
                alt={form.imageAlt || 'Preview'}
                className="w-28 h-28 object-contain rounded-xl"
              />
            </div>
          )}

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

      {/* Cards list */}
      <div className="space-y-3">
        {cards.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No hay cards todavía. Usa el botón "Migrar" para importar el contenido actual.
          </div>
        ) : (
          cards.map((card, index) => (
            <div
              key={card.id}
              className="flex items-center gap-3 p-3 border-2 border-pink-200 rounded-lg bg-pink-50 overflow-hidden"
            >
              {/* Reorder */}
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
                  disabled={index === cards.length - 1}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDownIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail */}
              {card.type === 'image' && card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt={card.imageAlt || ''}
                  className="w-14 h-14 object-contain rounded-lg bg-pink-100 shrink-0"
                />
              ) : (
                <div className={`w-14 h-14 rounded-lg ${card.bg || 'bg-white'} border border-pink-200 shrink-0 flex items-center justify-center text-2xl`}>
                  {typeLabel(card.type)}
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-pink-400 shrink-0">#{index + 1}</span>
                  <h3 className="font-bold text-gray-900 truncate">
                    {card.title || <em className="text-gray-400 font-normal">sin título</em>}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full shrink-0">
                    {card.type || 'text'}
                  </span>
                  {card.visible === false && (
                    <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full shrink-0">
                      oculta
                    </span>
                  )}
                </div>
                {card.type === 'text' && card.text && (
                  <p
                    className="text-sm text-gray-500 mt-0.5"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {card.text}
                  </p>
                )}
                {card.type === 'contact' && (
                  <p className="text-sm text-gray-500 mt-0.5">{(card.lines || []).length} línea(s)</p>
                )}
                {card.type === 'image' && (
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{card.imageUrl}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {confirmDelete === card.id ? (
                  <>
                    <span className="text-xs text-red-600 font-medium">¿Eliminar?</span>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => openEdit(card)}
                      className="cms-action-btn p-1.5"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(card.id)}
                      className="p-1.5 bg-red-50 text-red-400 rounded hover:bg-red-100 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCoverLetter;
